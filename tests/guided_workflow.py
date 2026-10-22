"""Проверить результат копирования Python-блоков инструкции в новую папку."""

import ast
import os
from pathlib import Path
import re
import subprocess
import sys
import tempfile


ROOT = Path(__file__).resolve().parents[1]
GUIDE = ROOT / "materials/week-01/walkthrough.md"
EXAMPLES = ROOT / "materials/week-01/examples"


def main():
    text = GUIDE.read_text(encoding="utf-8")
    blocks = re.findall(r"^```(\w+)([^\n]*)\n(.*?)^```", text, re.M | re.S)
    expected_files = [
        "domain/route.py", "domain/bus.py", "domain/card.py",
        "domain/ticket.py", "demo.py", "tests/test_domain.py",
    ]
    python_blocks = [(label.strip(), code) for lang, label, code in blocks if lang == "python"]
    assert [name for name, _ in python_blocks] == expected_files
    assert re.findall(r"^## Шаг (\d+)\.", text, re.M) == [str(n) for n in range(1, 9)]
    scratch_root = Path(tempfile.gettempdir()) / "tfw/20261018-181727_guided-practice"
    scratch_root.mkdir(parents=True, exist_ok=True)
    env = dict(os.environ, PYTHONDONTWRITEBYTECODE="1", PYTHONUTF8="1",
               PYTEST_DISABLE_PLUGIN_AUTOLOAD="1")
    env.pop("WEEK1_MODEL", None)
    with tempfile.TemporaryDirectory(prefix="walkthrough-", dir=scratch_root) as folder:
        parent = Path(folder)
        lab = parent / "lab01_transit_domain"

        def run(args, cwd=lab, model=None):
            selected = dict(env)
            if model is not None:
                selected["WEEK1_MODEL"] = model
            result = subprocess.run([sys.executable, *args], cwd=cwd, env=selected,
                                    capture_output=True, text=True, encoding="utf-8")
            assert result.returncode == 0, result.stdout + result.stderr
            return result.stdout

        run([str(EXAMPLES / "starter.py"), str(lab)], cwd=parent)
        for filename, code in python_blocks:
            ast.parse(code, filename=filename)
            target = lab / filename
            target.write_text(code, encoding="utf-8")
            if filename.startswith("domain/"):
                for module in (lab / "domain").glob("*.py"):
                    ast.parse(module.read_text(encoding="utf-8"), filename=str(module))
        assert "NotImplementedError" not in "".join(
            (lab / filename).read_text(encoding="utf-8") for filename in expected_files
        )
        expected_output = next(code.strip() for lang, label, code in blocks
                               if lang == "text" and "Ожидаемый вывод" in label)
        assert run(["demo.py"]).strip() == expected_output
        print("Copied guide: 4 classes and exact demo output PASS")
        output = run(["-m", "pytest", "-p", "no:cacheprovider", "tests/", "-q"])
        assert "5 passed" in output, output
        print("Copied guide: 5 provided tests PASS")
        (lab / "test_reference.py").write_bytes((EXAMPLES / "test_reference.py").read_bytes())
        output = run(["-m", "pytest", "-p", "no:cacheprovider", "./test_reference.py",
                      "-q", "-s", "--import-mode=importlib"], model="domain")
        assert "41 passed" in output, output
        assert str(lab / "domain/__init__.py") in output, output
        print("Copied guide: full contract 41 PASS against exact generated domain")
    print("Temporary lab removed; no real student timing claimed")


if __name__ == "__main__":
    main()
