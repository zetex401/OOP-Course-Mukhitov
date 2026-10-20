# Практика по шагам. SOLID и DI в VS Code

План практики — 60 минут на повторение предоставленного учебного примера; фактический темп и время установки не измерены. Вы получите работающий терминал с новым способом оплаты, затем добавите своё расширение по [самостоятельному заданию](practice.md). Все блоки ниже готовы к копированию; это разбор, а не доказательство самостоятельного решения. Имитация Bluetooth не обращается к устройству или банку.

## Шаг 1. Подготовьте отдельную папку · 0–10 минут

Не меняйте проект первой недели. Откройте новую пустую папку week2_solid в VS Code через «Файл → Открыть папку», затем «Терминал → Создать терминал». Нужен Python 3.12+. На Windows проверьте py -3 --version; при отсутствии Python установите его и откройте терминал заново. На macOS/Linux вместо py -3 используйте python3, а вместо .venv\Scripts\python.exe — .venv/bin/python.

```powershell
py -3 --version
py -3 -m venv .venv
.venv\Scripts\python.exe -m pip install pytest
New-Item -ItemType Directory -Path tests -Force
```

Все следующие команды выполняйте из week2_solid. Активация окружения не требуется. Создавайте файлы с точными именами: не называйте их decimal.py, typing.py или pytest.py. Не вставляйте команды терминала в Python-файл.

## Шаг 2. Скопируйте основу лекции

Создайте solid_demo.py и вставьте **весь** блок. Сохраните файл Ctrl+S.

```python solid_demo.py
"""Предоставленная демонстрация лекции SOLID и DI; Python 3.12+."""

from dataclasses import dataclass
from decimal import Decimal
from typing import Protocol


class CardScannerProtocol(Protocol):
    def scan_card(self) -> str: ...
    def is_ready(self) -> bool: ...


class VisualIndicatorProtocol(Protocol):
    def show_green(self) -> None: ...
    def show_red(self, reason: str) -> None: ...


class AudioBuzzerProtocol(Protocol):
    def beep_success(self) -> None: ...
    def beep_error(self) -> None: ...


class PaymentStrategy(Protocol):
    def process(self, amount: Decimal) -> bool: ...


class FareCalculator(Protocol):
    def compute_fare(self, card_id: str) -> Decimal: ...


class TransactionRepositoryProtocol(Protocol):
    def record_success(self, card_id: str, amount: Decimal) -> None: ...


class PassVerificationProtocol(Protocol):
    def is_valid(self) -> bool: ...


class BalanceChargeableProtocol(Protocol):
    def charge(self, amount: Decimal) -> bool: ...


def checked_amount(amount: Decimal) -> Decimal:
    if not isinstance(amount, Decimal):
        raise TypeError("Нужен Decimal")
    if not amount.is_finite() or amount < 0:
        raise ValueError("Нужна конечная неотрицательная сумма")
    return amount


class StandardTransitCard:
    def __init__(self, balance: Decimal):
        self._balance = checked_amount(balance)

    def is_valid(self) -> bool:
        return True

    def charge(self, amount: Decimal) -> bool:
        checked_amount(amount)
        if amount > self._balance:
            return False
        self._balance -= amount
        return True


class SocialFreePass:
    def is_valid(self) -> bool:
        return True


def can_enter(document: PassVerificationProtocol) -> bool:
    return document.is_valid()


class TransitCardPaymentStrategy:
    def __init__(self, card: BalanceChargeableProtocol):
        self._card = card

    def process(self, amount: Decimal) -> bool:
        return self._card.charge(checked_amount(amount))


class DemoQrPaymentStrategy:
    """Имитирует решение платёжного сервиса без банковского запроса."""

    def __init__(self, accepted: bool):
        self._accepted = accepted

    def process(self, amount: Decimal) -> bool:
        checked_amount(amount)
        return self._accepted


@dataclass(frozen=True)
class DemoScanner:
    card_id: str
    ready: bool = True

    def scan_card(self) -> str:
        return self.card_id

    def is_ready(self) -> bool:
        return self.ready


@dataclass(frozen=True)
class FareService:
    fare: Decimal

    def compute_fare(self, card_id: str) -> Decimal:
        return checked_amount(self.fare)


class InMemoryRepository:
    def __init__(self):
        self.records: list[tuple[str, Decimal]] = []

    def record_success(self, card_id: str, amount: Decimal) -> None:
        self.records.append((card_id, amount))


class DemoIndicator:
    def __init__(self):
        self.messages: list[str] = []

    def show_green(self) -> None:
        self.messages.append("Проход разрешён")

    def show_red(self, reason: str) -> None:
        self.messages.append(reason)


class DemoBuzzer:
    def __init__(self):
        self.success_count = 0
        self.error_count = 0

    def beep_success(self) -> None:
        self.success_count += 1

    def beep_error(self) -> None:
        self.error_count += 1


class TransitTerminal:
    def __init__(self, scanner: CardScannerProtocol, fares: FareCalculator,
                 payment: PaymentStrategy, repository: TransactionRepositoryProtocol,
                 indicator: VisualIndicatorProtocol, buzzer: AudioBuzzerProtocol):
        self._scanner = scanner
        self._fares = fares
        self._payment = payment
        self._repository = repository
        self._indicator = indicator
        self._buzzer = buzzer

    def process_tap(self) -> bool:
        if not self._scanner.is_ready():
            self._indicator.show_red("Сканер не готов")
            self._buzzer.beep_error()
            return False
        card_id = self._scanner.scan_card()
        amount = self._fares.compute_fare(card_id)
        if not self._payment.process(amount):
            self._indicator.show_red("Оплата отклонена")
            self._buzzer.beep_error()
            return False
        self._repository.record_success(card_id, amount)
        self._indicator.show_green()
        self._buzzer.beep_success()
        return True


def bootstrap(payment: PaymentStrategy, repository: TransactionRepositoryProtocol,
              buzzer: AudioBuzzerProtocol) -> TransitTerminal:
    return TransitTerminal(DemoScanner("CARD-001"), FareService(Decimal("100.00")),
                           payment, repository, DemoIndicator(), buzzer)


def main() -> None:
    repository = InMemoryRepository()
    buzzer = DemoBuzzer()
    card = StandardTransitCard(Decimal("250.00"))
    print("Карта:", bootstrap(TransitCardPaymentStrategy(card), repository, buzzer).process_tap())
    print("QR:", bootstrap(DemoQrPaymentStrategy(True), repository, buzzer).process_tap())
    print("Отказ:", bootstrap(DemoQrPaymentStrategy(False), repository, buzzer).process_tap())
    print("Транзакций:", len(repository.records))
    print("Успешных сигналов:", buzzer.success_count)
    print("Сигналов отказа:", buzzer.error_count)
    print("Право на проезд:", [can_enter(card), can_enter(SocialFreePass())])


if __name__ == "__main__":
    main()
```

Основа совпадает с полным примером лекции. Найдите шесть зависимостей TransitTerminal: сканер, тариф, оплата, хранилище, индикатор и звук. Он согласует сценарий, но не реализует устройство каждой зависимости.

## Шаг 3. Добавьте новый способ оплаты

Создайте payment_methods.py и вставьте **весь** блок. Сохраните файл Ctrl+S.

```python payment_methods.py
"""Предоставленный учебный способ оплаты без банковского запроса."""

from decimal import Decimal
from solid_demo import checked_amount


class DemoBluetoothPayment:
    def __init__(self, connected: bool, approved: bool):
        self._connected = connected
        self._approved = approved

    def process(self, amount: Decimal) -> bool:
        checked_amount(amount)
        return self._connected and self._approved
```

У нового класса есть process(amount), возвращающий bool. Явное наследование от Protocol не требуется. Контракт тот же: конечный неотрицательный Decimal; False означает отказ. TransitTerminal не меняем.

## Шаг 4. Соберите зависимости

Создайте demo_week2.py и вставьте **весь** блок. Сохраните файл Ctrl+S.

```python demo_week2.py
"""Сборка терминала с новым способом оплаты; все устройства имитируются."""

from decimal import Decimal
from payment_methods import DemoBluetoothPayment
from solid_demo import (
    DemoScanner, FareService, InMemoryRepository, DemoIndicator,
    DemoBuzzer, TransitTerminal,
)


def run(approved: bool) -> None:
    repository = InMemoryRepository()
    indicator = DemoIndicator()
    buzzer = DemoBuzzer()
    terminal = TransitTerminal(
        DemoScanner("BT-001"), FareService(Decimal("100.00")),
        DemoBluetoothPayment(connected=True, approved=approved),
        repository, indicator, buzzer,
    )
    print("Проход:", terminal.process_tap())
    print("Транзакции:", repository.records)
    print("Экран:", indicator.messages)
    print("Звук:", buzzer.success_count, buzzer.error_count)


if __name__ == "__main__":
    run(True)
    run(False)
```

Это точка сборки: конкретный DemoBluetoothPayment передаётся в тот же терминал. Первый запуск разрешает оплату, второй отклоняет; каждый использует отдельные пустые хранилище и счётчики.

## Шаг 5. Добавьте предоставленные тесты

Создайте tests/test_terminal.py и вставьте **весь** блок. Сохраните файл Ctrl+S.

```python tests/test_terminal.py
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
```

## Шаг 6. Запустите демонстрацию и тесты · до 55-й минуты

Проверьте структуру: solid_demo.py, payment_methods.py и demo_week2.py находятся рядом, тест — внутри tests. Используйте интерпретатор именно созданного окружения:

```powershell
.venv\Scripts\python.exe demo_week2.py
.venv\Scripts\python.exe -m pytest tests -q
```

```text Ожидаемый вывод демонстрации
Проход: True
Транзакции: [('BT-001', Decimal('100.00'))]
Экран: ['Проход разрешён']
Звук: 1 0
Проход: False
Транзакции: []
Экран: ['Оплата отклонена']
Звук: 0 1
```

Ожидаемый итог тестов: **14 passed**; время запуска может отличаться. Параметризация создаёт несколько случаев из одной функции. Проверяются карта, QR, Bluetooth, отказ, неготовое устройство, точная сумма и недопустимые суммы. Тесты предоставлены: после их запуска ещё нужно выполнить собственное расширение.

Если ModuleNotFoundError — проверьте имена файлов и текущую папку терминала. Если No module named pytest — повторите установку через тот же .venv\Scripts\python.exe. Если assert не прошёл — прочитайте ожидаемое и фактическое значение, не удаляйте проверку ради зелёного отчёта.

## Шаг 7. Объясните результат · 55–60 минут

Проследите цепочку process_tap → scan_card → compute_fare → process → record_success. При неготовом сканере цепочка обрывается до чтения; при отказе оплаты — до записи успеха. Найдите проверки этих побочных эффектов в тестах.

Покажите связь принципов: SRP разделяет обязанности; OCP позволяет подключить Bluetooth; LSP требует прежнего смысла bool; ISP разделяет сканер, экран и звук; DIP задаёт зависимость от контрактов, DI передаёт конкретные объекты извне. Ни DI, ни Protocol не обеспечивают автоматического отката оплаты при ошибке хранилища.

## Шаг 8. Выполните своё расширение и самопроверку

Откройте [самостоятельное задание и рубрику](practice.md): StudentFareService, три собственных теста, README и защита. На самостоятельный блок отведено ещё 60 минут, включая [самопроверку 0–20](quiz.md), разбор и сохранение результата. Это план нагрузки, а не измеренное время прохождения.

Можно скачать готовые файлы: [основа](examples/solid_demo.py), [Bluetooth](examples/payment_methods.py), [демонстрация](examples/demo_week2.py), [предоставленные тесты](examples/test_terminal.py). Последний файл разместите в tests/test_terminal.py. Скачивание готового кода не заменяет самостоятельное расширение.
