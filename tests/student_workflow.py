"""Exercise scaffold, independent example completion, own tests and selected-model oracle.

Run with Python plus pytest. All generated student files and raw output live in
system Temp/tfw/OOP_20261015-170833_WEEK1 and are removed by TemporaryDirectory.
The completion below is a test fixture, not a claim about a student's pace.
"""
import ast
import os
from pathlib import Path
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]
STARTER = ROOT / "materials/week-01/examples/starter.py"
CONTRACT = ROOT / "materials/week-01/examples/test_reference.py"

BODIES = {
    "Route.__init__": '''
number = _text(route_number, "Маршрут")
fare = _money(base_fare, "Тариф")
if fare <= 0:
    raise ValueError("Тариф положительный")
if not isinstance(stops, list):
    raise TypeError("Нужен список")
values = tuple(_text(x, "Остановка") for x in stops)
if len(values) < 2 or any(values[i] == values[i-1] for i in range(1, len(values))):
    raise ValueError("Проверьте остановки")
self._data = dict(route_number=number, base_fare=fare, stops=values)
''',
    "Bus.__init__": '''
plate = " ".join(_text(plate_number, "Номер").split())
size = _count(capacity)
if size < 10 or size > 250:
    raise ValueError("Вместимость")
self._data = dict(plate_number=plate, capacity=size, current_passengers=0, route=None)
''',
    "Bus.assign_route": '''
if not isinstance(route, Route):
    raise TypeError("Нужен Route")
self._data["route"] = route
''',
    "Bus.remove_route": 'self._data["route"] = None',
    "Bus.board_passengers": '''
n = _count(count)
if self.current_passengers + n > self.capacity:
    raise CapacityExceededError()
self._data["current_passengers"] += n
''',
    "Bus.leave_passengers": '''
n = _count(count)
if n > self.current_passengers:
    raise ValueError("Слишком много")
self._data["current_passengers"] -= n
''',
    "TransitCard.__init__": '''
identity = _text(card_id, "ID")
balance = _money(initial_balance, "Баланс")
discount = _decimal(discount_rate, "Скидка")
if not 0 <= discount <= 1:
    raise ValueError("Скидка")
self._data = dict(card_id=identity, balance=balance, discount_rate=discount,
                  is_blocked=False, block_reason="")
''',
    "TransitCard.block": '''
text = _text(reason, "Причина")
self._data.update(is_blocked=True, block_reason=text)
''',
    "TransitCard.unblock": 'self._data.update(is_blocked=False, block_reason="")',
    "TransitCard.top_up": '''
if self.is_blocked:
    raise CardBlockedError()
value = _money(amount, "Пополнение")
if value < Decimal("100.00"):
    raise ValueError("Минимум100")
self._data["balance"] += value
''',
    "TransitCard.pay": '''
if self.is_blocked:
    raise CardBlockedError()
base = _money(fare, "Тариф")
if base <= 0:
    raise ValueError("Тариф")
value = (base * (1 - self.discount_rate)).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
if value > self.balance:
    raise InsufficientFundsError()
self._data["balance"] -= value
return value
''',
    "SingleTripTicket.__init__": '''
value = _money(price, "Цена")
if value <= 0:
    raise ValueError("Цена")
time = _aware_time(issued_at if issued_at is not None else datetime.now(timezone.utc))
self._data = dict(ticket_code=uuid4(), price=value, issued_at=time, is_validated=False)
''',
    "SingleTripTicket.validate": '''
if not isinstance(bus, Bus):
    raise TypeError("Нужен Bus")
if self.is_validated:
    raise TicketAlreadyUsedError()
time = _aware_time(now if now is not None else datetime.now(timezone.utc))
seconds = (time - self.issued_at).total_seconds()
if seconds < 0:
    raise ValueError("До покупки")
if seconds >= 3600:
    raise TicketExpiredError()
self._data["is_validated"] = True
''',
}

OWN_TESTS = '''
from datetime import datetime, timezone, timedelta
from decimal import Decimal as D
import pytest
from domain import (Route, Bus, TransitCard, SingleTripTicket, InsufficientFundsError,
                    CardBlockedError, CapacityExceededError, TicketAlreadyUsedError)

def test_card_prevents_negative_balance():
    card = TransitCard("mine", D("20.00"))
    with pytest.raises(InsufficientFundsError): card.pay(D("30.00"))
    assert card.balance == D("20.00")

def test_card_blocked_rejects_operations():
    card = TransitCard("mine", D("250.00"))
    card.block("loss")
    for operation in (card.pay, card.top_up):
        with pytest.raises(CardBlockedError): operation(D("100.00"))
        assert card.balance == D("250.00")

def test_bus_capacity_overflow():
    bus = Bus("101 AB 01", 12)
    bus.board_passengers(11)
    with pytest.raises(CapacityExceededError): bus.board_passengers(2)
    assert bus.current_passengers == 11

def test_ticket_double_validation():
    time = datetime(2026, 1, 1, tzinfo=timezone.utc)
    ticket = SingleTripTicket(D("100.00"), time)
    ticket.validate(Bus("101 AB 01", 12), now=time)
    with pytest.raises(TicketAlreadyUsedError):
        ticket.validate(Bus("202 CD 02", 20), now=time + timedelta(seconds=10))
    assert ticket.is_validated

def test_route_minimum_stops():
    with pytest.raises(ValueError): Route("21", ["A"])
    stops = ["A", "B"]
    route = Route("21", stops)
    stops.clear()
    assert route.stops == ("A", "B")
'''


def main():
    base = Path(tempfile.gettempdir()) / "tfw/OOP_20261015-170833_WEEK1"
    base.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="student-", dir=base) as folder:
        scratch = Path(folder)
        student = scratch / "lab01_transit_domain"
        env = dict(os.environ, PYTHONDONTWRITEBYTECODE="1")
        env.pop("WEEK1_MODEL", None)

        def run(label, args, cwd, expect=0, model=None):
            selected = dict(env)
            if model is not None:
                selected["WEEK1_MODEL"] = model
            result = subprocess.run([sys.executable, "-X", "utf8", *args], cwd=cwd,
                                    env=selected, capture_output=True, text=True, encoding="utf-8")
            (scratch / (label + ".log")).write_text(result.stdout + result.stderr, encoding="utf-8")
            if expect == 0:
                assert result.returncode == 0, (label, result.stdout, result.stderr)
            else:
                assert result.returncode != 0, label
            return result.stdout + result.stderr

        run("create", [str(STARTER), str(student)], scratch)
        run("readiness", ["-c", '''
from decimal import Decimal
def nonnegative(value):
    if value < 0:
        raise ValueError("Отрицательное")
    return value
assert nonnegative(1) == 1
try: nonnegative(-1)
except ValueError: pass
else: raise AssertionError("Expected rejection")
items = ["A", "B"]; alias = items; alias.clear(); assert items == []
assert 0.1 + 0.2 != 0.3
assert Decimal("0.1") + Decimal("0.2") == Decimal("0.3")
'''], student)
        for file in student.rglob("*.py"):
            ast.parse(file.read_text(encoding="utf-8"))
        run("scaffold-unfinished", ["-c", "from domain import Route; Route('32',['A','B'])"], student, expect=1)
        marker = student / "keep.txt"
        marker.write_text("existing work", encoding="utf-8")
        run("no-overwrite", [str(STARTER), str(student)], scratch, expect=1)
        assert marker.read_text(encoding="utf-8") == "existing work"
        print("Starter: valid syntax/imports; unfinished logic explicit; existing work preserved")

        for path in (student / "domain").glob("*.py"):
            tree = ast.parse(path.read_text(encoding="utf-8"))
            for cls in (node for node in tree.body if isinstance(node, ast.ClassDef)):
                for method in (node for node in cls.body if isinstance(node, ast.FunctionDef)):
                    doc = ast.get_docstring(method)
                    key = cls.name + "." + method.name
                    if method.decorator_list:
                        body = f'return self._data["{method.name}"]'
                    else:
                        body = BODIES[key]
                    method.body = ([ast.Expr(value=ast.Constant(value=doc))] if doc else []) + ast.parse(body).body
            path.write_text(ast.unparse(ast.fix_missing_locations(tree)) + "\n", encoding="utf-8")
        (student / "tests/test_domain.py").write_text(OWN_TESTS, encoding="utf-8")
        output = run("own-five", ["-m", "pytest", "-p", "no:cacheprovider", "tests/", "-q"], student)
        assert "5 passed" in output
        output = run("contract-domain", ["-m", "pytest", "-p", "no:cacheprovider", str(CONTRACT),
                                         "-q", "-s", "--import-mode=importlib"], student, model="domain")
        assert str(student / "domain/__init__.py") in output
        assert "41 passed" in output
        print("Independent completed domain: own5 PASS; selected-model full contract41 PASS; exact student path observed")
        demo = '''from domain import *
from decimal import Decimal as D
route=Route("21",["A","B"]); bus=Bus("101 AB 01",12); bus.assign_route(route)
card=TransitCard("mine",D("120.00"),D("0.5")); assert card.pay(route.base_fare)==D("50.00")
bus.board_passengers(1); ticket=SingleTripTicket(D("100.00")); ticket.validate(bus)
try: card.pay(D("200.00"))
except InsufficientFundsError: pass
else: raise AssertionError("Expected rejection")
assert card.balance==D("70.00") and ticket.is_validated and bus.current_passengers==1
print("paid50/balance70/passengers1/ticketTrue; rejection preserved70")'''
        output = run("demo", ["-c", demo], student)
        print("Student demo:", output.strip())
        report = '''# Демонстрационная лабораторная Avtobys

Дано: сигнатуры, импорты и пять валидаторов C16-V. Переходы и свойства
реализованы отдельно для этого агентского прогона; состояние хранится в _data.
Route копирует остановки в tuple, требует минимум две без соседнего повтора.
Bus сохраняет 0 <= passengers <= capacity; изменения после проверок.
Card хранит конечные деньги и долю скидки, block запрещает обе операции.
Ticket одноразовый в любом Bus, срок меньше3600секунд, отказ не меняет статус.

Фактически: python -m pytest tests/ -q —5 passed;
WEEK1_MODEL=domain python -m pytest test_reference.py --import-mode=importlib
—41 passed, импортирован этот domain/__init__.py. Предоставленный набор
не выдан за пять самостоятельно написанных сценариев.
Демонстрация: списано50, баланс70, пассажиров1, билетTrue; отказ оплаты200
сохранил70. Ошибка ожидается до изменения, исключение не делает rollback.

Защита:
1. Float0.1+0.2 не равно0.3; Decimal из строки сохраняет десятичный ввод.
   Для оплаты явно задан ROUND_HALF_UP до0.01.
2. Property без setter запрещает публичное присваивание; _data не механизм
   безопасности против намеренного доступа. Tuple защищает коллекцию.
3. Прямой отрицательный current_passengers нарушил бы инвариант и сведения
   о свободных местах. Посадка/высадка принадлежат Bus.
4. InsufficientFundsError отличает нехватку от блокировки; False не назвал бы
   причину. После исключения отдельно проверяется прежний баланс.

Основания ручной рубрики: Route/Bus5, Card/Ticket7, тесты5, защита3.
Это проверяемые пункты демонстрации, не выставленная студенту оценка.
Реального напарника/студенческого наблюдения и замера темпа здесь нет.
'''
        (student / "README.md").write_text(report, encoding="utf-8")
        assert all(word in (student / "README.md").read_text(encoding="utf-8")
                   for word in ("Decimal", "Property", "current_passengers", "InsufficientFundsError"))
        print("Readiness exercises executed; completed README records invariants, actual commands and all4 defense explanations")
        output = run("missing-target", ["-m", "pytest", "-p", "no:cacheprovider", str(CONTRACT),
                                        "-q", "--import-mode=importlib"], student, expect=1, model="missing_student_model")
        assert "missing_student_model" in output
        buspath = student / "domain/bus.py"
        tree = ast.parse(buspath.read_text(encoding="utf-8"))
        cls = next(node for node in tree.body if isinstance(node, ast.ClassDef))
        method = next(node for node in cls.body if isinstance(node, ast.FunctionDef) and node.name == "board_passengers")
        method.body = ast.parse('''n = _count(count)
self._data["current_passengers"] += n
if self.current_passengers > self.capacity:
    raise CapacityExceededError()
''').body
        buspath.write_text(ast.unparse(ast.fix_missing_locations(tree)), encoding="utf-8")
        output = run("mutant", ["-m", "pytest", "-p", "no:cacheprovider", str(CONTRACT), "-q",
                                "--import-mode=importlib"], student, expect=1, model="domain")
        assert "test_bus_capacity_overflow" in output
        print("Isolation oracle: missing target fails; mutate-before-raise student defect detected; no reference fallback")
    print("Student temporary files/logs removed; no real student observation or timing claimed")


if __name__ == "__main__":
    main()
