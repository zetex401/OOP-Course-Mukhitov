# Challenge iter2 — «Чего мы НЕ ожидаем?»

> **Роль мышления:** Критик. Проверить точность prerequisite/behavior contract; не имитировать исполнение.
> Parent: [HL-OOP_20261013-230804_BASE](../../HL-OOP_20261013-230804_BASE.md).
> Goal: воспроизводимый локальный фундамент с рабочими пятью представлениями.
> Producer unit: codex:thread:local:01a13692-f8c7-77d0-beb8-c487f35251e5.
> Parent Coordinator: codex:thread:local:01a1366e-05e8-7d93-967e-029096938d9c.
> Activation: прежняя native роль; continuation journal/20261014-013857__gate_answer__6193.md @394dfb4bc1e9b402139723a7c3353b56c999b153.
> Coordination authority: HL-OOP_20261013-230804_BASE.md @f9eee6fdab29a8396df993ab90e3d740186a5738 §4.1.
> Originating proposer: none. Полный status/control continuation commit проверены: RES, baseline, native-gates, tfw-gates-only; upstream owner:ars; iter1 complete/iter2 pending, min2/max3; фазы нет.

## Consistency Check

Два остаточных фактора P/N проверены как сравнительная матрица, включая все9 сочетаний Extract2. Прямой несовместимости runtime-provision и navigation механизма нет: каждый P может работать с каждым N после выполнения своих предпосылок. Ни один вариант не превращает metadata/команды в product proof.

| Вариант | Крайний случай / контрсвидетельство | Результат проверки |
|---|---|---|
| P1 ZIP24.21.0 | wrong architecture, bytes/hash не проверены, выбран system20 через PATH | условно совместим после hash/architecture/actual-runtime guards; public locator существует |
| P2 MSI24.21.0 | установленный файл не означает обновлённую shell, системные эффекты не разрешены текущим scope | условно совместим после разрешённой установки и path/version readback |
| P3 existing public24 | private bundled runtime принят за пользовательскую предпосылку | такая подстановка отвергнута; вариант остаётся только с реальным public source/path/version |
| N1 fragments | initial view не прочитан, replaceState ожидает hashchange, same-link не вызывает смену | сохранён при explicit initial/change resolver и idempotent повторе; unknown/empty fallback задан отдельно |
| N2 state-only | обещаны reload/back/forward/deep link без URL | такое обещание отвергнуто; сам вариант допустим с честным ограничением поведения |
| N3 History API | direct path на static server не отвечает, popstate отсутствует | условно совместим при actual fallback/history proof; нет основания добавлять эти обязанности в BASE |

**Сохранившиеся конфигурации:**

| P / N | N1 | N2 | N3 |
|---|---|---|---|
| P1 | X11: public ZIP + fragment; guards обязательны | X12: public ZIP + state limits | X13: public ZIP + server/path obligations |
| P2 | X21: MSI/readback + fragment | X22: MSI/readback + state limits | X23: MSI/readback + server/path obligations |
| P3 | X31: public provenance + fragment | X32: public provenance + state limits | X33: public provenance + server/path obligations |

Отбор для рекомендации, не логическое исключение: X11 имеет фиксированный public locator без обязательного machine/user PATH, N1 поддерживает небольшой конкретный URL/history контракт. X21 удобен при разрешённой обычной установке; X31 пригоден только если public24 действительно уже доступен. N2 не нарушает frozen HL автоматически, но теряет полезное предсказуемое reload/history поведение; N3 даёт дополнительные обязанности без текущей принятой ценности.

**Неожиданно сохранившиеся варианты:** X31 не требует новой установки, если exact public24 будет подтверждён; X12 допустим при state-only контракте без ошибочных history обещаний. Нет основания превращать их в самостоятельный разрешённый выбор Researcher.

## Findings

### CH2.1: version-print — недостаточный guard

Официальная [Node24 process documentation](https://nodejs.org/docs/latest-v24.x/api/process.html), просмотр2026-10-14, header v24.21.0: process.execPath даёт абсолютный путь запущенного executable, process.arch — архитектуру его сборки. Это позволяет будущему исполнению связать версию/архитектуру с реальным binary, а не именем каталога.

Extract2 snippet печатает версии, но не отказывает при неожиданной версии до npm ci. Для итоговой рекомендации уточнить: actual-public-dir существует и содержит node.exe/npm.cmd; записать выбранный binary execPath/version/arch, его public locator и результат hash проверки; expected Node24.21.0 при фиксированном P1/P2 сверить явно; plain node.exe после process PATH должен разрешаться в тот же executable. Node20, placeholder или несовпадающий path — остановка до install/build и адресный возврат. Npm version записывать из этого runtime, system10.8.2 не подставлять.

Кандидат read-only runtime oracle после фактического получения:

```powershell
& "$baseNodeDir/node.exe" -p "JSON.stringify({execPath:process.execPath,version:process.version,arch:process.arch})"
node.exe -p "JSON.stringify({execPath:process.execPath,version:process.version,arch:process.arch})"
```

Обе команды должны завершиться успешно и показать выбранный runtime; сравнение путей учитывает case/resolve. Это будущий oracle, не выполненный24.21.0 check. Guard не обещает совпадение среды scripts без последующего успешного запуска; npm child/tool flags и error остаются реальными проверками исполнения.

### CH2.2: commands — кандидат с явными failure boundaries

Extract2 process PATH согласован с уже прочитанным Microsoft environment contract; сохранить original PATH и CWD, восстановить их в finally после stop/error, не менять persistent User/Machine scope. В будущей инструкции directory selection должен завершаться ошибкой при invalid project path; каждый runtime/npm version, install/ci/build/preview command проверяет exit status. Не игнорировать nonzero и не применять обход вроде legacy-peer-deps ради ожидаемой картинки. Dev/preview strictPort исключает молчаливое обслуживание другого URL; реально открытый URL и process lifecycle фиксируются исполнением.

Первая package/lock установка и последующая чистая npm ci — разные шаги; repo product dependencies ещё не создавались. Lock сохраняется вместе с exact pins RES1 и версиями Node/npm фактически использованной среды. npm11 документация run-script URL не открылась этим web tool; Extract2 npm10 источник остаётся version-scoped основанием механики, а actual npm из public24.21.0 требуется наблюдать на исполнении. Это не blocker исследования: portable commands/guards конкретны, npm/build успех не объявлен.

### CH2.3: connected body не доказывает сохранённый focus

[MDN activeElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement), просмотр2026-10-14: при отсутствии focused элемента может возвращаться body/documentElement. Поэтому условие «activeElement connected» само по себе может пропустить потерю focus. Future oracle проверяет ожидаемый nav link либо назначенный heading/main, его видимость и следующий Tab, а не только connected=true.

[MDN tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex), просмотр2026-10-14: отрицательное значение допускает programmatic focus без включения в последовательный Tab; положительные значения и визуальное переупорядочивание усложняют keyboard order. Кандидат focus target heading/main с tabindex=-1 сохраняет обычный Tab-порядок; это соразмерная механика выполнения observable контракта, не новый framework.

При top-link переходе постоянный инициатор остаётся focus target. При исчезающих CTA/card keyboard инициаторах новый heading/main получает focus после появления, не body. Initial load остаётся без focus hijack; same-section activation не создаёт лишний jump. Back/forward оставляет валидный элемент, но если focus на удалённом содержимом или body после потери инициатора, переносит его в новое view. Для pointer activation видимость focus и viewport должны быть проверены без насильственного изменения Tab-порядка.

### CH2.4: empty/unknown URL — определённое исключение, а не несогласованность

N1 кандидат использует known fragments из Extract2: home/materials/practice/tests/results. Пустой или unknown fragment разрешается в Главную; unknown URL может сохраняться. Поэтому oracle «URL=view» относится к known-map, а для unknown проверяет explicit fallback/current home. Reload unknown снова показывает Главную, без loop/crash. Нельзя одновременно требовать canonical #home без отдельной normalization механики и считать прежний unknown URL ожидаемым.

Native links меняют hash; initial resolver работает независимо от события. Повтор current link может не вызвать hashchange — UI остаётся тем же, focus/active не дублируются. Back/forward проверяется после реальной серии переходов, а не browser command без history. Удаление event handlers при lifecycle смене и отсутствие дублированных side effects — bounded implementation inspection у Executor/Reviewer, не реализация сейчас.

### CH2.5: достаточность существующей приёмки и shortlist

Сохранить E2.4 evidence table: actual public runtime/provenance, clean ci/build exit0, dev+preview UI, CTA/top5/cards,4 заглушки, keyboard semantics/focus/current, все5 view на320/375/1280 с geometry+видимостью. Горизонтальное clipping при overflow:hidden не проходит визуальный oracle, даже если document width вмещается. Dev success не подтверждает dist; preview проверяется отдельно. Возможность CUA одного Researcher не доказывает Reviewer capability.

Рекомендация: X11 для planned C19 — official ZIP24.21.0 по архитектуре, guard выбранного node/npm/runtime и process PATH restoration, N1 small hash behavior без обязательной canonical normalization, обычный CSS/данные и pins RES1. P2/P3 — документированные альтернативы при разрешённой установке или verified existing public runtime; N2 — допустимая scope-preserving альтернатива с ограничениями, но не shortlist; N3 не обоснован.

Q1/Q2 закрыты на исследовательском уровне точных public prerequisites и observable поведения для TS. Наличие бинарных bytes, фактическая установка, npm версия/public path, build/UI и доступ будущих units намеренно остаются исполнению/REVIEW. Это не новый исследовательский blocker и не повод третьей итерации без нового material gap. Изменение frozen scope или пропуск обязательного proof не предлагаются. Решение архитектуры/TS и разрешённых установочных действий принадлежит Coordinator/owner по действующим gates.

## OODA — один focused-проход

- Observe: Node24 process docs, MDN activeElement/tabindex, accepted Gather2/Extract2; actual npm11-doc fetch unavailable сохранён точно.
- Orient: printed version и connected focus — слабые oracle; guards и expected-target проверки устраняют конкретные пробелы плана без продукта.
- Decide: X11 shortlist, Q1/Q2 sufficiently specified для TS; product proof остаётся будущим обязательством, min2 выполнится после RES2.
- Act: вернуть Challenge gate с рекомендацией синтезировать RES2/SUFFICIENT; не назначать iter3 или исполнение.

## Checkpoint

| Найдено | Осталось |
|---|---|
| Все9 P/N проверены; X11 shortlist, альтернативы обоснованы | архитектура/TS и предустановки — authorized решения |
| Readiness guards version/path/arch/error/CWD уточнены | actual public runtime/npm и install/build после TS |
| Focus/body/unknown/same-link/history edge cases описаны | product UI + independent candidate proof |
| Q1/Q2 достаточны как входы TS | новый research gap не выявлен |

**Достаточность:**
- [x] External source used?
- [x] Briefing gap closed? Q1/Q2 — на уровне prerequisites/observable contract, без ложного product verification.
- [x] Проверены крайние случаи каждого P/N, все9 survivors и пределы перечислены.

Этап завершён: YES.
→ Решение Coordinator: ожидается. Рекомендация: закрыть Challenge2, разрешить синтез RES2 с SUFFICIENT для /tfw-plan.
Вопрос gate: разрешён ли синтез с X11 и описанными guards/focus/unknown уточнениями, без новой итерации при отсутствии material gap?

## Own economics

Тот же own rollout/source/version из entry/RES1; cumulative [researcher-r11.jsonl](../../economics/researcher-r11.jsonl), revision11, SHA-256 `e62db7b2f96c02fbee875fc7371804466e57c4d9b330400bfc6c69da565b19d0`, cutoff `2026-10-13T20:44:05.951680+00:00`, timezone +05:00, complete=false. Collect/validate пройдены; predecessor r10 `23e6f058c90791a034edf75d6e62e18848112b8a0c7db1de9c6b93f17bcb4759` и прежний captured prefix проверены. Range/stream discrepancies сохранены manifest; covering revisions r1–r11 не суммировать. Final tail после cutoff не покрыт; стоимость не вычислялась.

## Knowledge handover

Producer/route/authority выше; scoped sources Extract2 @4f32cc61635f4a28089871bf16eef89e3a07cbb3, Gather2 @639a1a79b87edab34033c596be0113df3798724e, status/control/gate @394dfb4bc1e9b402139723a7c3353b56c999b153 и named docs с датой2026-10-14. Current knowledge use/Knowledge handover применены; новых knowledge records нет. Material: guard и expected-focus oracle усиливают точность без расширения AC; Q1/Q2 достаточно заданы для TS. Uncertainty: actual runtime/product/role capability remains execution proof. Continuation: RES2 тем же Researcher после gate; затем /tfw-plan, не автоматическое code/iter3. PATH/download/install/app/README/HL/TS не менялись; scratch файлы не создавались.
