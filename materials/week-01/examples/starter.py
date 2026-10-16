"""C16-V: создаёт каркас, не готовую модель. Запуск: python starter.py lab01_transit_domain.
Даны пять валидаторов/импорты/сигнатуры. Переходы состояния, публичный интерфейс,
собственные тесты и защита — самостоятельная работа. Существующие папки не заменяются.
"""
from pathlib import Path
import sys

FILES = {
    'domain/validators.py': '''
from datetime import datetime, timezone
from decimal import Decimal, ROUND_HALF_UP
from uuid import UUID, uuid4

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
''',
    'domain/errors.py': '''
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
''',
    'domain/route.py': '''
from datetime import datetime, timezone
from decimal import Decimal, ROUND_HALF_UP
from uuid import UUID, uuid4
from .validators import _text, _decimal, _money, _count, _aware_time
from .errors import *


class Route:
    """Самостоятельная реализация по контракту practice.md."""

    def __init__(self, route_number: str, stops: list[str], base_fare: Decimal=Decimal('100.00')) -> None:
        'Реализуйте создание допустимого объекта по контракту.'
        raise NotImplementedError("Учебная работа: Route.__init__")

    @property
    def route_number(self) -> str:
        'Номер маршрута.'
        raise NotImplementedError("Учебная работа: Route.route_number")

    @property
    def base_fare(self) -> Decimal:
        'Базовый тариф.'
        raise NotImplementedError("Учебная работа: Route.base_fare")

    @property
    def stops(self) -> tuple[str, ...]:
        'Кортеж защищает список остановок от случайного изменения извне.'
        raise NotImplementedError("Учебная работа: Route.stops")
''',
    'domain/bus.py': '''
from datetime import datetime, timezone
from decimal import Decimal, ROUND_HALF_UP
from uuid import UUID, uuid4
from .validators import _text, _decimal, _money, _count, _aware_time
from .errors import *
from .route import Route


class Bus:
    """Самостоятельная реализация по контракту practice.md."""

    def __init__(self, plate_number: str, capacity: int) -> None:
        'Реализуйте создание допустимого объекта по контракту.'
        raise NotImplementedError("Учебная работа: Bus.__init__")

    @property
    def plate_number(self) -> str:
        'Нормализованный госномер.'
        raise NotImplementedError("Учебная работа: Bus.plate_number")

    @property
    def capacity(self) -> int:
        'Максимальная вместимость.'
        raise NotImplementedError("Учебная работа: Bus.capacity")

    @property
    def current_passengers(self) -> int:
        'Текущее количество пассажиров, только для чтения.'
        raise NotImplementedError("Учебная работа: Bus.current_passengers")

    @property
    def route(self) -> Route | None:
        'Текущий маршрут или None.'
        raise NotImplementedError("Учебная работа: Bus.route")

    def assign_route(self, route: Route) -> None:
        'Назначить проверенный маршрут.'
        raise NotImplementedError("Учебная работа: Bus.assign_route")

    def remove_route(self) -> None:
        'Снять маршрут без изменения количества пассажиров.'
        raise NotImplementedError("Учебная работа: Bus.remove_route")

    def board_passengers(self, count: int) -> None:
        'Посадить людей, если хватает мест; при отказе состояние прежнее.'
        raise NotImplementedError("Учебная работа: Bus.board_passengers")

    def leave_passengers(self, count: int) -> None:
        'Высадить не больше людей, чем находится в салоне.'
        raise NotImplementedError("Учебная работа: Bus.leave_passengers")
''',
    'domain/card.py': '''
from datetime import datetime, timezone
from decimal import Decimal, ROUND_HALF_UP
from uuid import UUID, uuid4
from .validators import _text, _decimal, _money, _count, _aware_time
from .errors import *


class TransitCard:
    """Самостоятельная реализация по контракту practice.md."""

    def __init__(self, card_id: str, initial_balance: Decimal=Decimal('0.00'), discount_rate: Decimal=Decimal('0')) -> None:
        'Реализуйте создание допустимого объекта по контракту.'
        raise NotImplementedError("Учебная работа: TransitCard.__init__")

    @property
    def card_id(self) -> str:
        'ID без публичного сеттера.'
        raise NotImplementedError("Учебная работа: TransitCard.card_id")

    @property
    def balance(self) -> Decimal:
        'Баланс без публичного сеттера.'
        raise NotImplementedError("Учебная работа: TransitCard.balance")

    @property
    def discount_rate(self) -> Decimal:
        'Доля скидки.'
        raise NotImplementedError("Учебная работа: TransitCard.discount_rate")

    @property
    def is_blocked(self) -> bool:
        'Признак блокировки.'
        raise NotImplementedError("Учебная работа: TransitCard.is_blocked")

    @property
    def block_reason(self) -> str:
        'Сохранённая причина блокировки или пустая строка.'
        raise NotImplementedError("Учебная работа: TransitCard.block_reason")

    def block(self, reason: str) -> None:
        'Заблокировать карту с непустой причиной.'
        raise NotImplementedError("Учебная работа: TransitCard.block")

    def unblock(self) -> None:
        'Снять блокировку и очистить её причину.'
        raise NotImplementedError("Учебная работа: TransitCard.unblock")

    def top_up(self, amount: Decimal) -> None:
        'Пополнить активную карту минимум на 100.00 KZT.'
        raise NotImplementedError("Учебная работа: TransitCard.top_up")

    def pay(self, fare: Decimal) -> Decimal:
        'Оплатить проезд со скидкой, вернув фактически списанную сумму.'
        raise NotImplementedError("Учебная работа: TransitCard.pay")
''',
    'domain/ticket.py': '''
from datetime import datetime, timezone
from decimal import Decimal, ROUND_HALF_UP
from uuid import UUID, uuid4
from .validators import _text, _decimal, _money, _count, _aware_time
from .errors import *
from .bus import Bus


class SingleTripTicket:
    """Самостоятельная реализация по контракту practice.md."""

    def __init__(self, price: Decimal, issued_at: datetime | None=None) -> None:
        'Реализуйте создание допустимого объекта по контракту.'
        raise NotImplementedError("Учебная работа: SingleTripTicket.__init__")

    @property
    def ticket_code(self) -> UUID:
        'Идентификатор билета.'
        raise NotImplementedError("Учебная работа: SingleTripTicket.ticket_code")

    @property
    def price(self) -> Decimal:
        'Цена покупки.'
        raise NotImplementedError("Учебная работа: SingleTripTicket.price")

    @property
    def issued_at(self) -> datetime:
        'Время покупки с часовым поясом.'
        raise NotImplementedError("Учебная работа: SingleTripTicket.issued_at")

    @property
    def is_validated(self) -> bool:
        'Был ли билет успешно использован.'
        raise NotImplementedError("Учебная работа: SingleTripTicket.is_validated")

    def validate(self, bus: Bus, *, now: datetime | None=None) -> None:
        'Проверить одноразовость/срок; now позволяет не ждать в тестах.'
        raise NotImplementedError("Учебная работа: SingleTripTicket.validate")
''',
    'domain/__init__.py': '''
from .route import Route
from .bus import Bus
from .card import TransitCard
from .ticket import SingleTripTicket
from .errors import (InsufficientFundsError, CardBlockedError, CapacityExceededError, TicketAlreadyUsedError, TicketExpiredError)
''',
    'tests/test_domain.py': '''
"""Напишите собственные пять обязательных сценариев и дополнительные границы из practice.md. Импортируйте свою domain-папку."""
''',
    'README.md': '''
# Моя лабораторная Avtobys

Дано: каркас и пять валидаторов.
Самостоятельно реализовано:
Инварианты четырёх сущностей:
Команды/фактический результат своих тестов:
Граничный отказ и состояние после него:
Decimal/property/прямое изменение пассажиров/исключения — ответы защиты:
Ручная рубрика5+7+5+3:
Оставшаяся незавершённая работа:
''',
}

def create(destination):
    """Создать новую папку, отказавшись от перезаписи существующей работы."""
    target = Path(destination)
    target.mkdir(parents=True, exist_ok=False)
    for name, text in FILES.items():
        path = target / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(text, encoding='utf-8')
    print(f'Создан учебный каркас: {target.resolve()}. Логика/свои тесты ещё не реализованы.')


if __name__ == '__main__':
    if len(sys.argv) != 2:
        raise SystemExit('Использование: python starter.py НОВАЯ_ПАПКА')
    create(sys.argv[1])
