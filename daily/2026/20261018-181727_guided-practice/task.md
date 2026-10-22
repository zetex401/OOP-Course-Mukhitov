# 20261018-181727_guided-practice — практика по шагам в VS Code

## Источник, цель и полномочия

Прямое продолжение в текущем чате: «Да, сделай так пожалуйста и добавь на сайт» в ответ на объяснение отсутствия маршрута «шаг 1 — скопируй сюда, шаг 2 — добавь это, получи работающую программу». Автор/принимающий — текущий человек; соответствие профилю ars не подтверждено. Worker: Codex, codex:thread:local:01a14f23-2cc6-7c02-9d1a-804d471a915b. Это отдельный результат после объяснения в ../20261018-181435_practice-code-order/task.md.

Goal: последовательные полные блоки Python, пути файлов, команды и ожидаемые результаты в разделе «Практика» существующего сайта. Value: студент может повторить маршрут в VS Code без угадывания места вставки и недостающей логики. Разрешены учебные материалы, отображение и копирование кода, проверки и обновление существующего опубликованного сайта. Доступ public сохраняется. Исходные PDF, контракты, эталон, самопроверка/оценка и исторические формальные записи защищены. Готовые тесты и решение обозначаются как предоставленный разбор; собственная работа не имитируется.

## Checkpoint до продуктовых изменений

Создано 2026-10-18T18:17:27+05:00. Прочитаны AGENTS.md, Daily canonical/template и economics README, .tfw/README.md, conventions, project_config, README/KNOWLEDGE/team/ars в этом чате. Прочитаны текущие practice/theory/маршрут/starter/reference_solution, StudyMaterial/App/styles, tests/materials.test.js и tests/student_workflow.py. Baseline HEAD 09ae71e607622519d304b6cb6c845a7453c78989; исходники чистые, только предыдущая Daily запись untracked. Объект принадлежит принятому WEEK1 с lifecycle DONE, действующей формальной роли здесь нет. Поиск прежних работ в daily/knowledge выполнен по практике/starter/копированию; предыдущая запись объясняет конкретный пробел, прежняя course-120-min относится к старой версии. Новое требование не меняет программные контракты.

North Star fit: понятный русский курс небольшого масштаба. Oracle: выполнение только опубликованных блоков с нуля после starter создаёт работающие четыре класса, демонстрацию и пять предоставленных тестов; полный существующий набор проверяет именно полученный domain; сборка/ссылки/интерфейс и копирование проверены. План: сохранить самостоятельные требования рядом и явно отделить готовый учебный разбор от самостоятельной лабораторной; не обещать измеренного темпа.

Sites skill выбран для существующего appgprj_6ad1bc859e248191b71fae18c5fd5530 из .openai/hosting.json. get_site подтвердил owner/public/live version1 и URL https://oop-week1-mukhitov.epichorse4.chatgpt.site. Перед изменениями требуется source helper opening с credential в памяти. RELEASE.md отсутствует; новую процедуру/SemVer/тег не создаём. Выбран существующий hosting effect, определённый hosting manifest и Sites workflow, с проверенной сборкой и штатной версией Sites; перед публикацией повторно применяется release workflow к этой Daily записи. Публикация разрешена текущим «добавь на сайт» в контексте существующего сайта; отдельной приёмки результата пока нет.

Provision · addressed send · wait/readback · title/readback: native, инструменты проверены на предыдущем входе. Делегирования нет. Title задан DAILY · 20261018-181727_guided-practice; readback будет проверен.

## Подготовленный результат и release checkpoint

Продукты: materials/week-01/walkthrough.md (8 шагов, полные классы/демонстрация/тесты), materials/week-01/README.md, materials/week-01/practice.md, README.md; отображение/копирование в src/StudyMaterial.jsx, маршрутизация #practice-contract в src/App.jsx, оформление в src/styles.css; проверка сценария копирования в tests/guided_workflow.py. Исходные контракты и баллы сохранены; готовые блоки помечены как предоставленный разбор. Старые 180 минут не выданы за измеренное время нового маршрута.

Проверено: tests/guided_workflow.py создаёт новую папку через настоящий starter, извлекает шесть Python-блоков непосредственно из Markdown, записывает только указанные пути по порядку. Демонстрация побайтно совпала с ожидаемым выводом, 5 предоставленных тестов PASS, 41 полный контракт PASS с проверенным точным импортом созданного domain. 9 существующих Node-тестов PASS. diff --check PASS после нормализации CRLF изменённых текстов. Production build Node24/Vite8 через штатный build-site.mjs PASS, 56 modules, 382ms. Системный npm.cmd неверно вычислял свою папку; временная обёртка с явными путями к установленным npm/Node24 решила причину без изменений проекта.

CUA/IAB localhost: все восемь шагов видимы, подписи файлов и команды различаются, Route copy сообщает «Скопировано»; независимый API чтения clipboard вернул пустую строку, поэтому точное содержимое системного буфера этим API не подтверждено. Переход по ссылке «требованиям» открыл #practice-contract, раскрыл блок и сфокусировал summary. Скриншот подтвердил читаемость начала и блока Route при ширине вкладки около 650px. Фактического прохождения человеком и замера времени нет.

Release route: действующий .openai/hosting.json выбирает прежний public Site, отдельного RELEASE.md нет. Прочитан полный release workflow и его Read Contract применён к этой записи/проверкам/статической сборке. Приёмка человеком ещё не получена; прямой текущий запрос разрешает публикацию подготовленного результата. Git-тег, SemVer, изменение аудитории и formal verdict не создаются. Текущие права get_site owner/public подтверждены.

Первый opening в основном репозитории выявил расхождение историй; исходники не перезаписывались. Штатный source helper успешно открыл remote main 4e547627289d150917c275615d7702bfb8a474aa в C:/Users/Арс/AppData/Local/Temp/tfw/20261018-181727_guided-practice/site. У него существующий состав — только hosting manifest и dist. Сохраняется этот статический способ поставки: переносится только проверенная новая dist, без личных/TWF-записей/credential. Затем source helper делает обычный commit/push и архив; native save/deploy использует именно его commit/archive. Git main локального учебного проекта не смешивается с отдельной историей Sites.

Рабочие файлы и pytest размещены только в системном temp tfw/20261018-181727_guided-practice. Название DAILY прочитано точно через list_threads.

## Опубликованный результат

Sites source commit/push: 6bb0659a237de68559b7d3de6348362346015483. Перенесённые 31 asset побайтно сверены с локальной dist; downloadable walkthrough совпал с исходным Markdown. Штатный package helper завершился после выбора Git Bash и TAR_OPTIONS=--force-local для Windows-пути; никаких правок установленного плагина или приложения для обхода этих ошибок не делалось.

Native save вернул version_number 2, id appgprj_6ad1bc859e248191b71fae18c5fd5530~appgver_c0e66cca752c819184b14fe7852c5546; архив sha256:441b2d13494c86704fa49a6f0832b13c53209a52a320ffe976fe94cbe03541df, 32 файла, 13168640 bytes. Native deploy appgdep_6ad4ca625b8c819185217734a6d8b78e, status succeeded, updated_at 2026-10-18T13:32:42.438332+00:00, URL https://oop-week1-mukhitov.epichorse4.chatgpt.site. Аудитория public сохранена. IAB на live URL #practice подтвердил все восемь шагов и новые кнопки; вкладка оставлена как deliverable. Предыдущая localhost-вкладка стала недоступна session, поэтому live открыт в новой вкладке того же IAB.

Результат проверен и опубликован по прямому запросу. Следующий акт — человек проходит инструкцию с первого шага и оценивает удобство; его приёмка и фактический темп не заявляются. Исходники находятся в основных путях проекта, публикуемый снимок сохранён в Sites. Локальный проект не коммитился автоматически.

## Economics binding и итог возврата

Known actual producer/unit — текущий Codex-чат; точные own numeric stream/path, proven range и owner handle не связаны. attempted_extraction=false, last_good=null, DAILY_SOURCE_RANGE_UNBOUND. Один contributor; токены/деньги/длительность неизвестны, не ноль. Источники других чатов не исследуются. Это не мешает прямому разрешённому изменению.

На финальном возврате эта же конкретная binding gap сохраняется: cumulative measured unique tokens/money/native duration неизвестны, покрытие не измерено, единственный actual contributor указан выше, измеренных bytes и last-good нет. Модель/точный ценовой профиль не наблюдались, оценка денег не производилась. Текущий открытый turn, последний ответ и cleanup tail остаются неизмеренными. Это не попытка numeric extraction и не измерение нуля. В запись добавляется фактический итог очистки перед возвратом.

<!-- tfw-economics-record-v1 {"schema_version":1,"id":"20261018-181727_guided-practice","project":"OOP-Course-Mukhitov","goal":"Добавить пошаговую практику в VS Code и обновить существующий сайт","value":"Копирование полных блоков по порядку даёт работающую учебную модель","created":"2026-10-18T18:17:27+05:00","owner":null,"result_state":"checked","binding_outcomes":[{"kind":"binding_unavailable","producer":"codex:thread:local:01a14f23-2cc6-7c02-9d1a-804d471a915b","observed_at":"2026-10-18T18:17:27+05:00","code":"DAILY_SOURCE_RANGE_UNBOUND","detail":"Exact own numeric stream and proven Daily bounds not supplied; current human handle unresolved","known":{"unit":"codex:thread:local:01a14f23-2cc6-7c02-9d1a-804d471a915b","platform":"Codex desktop"},"unavailable":{"source_id":"Not bound","numeric_source_path":"Not supplied","range_start":"Not proven","owner":"Human not bound to declared handle"},"attempted_extraction":false,"last_good":null}]} -->

Очистка: фактически удалена системная временная папка C:/Users/Арс/AppData/Local/Temp/tfw/20261018-181727_guided-practice вместе с pytest, checkout, архивом и обёрткой npm. Локальный preview остановлен. В папке Daily только task.md; transient генератор Markdown удалён сразу после работы. Публикация не зависит от удалённых временных файлов.
