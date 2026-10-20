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
