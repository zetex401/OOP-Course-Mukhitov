# Challenge — «Чего мы НЕ ожидаем?»

> **Роль мышления:** Критик. Разделить package compatibility, поддержку runtime и доказательство будущего продукта.
> Parent: [HL-OOP_20261013-230804_BASE](../../HL-OOP_20261013-230804_BASE.md) @ f9eee6fdab29a8396df993ab90e3d740186a5738.
> Goal: простой локальный фронтенд с рабочей навигацией и честными заглушками.
> Producer: codex:thread:local:01a13692-f8c7-77d0-beb8-c487f35251e5.
> Parent Coordinator: codex:thread:local:01a1366e-05e8-7d93-967e-029096938d9c.
> Activation: прежний native dispatch; continuation journal/20261014-003322__gate_answer__ca25.md @ 5ba252bf9f51cd2feb8bde2127a9a7bab93157bb.
> Coordination authority: HL-OOP_20261013-230804_BASE.md @ f9eee6fdab29a8396df993ab90e3d740186a5738 §4.1.
> Originating proposer: none. Полный status continuation commit проверен: RES, baseline, native-gates, tfw-gates-only, прежние parent/upstream owner:ars. Prepared iter1 pending; фазы нет.

## Consistency Check

Проверены все три пары измерений D1–D2, D1–D3, D2–D3 из Gather.

| Измерение A | Вариант | Измерение B | Вариант | Причина несовместимости / граница |
|---|---|---|---|---|
| D1 runtime | единственный системный Node20 | D3 проверка | latest Playwright на этом же Node | актуальные docs Playwright не включают Node20; отдельный подтверждённый runtime делает сочетание условно возможным |
| D1 runtime | Node20/22≥22.12/24 | D2 frontend | Vite8.3.4 + plugin6.1.2 | явной engine/peer несовместимости нет по Extract; install/native binary ещё не проверены |
| D2 frontend | любой из трёх вариантов | D3 проверка | CUA либо Playwright | явной frontend/browser несовместимости нет; отсутствие доступа у роли не заменяется библиотекой сайта |
| D2 frontend | vanilla без bundler и без любого build-контракта | D3 доказательство | только opening статических файлов | недостаточно для обязательной сборки HL; необходимо сначала определить действительную сборку, а не объявить opening её заменой |

В последней строке проблема — доказательство приёмки, не логический запрет vanilla. Node20 engines-совместимость также сохраняет своё значение. Дополнительный screen текущего выбора — поддержка runtime: официальный Node release source ниже помечает20 EOL. Поэтому C1–C9 исключены из рекомендации новой основы; это не утверждение, что они перестали запускаться, и не самостоятельный запрет их использования владельцу.

**Сохранившиеся конфигурации:** C10–C27 проходят проверку заявленных product engines и текущей поддержки Node; условность D3 и build-контракта остаётся явно открытой.

| Конфигурация | D1 | D2 | D3 | Примечания |
|---|---|---|---|---|
| C10 | Node22 ≥22.12 | React/Vite | CUA | Канал наблюдён только у Researcher |
| C11 | Node22 ≥22.12 | React/Vite | Playwright условно | Открыты test runtime/OS/binaries |
| C12 | Node22 ≥22.12 | React/Vite | CUA+автоматизация условно | Открыты test runtime/OS/binaries |
| C13 | Node22 ≥22.12 | vanilla/Vite | CUA | Канал наблюдён только у Researcher |
| C14 | Node22 ≥22.12 | vanilla/Vite | Playwright условно | Открыты test runtime/OS/binaries |
| C15 | Node22 ≥22.12 | vanilla/Vite | CUA+автоматизация условно | Открыты test runtime/OS/binaries |
| C16 | Node22 ≥22.12 | vanilla без bundler | CUA | Открыт смысл обязательной сборки |
| C17 | Node22 ≥22.12 | vanilla без bundler | Playwright условно | Открыт смысл обязательной сборки |
| C18 | Node22 ≥22.12 | vanilla без bundler | CUA+автоматизация условно | Открыт смысл обязательной сборки |
| C19 | Node24 LTS | React/Vite | CUA | Канал наблюдён только у Researcher |
| C20 | Node24 LTS | React/Vite | Playwright условно | Открыты test runtime/OS/binaries |
| C21 | Node24 LTS | React/Vite | CUA+автоматизация условно | Открыты test runtime/OS/binaries |
| C22 | Node24 LTS | vanilla/Vite | CUA | Канал наблюдён только у Researcher |
| C23 | Node24 LTS | vanilla/Vite | Playwright условно | Открыты test runtime/OS/binaries |
| C24 | Node24 LTS | vanilla/Vite | CUA+автоматизация условно | Открыты test runtime/OS/binaries |
| C25 | Node24 LTS | vanilla без bundler | CUA | Открыт смысл обязательной сборки |
| C26 | Node24 LTS | vanilla без bundler | Playwright условно | Открыт смысл обязательной сборки |
| C27 | Node24 LTS | vanilla без bundler | CUA+автоматизация условно | Открыт смысл обязательной сборки |

**Неожиданно сохранившиеся варианты:**
- C22: vanilla/Vite + Node24 + CUA даёт обычный build и локальное доказательство без React; остаётся сильной альтернативой, хотя HL предпочитает React.
- C12/C21: автоматизация может использовать отдельную среду от product runtime; требование test tool не обязывает ставить его в зависимости приложения.
- C16/C25: отсутствие bundler само по себе не делает вариант невозможным, но без описанного build и основания смены предпочтения его нельзя выбрать для текущего TS.

## Findings

### CH1: Node20 — engine совместим, но уже EOL

Официальная [Node.js Releases](https://nodejs.org/en/about/previous-releases), просмотрена 2026-10-14, указывает Node20 EOL, Node22 и24 LTS; на странице latest LTS24.21.0. Поэтому прежние engine observations Gather/Extract истинны в своей области, но недостаточны как рекомендация новой предварительной установки.

Рекомендация исследователя: поддерживаемый Node24 LTS для portable инструкции, с точной patch-версией, командами и фактическим наличием, уточнёнными до TS. На этом Researcher bundled24.19.0 наблюдён; он не равен установленному portable Node у владельца и не доказывает выполнение будущими ролями. Node22 LTS остаётся совместимой альтернативой. Системная установка/обновление не выполнялись.

### CH2: навигация без router требует явного наблюдаемого контракта

[MDN hashchange](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event), просмотр2026-10-14, modified2026-08-21: событие связано с изменением fragment; вызовы pushState/replaceState его не вызывают. Вывод: смешение fragment-state с History API без отдельного учёта может оставить URL и активное представление несогласованными.

Кандидат соразмерного поведения — простые fragment-ссылки разделов, начальное чтение fragment и обработка его изменений; известные разделы открываются при reload/back/forward, неизвестный fragment безопасно ведёт на главную. Это рекомендация до TS, не написанный router. Дополнительная router library не имеет необходимого основания для пяти flat представлений. Если Coordinator выбирает только component state без URL, инструкция/TS должны честно ограничить reload/history поведение; нельзя обещать deep linking автоматически.

### CH3: кнопка и ссылка имеют разные клавиатурные ожидания

[W3C APG Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/), просмотр2026-10-14: кнопки активируются Space/Enter; функция и доступная роль должны согласовываться. Следствие для BASE: переходы могут быть настоящими ссылками, стилизованными под CTA, с Enter; Space ожидается от настоящей кнопки действия. Требование Space к каждой навигационной ссылке ошибочно.

Будущая проверка: пройти Tab/Shift+Tab по навигации и CTA, проверить видимый focus и активацию по семантике; при смене view убедиться, что focus не исчез в удалённом DOM и новое содержимое понятно. Active indication доступен визуально и семантически, например aria-current для ссылки текущего раздела. Обычные HTML элементы предпочтительны перед clickable div. Внешний APG не утверждает обязательный полный WCAG аудит; здесь проверяется frozen понятная клавиатурная навигация.

### CH4: одной mobile screenshot недостаточно

[W3C Understanding Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), просмотр2026-10-14: для вертикального текста рассматривается ширина320 CSS px и возможность читать без двух направлений прокрутки. Вывод для уже обязательного mobile-no-overflow HL: полезно проверить320 и375 CSS px, а также desktop1280; размеры — исследовательские oracle-кандидаты, не новая сертификация WCAG.

Для каждого из пяти view проверять ширину документа относительно viewport, видимость/доступность пунктов навигации, CTA и длинных русских надписей. Одно только scrollWidth≤clientWidth может скрыть ошибку clipping при overflow:hidden, поэтому нужны осмотр текста/контролов и screenshot. Проверять переходы и после изменения viewport. Исходный Gather375×812 проверял лишь capability, поэтому продуктовой адаптивностью не считается.

### CH5: dev server не доказывает build output

Официальная [Vite Deploying a Static Site](https://vite.dev/guide/static-deploy.html), просмотр2026-10-14: build создаёт dist, preview обслуживает его локально и не является production server. Поэтому dev-only screenshot не доказывает рабочую сборку; после успешного build нужно открыть local preview и выполнить основные переходы. Публикация не требуется и не разрешена.

Кандидат воспроизводимой проверки после утверждённого исполнения: exact direct pins Extract плюс lock; чистая npm ci; build exit0; dev и preview HTTP response и browser-visible UI. Пакеты React/react-dom19.3.0, Vite8.3.4, plugin6.1.2 остаются согласованным metadata-кандидатом, но native/transitive установка и JSX/dev работа не проверены Researcher. Эти проверки обязательны в реализации; исследование без разрешения не подменяет их scaffold или временной продуктовой установкой.

### CH6: минимальный shortlist и последствия отказа

Рекомендованная конфигурация для подготовки TS — C19: Node24 LTS + React/Vite + CUA/IAB, обычный CSS, простые данные/представления, четыре прямых пакета из Extract. Она сохраняет исходное предпочтение HL, даёт штатные dev/build/preview и использует уже наблюдённый локальный канал без добавления test dependency. Наличие CUA у Executor и независимого Reviewer должно быть подтверждено ими; если канал недоступен, H2 не считается доказанной.

C22 vanilla/Vite остаётся содержательной альтернативой с меньшим числом frontend пакетов, но достаточного основания отклонить предпочтение HL здесь не обнаружено. C10 Node22/React/CUA допустим при подтверждённом поддерживаемом Node22. C20/C21 Playwright/combined не выбраны: нет доказанного дополнительного выигрыша для небольшого BASE, а OS/binaries/runtime создают ещё предпосылки. Это оценка текущего scope, не принципиальный запрет автоматизации. Варианты без bundler не выбраны: дополнительный build-контракт и смена предпочтения не обоснованы.

H1 поддержана как соразмерность и metadata feasibility; H2 поддержана как доступность канала и конкретных oracle, условно для будущих units. Обе не являются доказательством готового приложения. Проблем приёмки, требующих frozen amendment, не выявлено; фактическая невозможность установки/проверки возвращается Coordinator до принятия результата.

## Матрица будущего доказательства

| Frozen HL | Oracle после исполнения | Непокрытая предпосылка |
|---|---|---|
| DoD1 документы до UI | история/файлы README соответствуют плану и фактическому запуску | Executor chronology, не исследовательская проверка |
| DoD2 воспроизводимые install/build/start | npm ci, build exit0, dev/preview HTTP+UI | portable Node, доступ registry, lock/native packages |
| DoD3 главная/начало/переходы | CTA → Материалы, все5 top links, карточки → свои view; active indication | реальный UI и выбранный URL/state контракт |
| DoD4 честные заглушки | каждый раздел явно обозначает будущее наполнение; ложных действий нет | реальные тексты/контролы |
| DoD5 mobile/desktop/keyboard |320/375/1280, overflow+видимость+screenshots, Tab/Enter/Space по семантике | browser доступ в обоих независимых units |
| DoD6/7 структура/границы | инспекция компонентов/данных/стилей; нет исключённых функций или учебного наполнения | реализация и fixed candidate |
| DoD8 независимая проверка | Reviewer открывает fixed candidate, воспроизводит ключевые oracle | отдельный Reviewer и достижимый candidate |
| DoD9/10 знания/экономика/приёмка | RF/REVIEW, квалификация источников, сверка economics, owner acceptance | дальнейшие workflow gates; исследование их не исполняет |

## OODA — один focused-проход

- Observe: пять первичных внешних источников CH1–CH5 и собственные Gather/Extract.
- Orient: engine compatibility ≠ поддержка Node; product/test runtimes различимы; navigation/focus/reflow/build нужны отдельные oracle.
- Decide: рекомендовать C19 при portable Node24 и подтверждении канала роли; сохранить C22/C10 как альтернативы. Не ставить router/UI kit/Compiler/Playwright без текущего основания.
- Act: вернуть Challenge gate; после согласования — синтез RES, без HL/TS/code.

## Checkpoint

| Найдено | Осталось |
|---|---|
| Проверены D1–D2, D1–D3, D2–D3; shortlistC19 и границы альтернатив | архитектурный/TS выбор Coordinator и владельца |
| Node20 EOL отделён от engine compatibility | точный portable Node24 и readiness следующей итерации |
| URL/focus/keyboard/reflow/build oracle определены | фактическая установка и все продуктовые проверки |
| CUA канал достаточен как кандидат, Playwright не обязателен | собственный доступ Executor/Reviewer |

**Достаточность:**
- [x] External source used?
- [x] Briefing gap closed? На уровне выбора и плана доказательств; реализация не заявлена.
- [x] Проверена несовместимость каждой пары и перечислены сохранившиеся конфигурации.

Этап завершён: YES.
→ Решение Coordinator: ожидается. Рекомендация: закрыть Challenge и разрешить синтез RES.
Вопрос gate: разрешён ли синтез с рекомендацией C19 и остатком iter2 «portable Node24 + точный контракт навигации/доказательств для TS»?

## Own economics

Тот же собственный rollout/source/version из entry; cumulative [researcher-r5.jsonl](../../economics/researcher-r5.jsonl), revision5, SHA-256 `9d8d9b9bf9d1d57d0dfd966625301805a6776511107fbc4c168e39d30a30d27b`, cutoff `2026-10-13T19:41:19.339514+00:00`, timezone +05:00, complete=false. Collect/validate пройдены; predecessor r4 `3f98c66a7852fa057fceb1047858d3fe570f0e7da3f6077b0794923c70b0f588` и прежний source prefix проверены. Конечный диапазон и расхождения числовых потоков находятся в manifest; covering revisions не суммировать. Ответ/действия после cutoff не покрыты; стоимость не вычислялась.

## Knowledge handover

Producer/route/authority указаны выше; scoped sources — Extract @50a85803345917a716eb942d5840871fe408e394, Gather @3970a80c94522829cb572a800347ab3182894927, current status/gate @5ba252bf9f51cd2feb8bde2127a9a7bab93157bb и CH1–CH5 публичные URL с датой2026-10-14. Current knowledge use/Knowledge handover повторно применены; новых knowledge records нет. Материальный вывод: поддерживаемый Node24 заменяет Node20 в рекомендации новой основы; минимальный React/Vite не требует framework-надстроек; конкретные продуктовые oracle и условия независимых units сохранены. Неопределённость: portable runtime readiness и все install/build/UI результаты. Продолжение: RES тем же Researcher только после gate; iter2 готовит Coordinator. Продукт/README/HL/TS не изменялись; рабочие временные файлы этого stage не создавались.

