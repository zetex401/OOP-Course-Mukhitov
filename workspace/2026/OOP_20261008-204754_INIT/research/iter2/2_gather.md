# Gather — «Какие предпосылки Init уже подтверждены?»
> Goal: завершить настроенный TFW рабочий след, не выдумывая детали будущего сайта.

## Dimensions
Измерений продуктового выбора нет; сравниваю состояние Init по трём классам: подтверждено, ещё требуется выполнить/проверить, намеренно отложено.

## Findings

### G1: Подтверждённые решения и опорные артефакты
Локальные `.tfw/README.md` и `work/001/TRACE.md` содержат согласованную North Star: небольшой сайт на Python по основам ООП для владельца и одногруппников, тест; русский язык TFW; prefix `OOP`; Codex; контейнер `workspace`; первая задача INIT; build/test-команды отложены до появления кода; Daily выключен. `.tfw/project_config.yaml` сейчас задаёт эти/связанные значения (включая `build: {}`, `task_containers: [workspace]`, `min_iterations: 2`, `default_mode: focused`). `workspace/2026/OOP_20261008-204754_INIT/status.md` и `journal/` создают маршрутизированный task-state в RES. `team/ars.md` — профиль атрибуции; сам файл прямо уточняет, что это не аутентификация.

### G2: Проверяемые остатки по workflow Init
`AGENTS.md` в корне отсутствует, хотя Step 4.1 требует добавить managed TFW block. `.agents/skills/` отсутствует, значит выбранные команды Codex ещё не установлены по манифесту. При этом `KNOWLEDGE.md` уже существует и выглядит как чистая проектная точка входа, `.tfw/economics/` содержит README/схему/скрипт/ставки, а `.tfw/workflows/economics.md` и шаблон на месте. `README.md` уже маршрутизирует к North Star, знаниям, release workflow и task trace; отдельного `RELEASE.md` намеренно нет, это соответствует правилу Init не создавать его без проектной политики. `.user_preferences.md` нет: workflow называет этот пункт предложением, не обязательным условием.

### G3: Сравнительный внешний источник
Официальная страница upstream TFW описывает Full как полный lifecycle с формальными research/evidence/review/knowledge gates. Это подтверждает смысл проверок, но не доказывает состояние данного checkout и не заменяет локальный закреплённый Init workflow: https://github.com/saubakirov/trace-first-starter (проверено 2026-10-08). Точный upstream `init.md` не удалось загрузить; дальнейшие критерии взяты из локального `.tfw/workflows/init.md`.

## Checkpoint
| Найдено | Осталось |
|---|---|
| Важные настройки, цель и границы согласованы/записаны; task routing и trace существуют. Независимые неизвестные сайта не нужны для настройки TFW. | Установить и проверить обязательные корневой managed `AGENTS.md` и выбранные Codex command skills; выполнить итоговую верификацию, RF, независимый review и закрывающие эффекты по workflow. Сохранить и перед применением классифицировать изменённое `.tfw/` и `COURSE-MATERIALS`, если операции их затрагивают. |

**Достаточность:**
- [x] External source used — официальный upstream README, только как сравнительный контекст
- [x] Briefing gap closed — найден конкретный init остаток
- [x] Dimensions identified — матрица статуса из 3 классов вместо конфигурационного пространства

Этап завершён: YES
→ Решение: checkpoint передан Coordinator; owner-authorized continuation applies, продолжить Extract.
