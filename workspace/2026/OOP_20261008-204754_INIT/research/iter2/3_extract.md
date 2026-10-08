# Extract — «Что из настройки доказано, а что нужно завершить?»
> Goal: завершить настроенный TFW рабочий след, не выдумывая детали будущего сайта.

## Сравнение требований и текущих свидетельств
| Область | Локальное требование / источник | Текущая опора | Вывод |
|---|---|---|---|
| Настройки проекта | Init Step 2, `/tfw-config`-контракт | `project_config.yaml`, North Star и TRACE | Согласованные ключевые значения есть: ru, OOP, workspace, Codex, no Daily, команды сборки пока пусты. Продуктовые значения сайта вне init. |
| Начальный task-state | Init Step 2 | `workspace/2026/OOP_20261008-204754_INIT/status.md`, journal created; task находится в RES | Присутствует, с owner route, Coordinator route, authority и baseline reporting/selection. Профиль `team/ars.md` явно не является аутентификацией; действующее owner-direct подтверждение/маршрут уже зафиксированы источниками задачи. Не переписывать attribution. |
| Корневые маршруты | Init Step 2, 4 | Root README ведёт к North Star, knowledge, TFW release workflow и `work/001/TRACE.md` | Маршруты перечислены; `work/001/TRACE.md` существует. Отдельной политики `RELEASE.md` нет — локальное правило требует оставить её отсутствующей. |
| Knowledge entry | Init Step 2, 4 | `KNOWLEDGE.md` есть, описывает поиск знаний, пока без инвентаря/квалифицированных записей | Базовый вход уже есть; новые факты не выдумывать. |
| Выбранный адаптер | Init Step 4; `adapters/manifest.yaml` | Согласован Codex; manifest задаёт AGENTS managed block и `.agents/skills/tfw-{command}/SKILL.md`; источники есть для 11 команд | Целевых файлов пока нет: корневой `AGENTS.md` отсутствует и `.agents/skills/` отсутствует. Это реальная конфигурационная работа, не неизвестное сайта. Существующие source SKILL файлы помечены изменёнными — перед копированием Coordinator должен проверить исходную ownership/change classification, затем использовать их как выбранный source, не upstream copy. |
| Core Economics | Init Step 4 | `.tfw/economics/` и workflow/template присутствуют | Базовые файлы найдены; до/после выполнения установки проверить parity и стабильность повторного запуска как требует Init. Rates кеш опционален, сам по себе не блокирует. |
| Release policy, Daily, prefs | Init Step 1/4 | README ссылается на workflow; нет `RELEASE.md`, нет Daily opt-in, нет user prefs | RELEASE оставляют отсутствующим; Daily не ставят; prefs лишь предложить. Ничего из этого не блокирует. |
| Проверки | Init Step 5 | Нет app-specific build/tests, config `build: {}` | Не вводить придуманные команды. Проверять TFW contract: YAML, manifests, точные маршруты/roles, bytes, core parity, idempotence, state, research, RF/review/close. |

## Findings
### E1: неразрешённые продуктовые вопросы не являются Init-входами
Пределы сайта/курса, стек, развёртывание и поведение теста открыты в North Star/TRACE. Init уже фиксирует их как открытые; workflow не требует закрыть их. Это не основание добавлять технические значения в конфиг.

### E2: настроечная база создана, но интеграция выбранного адаптера и lifecycle не завершены
Из наблюдаемого состояния отсутствуют обязательные target paths `AGENTS.md` и `.agents/skills/...`; при этом исходники маршрутов есть. Текущий task lifecycle остаётся `RES`; init workflow требует postcondition `RF`, затем независимый `REVIEW`, знания/эффекты и `DONE`. Исследователь не выполняет эти действия, только возвращает список Coordinator.

### E3: сохранять имеющиеся изменения
`git status --short` показывает многочисленные модифицированные `.tfw/` источники и untracked `.tfw/COURSE-MATERIALS/`; происхождение неизвестно и TRACE отдельно говорит сохранять/classify до связанных операций. Это не мешает безопасному чтению и планированию, но конкретное перезаписывание/копирование из этих source файлов требует классификации и сохранения. Не выполнять checkout/reset.

## Checkpoint
| Найдено | Осталось |
|---|---|
| Функциональный минимум настроек и решений уже зафиксирован; вопросы сайта не нужны для завершения TFW. | Установить адаптерные target файлы после безопасной классификации источников; проверить точные маршруты/конфиги/повторный запуск; получить RF и независимый REVIEW; выполнить применимые knowledge handovers и DONE. |

**Достаточность:**
- [x] External source used? официальный upstream README (сравнительно)
- [x] Briefing gap closed? да, выявлены конкретные оставшиеся init-постусловия
- [x] Сравнение по измерениям Gather выполнено

Этап завершён: YES
→ Решение: checkpoint передан Coordinator; owner-authorized continuation applies, продолжить Challenge.
