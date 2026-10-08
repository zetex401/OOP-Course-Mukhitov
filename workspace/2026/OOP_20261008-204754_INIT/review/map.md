# Map — OOP_20261008-204754_INIT

> RF: `workspace/2026/OOP_20261008-204754_INIT/RF__OOP_20261008-204754_INIT.md`
> TS: N/A — это Full Init, а не реализация приложения; критерии результата находятся в RF §3.
> Reviewer unit: `codex:thread:local:01a11c56-112e-7a61-ab8f-09d6d64a663a`
> Parent Coordinator: `codex:thread:local:01a11c19-1d6a-72b3-8b7f-c28da8ff3829`
> Activation: delegated `/tfw-review OOP_20261008-204754_INIT`; повторно выдан Coordinator после диагностики authority-копии.
> Coordination authority: `../../../.tfw/README.md @ sha256:21383c97193ee9b3176464538097eb5525efb30605bed9af2228b1f8ef0d842d`.
> В Reviewer checkout файл имеет CRLF и SHA-256 `CFDFCF80E33B998FD2B4B92873E2460615C1B76F2FEA357E9FED71E5E8535BC1`; основная копия имеет LF и заявленный SHA-256. После нормализации окончаний строк содержимое совпадает побайтно, SHA-256 `21383c97193ee9b3176464538097eb5525efb30605bed9af2228b1f8ef0d842d`.

## Понимание

RF заявляет о настройке TFW для небольшого учебного Python-сайта по основам ООП: создана North Star и проектная конфигурация, сохранены знания и две исследовательские итерации, настроен Codex-адаптер и зафиксированы ограничения. Приложение не реализовывалось, поэтому TS, HL и ONB для этой задачи отсутствуют по заявленному объёму. Результат оценивается по цели из `status.md`, North Star и конкретным критериям Full Init в RF §3.

## Принятые утверждения и границы

| ID | Слой | Принятое утверждение / граница полномочий | Риск или конкретный вред | Затронутое поведение / зависимости | Релевантная среда | Эталон / полномочие | Идентичность свидетельства (`subject@revision`, источник) | Обязательно? |
|---|---|---|---|---|---|---|---|---|
| C1 | VALUE | TFW-цель и границы проекта отражают подтверждённое назначение сайта и оставляют детали курса открытыми. | Искажение цели может направить будущую работу на неверный продукт или приписать владельцу неутверждённые решения. | `.tfw/README.md`, task goal/value, `work/001/TRACE.md`, RF §§1–2. | Текущий локальный проектный checkout. | Project North Star и owner decisions в TRACE; статус задаёт цель и ценность поручения. | `README@21383c…` основной LF-файл; Reviewer CRLF-копия нормализуется к тому же содержимому; RF@uncommitted; TRACE@working tree. | yes |
| C2 | ASSURANCE | Project config содержит выбранные владельцем значения, согласуется с TFW version и не придумывает app-команды или стек. | Неверные defaults либо преждевременная технологическая фиксация ограничат последующую разработку. | `.tfw/project_config.yaml`, `.tfw/VERSION`, configuration template, owner decisions. | Файловая установка; парсер YAML не заявлен доступным. | Фактические значения, шаблон конфигурации, RF §3 и EV E2/E8. | `project_config.yaml@untracked`; `VERSION@3.9.0`; EV E2/E8. | yes |
| C3 | TRACE / ASSURANCE | Task state и journal отражают маршрут, две завершённые итерации исследования и их неизменённые возвраты. | Неполная или противоречивая история подорвёт продолжение и проверяемость. | `status.md`, journal, `iterations.yaml`, `research/iter1–2/RES.md`. | Task-local trace. | Task control conventions, research task artifacts, RF §3 и EV E3. | `status@RF`; journal events `created` и `RES→RF`; research files@untracked. | yes |
| C4 | ASSURANCE | Выбранный Codex adapter содержит 11 маршрутов, соответствующих manifest/source, и повторная установка не меняет равные файлы. | Ошибочный маршрут может активировать не ту процедуру либо оставить команды несогласованными. | Root `AGENTS.md`, `.agents/skills/tfw-*`, `.tfw/adapters/manifest.yaml`, canonical workflows. | Codex repository adapter. | Adapter manifest/source bytes and routing entries; RF §3, EV E4/E5. | Current source/installed files@working tree; hashes and counts to be checked independently. | yes |
| C5 | ASSURANCE | KNOWLEDGE и TRACE сохраняют источники, решения и неопределённости без утверждений о содержимом недоступных материалов. | Неподтверждённые выводы могли бы стать ложными знаниями о курсе или приложении. | `KNOWLEDGE.md`, `work/001/TRACE.md`, RES outputs, course PDFs and remote repository limits. | Local source snapshot; external sources unavailable in the recorded run. | Actual task traces and cited source evidence; project values PV. | `KNOWLEDGE.md@untracked`; `TRACE.md@untracked`; iter1/2 RES@untracked. | yes |
| C6 | TRACE | Existing local changes and course materials are retained; root README remains unchanged; previous TFW text is preserved. | Accidental data loss or overwriting unrelated work would harm project continuity. | Git worktree changes, root README, update receipt archive, course materials. | Shared repository with substantial pre-existing/unattributed edits. | Git status/object hashes and archived copy checksums; RF §1 and EV E6. | `HEAD=b95657a…`; task files@untracked; source changes pre-existed; exact boundary to inspect. | yes |
| C7 | TRACE / ASSURANCE | Economics files and adapter/config evidence support the stated validation claims; task resource completeness remains bounded. | False validation or misattributed resource facts could mislead the next Coordinator. | Task economics role JSONL and helper; RF §§1, 4–5; EV E3/E7. | Local task artifacts and documented source limits. | Economics schema/helper validation, exact returned bytes and identity fields. | Researcher r1/r2 JSONL@task-local; Reviewer own source capture is separate. | selected |
| C8 | VALUE / TRACE | No app code, app tests, release procedure, or runtime activation is claimed; deferred items stay deferred. | Treating deferred capability as verified could create unsafe reliance on untested behavior. | Repository app files, build config, RF §§4–6, EV E8/E9. | Current local checkout; future Codex activation environment not exercised. | Actual file inventory, task scope, RF/EV evidence; North Star boundaries. | `EV@untracked`, current checkout; runtime smoke run explicitly deferred. | yes |
| C9 | TRACE | Task route, owner authority, and Reviewer independence are valid for this review return. | Invalid authority or identity could make the review unauthorized or refer to the wrong result. | `status.md`, journal, RF producer/parent fields, current native Reviewer unit and Coordinator route. | Current Codex task plus primary/local worktrees. | Exact task status, journal, immutable coordination authority, addressed native dispatch and title readback. | `status@RF`; Reviewer unit `01a11c56-112e-7a61-ab8f-09d6d64a663a`; parent `01a11c19-1d6a-72b3-8b7f-c28da8ff3829`; normalized authority match recorded above. | yes |

## Соответствие TS ↔ RF

| Требование TS | Утверждение RF | ID утверждений | Соответствует? |
|---|---|---|---|
| N/A — TS для Full Init не создаётся | RF §3, критерии завершения TFW Init | C1–C9 | Проверить по task goal/value, North Star, RF, EV и актуальным файлам; критерии RF не считаются независимым доказательством. |

## Выбор проверок

| ID утверждений | Запланированная проверка или повторно используемое свидетельство | Почему такая глубина проверки | Известный пробел или ограничение |
|---|---|---|---|
| C1 | Сверить North Star, цель/value status, TRACE и RES-синтез; оценить соответствие границ и отсутствие неподтверждённых решений. | Это ценностный контракт будущего проекта и основа продолжения. | Полный курс и remote GitHub содержимое не проверялись; оцениваются только утверждённые локальные сведения. |
| C2 | Прочитать выбранные config fields, версию и соответствующие шаблоны; сверить с решениями и RF. | Ошибки конфигурации распространятся на будущие поручения. | Отсутствие установленного YAML parser само по себе не является дефектом, если структуры и значения достоверно проверяемы. |
| C3 | Сверить полный status/journal, iterations manifest и обязательные stage/RES-файлы; проверить валидность представленных economics возвратов. | Task lifecycle и исследовательский минимум обязательны для INIT. | Проверяется только существующая task-local история; transcript не используется. |
| C4 | Сравнить манифест, source skills и установленные targets точными хешами; пересчитать маршруты/число и проверить ссылки на канонические workflows. | Routing/installation claim относится к действующим командам TFW. | Runtime activation не заявлена и остаётся отдельным DEFERRED пунктом. |
| C5 | Сверить KNOWLEDGE/TRACE/RES ссылки, ограничения и semantic claims с реально присутствующими источниками. | Неподтверждённые знания могут распространяться в дальнейшие решения. | Учебные PDF не открываются, удалённый репозиторий ранее недоступен; выводы об их содержимом исключены. |
| C6 | Снять полный Git status/cached names read-only; проверить root README против HEAD, receipt checksum и изменения границ. | Есть многочисленные локальные изменения неизвестного происхождения; сохранность обязательна. | Некоторые файлы сосуществовали до INIT, точное происхождение не установлено; staging/commit не выполнять без оснований. |
| C7 | Прочитать возвраты Researcher и выполнить указанную в EV стандартную валидацию JSONL; Reviewer resource capture — в своём точном источнике, не в чужой статистике. | Подтвердить конкретные утверждения об economics, не делая из них продуктовую гарантию. | Свой Codex source/range должен быть привязан к фактическому native source; никакие чужие ролики/контекст не подменяют его. |
| C8 | Сверить наличие кода, build config и runtime evidence table; проверить корректную маркировку N/A/DEFERRED. | Ограничения и честность выполнения — часть принятого результата. | Не запускать несвязанные app lint/tests; приложение отсутствует и команды не настроены. |
| C9 | Проверить status/journal lineage, точный immutable authority в primary checkout, текущий Reviewer thread address/title и parent route. | Полномочие, принятый subject и независимость обязательны независимо от обычной выборки. | В Reviewer copy различаются только CRLF/LF; Coordinator повторно активировал review после подтверждения нормализованного совпадения. |

## Отклонения от TS

Нет TS. Отклонения определяются относительно task goal/value, North Star и критериев RF §3; наличие или отсутствие формального TS не является отклонением для TFW Full Init.

## Checkpoint

**Самопроверка:**
- [x] Прочитаны RF §§1–5; TS и HL отсутствуют по объёму Full Init; цель и принципы взяты из task status и Project North Star; ONB и предшественники не заявлены.
- [x] Нанесены существенные утверждения и обязательные границы безопасности, полномочий и идентичности результата.
- [x] Каждое утверждение связано с поведением/зависимостями, средой, эталоном/полномочием и идентичностью свидетельства.
- [x] Зафиксированы проверки и известные пробелы/ограничения.
- [x] Классификация основана на риске и цели, а не на именах, числах или объёме файлов.

Этап завершён: YES
