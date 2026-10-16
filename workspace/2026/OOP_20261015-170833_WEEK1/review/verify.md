# Verify — WEEK1

Независимый Reviewer `codex:thread:local:01a1416a-c6bc-73f0-ba40-dec0a53aa981`; Coordinator `codex:thread:local:01a13f7d-7bd4-77f3-9c52-77ec80f172bf`. Полномочия/активация/семь полей маршрута — [Map](map.md). Дата2026-10-16,+05:00. Предмет всех проверок: Candidate `d7c03d57881084e0215f205adced6fcaa82a1deb`, точный Git archive в system Temp/tfw/OOP_20261015-170833_WEEK1/reviewer/candidate. Код принятого результата не изменялся. Среда: Windows, Node24.19.0/npm10.8.2, Python3.12.14/временный pytest9.1.1, реальный IAB tab1, production4186/dev5186. Приватные пути инструментов относятся только к среде проверяющего; README даёт публичные команды.

## Выбор проверок

C1/C5: полная сверка учебного текста/модели/матрицы, поскольку квиз может скрывать отсутствие самостоятельной лабораторной. C2/C3/C4: все точные задания, независимый ключ и реальный ввод/clipboard, поскольку тест калькуляции не доказывает корректность содержания/транспорта. C6: чистая установка/build/dev, узкий/широкий экран и реальные bytes assets. C7/C8: immutable approvals/graph/input/accounting/числовые manifests. Безопасность, человеческая приёмка и идентичность результата проверены обязательно. Ошибка команды или число расхождений сами по себе не расширяли проверку.

## Журнал проверки

### V1 — C1/C5: содержание и самостоятельность — HOLDS

Прочитаны полные7 страниц лекции1 и3 страницы лабораторной1, обязательная теория1–9, week README/practice1–8, starter/reference/test_reference, вопросы/разбор. Сверены все13 строк операций и5 сценариев iter2 Extract E2.1, бюджетE2.2 и картаE2.3. Сохранены Route/Bus/Card/Ticket,5 сценариев,5+7+5+3, четыре вопроса защиты и требования аннотаций/docstrings/читаемости. Адаптации явно названы: pay/charge_fare, дополнение скидки, finite Decimal/ROUND_HALF_UP/копейки, bool/нормализация, aware/now и исключённая граница60:00. GitHub-сдача отделена от локальной адаптации.

Теория0–5/5–15/15–30/30–45/45–55/55–60=60; практика0–5/5–25/25–55/55–60=60; самостоятельно0–15/15–30/30–40/40–60=60. Рабочие120=5каркас+50модель+20тесты+15запуск/отладка+10README/защита+20онлайн/копирование. Все обязательные outputs размещены, тайного обязательного хвоста нет. Комплекты2–9/старый120-минутный план явно прежний необязательный архив, включая предупреждение перед текстом архива. Последняя фраза теории больше не требует полный эталон до попытки.

Starter даёт ровно пять названных helpers/импорты/сигнатуры/exports, методы явно незавершены. Самостоятельное применение правил/переходы/свои тесты/защита отделены от предоставленного. Прочитана реализация всех операций эталона: tuple защищает вход/выход Route; Bus нормализует номер/проверяет capacity/count/назначение/снятие/посадку/высадку; Card сохраняет состояние при отказе, обе block-операции, скидку/округление; билет UUID/aware/срок/одноразовость в любом Bus/сохранность первой просрочки. Требования не удалены ради короткого расписания.

Предел: структура и агентский путь доказывают доступность/полноту команд, не темп новичка/готовность группы/психометрику/реальную взаимную проверку. H2 в этой части неизвестна и раскрыта approved TS1/AC1 и продуктом.

### V2 — C2: все20 оснований — HOLDS

Независимо прочитаны все видимые вопросы/варианты/разборы, assessment.js и downloadable quiz/answers. Ключ по контракту PDF/iter2:1,2,0,1,2,0,1,2; карта1,0,2; билет0,2,1; Route2,0,1; Bus1,2,0. Все печатные A/B/C и реализация совпадают. Базовые8 покрывают идентичность/инвариант/ответственность/private/Decimal/скидку/исключения/время. Каждый случай имеет три отдельных наблюдения. Билет требует одновременно исход+состояние, неверный первый ответ не задаёт следующие предпосылки. Route различает входную/выдаваемую ссылку; Bus — исключение/прежние9. Объяснения не объявляют узнавание самостоятельным написанием Python, порога «освоил»/суммы двух оценок нет.

### V3 — C3/C4: попытка и фактическое копирование — HOLDS

Из Candidate выполнено `node --test tests/assessment.test.js tests/materials.test.js`:9PASS. Ключ тестов задан опубликованными ответами, не импортом q.correct. Проверены неполная/no export,0/20,20/20,11, независимые билетные19/18/17, invalid choices, idempotence/lock/reset. Первый запуск из Reviewer cwd дал7PASS/2FAIL материалов из-за их относительных cwd-путей; повтор из Candidate9/9PASS. Ошибка выбора каталога не является дефектом продукта.

Реальный production IAB: пустое завершение показывает missing20 и фокус radio name class; ArrowRight выбирает1. Results сообщает «Результата пока нет»; возврат сохраняет1/20. Space по20 группам/Enter завершает полностью неверный набор0/20,60 radios disabled, кнопки finish нет. Reset даёт0ответов/нет итога. Независимый верный вектор той же клавиатурой даёт20/20. Выделение результата кнопкой, Control+C и actual clipboard read:6394символа, ISO2026-10-15T21:20:15.197Z, версия,20ответов/20единиц/отдельная ручная рубрика. После reset первые11верны/остальные неверны:11/20, скопировано6263символа/20ответов/11единиц, новый текст. После reset только первый билетный компонент неверен:19/20, билет0/1+1/1+1/1. Навигация сохраняет19. Исходник reducer, заблокированная форма и тест idempotence подтверждают отсутствие накопления повторным завершением. Дата/версия/ответы берутся из текущей зафиксированной попытки.

### V4 — C5: полноценный Python-путь — HOLDS

`python -m pytest -p no:cacheprovider materials/week-01/examples/test_reference.py -q`:41PASS/0.10s. Demo:paid50/balance150/route32/passengers1/ticketTrue. `python tests/student_workflow.py`: starter имеет корректный синтаксис/imports, незавершённый constructor отвергается, существующая папка/marker сохраняются. Независимая domain-модель с dictionary state проходит5своих+41справочную проверку, фактический import path указывает на созданный domain. Demo:списано50/баланс70/пассажир1/билетTrue; отказ оплаты200 сохраняет70. Выполнены readiness функция/list/Decimal и README/четыре объяснения защиты. Missing target завершается ошибкой; mutant Bus, меняющий счётчик до исключения, обнаружен существующим overflow-наблюдением. Это агентская fixture, не студент/замер180минут.

WEEK1_MODEL явно выбирает свою модель; ошибка import не заменяется эталоном. Пять сценариев сохранены; полный набор дополнительно проверяет коллекцию/все Bus-операции/обе block-операции/скидки/точный баланс/округление/readonly/invalid деньги-типы-время/другой Bus. Авторство готовых helpers/tests не приписывается студенту.

### V5 — C6: реальная поставка приложения — HOLDS

Чистая `npm ci`:19packages/audit20/0reported vulnerabilities; `npm run build`:Vite8.3.4/54modules/595ms. Первоначально предположенный npm-cli рядом с bundled Node отсутствовал; фактический штатный npm-cli C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js успешно вызван явным Node24. Зависимости проекта не изменены. Production4186 и `npm run dev -- --port5186 --strictPort`(ready338ms) реально открыты IAB.

Прочитаны App/Assessment/StudyMaterial/styles. App хранит попытку выше keyed content. Fieldset/legend/label/radio, фокус первого пропуска/итога доступны; renderer создаёт React elements без исполнения HTML/Python/пользовательского кода. Серверной отправки/аккаунтов/ложного обещания persistence нет. При375×812 home/theory/practice/tests/results и controls читаемы, document360 без горизонтального page overflow. При1280×900 home/results document1265, итог/кнопки читаемы. Последняя фраза теории реально видна production DOM. Все осмотренные links имеют href; warn/error пусты на production/dev. Скриншоты узкой теории/copy и широкого итога осмотрены; это временные наблюдения.

Actual browser download starter12767bytes, SHA256 `7fa5764246202cf88a99ffcac163296dcbe67fdb8f574f7cd5d288e7dfe56492` равен source. Actual HTTPGET9материалов+2PDF дал точные source bytes:README7576,theory23565,practice21149,quiz8464,answers11863,starter12767,reference12410,test_reference10134,course-plan32742,lecture4317184,lab269257. Сверка исключает ложный200SPA fallback. Оба PDF Git blobs неизменны от Baseline. Тест local links проверил весь модуль/архив. Browser-managed Downloads — неизбежный inbound transport; свой тестовый файл удаляется при возврате.

### V6 — C7: полномочия/сохранность/идентичность — HOLDS

Полный spine/selection/dispatch проверен по actual objects/paths, owner ars — объявленный human. TS1–9 побуквенно равен approved6892211; approval022d65f предшествует input3597a8c/implementationcec7ff1. Frozen master1/3/4/5/6/7 равны freeze497dc8907. Новых owner полномочий/denominator/публикации не выведено. Input3597a8c содержит только9названных файлов: все Git SHA256 равны approved; main9 также сохраняют эти hashes.

Candidate достижим от codex/week1-executor. Первый tested implementationcec7ff1, ASSURANCEd2b1925, последний VALUEd7c03d5 — одна фраза, затем returned RF TRACE. Её зависимости повторно проверены; прежние EV для неизменных scorer/domain/data не переименованы в новый прогон. Full changed paths/input/implementation commits не содержат чужой Daily/skill/index, изменений framework/PDF или продукта вне селектора. Перед собственными commits читались full status/cached names, использованы explicit full paths и `git commit --only`. Initial sandbox metadata write отказал без commit; штатный exact commit после разрешения принят. История доказывает разделение файлов, не невидимые shell-команды Executor: их синтаксис принят только как утверждение producer, чужие transcripts не читались. Пересечений в Reviewer-файлах нет. Crossings сохраняют source role/task/history/достижимость и retained Executor worktree. Owner acceptance/landing ещё не выполнены.

### V7 — C7: независимый учёт — VERIFIED

Approved TS6892211/approval022d65f от2026-10-15T21:08:52+05, до исполнения; denominator17/3600 неизменен. Baseline `03e10df08e8a6cd7044492fe765b4fe2807e559b`, Candidate `d7c03d57881084e0215f205adced6fcaa82a1deb`. Повторены две exact TS-команды; Python subprocess разбирал фактические NUL bytes, без строковых/семантических вычитаний:

```powershell
$valuePaths = @('README.md', 'src', 'materials/week-01', 'materials/course-plan.md', 'package.json', 'package-lock.json')
git diff --name-status --find-renames=50% -z 03e10df08e8a6cd7044492fe765b4fe2807e559b d7c03d57881084e0215f205adced6fcaa82a1deb -- $valuePaths
git diff --numstat --find-renames=50% -z 03e10df08e8a6cd7044492fe765b4fe2807e559b d7c03d57881084e0215f205adced6fcaa82a1deb -- $valuePaths
```

| Literal member | Action | Почему VALUE | Adds | Deletes |
|---|---|---|---:|---:|
| README.md | M | публичный запуск/передача |37|37|
| materials/course-plan.md | A | маршрут/необязательный архив |291|0|
| materials/week-01/README.md | M | готовность/граница помощи |54|53|
| materials/week-01/answers.md | M | разбор/завершение |145|100|
| materials/week-01/examples/starter.py | A | учебный каркас/валидаторы |281|0|
| materials/week-01/examples/test_reference.py | M | поставляемый учебный контракт |292|234|
| materials/week-01/practice.md | M | лабораторная/рубрика/защита |191|167|
| materials/week-01/quiz.md | M |20компонентов |149|122|
| materials/week-01/theory.md | M | ограниченная теория/архив |313|188|
| src/App.jsx | M | навигация/состояние |11|6|
| src/Assessment.jsx | A | ввод/разбор/copy |66|0|
| src/StudyMaterial.jsx | M | материалы/скачивание |49|22|
| src/assessment.js | A | вопросы/счёт/попытка |116|0|
| src/styles.css | M | читаемость/адаптивность |118|97|

14logical files,2113adds+1026deletes=3139touched LOC. Rename/binary отсутствуют, binary metric N/A. Учебные tests в materials — VALUE; tests/ — ASSURANCE, task traces вне селектора. Прежний вход/окончания строк учтены полностью. Одна фаза без двойного attribution.14<17,3139<3600; soft50/5000 и multiplier34/7200 не достигнуты. Нового constituent/отклонения границ/недостающего prospective ruling нет. Это учёт/authority, не доказательство обучения по числу строк.

### V8 — C8: числовой возврат и открытые final effects — HOLDS

Прочитаны только returned r1/r2 Git blobs@e730097, не native source другого unit. Оба validate PASS, SHA256 равен имени. r2:exact Executor/ars/WEEK1,revision2,[0,780),complete bounded prefix,predecessor r1 и проверенный prefix hash,cutoff2026-10-15T20:59:01.773376+00. r1 retained[0,696); revisions не складываются. RF21056765 и расхождение response/token_count раскрыты, потоки не суммированы. Счёт подписки/будущие нулевые роли не придуманы. Текущий task report исторический; RF явно оставляет Coordinator reconciliation/docs/knowledge/changelog/owner acceptance после review. Эти будущие эффекты здесь не сертифицированы.

Рабочий checkout переводит JSONL в CRLF:r2 working SHA `3a15e9e4e08165ec4d106425032c92747e966ec784d4ae627d222d64e80a2a53`; immutable returned SHA `d6651b72c5e3fafdfcb511444d93d9989847e22d70fcdafd7b31c7f612537877` верен. Exact Git bytes экспортированы в temp/validate PASS; r1 exact hash тоже верен. O1 — наблюдение, не утрата source/identity. Для сравнения hashes получатель использует named immutable bytes; Reviewer не переписывает вклад Executor. Свой bounded numeric return отдельно прилагается к REVIEW.

## Guard/check admission

| ID | Вид | Защищаемое поведение/вред | Counterfactual detection | Оценка |
|---|---|---|---|---|
| G1 | постоянные assessment tests | ложный балл вводит студента в заблуждение | отдельная временная копия:grade всегда20 → exit1, три проверки0/20/mixed/ticket FAIL | guard допущен для этих claims; Candidate не менялся |
| G2 | постоянный student-workflow | fallback/повреждение domain даёт ложныйPASS | missing target и mutate-before-raise Bus реально обнаружены | guard допущен для isolation/overflow |
| G3 | reference41/material2 | допустимые сценарии/согласованность/ссылки | positive/consistency controls; не каждый domain mutant проверен | не универсальный guard |
| G4 | install/build/HTTP/browser/copy | source может отличаться от поставки | actual environment/bytes/input | диагностическое/приёмочное свидетельство |
| G5 | Git/учёт/manifests | ошибка полномочий/subject/атрибуции | actual objects/hashes/NUL | governance/identity, не product-quality по количеству |

## Комментарии и источники

Added VALUE comments/docstrings проверены: starter module описывает C16-V;5ошибок; class instructions всех4сущностей; каждый constructor/property/метод задаёт читателю контракт; generated test module требует свои сценарии; generator create обещает no-overwrite. Docstring учебных тестов описывает локальную проверку. Комментарии Markdown-примеров обозначают плохой код/ожидаемый вывод/property error/check-before-mutation. Сохранённые комментарии StudyMaterial объясняют subset renderer/отсутствие исполнения HTML. Добавленного todo/legacy/old/temp канала, агентских заметок/отложенных обязательств нет. `git -c core.whitespace=cr-at-eol diff --check Baseline Candidate` PASS.

## Сверка EV с RF5

| EV | Независимая проверка/применимость | Результат/предел |
|---|---|---|
| E1/E11 | V5/V6 input9/main9/PDF/11HTTPbytes | да; перенос в main ещё нет |
| E2/E3 | V2/V3 все20 ключей/Node9/actualUI | да; выбранные ответы, не Python-навык |
| E4/E6/E13 | V1/V4 full own-domain/negative/readiness/defense | да; fixture, не темп новичка |
| E5/E12 | V5 ci/build/dev375/1280/console | да; Windows/IAB |
| E7 | V3 incomplete/0/20/navigation/keyboard/reset | да; current code |
| E8/E10 | V3 actual clipboard20/11/дата/версия/ticket19 | да; копирование, не обещание скачивания итога |
| E9 | V5 actual starter12767/hash | да; ранняя ошибка12762 уже исправлена E11 |
| E14 | V8 exact returned manifests/bytes | да для bounded contribution; native source producer повторно не читался |
| E-accounting | V7 literal immutable replay | VERIFIED |

RF/EV согласованы. Raw logs/scratch в evidence не помещены. Неудачные/отозванные download-попытки Executor не служат доказательством current copy; неизменные dependencies допускают прежние observations с обозначенными пределами.

## Knowledge citations verified

Каждая ссылка HL7.2/ONB7 проверена по resolution/существованию/смыслу/currentness/relevance. P0/P1 раздельно:

| PV | Источник и вывод |
|---|---|
| P0 | `.tfw/README.md`:Назначение/Ценность и принципы/Границы курса и проекта существуют uniquely; локальный русский сайт/группа/малый масштаб применимы. Исторический этап заглушек не запрещает отдельно approved WEEK1; master freeze497dc8907 §§1/3/5/6/7 задаёт контракт. |
| P1 | Methodology values/Success Criteria в назначенном файле отсутствуют; N/A как заявлено HL/ONB. Архив не подменяет текущий источник. |
| P2 | knowledge/philosophy.md отсутствует; N/A |
| P3 | KNOWLEDGE1/BASE-frontend прочитаны scope/grounds/source/producer/status; source REVIEW92fb85b/path существует, APPROVE/Candidate080da85 подтверждены. Поиск входящих exact identity/relations records не нашёл successor/conflict/equivalence. React/Vite/hash актуальны, заглушки — историческое утверждение. |
| P4 | Полностью выбранные HL Contract/Design Rules/Anti-patterns прочитаны; freeze/independence/authority/exact staging применены. Framework parity не менялся. |
| P5 | convention.md отсутствует; Working material/Comments существуют/применены, scratch только system temp |
| P6 | process.md отсутствует; named plan workflow существует, Plan-роль не активирована; независимость/owner gate определены current review/approved HL/TS |
| P7 | PDF1/lab1 и Markdown прочитаны/сверены V1–V4; явные адаптации, исходные blobs сохранены |
| P7 iter1 | [Python Classes9.1/9.3/9.6](https://docs.python.org/3.12/tutorial/classes.html), [pytest assertions](https://docs.pytest.org/en/stable/how-to/assert.html), [CMU alignment](https://www.cmu.edu/teaching/assessment/basics/alignment.html), [scaffolding](https://www.cmu.edu/teaching/solveproblem/strat-criticalthinking/criticalthinking-07.html), [prior knowledge](https://www.cmu.edu/teaching/designteach/teach/priorknowledge.html) открыты16.10: clauses существуют, aliasing/API/asserts/alignment/help/предпосылки соответствуют утверждениям. Не доказывают темп/готовые задания. |
| P7 iter2 | [datetime aware/naive](https://docs.python.org/3.12/library/datetime.html), [monkeypatch](https://docs.pytest.org/en/stable/how-to/monkeypatch.html), [CMU rubrics](https://www.cmu.edu/teaching/assessment/assesslearning/rubrics.html), [objectives](https://www.cmu.edu/teaching/designteach/design/learningobjectives.html) открыты16.10: named sections существуют, поддерживают deterministic inputs/наблюдаемые критерии. Здесь выбран explicit now, monkeypatch не обязателен; минуты/официальные оценки источники не задают. |

## Candidate findings

Материальных VALUE/ASSURANCE/TRACE замечаний нет. O1:TRACE observation, нормализация рабочего JSONL; claim/source C8 остаётся доказан exact Git bytes/validate(V8). Возможный вред — сравнить преобразованный файл как original, но здесь нет утраты источника/ложной приёмки/изменения следующего разрешённого действия. Owner Coordinator; observable completion уже V8; обычная reconciliation читает immutable refs. Route current REVIEW observation, product rung не нужен; Candidate unchanged; **not material**. RF→REV записан с фактическим настоящим временем без backdating; действительная исходная активация не создаётся задним числом.

## Передача знаний/пределы

Чужие источники использованы только как named durable RF/ONB/EV/RES/extract; transcripts/native rollouts/unreturned reasoning других units не читались. Материальный вывод: полный путь собственной модели наблюдаем, эмпирическая достаточность расписания/H2 остаётся неизвестной. Новых human-sourced Fact Candidates нет. Coordinator отвечает за final effects/решение ars. Собственный браузер закрыт/viewport reset, серверы остановлены; cleanup и own numeric return фиксируются REVIEW.

## Checkpoint

- [x] Map/обязательные safety/authority/identity проверены.
- [x] Все требуемые проверки продукта выполнены; subject/dependencies определены.
- [x] Пределы human timing/group/OS/copy/final effects названы.
- [x] Guards отделены от controls/diagnostics/governance.
- [x] O1 имеет факт/вред/materiality/owner/route/Candidate disposition.
- [x] RF/EV/ссылки/immutable accounting проверены.

Stage complete: YES.
