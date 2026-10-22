# 20261018-181435_practice-code-order — порядок работы с кодом

## Источник и границы

Прямой запрос человека в текущем чате: «сначала ответь пока на вопросы», «в практических заданиях на сайте все коды идут в хронологическом порядке», «мне просто нужно копировать код и вставлять в vs code правильно?». Автор и принимающий — текущий собеседник; его соответствие профилю team/ars.md не подтверждено. Исполнитель — Codex, codex:thread:local:01a14f23-2cc6-7c02-9d1a-804d471a915b (CODEX_THREAD_ID и receipt инструмента). Разрешена проверка текущих материалов и объяснение; изменение сайта и публикация пока не запрошены конкретно.

Цель: объяснить последовательность практики и возможность копирования. Ценность: студент понимает, как начать в VS Code и что требуется реализовать самому. Oracle: ответ различает порядок заданий, команды терминала, самостоятельную реализацию и готовый эталон.

## Контекст и наблюдения

Дата записи: 2026-10-18T18:14:35+05:00. Проверены AGENTS.md, канонический Daily, его шаблон, .tfw/economics/README.md, .tfw/conventions.md, .tfw/project_config.yaml, .tfw/README.md, team/ars.md, README.md, KNOWLEDGE.md. Отдельных пользовательских предпочтений в найденных project paths нет. Назначение простого русскоязычного курса и принцип понятности поддерживают объяснение. Исторические ограничения каркаса в North Star уточняются текущим принятым WEEK1, а не отменяют имеющийся продукт.

Текущий объект: materials/week-01/{README.md,practice.md,theory.md,examples/starter.py}, src/{StudyMaterial.jsx,App.jsx}; Git HEAD 09ae71e607622519d304b6cb6c845a7453c78989, начальное git status --short пусто. StudyMaterial непосредственно отображает эти Markdown и отдельно предлагает starter/эталон/тесты. Practice задаёт Route → Bus → TransitCard → SingleTripTicket, но не предоставляет пошаговый полный код каждой реализации. Starter содержит NotImplementedError; theory включает независимые примеры и неполный принцип работы. PowerShell-блоки запускаются в терминале. Полное готовое решение доступно отдельным reference_solution.py.

Ограниченный поиск: rg по «практик|starter|VS Code|копир» в daily и knowledge; найден daily/2026/20261014-152510_course-120-min/task.md. Его прежние планы относятся к другой версии. KNOWLEDGE.md и workspace/2026/OOP_20261015-170833_WEEK1/status.md подтверждают последующий принятый WEEK1; lifecycle DONE. Формальная роль не активируется, формальные файлы не изменяются. Материальных изменений продукта нет; checkpoint разрешения на них не заявляется.

Средства текущего чата: provision · addressed send · wait/readback · title/readback — native (create_thread/fork_thread, send_message_to_thread, wait_threads, set_thread_title + list_threads). Возможность не означает разрешение делегирования; другие чаты не читаются и не получают сообщений. Название DAILY · 20261018-181435_practice-code-order записано и точно прочитано через list_threads.

## Проверенный результат и следующий акт

Подготовлено объяснение: задания организованы последовательно, но копирование всех блоков в один файл не создаёт готовую лабораторную. В VS Code открывают созданную starter папку, реализуют методы в соответствующих domain/*.py и пишут tests/test_domain.py. Эталон служит готовым примером для сверки. Проверка — чтение текущих исходников и генератора; выполнение Python, UI и публичная версия сайта в этом запросе не проверялись. Продуктовых файлов нет. Приёмка ответа остаётся у собеседника; конкретные будущие изменения сайта пока не определены. Временных файлов не создавалось, папка записи содержит только task.md.

## Economics

Один фактический contributor — текущий Codex-чат. Собственный адрес известен, однако точный numeric stream/path, proven Daily range и подтверждённый owner не связаны. Извлечение не предпринималось; typed binding_unavailable / DAILY_SOURCE_RANGE_UNBOUND, last_good=null. Cumulative токены, стоимость и длительность неизвестны, измеренное покрытие отсутствует; это не нулевые затраты. Точная модель/ценовой профиль не наблюдались, оценка денег не производится. Текущий открытый turn и конечный хвост ответа не измерены. Чужие rollout и глобальная история не исследовались.

<!-- tfw-economics-record-v1 {"schema_version":1,"id":"20261018-181435_practice-code-order","project":"OOP-Course-Mukhitov","goal":"Объяснить порядок кода и работу с практикой в VS Code","value":"Студент понимает, что копировать и что реализовать самостоятельно","created":"2026-10-18T18:14:35+05:00","owner":null,"result_state":"checked","binding_outcomes":[{"kind":"binding_unavailable","producer":"codex:thread:local:01a14f23-2cc6-7c02-9d1a-804d471a915b","observed_at":"2026-10-18T18:14:35+05:00","code":"DAILY_SOURCE_RANGE_UNBOUND","detail":"Не связаны точный собственный числовой источник и доказанная граница Daily; handle собеседника не подтверждён.","known":{"unit":"codex:thread:local:01a14f23-2cc6-7c02-9d1a-804d471a915b","platform":"Codex desktop"},"unavailable":{"source_id":"Exact own numeric stream not bound","numeric_source_path":"Not supplied","range_start":"Not proven","owner":"Current human not bound to a declared handle"},"attempted_extraction":false,"last_good":null}]} -->
