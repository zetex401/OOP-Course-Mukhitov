"""Предоставленные проверки поведения; это не самостоятельные тесты студента."""

from decimal import Decimal
import pytest
from payment_methods import DemoBluetoothPayment
from solid_demo import (
    DemoScanner, FareService, InMemoryRepository, DemoIndicator, DemoBuzzer,
    TransitTerminal, DemoQrPaymentStrategy, StandardTransitCard,
    TransitCardPaymentStrategy,
)


class SpyPayment:
    def __init__(self, accepted=True):
        self.accepted = accepted
        self.calls = []

    def process(self, amount):
        self.calls.append(amount)
        return self.accepted


def assemble(payment, ready=True):
    repository = InMemoryRepository()
    indicator = DemoIndicator()
    buzzer = DemoBuzzer()
    terminal = TransitTerminal(
        DemoScanner("TEST-001", ready), FareService(Decimal("100.00")),
        payment, repository, indicator, buzzer,
    )
    return terminal, repository, indicator, buzzer


@pytest.mark.parametrize("payment", [
    DemoQrPaymentStrategy(True), DemoBluetoothPayment(True, True),
    TransitCardPaymentStrategy(StandardTransitCard(Decimal("100.00"))),
])
def test_success_contract_for_three_strategies(payment):
    terminal, repo, screen, sound = assemble(payment)
    assert terminal.process_tap() is True
    assert repo.records == [("TEST-001", Decimal("100.00"))]
    assert screen.messages == ["Проход разрешён"]
    assert (sound.success_count, sound.error_count) == (1, 0)


@pytest.mark.parametrize("payment", [
    DemoQrPaymentStrategy(False), DemoBluetoothPayment(True, False),
    DemoBluetoothPayment(False, True),
    TransitCardPaymentStrategy(StandardTransitCard(Decimal("50.00"))),
])
def test_refusal_does_not_record_success(payment):
    terminal, repo, screen, sound = assemble(payment)
    assert terminal.process_tap() is False
    assert repo.records == []
    assert screen.messages == ["Оплата отклонена"]
    assert (sound.success_count, sound.error_count) == (0, 1)


def test_unready_scanner_never_reads_or_pays():
    class UnreadyScanner:
        def is_ready(self):
            return False

        def scan_card(self):
            raise AssertionError("Сканер не должен читаться")

    payment = SpyPayment()
    repo, screen, sound = InMemoryRepository(), DemoIndicator(), DemoBuzzer()
    terminal = TransitTerminal(UnreadyScanner(), FareService(Decimal("100.00")),
                               payment, repo, screen, sound)
    assert terminal.process_tap() is False
    assert payment.calls == []
    assert repo.records == []
    assert screen.messages == ["Сканер не готов"]
    assert (sound.success_count, sound.error_count) == (0, 1)


def test_fare_reaches_payment_once():
    payment = SpyPayment()
    terminal, _, _, _ = assemble(payment)
    terminal.process_tap()
    assert payment.calls == [Decimal("100.00")]


def test_card_refusal_keeps_balance():
    card = StandardTransitCard(Decimal("50.00"))
    assert card.charge(Decimal("100.00")) is False
    assert card.charge(Decimal("50.00")) is True


@pytest.mark.parametrize("amount", [Decimal("-1"), Decimal("NaN"), Decimal("Infinity")])
def test_bluetooth_rejects_invalid_amount(amount):
    with pytest.raises(ValueError):
        DemoBluetoothPayment(True, True).process(amount)


def test_bluetooth_rejects_float():
    with pytest.raises(TypeError):
        DemoBluetoothPayment(True, True).process(100.0)
