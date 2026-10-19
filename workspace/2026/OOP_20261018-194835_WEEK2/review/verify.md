# Verify — WEEK2

Producer/route/activation: [Map](map.md), independent Reviewer `01a153a6-2d91-7260-8d8b-26a656ea95c7`. Проверено 2026-10-19. Субъект всех V1–V8: **WEEK2 @ de84002ba4ff63a1bf24e2d5a696fd92677792bc**, извлечённый `git archive` в собственный system temp; RF/EV — возвращённые артефакты @ `952a73ee75e43530646e33e6738695e48d6631a1`. Чужой worktree/транскрипт не использован. Product files Reviewer не менял.

## Selection Argument

| Claims | Риск / зависимости / oracle | Выбор и предел |
|---|---|---|
| C1 | Ложный учебный маршрут/атрибуция, Markdown/PDF/UI; TS AC-1 и master HL | Прочитаны итоговые README/theory/practice/walkthrough/quiz/answers, research returns, все страницы PDF 4/5; открыт production home. Не измеряется освоение группы |
| C2 | Копирование без исполнения, неподключённый свой fares; Python/pytest, AC-2/3 | Чистая venv, точные fences и demo, предоставленные случаи, независимый временный сервис и 3 осмысленных случая; negative control readiness |
| C3–C4 | Ложный балл/смешение недель; model + React/hash, AC-4/5 | Node24 suite, независимая per-heading сверка всех ключей, UI partial/complete/reset/reload/export, отрицательный контроль grading, WEEK1 student regression |
| C5 | Недоступные байты/код/keyboard/мобильный экран; build assets/Clipboard, AC-6 | UI на 375/1280, реальные HTTP/data assets, keyboard; Edge E6 повторно используется для отказа Clipboard и фактической системной вставки/сохранения, поскольку CUA IAB не даёт достоверный readback системного clipboard |
| C6 | Невоспроизводимый локальный запуск; Node24/Vite, AC-7 | npm ci явно через Node24 npm-cli, build/dev/preview, реальный IAB production и dev |
| C7–C8 | Safety/owner authority, исходники и ошибочная идентичность; immutable TS/HL/Git, AC-8 | Все mandatory floors: полная lineage, prospective denominator, NUL-safe replay, recovery 26 SHA, protected delta, полный name set и reachable Candidate |

## Verification Log

### V1 — C1: материал и источники — HOLDS

Итоговый home реально открыт на production `127.0.0.1:4193/#week-2/home`: readiness по классам/Decimal/import/assert, gap среды, 60+60+60 как план, предоставленный пример и собственное расширение, разные /20. Прочитанная теория верно различает SRP/actors, cohesion/coupling, OCP/точку сборки, поведенческий LSP, ISP, DIP/DI/Service Locator; не обещает нулевой риск регрессии из исходной лекции.

Независимо извлечены все 5 страниц каждого исходного PDF: лекция 4, с.2–5 подтверждает cohesion/coupling, SRP, OCP и orchestration; лекция 5, с.2–4 подтверждает LSP/ISP/DIP/constructor injection и необязательную контейнерную сборку. Обе с.1 задают 90 минут; сайт явно адаптирует их к авторскому часовому плану. HTTP PDF exact bytes имеют SHA-256 `a5d93e29c2662134825003440538272dba97223f9475e1a40de2e568ee918c16` и `2cb6f657105cd0ed0404db2675811371c61f498e4cf673606e41676532343e6a` — совпадают с RES iter1 и Candidate.

Начальная фраза theory.md «и темы со скрина преподавателя» прочитана вместе с её §«Источники» и README: скрин прямо назван недоступным и не подтверждающим официальные требования. Это не доказательство чтения скрина, расписания или результата группы; точное ограничение сохранено ниже как O1. Существенный маршрут имеет проверенную опору в PDF и утверждённом авторском контракте.

### V2 — C2: предоставленный и собственный Python — HOLDS

Windows, Python **3.12.14**, новая venv, `pip install pytest` → **9.1.1**. `tests/week2_workflow.py` извлёк четыре exact Python fences, сравнил с examples после текстовой CRLF/LF-нормализации, запустил точный ожидаемый demo и получил **14 passed**. `solid_demo.py` независимо запущен: карта True, QR True, отказ False, 2 транзакции, 2 успешных сигнала, 1 отказ, `[True, True]`.

В отдельной temp-копии Reviewer создал свой StudentFareService и три случая: `STUDENT-001→Decimal('50.00')`, `CARD-001→100.00`, полный проход через неизменённый TransitTerminal с собственным fares. Наблюдались `payment.calls=[50.00]`, `repository.records=[('STUDENT-001',50.00)]`, зелёный индикатор, success/error **1/0**. Общий запуск дал **17 passed**. В той же временной копии замена readiness-ветки на `if False` дала **1 failed**: предоставленный случай обнаруживает запретный побочный проход; оригинал восстановлен, Candidate не изменялся.

Рубрика явно привязывает 5+7+5+3 к своей обязанности/сборке, двум тарифам/Decimal, содержательным assertions/общему запуску и README/объяснению. bootstrap/assemble с обычным FareService не выдаются за подключение StudentFareService. Полное контрольное решение остаётся только QA в temp, не предоставляется студенту. Atomicity после сбоя repository, реальное устройство/банк и фактическое обучение не заявляются проверенными.

### V3 — C3: модель и согласованность — HOLDS

Node **24.19.0**: `node --test tests/*.test.js` → **14 PASS**. Границы WEEK2 **0/19/20**, invalid **3/-1/'1'/1.5**, incomplete, lock/reset/export согласуются с критериями. Независимая сверка по каждому `### title` quiz/answers проверила порядковые номера всех вариантов, `Верно: N. option` именно для correct и объяснение: **20/20 совпали**. Отдельная temp-модель, принудительно считающая любой ответ нулём, провалила `tests/week2.test.js`: relevant counterfactual detected.

### V4 — C3–C4: реальный интерфейс — HOLDS

Production IAB: пустой finish не создал результат, показал **20** пропусков и фокус на первом radio. ArrowDown выбрал второй SRP вариант. После всех верных WEEK2 — **20/20**, **20 disabled fieldsets**, **20 answer-review**. Экспорт имеет правильные WEEK2/version/ISO/date/score, все 20 разборов, отдельную ручную рубрику; длина **5964**, кнопка выделила диапазон **[0,5964]**.

Обе частичные попытки подтверждены отдельно после ожидания реально обновлённого недельного представления: WEEK1 и WEEK2 показывали **1 из 20** при возвращении. Две завершённые попытки существовали одновременно: WEEK2 **20/20**, WEEK1 **6/20** (намеренно первые варианты); exports различались модулем и баллом. Сброс WEEK2 убрал только его результат, WEEK1 **6/20** сохранился. Reload дал **0 checked / no result**, как обещано. В быстрых первых QA-переходах снимок иногда видел прежний hash-render; проверки выполнены после ожидания нужного видимого раздела, ложного продуктового вывода из этого не сделано.

Прямые `#week-2/answers` и `#week-2/practice-contract` открывают нужный disclosure и фокус SUMMARY. Неизвестный `#week-2/unknown` показывает home WEEK2. Back/forward вернул practice↔practice-contract. Прежние aliases проверены Node course tests; WEEK1 practice/starter доступны. `tests/student_workflow.py` независимо: own5 и selected-model contract41 PASS; missing-target и mutate-before-raise обнаружены. Это fixture QA, не наблюдение студента.

### V5 — C5: байты, клавиатура, визуальный осмотр — HOLDS с явным пределом транспорта

Реальные production HTTP walkthrough.md **18631 bytes**, practice.md **10732**, solid_demo.py **5865** точно совпали с Git Candidate. Три отображённые Python data-URL декодированы и SHA сверены с теми же Candidate LF-файлами: payment_methods `018143f0087eebf1f761e9850bc845e88bfbb1ec4c6a9b36ebac5347b402322e`, demo_week2 `95ffe42f733b04f87ea86414dd096b897b132e4f94f647eb0ea3c8af8e70145b`, test_terminal `eca5e32bb794814a32e216638d416f03b9edbf55ce0ec8af4cbd8c5f0d3f4f05`. Это exact Candidate LF, не raw CRLF-хеши recovery. PDF — V1; local Markdown destinations suite прошёл.

Скриншоты production **375×900** и **1280×900** просмотрены: навигация/текст читаемы, перекрытий нет. На 375 `document.scrollWidth=360≤375`, code pre **292 client / 800 scroll**; на 1280 document **1265≤1280**, code pre **740/812**. Горизонтальный код остаётся внутри pre. Radio ArrowDown, Tab к download, Enter disclosure и skip-link Enter→`H1#page-title` реально выполнены.

Кнопка Python copy показала «Скопировано», но `tab.clipboard.readText()` CUA IAB вернул пустой отдельный clipboard. Это **не** независимое доказательство системных bytes и не установившийся отказ продукта. Для system-copy success, NotAllowedError→полное выделение/PRE/status и сохранённого export повторно применены **EV E4/E6**: они фиксируют реальный Edge 155, эти же CodeBlock/AttemptResult, CRLF/LF и output; исходники и зависимости не изменены. CUA read-only evaluate не использован для скрытой подмены Clipboard. Здесь independently проверены код, полный DOM-текст, selection и asset bytes. Browser permission/fault/saved-file evidence не объявляется повторно исполненным Reviewer.

### V6 — C6: окружение и запуск — HOLDS

Системный Node20 первоначально дал engine warning и не раскрыл glob; этот запуск не принят за требуемый Node24 gate. Повтор: Node24.19.0, npm10.8.2 **npm-cli явно запущен Node24**, `ci` **19 packages / 0 vulnerabilities**, Vite8.3.4 build **73 modules / success**, chunk **541.99 kB**, warning >500 kB без отказа. `dev --host 127.0.0.1 --strictPort --port 5193` ready **462 ms**, реальный IAB home WEEK2 открыт. Production preview **4193** использован V1/V4/V5. Публичный README задаёт Node24 и обычные npm/Python команды; частный runtime нужен только нашей QA-среде, не студенту. Новой инфраструктуры/сервера/Python в браузере нет.

### V7 — C7: authority, preservation, lineage — HOLDS

HL freeze @ `e9a75b3e09263fba3591108c92f1e8eb10d6b04d` §4.1 разрешает тому же Coordinator отдельных видимых Executor/Reviewer; native source совпадает с dispatch @ `9317b3d`. TS approval @ `2f02fa156cd3ddf5bd2947ac02e4f82a8c20e842`, gate 14:49:44+05:00, denominator **18/3200**, раньше dispatch/ONB/implementation. Owner `team/ars.md` human. Права final acceptance/landing/push/publication не переданы Reviewer; независимость от Executor сохранена.

Все **26** исходных SHA HL §2.1 пересчитаны из recovery commit **25f4510483556a62dbb64320baf4b470555aa93d**: **26/26 exact**. `refs/tfw/OOP_20261018-194835_WEEK2/original-inputs` указывает на тот же объект. Delta Baseline→Candidate по `materials/week-01`, `src/assessment.js`, `public`, `.tfw/COURSE-MATERIALS` пуст. Новый WEEK1 walkthrough не внесён; исходные excluded bytes восстановимы. RF и ONB называют отдельный worktree Executor; история показывает onboarding 5ca820b, ONB transition 8ab27d0, единственный implementation de84002, затем EV/RF/state 952a73e. Candidate достижим из trace descendant. Исходную основную папку Reviewer не менял.

### V8 — C8: Accounting Replay — VERIFIED

| Approval | Baseline | Candidate | Membership/actions/classes/reasons | Adds | Deletes | Touched | Binary | Trigger/authority |
|---|---|---|---|---:|---:|---:|---|---|
| TS @ 2f02fa156cd3ddf5bd2947ac02e4f82a8c20e842, до mutation | 09ae71e607622519d304b6cb6c845a7453c78989 | de84002ba4ff63a1bf24e2d5a696fd92677792bc | Ровно первые 18 literal VALUE строк TS §4; каждый action и semantic reason совпадает с EV membership: 12 CREATE/6 MODIFY | 1693 | 165 | 1858 | N/A, все text | План 18/3200 неизменен, ниже 50/5000 prompt и 36/6400 owner threshold; new ruling не нужен |

Точные команды TS воспроизведены как subprocess argv, полные SHA и **буквальный массив 18 путей извлечён из immutable approved TS**, без directory/glob: `git diff --name-status --find-renames=50% -z BASELINE CANDIDATE -- $valuePaths`; `git diff --numstat --find-renames=50% -z BASELINE CANDIDATE -- $valuePaths`. UTF-8 bytes разделены NUL, numstat полями TAB. Renames/binaries нет. Полный неселектированный name set содержит сверх VALUE только **4 ASSURANCE** (`tests/course.test.js`, `tests/materials.test.js`, `tests/week2.test.js`, `tests/week2_workflow.py`) и данный task-local TRACE. Фазы нет; ASSURANCE/TRACE не замаскированы под продукт. Excluded-only descendants не двигают Candidate.

Exact-path staging самого Reviewer проверяется перед каждым commit: полный status, cached names, literal paths, `git commit --only`. Первоначальная sandbox Git-запись отказала из-за внешнего gitdir, повтор с адресным разрешением успешен; broad staging не применялся. История returned producer ограничена именованными commits; недоступный исторический index не выдуман.

## Commands Executed

`git archive Candidate`; Node24 `npm-cli ci`, `node --test tests/*.test.js`, `vite build/dev/preview`; Python3.12 `-m venv`, venv `-m pip install pytest`, `tests/week2_workflow.py`, `tests/student_workflow.py`, independent control **17 cases**, solid demo; temporary scoring/readiness mutants; NUL-safe diff and SHA256 replay; actual UI/HTTP/data-URL checks V1–V8. Scratch scripts/output находятся только в `<temp>/tfw/OOP_20261018-194835_WEEK2/` и не являются принимаемыми артефактами.

## Guard and Check Admission

| Kind | Поведение / вред при отказе | Counterfactual | Admission |
|---|---|---|---|
| Guard, WEEK2 score cases | Верные 0/19/20, complete-only/lock; ложная учебная обратная связь | Constant-zero grade провалил tests/week2.test.js | admitted для проверенного scoring invariant, не для всего UI |
| Guard, provided readiness case | Неготовый сканер не вызывает оплату; скрытый побочный проход | `if False` вместо readiness → 1 failed | admitted в этой имитационной модели |
| Existing WEEK1 selected-model oracle | Своя модель/атомарный отказ, отсутствие reference fallback | missing-target и mutate-before-raise detected | admitted в собственной области |
| Positive controls | course aliases, local links, текстовая согласованность, штатные demo | Не заявлен отдельный relevant mutant для каждого утверждения | labelled controls; не все объявлены permanent guards |
| Temporary diagnostics | 3 собственных тарифных случая, browser сценарии/байты/viewport | Наблюдаемые oracle sums и размеры | QA evidence, не поставляемый ответ/новая постоянная защита |
| Governance assertions | Хеши, accounting, refs | N/A: authority/identity, не product behavior | governance only |

## Knowledge Citations Verified

PV из `.tfw/glossary.md` прочитан; P0–P4 полностью, P5–P7 по релевантности. У каждой строки ниже проверены resolution, существование пункта, смысл, currentness и применимость. Отсутствие источника подтверждено, не подменено содержимым.

| HL §7.2 / ONB §7 | Exact source/item | Resolution / semantic / relevance |
|---|---|---|
| P0 | `.tfw/README.md` Назначение, Ценность и принципы, Границы курса и проекта | ✓ локальное русское обучение/малый React frontend/исходные PDF; ранние заглушки читаются вместе с поздним принятым WEEK1 |
| P1 | Тот же README «История методологии TFW», conventions §15 | ✓ distinct methodology clause; отдельных Methodology values/Success Criteria нет, это честно указано, действующие workflow/Role Lock применены |
| P2 | knowledge/philosophy.md | Подтверждено отсутствие; вымышленных обязательств нет |
| P3 | KNOWLEDGE §§1–2; BASE-frontend «Утверждение», «Применимость», «Основания/неопределённость» | ✓ локальный ранний каркас и более поздний WEEK1 разделены по scope/epoch. Incoming search по exact BASE-frontend identity в records дал только саму запись; замены/конфликта нет |
| P4 | conventions «HL Contract», «Design Rules», «Anti-patterns (prohibited)», §15 | ✓ freeze, staged read, отдельные роли/approved TS/independent review; нет источника права на owner acceptance |
| P5–P6 | knowledge/convention.md, knowledge/process.md | Подтверждено отсутствие; дополнительный стандарт не придуман |
| P7 | KNOWLEDGE §§2–4 | ✓ WEEK1 sources не принимаются за проверку комплектов 2–9; скорость неизвестна |
| P7-R1 | research/iter1 RES Decisions/Sources, Gather G1/G2/G6, Extract E7, Challenge K1–K6 | ✓ именованные файлы/пункты присутствуют; их thematic/static scope согласован с независимо прочитанными PDF и поздней runtime проверкой |
| P7-R2 | research/iter2 RES D1–D5/R1–R5, Gather G7, Extract E4/E6, Challenge K1–K5 | ✓ BB/readiness/собственная сборка и основания рубрики, abstracts не выданы за доказательство темпа или эффекта группы |

## Comments / channel scan

VALUE diff просмотрен по добавленным comments/docstrings и словам todo/legacy/old/temp. В четырёх Python files и продублированных fences docstrings обозначают предоставленную демонстрацию, имитацию оплаты и отличие готовых tests от своей работы; DemoQrPaymentStrategy объясняет отсутствие банковского запроса. Они полезны студенту. Существующие два renderer comments объясняют безопасный Markdown subset; новых агентских сообщений/deferred notes нет. Markdown headings являются учебным текстом, не code comments.

## Evidence Verification

EV E1→V1; E2/E3→V2; E4→V3/V4 + reuse системного сохранения E4; E5→V4/V7; E6→V5 + ограниченный reuse Edge Clipboard; E7→V6; E8→V7; E-accounting→V8. Наличие EV отдельно от applicability: tuple фиксирован, product/dependencies неизменны, нормализация перевода строк названа. Sufficiency обеспечена материалом/кодом/реальным UI/behavior, не числом rows. Raw Executor не нужны. Все 8 AC имеют соответствующие deciding values; принятые constraints/DoF не нарушены.

## Candidate Findings and Limits

Material findings: **none**. O1: несущественная неоднозначность вводной theory о теме со скрина; полное прочтение явно отказывает ему в доказательстве официальных требований. Непроверенные данные не используются для приёмки; утверждённый авторский scope/PDF достаточны. Предлагаемое disposition — not material, без product return/Candidate move; точная запись в REVIEW §5.

Clipboard transport limitation и LF/CRLF оговорки V5 — предел независимого повторения, не скрытый PASS. Реальные готовность/темп/эффект, банк/оборудование, system failures/atomicity не установлены и не входят в accepted claims. Warning chunk >500k не наблюдался как функциональный отказ на локальном двухнедельном frontend.

## Selected Knowledge Evidence / handover

Researcher iter1/iter2 вернул тематическую и педагогическую опору с ограничениями; Executor ONB/RF/EV вернул fixed Candidate, recovery, runtime observations и economics. Эти источники использованы на заявленных уровнях, без заимствования unreturned reasoning. Reviewer добавил собственные проверки: содержательный контроль сервиса, guard detection, точные Candidate LF assets, независимая история/метрика и реальные UI observations. Квалификация и final owner acceptance остаются Coordinator/ars по TS, Reviewer их не выполняет.

## Checkpoint

- [x] Map selection и все mandatory floors проверены.
- [x] TS gates исполнены либо adequate evidence reused с точным tuple/обоснованием.
- [x] Limits явно названы; объём артефактов не стал критерием качества.
- [x] Guards/controls/diagnostics/governance различены.
- [x] Material finding отсутствует; наблюдение имеет materiality analysis и route.
- [x] RF/EV AC, citations, immutable accounting и source preservation сопоставлены с actual files.

Stage complete: YES.
