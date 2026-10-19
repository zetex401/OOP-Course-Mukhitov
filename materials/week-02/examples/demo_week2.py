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
