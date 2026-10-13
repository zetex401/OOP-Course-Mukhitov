# Extract — «Чего мы НЕ замечаем?»

> **Роль мышления:** Аналитик. Разложить сочетания без выбора победителя до Challenge.
> Parent: [HL-OOP_20261013-230804_BASE](../../HL-OOP_20261013-230804_BASE.md) @ f9eee6fdab29a8396df993ab90e3d740186a5738.
> Goal: простой локальный фронтенд с рабочими представлениями и честными заглушками.
> Producer unit: codex:thread:local:01a13692-f8c7-77d0-beb8-c487f35251e5.
> Parent Coordinator: codex:thread:local:01a1366e-05e8-7d93-967e-029096938d9c.
> Activation: исходный native dispatch, продолжение по journal/20261014-000844__gate_answer__1d0a.md @ 16f10caf8810b4ed8a5a466f584e48a5ef289137.
> Coordination authority: HL-OOP_20261013-230804_BASE.md @ f9eee6fdab29a8396df993ab90e3d740186a5738 §4.1.
> Originating proposer: none. Status continuation commit проверен: RES, baseline, native-gates, tfw-gates-only; parent и upstream owner:ars прежние; pending iter1, фазы нет.

## Configuration Space

Все 27 сочетаний D1–D3 Gather перечислены; таблица не ранжирует и не утверждает конфигурации. Для Playwright/автоматизации требуется отдельное подтверждение runtime, OS, browser binaries и доступности у проверяющей роли. D1 описывает runtime продукта: Node20 для приложения может сочетаться с отдельным Node24 для проверок, поэтому такие строки не являются явным противоречием. Если один Node20 предполагается для latest Playwright по текущим docs, соответствующая трактовка строки исключается. Node22 означает как минимум 22.12 для Vite и актуальную поддерживаемую patch-версию для test tool.

| Конфигурация | D1: среда Node для установки и запуска | D2: структура фронтенда и tooling | D3: канал браузерного доказательства |
|---|---|---|---|
| C1 | Node 20.19.5 | React/Vite | IAB/CUA |
| C2 | Node 20.19.5 | React/Vite | Playwright — условно |
| C3 | Node 20.19.5 | React/Vite | CUA + автоматизация — условно |
| C4 | Node 20.19.5 | HTML/CSS/JS + Vite | IAB/CUA |
| C5 | Node 20.19.5 | HTML/CSS/JS + Vite | Playwright — условно |
| C6 | Node 20.19.5 | HTML/CSS/JS + Vite | CUA + автоматизация — условно |
| C7 | Node 20.19.5 | HTML/CSS/JS без bundler | IAB/CUA |
| C8 | Node 20.19.5 | HTML/CSS/JS без bundler | Playwright — условно |
| C9 | Node 20.19.5 | HTML/CSS/JS без bundler | CUA + автоматизация — условно |
| C10 | Node 22 ≥22.12 | React/Vite | IAB/CUA |
| C11 | Node 22 ≥22.12 | React/Vite | Playwright — условно |
| C12 | Node 22 ≥22.12 | React/Vite | CUA + автоматизация — условно |
| C13 | Node 22 ≥22.12 | HTML/CSS/JS + Vite | IAB/CUA |
| C14 | Node 22 ≥22.12 | HTML/CSS/JS + Vite | Playwright — условно |
| C15 | Node 22 ≥22.12 | HTML/CSS/JS + Vite | CUA + автоматизация — условно |
| C16 | Node 22 ≥22.12 | HTML/CSS/JS без bundler | IAB/CUA |
| C17 | Node 22 ≥22.12 | HTML/CSS/JS без bundler | Playwright — условно |
| C18 | Node 22 ≥22.12 | HTML/CSS/JS без bundler | CUA + автоматизация — условно |
| C19 | Node 24 | React/Vite | IAB/CUA |
| C20 | Node 24 | React/Vite | Playwright — условно |
| C21 | Node 24 | React/Vite | CUA + автоматизация — условно |
| C22 | Node 24 | HTML/CSS/JS + Vite | IAB/CUA |
| C23 | Node 24 | HTML/CSS/JS + Vite | Playwright — условно |
| C24 | Node 24 | HTML/CSS/JS + Vite | CUA + автоматизация — условно |
| C25 | Node 24 | HTML/CSS/JS без bundler | IAB/CUA |
| C26 | Node 24 | HTML/CSS/JS без bundler | Playwright — условно |
| C27 | Node 24 | HTML/CSS/JS без bundler | CUA + автоматизация — условно |

Новое относительно Briefing конкретное сочетание: C3 — продукт на уже установленном Node20 с React/Vite, CUA для визуальной/клавиатурной проверки и отдельным подтверждённым runtime для автоматизации. Обновление системного Node продукта не следует автоматически из требований test tool. Это возможность, а не рекомендация добавлять автоматизацию.

## Findings

### E1: опубликованные metadata — согласованный набор кандидатов

2026-10-14 read-only `npm view <package> version engines peerDependencies --json` через npm10.8.2 прочитал публичный registry; затем `npm view <package>@<version> peerDependenciesMeta --json` проверил optional peers Vite и плагина. Установка/scaffold/lockfile не выполнялись.

| Пакет | Наблюдённая опубликованная версия | Node / обязательный peer |
|---|---|---|
| react | 19.3.0 | Node >=0.10.0 |
| react-dom | 19.3.0 | react ^19.3.0 |
| vite | 8.3.4 | Node ^20.19.0 или >=22.12.0 |
| @vitejs/plugin-react | 6.1.2 | тот же Node engine; vite ^8.0.0 |

Источники metadata: [react](https://registry.npmjs.org/react/19.3.0), [react-dom](https://registry.npmjs.org/react-dom/19.3.0), [vite](https://registry.npmjs.org/vite/8.3.4), [plugin-react](https://registry.npmjs.org/@vitejs/plugin-react/6.1.2). Версии — snapshot успешного npm view, а не неподвижный смысл latest. Web открыл только react/latest; три остальных URL не смог открыть. Первая sandbox npm-попытка не получила ответа и остановлена; повтор с разрешённой сетью успешно вернул metadata. Результат не подменяется чтением upstream main.

React-dom19.3.0 принимает React19.3.0, plugin6.1.2 принимает Vite8.3.4, product Node20.19.5 попадает в оба engine range. Это доказательство объявленных границ, не npm install/build. Транзитивный lock и native binary остаются проверкой исполнения.

Peer metadata плагина помечает oxc-transform-react, @rolldown/plugin-babel и babel-plugin-react-compiler optional; Vite metadata помечает все перечисленные им peers optional. Их наличие в metadata не создаёт обязательства ставить Compiler, Sass, devtools, TypeScript или дополнительные transforms для BASE. Требуемая фактическая работа JSX/refresh выбранной настройки проверяется build/dev на исполнении.

### E2: соразмерное разделение без дополнительных framework-пакетов

По [React Conditional Rendering](https://react.dev/learn/conditional-rendering), документация v19.3, просмотр 2026-10-14, JSX можно выбирать обычными JavaScript-условиями. Вывод исследователя: поскольку HL допускает представления внутри одного приложения, переключение пяти разделов само по себе не доказывает необходимость router dependency. URL/history поведение требуется явно определить до TS; внешние ссылки, deep links и back/forward нельзя обещать без выбранного механизма.

| Вариант D2 | Что даёт текущему BASE | Обязанность реализации / сопровождения |
|---|---|---|
| React/Vite | компоненты представлений, данные отдельно от JSX, dev/build tool | Node/npm, четыре прямых пакета-кандидата, lock; состояние активного раздела и focus |
| HTML/CSS/JS + Vite | тот же dev/build pipeline при обычных DOM/module APIs | Node/npm и Vite; отображение/навигация и данные поддерживаются обычным JS |
| HTML/CSS/JS без bundler | минимум продуктовых dependencies; статические файлы | описать локальный static server и смысл проверки/build без bundler; не ослаблять обязательный build/start HL |

Последняя альтернатива требует проверки совместимости с буквальной приёмкой сборки до её выбора; её простота не разрешает удалить обязательное доказательство. Оба vanilla-варианта остаются сравниваемыми альтернативами, преимущество не объявлено.

Основания для UI kit, state-manager, fetch client, animation library, LMS engine или backend не обнаружены в утверждённом BASE. Это вывод из текущего scope, не универсальный запрет на будущие задания. Обычный CSS и ограниченные данные остаются возможными в каждом варианте.

### E3: воспроизводимость и кандидаты команд

Официальная [npm ci v10](https://docs.npmjs.com/cli/v10/commands/npm-ci/), просмотр 2026-10-14: требует существующий lockfile, отказывает при расхождении с package.json и не переписывает их. Поэтому для Vite-вариантов кандидат workflow: первоначально Executor фиксирует согласованные exact direct versions и создаёт lock утверждённым исполнением; затем чистый `npm ci`, `npm run build`, `npm run dev` и локальный preview собранного output. Конкретные scripts и инструкции должны соответствовать реальным файлам; здесь команд не выполняли.

Четыре версии E1 — согласованный кандидат для React/Vite; Vite8.3.4 — кандидат для vanilla/Vite. TS/lock и архитектура не утверждены Researcher. Системный Node20.19.5 уже доступен; требование перейти на22/24 не следует из этих product engines. Если текущие package/docs окажутся несовместимы при запуске, это конкретный возврат до приёмки, а не разрешение игнорировать ошибку.

### E4: стратегия доказательств

В Gather собственный CUA/IAB уже доказал localhost и viewport; доступные locator press/read-only DOM/screenshot APIs позволяют планировать переходы, Tab/focus и размеры. Продуктовых сценариев пока нет, доступ у Executor/Reviewer отдельно проверяется. Ограниченная browser-проверка через CUA не требует добавлять Playwright в зависимости сайта.

Отдельная Playwright-стратегия условна: актуальные docs требуют Node22/24/26; bundled package1.62.1 и Node24.19.0 наблюдались только у Researcher. Запуск браузеров не доказан и не подменяется package presence. Не требуется устанавливать этот инструмент только ради возможности CUA, уже подтверждённой в Gather.

Минимальные будущие свидетельства независимо от D3: чистая установка и успешная сборка; dev/preview реально отвечает; кнопка начала, все верхние переходы и карточки открывают обозначенные разделы; активный раздел видим; Tab/Enter/Space работают по семантике выбранных элементов, focus видим; desktop и mobile screenshot плюс измерение overflow/видимости навигации. Финальная матрица и смысл проверок — Challenge/TS; screenshot один без интеракций не доказывает переходы.

## OODA — один focused-проход

- Observe: опубликованные registry metadata и optional peers, React conditional rendering, npm-ci contract, собственный Gather.
- Orient: опубликованный набор engine/peer согласован; инструмент теста и runtime продукта — разные предпосылки; BASE не обосновывает дополнительные UI/router/state пакеты.
- Decide: пространство 27 конфигураций построено; exact version-кандидаты и минимальные responsibilities определены; победителя и architecture approval оставить Challenge/Coordinator.
- Act: вернуть Extract checkpoint; перейти к Challenge только по gate_answer.

## Checkpoint

| Найдено | Осталось |
|---|---|
| Полное пространство 27 сочетаний D1–D3 и новая развязка runtime продукта/проверок | выбор после проверки слабых мест в Challenge |
| Опубликованные React/react-dom19.3.0, Vite8.3.4, plugin6.1.2 engine/peer согласованы | install/lock/native binary/build при исполнении |
| optional peers не требуют Compiler/Sass/TS для BASE | фактическая JSX/dev настройка при исполнении |
| Представления допустимы без обязательной router library | выбрать и проверить URL/history/focus контракт |
| CUA может быть отдельным каналом без продуктового Playwright | доступность у исполнителя/проверяющего и реальные сценарии |

**Достаточность:**
- [x] External source used?
- [x] Briefing gap closed? Для Extract — конфигурации, pins-кандидаты, основания пакетов и стратегии доказательств.
- [x] Configuration Space построено по Gather.

Этап завершён: YES.
→ Решение Coordinator: ожидается. Рекомендация: закрыть Extract и перейти к Challenge.
Вопрос gate: разрешён ли Challenge по этим конфигурациям и условным version/proof-кандидатам?

## Own economics

Тот же собственный bound rollout ID/version из entry; [researcher-r4.jsonl](../../economics/researcher-r4.jsonl), revision4, SHA-256 `3f98c66a7852fa057fceb1047858d3fe570f0e7da3f6077b0794923c70b0f588`, диапазон [0,347), cutoff `2026-10-13T19:25:40.745632+00:00`, timezone +05:00, complete=false. Штатные collect/validate пройдены, predecessor r3 `420923683d5ecab4106a903b52987de34b08a70f9957ea3868ac7e197be06aad` и его source prefix проверены. Ревизии не суммировать; собственные расхождения числовых потоков остаются в manifest. Ответ и действия после cutoff не покрыты; стоимость не вычислялась. Временный npm cache удалён.

## Knowledge handover

Producer/parent/authority указаны выше. Scope источников: собственный Gather @3970a80c94522829cb572a800347ab3182894927, продолжение/status @16f10caf8810b4ed8a5a466f584e48a5ef289137, named npm metadata и официальные docs с датой просмотра2026-10-14. Current knowledge use/Knowledge handover повторно применены; новых knowledge records нет. Материальное: опубликованный engine/peer-согласованный набор, отсутствие оснований обязательного router/Compiler/UI kit, раздельные product/test runtime. Неопределённость: install/build и все реальные продуктовые проверки; architecture не утверждена. Продолжение: Challenge тем же Researcher после gate, затем RES; iter2 определяет Coordinator. Raw npm output/cache временные, не входят в проект; продуктовые dependencies не устанавливались.

