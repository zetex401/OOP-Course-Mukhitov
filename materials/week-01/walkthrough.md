# Практика по шагам: соберите Avtobys в VS Code

Здесь весь код дан в порядке выполнения. Идите сверху вниз: создавайте указанные файлы, копируйте каждый Python-блок целиком и сохраняйте Ctrl+S. После последнего шага получится работающая модель и пять готовых тестов.

Это разбор с предоставленным решением. Для самостоятельной лабораторной напишите свою реализацию и свои тесты по [требованиям](practice.md). Копирование готовых тестов не считается их самостоятельным написанием. Темп нового маршрута не измерен.

## Как читать блоки

- **Терминал · PowerShell** — вставьте команды во встроенный терминал VS Code: меню «Терминал → Создать терминал», выберите PowerShell.
- **Путь файла .py** — откройте именно этот файл, выделите всё Ctrl+A и замените содержимое полным блоком. Для нового файла сначала создайте его с указанным именем.
- **Ожидаемый вывод** — сравните с терминалом, этот блок не вставляйте в программу.
- Нажимайте «Копировать» у нужного блока. Если браузер запретил буфер обмена, код выделится: нажмите Ctrl+C.
- Не вставляйте все блоки в один файл. Сохраняйте отступы Python; примеры из «Теории» сюда добавлять не нужно.

## Шаг 1. Создайте папку и подготовьте Python

Нужны VS Code и установленный Python 3.12 или новее. Ниже команды для Windows PowerShell. На macOS/Linux во всех следующих командах заменяйте `.\.venv\Scripts\python.exe` на `./.venv/bin/python`.

Создайте новую пустую папку для занятия, например `oop-week1`, откройте её через «Файл → Открыть папку» в VS Code. [Скачайте starter.py](examples/starter.py) и положите его прямо в эту папку. Имя должно быть `starter.py`, а не `starter.py.txt`.

Откройте терминал в папке `oop-week1` и выполните:

```powershell
python --version
python starter.py lab01_transit_domain
cd lab01_transit_domain
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install pytest
.\.venv\Scripts\python.exe -m pytest --version
```

Первый вывод должен показать Python 3.12+, последний — версию pytest. Если Windows не находит `python`, используйте `py -3.12` вместо `python` в командах проверки версии, запуска starter и создания среды, если эта версия установлена. Если нет ни одной команды, сначала установите [Python](https://www.python.org/downloads/) и заново откройте терминал.

Через «Файл → Открыть папку» откройте созданную `lab01_transit_domain`. Новый терминал должен находиться в ней. Все следующие команды запускайте именно оттуда. Путь в терминале должен заканчиваться на `lab01_transit_domain`.

`starter.py` уже создал файлы ошибок, валидаторов и общих импортов. Их менять не нужно. Папка `.venv` содержит среду Python; команды используют её напрямую, активировать среду отдельно не требуется. При повторном прохождении не запускайте генератор поверх прежней папки: он откажется её перезаписывать. Продолжите с нужного шага или создайте новую папку.

Структура после завершения:

```text Структура проекта · не команда
lab01_transit_domain/
  domain/
    __init__.py
    errors.py
    validators.py
    route.py
    bus.py
    card.py
    ticket.py
  tests/
    test_domain.py
  demo.py
  README.md
  .venv/
```

## Шаг 2. Маршрут Route

Маршрут хранит номер, тариф и остановки. Список превращается в tuple, поэтому внешнее изменение исходного списка не испортит маршрут.

Откройте `domain/route.py`. **Полностью замените содержимое файла** следующим кодом, включая импорты, и сохраните Ctrl+S. Не добавляйте блок в конец старого класса.

```python domain/route.py
from decimal import Decimal
from .validators import _text, _money


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
```

Проверка синтаксиса после сохранения (терминал):

```powershell
.\.venv\Scripts\python.exe -m compileall -q domain
```

Ожидается возврат к приглашению терминала без сообщения об ошибке. Это проверяет синтаксис; поведение всей модели проверим после четвёртого класса. `domain/__init__.py`, `domain/errors.py` и `domain/validators.py` остаются из starter.

## Шаг 3. Автобус Bus

Автобус проверяет вместимость и количество пассажиров до изменения состояния. Он использует Route из предыдущего шага.

Откройте `domain/bus.py`. **Полностью замените содержимое файла** следующим кодом, включая импорты, и сохраните Ctrl+S. Не добавляйте блок в конец старого класса.

```python domain/bus.py
from .validators import _text, _count
from .errors import CapacityExceededError
from .route import Route


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
```

Проверка синтаксиса после сохранения (терминал):

```powershell
.\.venv\Scripts\python.exe -m compileall -q domain
```

Ожидается возврат к приглашению терминала без сообщения об ошибке. Это проверяет синтаксис; поведение всей модели проверим после четвёртого класса. `domain/__init__.py`, `domain/errors.py` и `domain/validators.py` остаются из starter.

## Шаг 4. Транспортная карта TransitCard

Карта применяет скидку, проверяет баланс и блокировку. Деньги передаются через Decimal из строк.

Откройте `domain/card.py`. **Полностью замените содержимое файла** следующим кодом, включая импорты, и сохраните Ctrl+S. Не добавляйте блок в конец старого класса.

```python domain/card.py
from decimal import Decimal, ROUND_HALF_UP
from .validators import _text, _decimal, _money
from .errors import CardBlockedError, InsufficientFundsError


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
```

Проверка синтаксиса после сохранения (терминал):

```powershell
.\.venv\Scripts\python.exe -m compileall -q domain
```

Ожидается возврат к приглашению терминала без сообщения об ошибке. Это проверяет синтаксис; поведение всей модели проверим после четвёртого класса. `domain/__init__.py`, `domain/errors.py` и `domain/validators.py` остаются из starter.

## Шаг 5. Одноразовый билет SingleTripTicket

Билет действует меньше 60 минут. После успешной проверки он использован в любом автобусе; неуспешная первая проверка не меняет его состояние.

Откройте `domain/ticket.py`. **Полностью замените содержимое файла** следующим кодом, включая импорты, и сохраните Ctrl+S. Не добавляйте блок в конец старого класса.

```python domain/ticket.py
from datetime import datetime, timedelta, timezone
from decimal import Decimal
from uuid import UUID, uuid4
from .validators import _money, _aware_time
from .errors import TicketAlreadyUsedError, TicketExpiredError
from .bus import Bus


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
```

Проверка синтаксиса после сохранения (терминал):

```powershell
.\.venv\Scripts\python.exe -m compileall -q domain
```

Ожидается возврат к приглашению терминала без сообщения об ошибке. Это проверяет синтаксис; поведение всей модели проверим после четвёртого класса. `domain/__init__.py`, `domain/errors.py` и `domain/validators.py` остаются из starter.

## Шаг 6. Запустите общую демонстрацию

В корне `lab01_transit_domain`, рядом с папками `domain` и `tests`, создайте файл `demo.py`. Вставьте весь код и сохраните. Он показывает успешные действия и отказ без потери баланса.

```python demo.py
from datetime import datetime, timezone
from decimal import Decimal

from domain import (
    Bus, Route, SingleTripTicket, TransitCard, InsufficientFundsError,
)


route = Route("32", ["Вокзал", "Университет", "Парк"])
bus = Bus("123 AB 02", 40)
bus.assign_route(route)

card = TransitCard("KZ-01", Decimal("200.00"), Decimal("0.5"))
paid = card.pay(route.base_fare)
bus.board_passengers(1)

now = datetime(2026, 1, 15, 10, 0, tzinfo=timezone.utc)
ticket = SingleTripTicket(Decimal("100.00"), issued_at=now)
ticket.validate(bus, now=now)

print(f"Карта: списано {paid}, остаток {card.balance}")
print(f"Автобус: маршрут {bus.route.route_number}, пассажиров {bus.current_passengers}")
print(f"Билет использован: {ticket.is_validated}")

try:
    card.pay(Decimal("400.00"))
except InsufficientFundsError:
    print(f"Отказ оплаты: недостаточно средств, баланс {card.balance}")

assert paid == Decimal("50.00")
assert card.balance == Decimal("150.00")
assert bus.current_passengers == 1
assert ticket.is_validated
```

```powershell
.\.venv\Scripts\python.exe demo.py
```

```text Ожидаемый вывод · не команда
Карта: списано 50.00, остаток 150.00
Автобус: маршрут 32, пассажиров 1
Билет использован: True
Отказ оплаты: недостаточно средств, баланс 150.00
```

## Шаг 7. Добавьте пять готовых тестов

В папке `tests` создайте `test_domain.py`. Если он уже содержит вашу работу, сначала сохраните её отдельно. Для этого разбора вставьте блок целиком. Все тесты импортируют вашу папку `domain`, а не отдельный эталон.

```python tests/test_domain.py
from datetime import datetime, timedelta, timezone
from decimal import Decimal

import pytest

from domain import (
    Bus, Route, TransitCard, SingleTripTicket,
    InsufficientFundsError, CardBlockedError,
    CapacityExceededError, TicketAlreadyUsedError,
)


def test_card_prevents_negative_balance():
    card = TransitCard("KZ-01", Decimal("50.00"))
    with pytest.raises(InsufficientFundsError):
        card.pay(Decimal("100.00"))
    assert card.balance == Decimal("50.00")


def test_card_blocked_rejects_operations():
    card = TransitCard("KZ-01", Decimal("200.00"))
    card.block("Утеряна")
    for operation in (card.pay, card.top_up):
        with pytest.raises(CardBlockedError):
            operation(Decimal("100.00"))
        assert card.balance == Decimal("200.00")
        assert card.is_blocked


def test_bus_capacity_overflow():
    bus = Bus("123 AB 02", 10)
    bus.board_passengers(9)
    with pytest.raises(CapacityExceededError):
        bus.board_passengers(2)
    assert bus.current_passengers == 9


def test_ticket_double_validation():
    bought = datetime(2026, 1, 15, 10, 0, tzinfo=timezone.utc)
    ticket = SingleTripTicket(Decimal("100.00"), issued_at=bought)
    ticket.validate(Bus("123 AB 02", 40), now=bought)
    with pytest.raises(TicketAlreadyUsedError):
        ticket.validate(
            Bus("456 CD 02", 20),
            now=bought + timedelta(seconds=10),
        )
    assert ticket.is_validated


def test_route_minimum_stops():
    with pytest.raises(ValueError):
        Route("32", ["Вокзал"])
    stops = ["Вокзал", "Парк"]
    route = Route("32", stops)
    stops.clear()
    assert route.stops == ("Вокзал", "Парк")
```

```powershell
.\.venv\Scripts\python.exe -m pytest tests/ -v
```

Ожидается **5 passed**. Эти пять проверок даны в инструкции. Для самостоятельной сдачи нужны собственные сценарии и дополнительные границы из требований.

## Шаг 8. Проверьте полный контракт своей модели

[Скачайте test_reference.py](examples/test_reference.py) и положите его в корень `lab01_transit_domain`, рядом с `demo.py`. Запустите в том же терминале PowerShell:

```powershell
$env:WEEK1_MODEL = 'domain'
.\.venv\Scripts\python.exe -m pytest ./test_reference.py -v -s --import-mode=importlib
Remove-Item Env:WEEK1_MODEL
```

Ожидается **41 passed**. В начале вывода найдите `WEEK1 contract model: domain -> .../lab01_transit_domain/domain/__init__.py`: это подтверждает выбор вашей папки. На macOS/Linux вместо трёх команд используйте `WEEK1_MODEL=domain ./.venv/bin/python -m pytest ./test_reference.py -v -s --import-mode=importlib`.

Теперь у вас работающая учебная модель: четыре класса, демонстрация, пять предоставленных тестов и полная проверка контракта. В `README.md` своими словами объясните защиту остановок, проверку до изменения состояния, Decimal и одноразовость билета. Затем выполните [онлайн-самопроверку](quiz.md). Её балл сохраняется отдельно от лабораторной.

## Если что-то не запускается

| Ошибка | Что проверить |
|---|---|
| `python` не найден | Установите Python 3.12+; если он уже установлен, проверьте `py -3.12 --version` и перезапустите терминал |
| Не найден `starter.py` или `demo.py` | Файл сохранён в указанной папке, имя без `.txt`; терминал открыт в нужной папке |
| Не найдена `.venv` | Выполните `python -m venv .venv` из `lab01_transit_domain` |
| `No module named pytest` | Повторите установку pytest именно через `.venv\Scripts\python.exe` |
| `No module named domain` | Запускайте команды из `lab01_transit_domain`, а не из `domain` или `tests` |
| `attempted relative import` | Запускайте `demo.py` из корня, а не отдельный `domain/card.py` |
| `NotImplementedError` | Один из четырёх файлов ещё содержит starter: замените его полным блоком нужного шага |
| `IndentationError` или `SyntaxError` | Скопируйте блок целиком без названия файла и строк с тройными обратными кавычками; сохраните отступы |
| `FileExistsError` при запуске starter | Папка уже существует: продолжите в ней или выберите новое имя |
| Тест не прошёл | Прочитайте имя упавшего теста, сверьте соответствующий файл и сохраните Ctrl+S, затем повторите запуск |

[Требования, дополнительные границы, рубрика и вопросы защиты](practice.md) остаются рядом с маршрутом. Для самостоятельного решения начните с нового starter и используйте требования без копирования готовых классов.

