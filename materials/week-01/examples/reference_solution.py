"""Учебный эталон недели 1: состояние изменяется только после проверок."""

from datetime import datetime, timedelta, timezone
from decimal import Decimal, ROUND_HALF_UP
from uuid import UUID, uuid4


class InsufficientFundsError(Exception):
    """Средств недостаточно для полной оплаты."""


class CardBlockedError(Exception):
    """Карта заблокирована."""


class CapacityExceededError(Exception):
    """Посадка привела бы к переполнению автобуса."""


class TicketAlreadyUsedError(Exception):
    """Билет уже использован."""


class TicketExpiredError(Exception):
    """Срок билета истёк."""


def _text(value: str, name: str) -> str:
    if not isinstance(value, str):
        raise TypeError(f"{name}: нужна строка")
    value = value.strip()
    if not value:
        raise ValueError(f"{name}: строка не должна быть пустой")
    return value


def _decimal(value: Decimal, name: str) -> Decimal:
    if not isinstance(value, Decimal):
        raise TypeError(f"{name}: нужен Decimal, созданный из строки")
    if not value.is_finite():
        raise ValueError(f"{name}: нужно конечное число")
    return value


def _money(value: Decimal, name: str) -> Decimal:
    value = _decimal(value, name)
    if value < 0 or value != value.quantize(Decimal("0.01")):
        raise ValueError(f"{name}: нужна неотрицательная сумма, кратная 0.01")
    return value


def _count(value: int) -> int:
    if type(value) is not int:
        raise TypeError("Количество должно быть целым числом, не bool")
    if value <= 0:
        raise ValueError("Количество должно быть положительным")
    return value


def _aware_time(value: datetime) -> datetime:
    if not isinstance(value, datetime):
        raise TypeError("Нужен datetime")
    if value.tzinfo is None or value.utcoffset() is None:
        raise ValueError("Время должно содержать часовой пояс")
    return value


class Route:
    """Маршрут с проверенными неизменяемыми публичными данными."""

    def __init__(self, route_number: str, stops: list[str],
                 base_fare: Decimal = Decimal("100.00")) -> None:
        self._route_number = _text(route_number, "Номер маршрута")
        self._base_fare = _money(base_fare, "Тариф")
        if self._base_fare == 0:
            raise ValueError("Тариф должен быть положительным")
        if not isinstance(stops, list):
            raise TypeError("Остановки передаются списком")
        checked = tuple(_text(stop, "Остановка") for stop in stops)
        if len(checked) < 2:
            raise ValueError("Нужны хотя бы две остановки")
        if any(left == right for left, right in zip(checked, checked[1:])):
            raise ValueError("Соседние остановки не должны совпадать")
        self._stops = checked

    @property
    def route_number(self) -> str:
        """Номер маршрута."""
        return self._route_number

    @property
    def base_fare(self) -> Decimal:
        """Базовый тариф."""
        return self._base_fare

    @property
    def stops(self) -> tuple[str, ...]:
        """Кортеж защищает список остановок от случайного изменения извне."""
        return self._stops


class Bus:
    """Автобус контролирует собственную пассажировместимость."""

    def __init__(self, plate_number: str, capacity: int) -> None:
        self._plate_number = " ".join(_text(plate_number, "Госномер").split())
        capacity = _count(capacity)
        if not 10 <= capacity <= 250:
            raise ValueError("Вместимость должна быть от 10 до 250")
        self._capacity = capacity
        self._current_passengers = 0
        self._route: Route | None = None

    @property
    def plate_number(self) -> str:
        """Нормализованный госномер."""
        return self._plate_number

    @property
    def capacity(self) -> int:
        """Максимальная вместимость."""
        return self._capacity

    @property
    def current_passengers(self) -> int:
        """Текущее количество пассажиров, только для чтения."""
        return self._current_passengers

    @property
    def route(self) -> Route | None:
        """Текущий маршрут или None."""
        return self._route

    def assign_route(self, route: Route) -> None:
        """Назначить проверенный маршрут."""
        if not isinstance(route, Route):
            raise TypeError("Нужен Route")
        self._route = route

    def remove_route(self) -> None:
        """Снять маршрут без изменения количества пассажиров."""
        self._route = None

    def board_passengers(self, count: int) -> None:
        """Посадить людей, если хватает мест; при отказе состояние прежнее."""
        count = _count(count)
        if self._current_passengers + count > self._capacity:
            raise CapacityExceededError("Недостаточно свободных мест")
        self._current_passengers += count

    def leave_passengers(self, count: int) -> None:
        """Высадить не больше людей, чем находится в салоне."""
        count = _count(count)
        if count > self._current_passengers:
            raise ValueError("Нельзя высадить больше пассажиров, чем есть")
        self._current_passengers -= count


class TransitCard:
    """Карта контролирует баланс, скидку и доступность операций."""

    MIN_TOP_UP = Decimal("100.00")

    def __init__(self, card_id: str,
                 initial_balance: Decimal = Decimal("0.00"),
                 discount_rate: Decimal = Decimal("0")) -> None:
        self._card_id = _text(card_id, "ID карты")
        self._balance = _money(initial_balance, "Баланс")
        discount_rate = _decimal(discount_rate, "Скидка")
        if not Decimal("0") <= discount_rate <= Decimal("1"):
            raise ValueError("Скидка должна быть в пределах [0, 1]")
        self._discount_rate = discount_rate
        self._is_blocked = False
        self._block_reason = ""

    @property
    def card_id(self) -> str:
        """ID без публичного сеттера."""
        return self._card_id

    @property
    def balance(self) -> Decimal:
        """Баланс без публичного сеттера."""
        return self._balance

    @property
    def discount_rate(self) -> Decimal:
        """Доля скидки."""
        return self._discount_rate

    @property
    def is_blocked(self) -> bool:
        """Признак блокировки."""
        return self._is_blocked

    @property
    def block_reason(self) -> str:
        """Сохранённая причина блокировки или пустая строка."""
        return self._block_reason

    def block(self, reason: str) -> None:
        """Заблокировать карту с непустой причиной."""
        reason = _text(reason, "Причина")
        self._is_blocked = True
        self._block_reason = reason

    def unblock(self) -> None:
        """Снять блокировку и очистить её причину."""
        self._is_blocked = False
        self._block_reason = ""

    def top_up(self, amount: Decimal) -> None:
        """Пополнить активную карту минимум на 100.00 KZT."""
        if self._is_blocked:
            raise CardBlockedError("Пополнение заблокированной карты запрещено")
        amount = _money(amount, "Пополнение")
        if amount < self.MIN_TOP_UP:
            raise ValueError("Минимальное пополнение: 100.00 KZT")
        self._balance += amount

    def pay(self, fare: Decimal) -> Decimal:
        """Оплатить проезд со скидкой, вернув фактически списанную сумму."""
        if self._is_blocked:
            raise CardBlockedError("Оплата заблокированной картой запрещена")
        fare = _money(fare, "Базовый тариф")
        if fare == 0:
            raise ValueError("Базовый тариф должен быть положительным")
        actual = (fare * (Decimal("1") - self._discount_rate)).quantize(
            Decimal("0.01"), rounding=ROUND_HALF_UP
        )
        if self._balance < actual:
            raise InsufficientFundsError("Недостаточно средств")
        self._balance -= actual
        return actual


class SingleTripTicket:
    """Одноразовый билет, действующий менее 60 минут с покупки."""

    def __init__(self, price: Decimal,
                 issued_at: datetime | None = None) -> None:
        self._price = _money(price, "Цена билета")
        if self._price == 0:
            raise ValueError("Цена билета должна быть положительной")
        self._issued_at = _aware_time(
            issued_at if issued_at is not None else datetime.now(timezone.utc)
        )
        self._ticket_code = uuid4()
        self._is_validated = False

    @property
    def ticket_code(self) -> UUID:
        """Идентификатор билета."""
        return self._ticket_code

    @property
    def price(self) -> Decimal:
        """Цена покупки."""
        return self._price

    @property
    def issued_at(self) -> datetime:
        """Время покупки с часовым поясом."""
        return self._issued_at

    @property
    def is_validated(self) -> bool:
        """Был ли билет успешно использован."""
        return self._is_validated

    def validate(self, bus: Bus, *, now: datetime | None = None) -> None:
        """Проверить одноразовость/срок; now позволяет не ждать в тестах."""
        if not isinstance(bus, Bus):
            raise TypeError("Нужен Bus")
        if self._is_validated:
            raise TicketAlreadyUsedError("Билет уже использован")
        checked_at = _aware_time(now if now is not None else datetime.now(timezone.utc))
        age = checked_at - self._issued_at
        if age < timedelta(0):
            raise ValueError("Время проверки раньше покупки")
        if age >= timedelta(minutes=60):
            raise TicketExpiredError("Срок билета истёк")
        self._is_validated = True


if __name__ == "__main__":
    route = Route("32", ["Вокзал", "Университет", "Парк"])
    bus = Bus("123 AB 02", 40)
    bus.assign_route(route)
    card = TransitCard("KZ-01", Decimal("200.00"), Decimal("0.5"))
    paid = card.pay(route.base_fare)
    bus.board_passengers(1)
    ticket = SingleTripTicket(Decimal("100.00"))
    ticket.validate(bus)
    print(f"Карта: списано {paid}, остаток {card.balance}")
    print(f"Автобус: маршрут {route.route_number}, пассажиров {bus.current_passengers}")
    print(f"Другой пассажир: билет использован = {ticket.is_validated}")
