# Gather — «Чего мы НЕ знаем?»

> **Роль мышления:** Исследователь. Установить измерения и ограничения; варианты остаются открытыми до Challenge.
> Parent: [HL-OOP_20261013-230804_BASE](../../HL-OOP_20261013-230804_BASE.md) @ f9eee6fdab29a8396df993ab90e3d740186a5738.
> Goal: понятный локальный фундамент учебной платформы с навигацией и обозначенными заглушками.
> Producer unit: codex:thread:local:01a13692-f8c7-77d0-beb8-c487f35251e5.
> Parent Coordinator: codex:thread:local:01a1366e-05e8-7d93-967e-029096938d9c.
> Activation: исходный native dispatch; continuation — journal/20261013-235551__gate_answer__3a75.md @ 6f1498b70d4830c86e104f95123632766b051e23, разрешающий Gather по Briefing @ 11dd6e1f494d87a3b45bb3329d8d0c3c22638046.
> Coordination authority: HL-OOP_20261013-230804_BASE.md @ f9eee6fdab29a8396df993ab90e3d740186a5738, §4.1.
> Originating proposer: none. Routing проверен по status continuation commit: RES, native-gates, tfw-gates-only, baseline; фазы нет; pending iter1 не менялась.

## Dimensions

| Dimension | Alt A | Alt B | Alt C |
|-----------|-------|-------|-------|
| D1: среда Node для установки и запуска | наблюдённый системный Node 20.19.5 | документированная установка поддерживаемого Node 22 | документированная установка поддерживаемого Node 24 |
| D2: структура фронтенда и tooling | React/Vite, простые компоненты и данные | HTML/CSS/JS с Vite | HTML/CSS/JS без bundler, локальный статический сервер |
| D3: канал браузерного доказательства | интерактивная проверка в IAB через CUA | отдельный Playwright при подтверждённых runtime и browser binaries | сочетание CUA для визуального/клавиатурного контроля и ограниченных автоматизированных сценариев |

Ни один вариант пока не выбран. D1 влияет на установку инструментов, D2 — на сопровождение представлений, D3 — на доступность доказательств; наличие связей не устраняет отдельных решений по ним.

## Findings

### G1: Vite — заявленная совместимость и локальные команды

Официальный [Getting Started](https://vite.dev/guide/) просмотрен 2026-10-14, footer b6c20f6a. Требование Node: 20.19+ либо 22.12+; отдельные templates могут требовать более высокий Node. Документированы React/vanilla presets, локальный dev server и build/preview. Это соответствует системному Node 20.19.5 по заявленному минимуму, но не доказывает установку транзитивных пакетов и сборку конкретного проекта.

Контрольная версия [vite v7.1.9 package.json](https://raw.githubusercontent.com/vitejs/vite/v7.1.9/packages/vite/package.json) содержит engine `^20.19.0 || >=22.12.0`. Это отдельный именованный пример совместимой границы, а не рекомендация старой версии или доказательство актуального опубликованного release. Список точных устанавливаемых версий должен быть сверён в Extract до TS; `@latest` не является воспроизводимым pin.

### G2: React — допустимая основа и ограничение соразмерности

Официальная [Build a React app from Scratch](https://react.dev/learn/build-a-react-app-from-scratch), просмотренная 2026-10-14, показывает документацию React v19.3 и Vite как один из build tools. Начальная конфигурация — client-only SPA; routing, данные и стили требуют отдельных решений. Документ предупреждает о росте сложности при самостоятельной реализации возможностей framework.

Вывод исследователя: BASE не требует server rendering, data fetching или сложных маршрутов, поэтому перечень возможных будущих решений не создаёт потребности в них сейчас. Это аргумент для сравнения в Extract, не утверждение React/Vite как архитектуры.

Официальный [plugin-react main/package.json](https://raw.githubusercontent.com/vitejs/vite-plugin-react/main/packages/plugin-react/package.json), просмотренный 2026-10-14, сообщает версию исходников 6.1.2, peer Vite `^8.0.0`, engine `^20.19.0 || >=22.12.0`. Поэтому смешивание этого plugin с контрольным Vite 7 неверно по peer range. `main` изменяем и не доказывает публикацию пакета; release/pin проверяется отдельно в Extract.

### G3: среда этого Researcher — прямые наблюдения

На этом компьютере `node --version` → v20.19.5, `npm --version` → 10.8.2; `Get-Command` указал `C:/Program Files/nodejs/node.exe` и `npm.cmd`. Это повторно подтверждает сведения HL для данного unit, не будущую среду владельца или иной роли.

Bundled runtime: `C:/Users/Арс/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe --version` → v24.19.0. Его node_modules/playwright/package.json показывает 1.62.1 с engine `>=20`. Пакет присутствует; запуск Playwright и наличие его browser binaries не проверялись. Bundled paths — инструментальная среда Codex, не portable предварительная установка продукта.

### G4: браузерный канал и адаптивность

CUA создал скрытую IAB-вкладку. Пустой временный каталог в system tmp/tfw/OOP_20261013-230804_BASE/gather обслуживался стандартным Python HTTP server по `127.0.0.1:5187`. IAB открыл directory listing; сервер наблюдал GET / → HTTP 200. Через документированный viewport capability установлены 375×812; read-only DOM observation вернул `innerWidth=375`, `innerHeight=812` и heading Directory listing for /. Override сброшен, вкладка закрыта, сервер остановлен и пустой временный каталог удалён. Побочный favicon 404 не затрагивает проверку доступа.

Проверено только открытие локального HTTP и управление viewport. Сборки, навигации продукта, Tab/focus и мобильного переполнения продукта пока нет. Доступность этих инструментов отдельно подтверждается у Executor/Reviewer; результат текущего Researcher не гарантирует полномочий или будущей работоспособности другого unit.

[MDN Media query fundamentals](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Media_queries), просмотрен 2026-10-14: viewport width влияет на responsive layout; мобильное отображение требует корректного viewport meta; Grid/Flexbox могут обеспечивать гибкость. Из этого следует способ будущей проверки разных ширин, а не доказательство адаптивности отсутствующего приложения.

### G5: Playwright — документация и локальный пакет имеют разный scope

Текущая официальная [Installation](https://playwright.dev/docs/intro), просмотрена 2026-10-14, требует latest Node 22.x/24.x/26.x и Windows 11+ либо Server 2019+/WSL. Системный Node 20.19.5 не входит в этот документированный перечень. Наличие bundled Playwright 1.62.1 с package engine >=20 не отменяет актуальных требований документации и не доказывает проверенный запуск.

Следствие: нельзя автоматически добавлять `@playwright/test@latest` и заявлять совместимость с Node 20. Для отдельного Playwright нужно подтвердить конкретную версию, runtime, OS и browser binaries либо использовать уже проверенный канал CUA. Выбор остаётся открыт до Extract/Challenge.

## OODA — один focused-проход

- **Observe:** первичные страницы Vite, React, Playwright, MDN; два package.json upstream; собственные версии Node/npm и bounded localhost/viewport smoke.
- **Orient:** базовый минимум Vite совпадает с Node 20.19.5; конкретные peer/releases и установка ещё неизвестны. Playwright требует отдельного обоснования среды. Работающий IAB предоставляет конкретный локальный канал.
- **Decide:** измерения D1–D3 определены; Gather gap закрыт на уровне требований и доступного канала, без обещания проверки продукта. Варианты не ранжировать; точные pins и минимальные зависимости проверить в Extract.
- **Act:** вернуть этот checkpoint Coordinator; продолжение Extract только после gate_answer.

## Checkpoint

| Найдено | Осталось |
|-------|-----------|
| Системные Node/npm подтверждены; Vite engine подходит по минимуму | опубликованные согласованные pins React/Vite/plugin и установка конкретного проекта |
| React/Vite допустим как client-only основа по официальным docs | соразмерность вариантов и основание дополнительных пакетов |
| IAB открывает localhost; viewport 375×812 применён и прочитан | фактические сценарии продукта и независимые проверки Executor/Reviewer |
| Playwright latest-docs не включают Node 20; bundled Node 24 доступен здесь | конкретная portable стратегия проверки, browser binaries и OS при выборе Playwright |

**Достаточность:**
- [x] External source used?
- [x] Briefing gap closed? Для Gather: требования и локальный канал; оставшиеся вопросы явно переданы следующим этапам.
- [x] Dimensions identified?

Этап завершён: YES.
→ Решение Coordinator: ожидается. Рекомендация: закрыть Gather и перейти к Extract; углублять Gather сейчас не требуется.
Вопрос gate: разрешён ли Extract по этим измерениям и сохранённым ограничениям доказательства?

## Knowledge handover

Производитель/маршрут/activation указаны выше. Источники: Briefing @ 11dd6e1, status/gate_answer @ 6f1498b7, публичные URL с датой просмотра в G1–G5 и прямые собственные наблюдения этого этапа. Current knowledge use и Knowledge handover повторно применены; knowledge/records отсутствует. Данные других активных units, их история и незавершённая работа не читались; PDF не открывались. Материальные выводы: минимум Vite совместим по заявленному engine, localhost/viewport доступен, Playwright latest нельзя без проверки перенести на Node 20. Неопределённость: pins, установка и весь будущий продукт. Продолжение: тот же Researcher выполняет Extract после gate; H1/H2 окончательно ещё не решены. Изменения HL/TS и принятие архитектуры не произведены.

## Own economics

Тот же собственный bound rollout, source ID и version из entry; cumulative [researcher-r3.jsonl](../../economics/researcher-r3.jsonl), revision 3, SHA-256 `420923683d5ecab4106a903b52987de34b08a70f9957ea3868ac7e197be06aad`, cutoff `2026-10-13T19:05:15.008358+00:00`, timezone +05:00, complete=false. Штатные collect/validate прошли; predecessor r2 `4dcee019cda67cdaf4263b7ca2ca3c147ddba695210566dcaef3368bf7b27202`, прежний source prefix проверен. Использовать покрывающую ревизию, не суммировать r1/r2/r3. Конечный диапазон и расхождения потоков сохраняются в manifest. Ответ и действия после cutoff остаются непокрытым хвостом; стоимость не оценивалась. Временный server/catalog и browser viewport/tab очищены.
