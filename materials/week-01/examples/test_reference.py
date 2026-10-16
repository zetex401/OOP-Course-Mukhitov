"""Проверки учебного контракта; запускаются pytest без сети/ожиданий."""

from datetime import datetime, timedelta, timezone
from decimal import Decimal
from uuid import UUID

import pytest

import importlib
import os

MODEL_NAME = os.environ.get("WEEK1_MODEL", "reference_solution")
model = importlib.import_module(MODEL_NAME)
print(f"WEEK1 contract model: {MODEL_NAME} -> {model.__file__}")
Bus, Route, TransitCard, SingleTripTicket = (getattr(model, name) for name in (
    "Bus", "Route", "TransitCard", "SingleTripTicket"))
(CapacityExceededError, CardBlockedError, InsufficientFundsError,
 TicketAlreadyUsedError, TicketExpiredError) = (getattr(model, name) for name in (
    "CapacityExceededError", "CardBlockedError", "InsufficientFundsError",
    "TicketAlreadyUsedError", "TicketExpiredError"))


D = Decimal
BOUGHT = datetime(2026, 1, 15, 10, 0, tzinfo=timezone.utc)


def test_card_prevents_negative_balance():
    card = TransitCard("KZ-01", D("50.00"))
    with pytest.raises(InsufficientFundsError):
        card.pay(D("100.00"))
    assert card.balance == D("50.00")


def test_card_blocked_rejects_operations():
    card = TransitCard("KZ-01", D("200.00"))
    card.block("Утеряна")
    with pytest.raises(CardBlockedError):
        card.pay(D("100.00"))
    with pytest.raises(CardBlockedError):
        card.top_up(D("100.00"))
    assert card.balance == D("200.00")
    assert card.is_blocked


def test_bus_capacity_overflow():
    bus = Bus("123 AB 02", 10)
    bus.board_passengers(9)
    with pytest.raises(CapacityExceededError):
        bus.board_passengers(2)
    assert bus.current_passengers == 9


def test_ticket_double_validation():
    bus = Bus("123 AB 02", 40)
    ticket = SingleTripTicket(D("100.00"), BOUGHT)
    ticket.validate(bus, now=BOUGHT)
    with pytest.raises(TicketAlreadyUsedError):
        ticket.validate(bus, now=BOUGHT)
    assert ticket.is_validated


def test_route_minimum_stops():
    with pytest.raises(ValueError):
        Route("32", ["Вокзал"])


@pytest.mark.parametrize("capacity", [10, 250])
def test_capacity_boundaries(capacity):
    bus = Bus("123 AB 02", capacity)
    bus.board_passengers(capacity)
    assert bus.current_passengers == capacity
    bus.leave_passengers(capacity)
    assert bus.current_passengers == 0


@pytest.mark.parametrize("capacity", [9, 251])
def test_bad_capacity(capacity):
    with pytest.raises(ValueError):
        Bus("123 AB 02", capacity)


@pytest.mark.parametrize("count", [0, -1, True, 1.5])
def test_bad_passenger_count_does_not_mutate(count):
    bus = Bus("123 AB 02", 40)
    bus.board_passengers(5)
    error = TypeError if type(count) is not int else ValueError
    for action in (bus.board_passengers, bus.leave_passengers):
        with pytest.raises(error):
            action(count)
        assert bus.current_passengers == 5


def test_cannot_leave_more_people_than_present():
    bus = Bus("123 AB 02", 40)
    bus.board_passengers(2)
    with pytest.raises(ValueError):
        bus.leave_passengers(3)
    assert bus.current_passengers == 2


def test_route_assignment_and_plate_normalization():
    bus = Bus(" 123  AB 02 ", 40)
    route = Route(" 32 ", ["Вокзал", "Парк"])
    bus.assign_route(route)
    assert bus.route is route
    assert bus.plate_number == "123 AB 02"
    bus.remove_route()
    assert bus.route is None
    assert route.route_number == "32"
    assert route.base_fare == D("100.00")


def test_route_copies_stops_and_allows_return():
    stops = ["A", "B", "A"]
    route = Route("32", stops)
    stops.clear()
    assert route.stops == ("A", "B", "A")
    with pytest.raises(AttributeError):
        route.stops.clear()


@pytest.mark.parametrize("stops", [["A", " A "], ["A", " "]])
def test_invalid_stop_names(stops):
    with pytest.raises(ValueError):
        Route("32", stops)


@pytest.mark.parametrize("discount, expected", [
    (D("0"), D("100.00")), (D("0.5"), D("50.00")), (D("1"), D("0.00")),
])
def test_discount_boundaries(discount, expected):
    card = TransitCard("KZ-01", D("100.00"), discount)
    assert card.pay(D("100.00")) == expected
    assert card.balance == D("100.00") - expected


def test_exact_balance_and_free_card():
    card = TransitCard("KZ-01", D("100.00"))
    card.pay(D("100.00"))
    assert card.balance == D("0.00")
    free = TransitCard("FREE", D("0.00"), D("1"))
    assert free.pay(D("100.00")) == D("0.00")
    free.block("Утеряна")
    with pytest.raises(CardBlockedError):
        free.pay(D("100.00"))


def test_top_up_minimum_and_unblock():
    card = TransitCard("KZ-01")
    with pytest.raises(ValueError):
        card.top_up(D("99.99"))
    assert card.balance == D("0.00")
    card.top_up(D("100.00"))
    card.block(" Утеряна ")
    assert card.block_reason == "Утеряна"
    card.unblock()
    assert not card.is_blocked and card.block_reason == ""
    assert card.pay(D("100.00")) == D("100.00")


def test_rounding_policy():
    card = TransitCard("KZ-01", D("1.00"), D("0.5"))
    assert card.pay(D("0.01")) == D("0.01")
    assert card.balance == D("0.99")


@pytest.mark.parametrize("bad", [D("-1"), D("NaN"), D("Infinity"), D("0.001")])
def test_invalid_money(bad):
    with pytest.raises(ValueError):
        TransitCard("KZ-01", bad)
    card = TransitCard("KZ-01", D("200.00"))
    for action in (card.pay, card.top_up):
        with pytest.raises(ValueError):
            action(bad)
        assert card.balance == D("200.00")


@pytest.mark.parametrize("discount", [D("-0.01"), D("1.01"), D("NaN")])
def test_invalid_discount(discount):
    with pytest.raises(ValueError):
        TransitCard("KZ-01", discount_rate=discount)


def test_type_hints_are_not_runtime_validation():
    with pytest.raises(TypeError):
        TransitCard("KZ-01", 100.0)
    with pytest.raises(ValueError):
        TransitCard(" ")
    with pytest.raises(ValueError):
        Route("32", ["A", "B"], D("0"))


def test_public_properties_have_no_setters():
    card = TransitCard("KZ-01")
    bus = Bus("123 AB 02", 40)
    with pytest.raises(AttributeError):
        card.balance = D("-1")
    with pytest.raises(AttributeError):
        card.card_id = "OTHER"
    with pytest.raises(AttributeError):
        bus.current_passengers = -5


def test_ticket_time_boundaries_and_failed_state():
    bus = Bus("123 AB 02", 40)
    valid = SingleTripTicket(D("100.00"), BOUGHT)
    valid.validate(bus, now=BOUGHT + timedelta(minutes=59, seconds=59))
    assert valid.is_validated
    expired = SingleTripTicket(D("100.00"), BOUGHT)
    with pytest.raises(TicketExpiredError):
        expired.validate(bus, now=BOUGHT + timedelta(minutes=60))
    assert not expired.is_validated
    assert bus.current_passengers == 0


def test_used_ticket_rejected_in_another_bus_even_later():
    ticket = SingleTripTicket(D("100.00"), BOUGHT)
    ticket.validate(Bus("123 AB 02", 40), now=BOUGHT)
    with pytest.raises(TicketAlreadyUsedError):
        ticket.validate(Bus("456 CD 02", 40), now=BOUGHT + timedelta(hours=2))


def test_ticket_rejects_future_check_and_naive_time():
    ticket = SingleTripTicket(D("100.00"), BOUGHT)
    with pytest.raises(ValueError):
        ticket.validate(Bus("123 AB 02", 40), now=BOUGHT - timedelta(seconds=1))
    assert not ticket.is_validated
    with pytest.raises(ValueError):
        SingleTripTicket(D("100.00"), datetime(2026, 1, 15))
    with pytest.raises(ValueError):
        ticket.validate(Bus("123 AB 02", 40), now=datetime(2026, 1, 15))
    assert not ticket.is_validated


def test_ticket_uuid_and_price():
    first = SingleTripTicket(D("100.00"), BOUGHT)
    second = SingleTripTicket(D("100.00"), BOUGHT)
    assert isinstance(first.ticket_code, UUID)
    assert first.ticket_code != second.ticket_code
    assert first.price == D("100.00") and first.issued_at == BOUGHT
    with pytest.raises(ValueError):
        SingleTripTicket(D("0.00"), BOUGHT)


def test_route_invalid_inputs_and_readonly_interface():
    for stops in ([], ["A"], ["A", " A "]):
        with pytest.raises(ValueError):
            Route("32", stops)
    with pytest.raises(TypeError):
        Route("32", ("A", "B"))
    with pytest.raises(ValueError):
        Route(" ", ["A", "B"])
    route = Route("32", ["A", "B"])
    for name, value in (("route_number", "X"), ("base_fare", D("-1")), ("stops", ())):
        with pytest.raises(AttributeError):
            setattr(route, name, value)


def test_invalid_assignment_preserves_bus_route_and_passengers():
    bus = Bus("123 AB 02", 10)
    route = Route("32", ["A", "B"])
    bus.assign_route(route)
    bus.board_passengers(1)
    with pytest.raises(TypeError):
        bus.assign_route("32")
    assert bus.route is route and bus.current_passengers == 1
    bus.remove_route()
    assert bus.route is None and bus.current_passengers == 1
    with pytest.raises(ValueError):
        Bus(" ", 10)


def test_invalid_block_reason_preserves_active_card():
    card = TransitCard("KZ-01", D("100.00"))
    with pytest.raises(ValueError):
        card.block(" ")
    assert not card.is_blocked and card.block_reason == ""
    assert card.balance == D("100.00")
    for name, value in (("discount_rate", D("1")), ("is_blocked", True), ("block_reason", "X")):
        with pytest.raises(AttributeError):
            setattr(card, name, value)


def test_invalid_bus_preserves_new_ticket_and_readonly_data():
    ticket = SingleTripTicket(D("100.00"), BOUGHT)
    with pytest.raises(TypeError):
        ticket.validate("bus", now=BOUGHT)
    assert not ticket.is_validated
    for name, value in (("price", D("0")), ("issued_at", BOUGHT),
                        ("ticket_code", "X"), ("is_validated", True)):
        with pytest.raises(AttributeError):
            setattr(ticket, name, value)
