# Extract iter2 — «Чего мы НЕ замечаем?»

> **Роль мышления:** Аналитик. Сопоставить остаточные P/N и сделать входы TS наблюдаемыми без реализации.
> Parent: [HL-OOP_20261013-230804_BASE](../../HL-OOP_20261013-230804_BASE.md).
> Goal: воспроизводимый локальный запуск и понятные пять представлений.
> Producer unit: codex:thread:local:01a13692-f8c7-77d0-beb8-c487f35251e5.
> Parent Coordinator: codex:thread:local:01a1366e-05e8-7d93-967e-029096938d9c.
> Activation: прежняя native роль; continuation journal/20261014-013240__gate_answer__a758.md @bcfca40c89c1e6de68398bf4f0a479f3cb59df81.
> Coordination authority: HL-OOP_20261013-230804_BASE.md @f9eee6fdab29a8396df993ab90e3d740186a5738 §4.1.
> Originating proposer: none. Полный status/control continuation commit проверены: RES, baseline, native-gates, tfw-gates-only, upstream owner:ars, iter1 complete/iter2 pending, min2/max3; фазы нет.

## Configuration Space

Gather2 выделил только P и N; сравнительная матрица ниже охватывает все девять непротиворечивых сочетаний. Оценка/выбор победителя оставлены Challenge. P3 условен: публичный установленный24 должен быть действительно подтверждён.

| P / N | N1 fragment | N2 component state без URL | N3 pathname History API |
|---|---|---|---|
| P1 official ZIP24.21.0 | X11: explicit runtime + hash-контракт | X12: explicit runtime + ограниченное reload/history | X13: explicit runtime + path/popstate/server fallback |
| P2 official MSI24.21.0 | X21: установка/readback PATH + hash | X22: установка/readback PATH + state | X23: установка/readback PATH + path/fallback |
| P3 verified existing public24 | X31: фактический runtime provenance + hash | X32: runtime provenance + state | X33: runtime provenance + path/fallback |

Новое конкретное сочетание X11: фиксированный public ZIP с временным process PATH для дочерних npm scripts и fragment-навигацией; portable public locator не требует машинного PATH изменения. Здесь это кандидат инструкции, не выполненное действие или утверждённая архитектура.

## Findings

### E2.1: commands должны связывать родительский и дочерний runtime

[npm run-script v10](https://docs.npmjs.com/cli/v10/commands/npm-run-script/), просмотр2026-10-14: scripts получают node_modules/.bin в PATH, на Windows запускаются через cmd.exe; flags передаются после --. [Microsoft about Environment Variables](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_environment_variables?view=powershell-7.5), просмотр2026-10-14: session/process env наследуется дочерними процессами, отличается от persistent User/Machine scope.

Вывод: публичный node-dir должен быть первым в process PATH при будущих npm scripts; одной явной npm.cmd команды недостаточно считать выбор дочернего node доказанным. Не требуется менять machine/user PATH или execution policy. Наблюдённый system node20 остаётся прежним; процессные изменения ниже не выполнялись.

Кандидат будущей PowerShell-инструкции после разрешённого получения и hash-проверки official ZIP нужной архитектуры; оба placeholder заменяются фактическими абсолютными путями до исполнения:

```powershell
$baseNodeDir = '<ACTUAL_PUBLIC_NODE24_DIRECTORY>'
$baseAppDir = '<ACTUAL_PROJECT_DIRECTORY>'
$baseOriginalPath = $env:PATH
try {
    $env:PATH = "$baseNodeDir;$baseOriginalPath"
    Get-Command node.exe,npm.cmd | Select-Object Name,Source
    & "$baseNodeDir/node.exe" --version
    & "$baseNodeDir/npm.cmd" --version
    node.exe --version
    Set-Location -LiteralPath $baseAppDir
    & "$baseNodeDir/npm.cmd" ci
    if ($LASTEXITCODE -ne 0) { throw 'npm ci failed' }
    & "$baseNodeDir/npm.cmd" run build
    if ($LASTEXITCODE -ne 0) { throw 'build failed' }
    & "$baseNodeDir/npm.cmd" run preview -- --host 127.0.0.1 --port 4173 --strictPort
} finally {
    $env:PATH = $baseOriginalPath
}
```

Это последовательность проверки уже доставленного проекта с lock. Первичное создание approved package.json/lock через npm install принадлежит Executor после TS; pins принимаются из RES1. Dev-кандидат в отдельном terminal с той же runtime подготовкой: `npm.cmd run dev -- --host 127.0.0.1 --port 5173 --strictPort`. После stop preview/dev process PATH восстанавливается finally; CWD future инструкции должен быть явно указан. Если порт занят, ошибка не превращается в незаметную смену URL.

Для P2/P3 после фактической установки/подтверждения новая shell сначала проверяет `Get-Command node.exe,npm.cmd`, `node.exe --version`, `npm.cmd --version`. При точном принятом24.21.0 unexpected20 — failure readiness, а не повод продолжать команды. Версия npm записывается из выбранного public runtime; наблюдённый system10.8.2 не считается npm из24.21.0. Download/hash/extract/install и все commands выше не выполнялись Researcher.

### E2.2: точная таблица пяти view для N1-кандидата

Названия взяты из HL. Slugs ниже — предлагаемая конкретизация; Coordinator/owner выбирают её в TS, Researcher не утверждает новый scope.

| View | URL fragment | Observable heading / content | Entry |
|---|---|---|---|
| Главная | #home | название платформы, назначение, CTA и карточки | root/empty или верхняя ссылка |
| Материалы | #materials | Материалы и явная заглушка будущих уроков | top link, CTA «Начать обучение», карточка |
| Практика | #practice | Практика и будущие задания | top link/карточка |
| Тесты | #tests | Тесты и будущие вопросы | top link/карточка |
| Результаты | #results | Результаты и будущий прогресс | top link; карточка если присутствует |

| Trigger | N1 ожидаемое наблюдение | N2 ограничение | N3 дополнительная обязанность |
|---|---|---|---|
| initial root/empty | Главная, active home | старт Главная | initial path map |
| initial known URL/reload | view совпадает с fragment | reload сбрасывает view, URL-контракт не обещать | direct path должен реально отвечать server fallback |
| top link/CTA/card | target view + heading + active marker совпадают | state target, URL не меняется | path/state/history синхронизированы |
| back/forward | вернуться к соответствующему known fragment view | история view не обещается | popstate handled |
| unknown fragment | Главная, current home; исходный unknown fragment может оставаться в URL | не относится к state-only | unknown path fallback и server response |
| повтор текущей ссылки | view сохраняется, active не удваивается, focus остаётся валидным | аналогичное state idempotence | не создавать лишнюю history entry без основания |

N1 empty/unknown fallback специально не требует normalization URL через replaceState: исходный fragment может остаться, при reload resolver снова показывает Главную. Если TS требует canonical URL, он должен отдельно задать synchronization без ожидания hashchange после replaceState. Это убирает неявное обещание двух разных поведений.

### E2.3: focus/active observable contract

[MDN focus()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus), просмотр2026-10-14, указывает default scroll при focus и влияние preventScroll. [MDN aria-current](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current), просмотр2026-10-14: current marker отражает текущий элемент, в одном наборе должен быть один current.

Кандидат: верхняя навигация постоянна; переход из неё сохраняет валидный focus на активированном link, не удаляет его DOM. При CTA/карточке, исчезающей со старым view, focus после отображения переходит на heading/main нового view, пригодный для programmatic focus, и содержимое не скрывается ниже видимой области. При initial load не красть focus автоматически; при back/forward focus сохраняется, если его элемент ещё валиден, иначе переходит в новое содержимое. Повтор текущего раздела не запускает лишний focus jump.

Oracle: проверить activeElement принадлежит connected и видимому элементу; Tab/Shift+Tab достигает настоящих links/buttons с видимым focus; links Enter, buttons Enter/Space по семантике. Active indication визуально различим; ровно один current в top nav, например aria-current=page. Не вводить tablist role ради пяти page-like links. Сам факт aria-current не доказывает visible focus или фактический переход.

### E2.4: минимальная evidence-table для TS

| Обязательный результат HL | Конкретный oracle-кандидат | Граница |
|---|---|---|
| воспроизводимый запуск/сборка | actual public node/npm path/version; lock npm ci exit0; build exit0; dev/preview HTTP и browser UI | публичная ссылка/hash не install proof |
| начало и все переходы | CTA→materials, top5 links, все фактически присутствующие cards; view/heading/active совпадают | при N1 проверить initial known/reload/back/forward/unknown по E2.2 |
| честные заглушки | четыре раздела явно называют будущую функцию; отсутствуют ложные действия | не наполнять реальным курсом |
| keyboard | Tab/Shift+Tab, activation по семантике, visible/connected focus при переходах | не проверять Space как активацию ссылки |
| desktop/mobile | все5 view на320/375/1280 CSS px; viewport readback, document width и визуальная доступность nav/text/controls | overflow:hidden не считается исправлением clipping; screenshot плюс интеракции |
| build output | browser проверяет dist через preview после build | dev-only screenshot недостаточно; публикация не требуется |
| независимость | Reviewer открывает fixed candidate и повторяет ключевые oracle собственным каналом | Researcher capability не гарантирует future-role доступ |

Это набор наблюдений для существующих DoD, не implementation checklist или WCAG сертификация. Raw logs/screenshots будущей реализации сохраняются по Working material в tmp/tfw/task; долговечные stage/RF/REVIEW несут проверяемые итоги и точные refs по workflow. Текущее исследование не создаёт product evidence.

## OODA — один focused-проход

- Observe: npm run-script, Microsoft process environment, MDN focus/current и собственный Gather2.
- Orient: runtime выбор должен доходить до scripts; URL/view и focus имеют отдельные oracle. Public locator не равен installed Node.
- Decide: девять P/N сочетаний структурированы, commands и behavior table конкретны; выбор оставить Challenge.
- Act: вернуть Extract gate; не выполнять команды или продукт, ждать Challenge authorization.

## Checkpoint

| Найдено | Осталось |
|---|---|
| Commands-кандидат связывает actual public runtime и process PATH для scripts | critical validation и выбор P в Challenge; actual install/build в исполнении |
| Девять P/N сочетаний и таблица known/empty/unknown/history | выбор N и точного поведения в TS |
| Focus/active и evidence oracle конкретны | проверка полноты крайних случаев, затем product verification |

**Достаточность:**
- [x] External source used?
- [x] Briefing gap closed? Для Extract — runtime commands, five-view/navigation/evidence contract.
- [x] Configuration Space по двум факторам Gather: structured comparison всех9 сочетаний.

Этап завершён: YES.
→ Решение Coordinator: ожидается. Рекомендация: закрыть Extract и разрешить Challenge iter2.
Вопрос gate: разрешён ли Challenge по commands и кандидатному P/N/view/focus/evidence контракту с сохраняемым запретом исполнения?

## Own economics

Тот же own rollout/source/version из entry/RES1; cumulative [researcher-r10.jsonl](../../economics/researcher-r10.jsonl), revision10, SHA-256 `23e6f058c90791a034edf75d6e62e18848112b8a0c7db1de9c6b93f17bcb4759`, cutoff `2026-10-13T20:37:24.064240+00:00`, timezone +05:00, complete=false. Штатные collect/validate прошли; predecessor r9 `2746fc97daf55214d8aa9930d4321071d7a1eeb5457bff4f174a41d9aa62af5c` и прежний captured prefix проверены. Manifest сохраняет finite range/stream discrepancies; r1–r10 не суммировать. Tail после cutoff не покрыт; стоимость не определялась.

## Knowledge handover

Producer/route/authority выше; sources — Gather2 @639a1a79b87edab34033c596be0113df3798724e, status/control/gate @bcfca40c89c1e6de68398bf4f0a479f3cb59df81, named official docs просмотр2026-10-14, RES1 как predecessor. Current knowledge use/Knowledge handover применены; новых knowledge records нет. Material: process runtime команды и observable таблица отделены от исполнения; unknown-fragment URL не нормализуется автоматически, focus зависит от сохранности инициатора. Uncertainty: P/N выбор и фактический portable runtime/продукт. Продолжение: Challenge тем же Researcher после gate. System/process PATH не менялся, бинарные файлы/зависимости/app не получались; scratch не создавался.
