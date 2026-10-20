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
