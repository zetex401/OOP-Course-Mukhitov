"""Запуск именно копируемых блоков практики второй недели в пустой папке."""

import os
from pathlib import Path
import re
import subprocess
import sys
import tempfile


ROOT = Path(__file__).resolve().parents[1]


def main():
    text = (ROOT / "materials/week-02/walkthrough.md").read_text(encoding="utf-8")
    blocks = re.findall(r"^```(\w+)([^\n]*)\n(.*?)^```", text, re.M | re.S)
    python = [(label.strip(), code) for lang, label, code in blocks if lang == "python"]
    assert [name for name, _ in python] == [
        "solid_demo.py", "payment_methods.py", "demo_week2.py", "tests/test_terminal.py"]
    scratch = Path(tempfile.gettempdir()) / "tfw/OOP_20261018-194835_WEEK2"
    scratch.mkdir(parents=True, exist_ok=True)
    env = dict(os.environ, PYTHONUTF8="1", PYTHONDONTWRITEBYTECODE="1",
               PYTEST_DISABLE_PLUGIN_AUTOLOAD="1")
    with tempfile.TemporaryDirectory(dir=scratch) as directory:
        lab = Path(directory)
        (lab / "tests").mkdir()
        for name, code in python:
            (lab / name).write_text(code, encoding="utf-8")
            assert code.strip() == (ROOT / "materials/week-02/examples" / Path(name).name).read_text(encoding="utf-8").strip()

        def run(*args):
            result = subprocess.run([sys.executable, *args], cwd=lab, env=env,
                                    capture_output=True, text=True, encoding="utf-8")
            assert result.returncode == 0, result.stdout + result.stderr
            return result.stdout

        expected = next(code.strip() for lang, label, code in blocks
                        if lang == "text" and "Ожидаемый вывод" in label)
        assert run("demo_week2.py").strip() == expected
        print("Copied blocks: exact demo output PASS")
        output = run("-m", "pytest", "-p", "no:cacheprovider", "tests", "-q")
        assert "14 passed" in output, output
        print("Copied blocks: 14 provided scenarios PASS")


if __name__ == "__main__":
    main()
