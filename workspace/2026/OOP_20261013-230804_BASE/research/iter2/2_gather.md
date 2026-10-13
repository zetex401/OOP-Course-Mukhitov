# Gather iter2 — «Чего мы НЕ знаем?»

> **Роль мышления:** Исследователь. Уточнить оставшиеся предпосылки, не повторять общий выбор стека.
> Parent: [HL-OOP_20261013-230804_BASE](../../HL-OOP_20261013-230804_BASE.md), authority f9eee6fdab29a8396df993ab90e3d740186a5738 §4.1.
> Goal: воспроизводимый локальный фундамент с рабочими переходами и честными заглушками.
> Producer unit: codex:thread:local:01a13692-f8c7-77d0-beb8-c487f35251e5.
> Parent Coordinator: codex:thread:local:01a1366e-05e8-7d93-967e-029096938d9c.
> Activation: прежняя native роль; continuation journal/20261014-012537__gate_answer__da50.md @61f5e7323bd9ccbef6c30ec45f80b6b5b58b20dd разрешил Gather по Briefing @03b160e00ef4cdd2898e982da8a331a0b1c268be.
> Coordination authority: HL-OOP_20261013-230804_BASE.md @f9eee6fdab29a8396df993ab90e3d740186a5738.
> Originating proposer: none. Status/control continuation commit проверены: RES, baseline, native-gates, tfw-gates-only, upstream owner:ars; iter1 complete, iter2 pending, min2/max3; фазы нет.

## Dimensions

Остались два независимых фактора: P — получение/выбор публичного runtime; N — observable навигация. Build/reflow/keyboard — oracle существующего результата, не дополнительный искусственный фактор. Поэтому вместо трёхмерной таблицы используется сравнительная матрица Findings. Варианты не выбраны до Challenge.

## Findings

### G2.1: фиксированный публичный Node24 Windows locator

[Официальная Download page](https://nodejs.org/en/download), просмотр2026-10-14, показывает Node24.21.0 LTS. Web tool не открыл release directory/SHASUMS; read-only Invoke-WebRequest после sandbox DNS failure и разрешённого сетевого повтора успешно прочитал [release index](https://nodejs.org/dist/v24.21.0/) и [SHASUMS256.txt](https://nodejs.org/dist/v24.21.0/SHASUMS256.txt). Источник — текстовые index/hash, не бинарные downloads. Это подтверждает опубликованные locators, не запуск runtime.

| Архитектура / форма | Точный locator из index | SHA-256 опубликованных bytes по SHASUMS |
|---|---|---|
| x64 ZIP | [node-v24.21.0-win-x64.zip](https://nodejs.org/dist/v24.21.0/node-v24.21.0-win-x64.zip) | 158f7685b44de51f6c0df1d153526cbcd3e1bc739a8dfc607721cef75de9e541 |
| x64 MSI | [node-v24.21.0-x64.msi](https://nodejs.org/dist/v24.21.0/node-v24.21.0-x64.msi) | bb0eaee134f9357f22aea915ee793343e627aefc1e66488164bac6915bce2cac |
| arm64 ZIP | [node-v24.21.0-win-arm64.zip](https://nodejs.org/dist/v24.21.0/node-v24.21.0-win-arm64.zip) | 8779b1bde1d39f8d420e3b57aa657b39891af434d3de44a919044cec06785921 |
| arm64 MSI | [node-v24.21.0-arm64.msi](https://nodejs.org/dist/v24.21.0/node-v24.21.0-arm64.msi) | 22ca85110f26015696a3fa9216bc372ae65203d170622eaf7d211e2dd5bb49e3 |

Hash здесь — заявленное значение для последующей проверки фактически полученного файла; собственная проверка binary bytes не выполнена. Получение/распаковка/MSI и system/PATH changes запрещены текущим scope и не производились.

### G2.2: фактическая среда и команды наблюдения

В этом Researcher `[System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture` → X64; `node --version` → v20.19.5; `npm --version` →10.8.2; Get-Command указал C:/Program Files/nodejs/node.exe и npm.cmd. Прежнее наблюдение bundled24.19.0 принимается из RES1, а не выдаётся за установленный24.21.0. OSArchitecture не является проверкой compatibility конкретного Windows release или CPU features; product install/запуск остаются исполнению.

Для будущей инструкции пригодны read-only проверки `Get-Command node,npm`, `node --version`, `npm.cmd --version`; при explicit public runtime нужно отдельно проверить `<actual-public-runtime-dir>/node.exe --version` и `<actual-public-runtime-dir>/npm.cmd --version`. Здесь actual-public-runtime-dir не существует как подтверждённый путь: placeholder не исполнялся. Системный `node`20 может продолжать выигрывать PATH даже после наличия другого runtime; как избежать этого в конкретной последовательности npm scripts — Extract.

### G2.3: сравнительная матрица runtime-вариантов

| P — вариант | Польза | Предпосылка / цена | Неизвестное |
|---|---|---|---|
| P1 фиксированный official ZIP24.21.0 нужной архитектуры | точный version locator, можно использовать explicit executable без обязательной system установки | последующее скачивание, hash и распаковка в именованный каталог; выбор Node для npm scripts | bytes и actual runtime path/запуск пока не проверены |
| P2 фиксированный official MSI24.21.0 | стандартная Windows установка | installation/system effects и новая shell; PATH readback обязателен | разрешение/выполнение установки и фактический PATH не предполагаются |
| P3 уже имеющийся публичный поддерживаемый Node24 | меньше установочных действий при подтверждённой версии | доказать actual path/version и происхождение вне private bundle | здесь такой installed runtime не наблюдён; нельзя заменить bundled24.19.0 |

### G2.4: URL и состояние — небольшой observable контракт

[MDN Location.hash](https://developer.mozilla.org/en-US/docs/Web/API/Location/hash), просмотр2026-10-14, modified2025-02-13: hash содержит fragment с # или пустую строку. [MDN hashchange](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event), просмотр2026-10-14, modified2026-08-21: событие связано со сменой fragment; pushState/replaceState его не вызывают. Эти свойства позволяют формулировать раздельные initial-read и change-handling oracle, но ещё не доказывают реализацию пяти view.

| N — вариант | Польза | Предпосылка / цена | Что нельзя обещать автоматически |
|---|---|---|---|
| N1 fragment-ссылки пяти flat view | URL можно передать/перезагрузить; browser history доступна через URL-переходы | начальное чтение/изменения fragment, known-map/unknown fallback; focus отдельно | синхронизация URL/view и focus без проверки |
| N2 component state без URL | мало механики и не требуется дополнительный router | честно описать стартовое view и повторное открытие; настоящие элементы навигации | сохранение раздела при reload, deep link и back/forward по view |
| N3 pathname History API без router dependency | readable URLs и отдельное поведение history | initial path/popstate и local server fallback; больше обязанностей | hashchange не обслуживает pushState; direct-path reload не работает автоматически на static server |

Пять view уже заданы HL: Главная, Материалы, Практика, Тесты, Результаты. Slugs, unknown behavior, active/focus и обязательность history-возможностей ещё не утверждены. N1/N2/N3 — сравнение остаточного фактора, не повторение выбора frontend или добавление требований frozen scope.

### G2.5: предел Gather и передача Extract

Принятые RES1 oracle320/375/1280, keyboard по семантике links/buttons и build через local preview не пересматривались. На следующем этапе нужно сопоставить P/N и задать точные команды/наблюдения, не создавать продукт. Browser presence у future Executor/Reviewer и install/build/UI остаются явно невыполненными; у этой роли готовый продукт не появляется от публичной ссылки или hash.

## OODA — один focused-проход

- Observe: official Download/index/SHASUMS, MDN hash/hashchange, собственные read-only architecture/command observations.
- Orient: public24.21.0 locator найден, системный20 сохраняется; runtime presence и metadata availability различны. Два остаточных фактора достаточны для сравнения.
- Decide: Gather gap закрыт на уровне locators/наблюдений и navigation options; сохранить P1–P3/N1–N3 открытыми до Challenge.
- Act: вернуть Gather gate; Extract определит последовательности и observable table только после gate_answer.

## Checkpoint

| Найдено | Осталось |
|---|---|
| Official24.21.0 Windows x64/arm64 ZIP/MSI и hash locators | выбор P, actual download/runtime path/запуск в исполнении |
| Системный20.19.5/npm10.8.2 и X64 повторно наблюдены | точные commands без неоднозначного PATH для TS |
| N1/N2/N3 различаются initial/URL/history обязанностями | concrete slugs/unknown/focus/active и oracle-table |
| Остаток сводится к двум факторам P/N | bounded сравнение Extract, затем критическая проверка |

**Достаточность:**
- [x] External source used?
- [x] Briefing gap closed? Для Gather — публичные prerequisites и факторы остаточного контракта.
- [x] Dimensions identified? Два фактора, сравнительная матрица вместо трёх измерений.

Этап завершён: YES.
→ Решение Coordinator: ожидается. Рекомендация: закрыть Gather и разрешить Extract iter2.
Вопрос gate: разрешён ли Extract по P1–P3/N1–N3 с подтверждёнными public locators и сохранёнными пределами фактического наличия?

## Own economics

Тот же собственный bound rollout/source/version из entry/RES1; cumulative [researcher-r9.jsonl](../../economics/researcher-r9.jsonl), revision9, SHA-256 `2746fc97daf55214d8aa9930d4321071d7a1eeb5457bff4f174a41d9aa62af5c`, cutoff `2026-10-13T20:30:59.637916+00:00`, timezone +05:00, complete=false. Collect/validate прошли; predecessor r8 `7c9a75f3218edbad5d90ab6bedecedb643a4d3551f6fe7a581386a7cfed9f013` и прежний source prefix проверены. Manifest сохраняет finite range и числовые stream discrepancies; r1–r9 не суммировать. Финальный tail после cutoff неизвестен; стоимость не вычислялась.

## Knowledge handover

Producer/route/authority выше; sources — Briefing2 @03b160e00ef4cdd2898e982da8a331a0b1c268be, accepted RES1 @90439dfa24905073cbd8c707214c66568bb84611, status/control/gate @61f5e7323bd9ccbef6c30ec45f80b6b5b58b20dd; named official URLs с датой2026-10-14 и собственные read-only observations этого stage. Current knowledge use/Knowledge handover применены; новый knowledge record не использовался. Material: public24.21.0 Windows prerequisites подтверждены на уровне текста, actual system runtime20 сохранён; N/P факторы явно разложены. Uncertainty: actual portable runtime и весь продукт, выбранный URL/focus контракт. Continuation: Extract тем же Researcher после gate. Бинарные файлы, system PATH и продукт не изменялись; scratch/download files не создавались.
