# EV — {ID} / Phase {X}: {Title}

> **Текущее имя файла**: `evidence/EV__{ID}.md` или `evidence/EV__phase-{x}__{phase_slug}.md`; последующие циклы дополняют этот файл. Правило см. в `conventions.md` → `Artifact file naming`.

> **Date**: YYYY-MM-DD
> **Автор**: {executor}
> **Поручение**: {ID}
> **TS**: [TS Phase {X}](path-to-TS)

---

## Среда

| Поле | Значение |
|---|---|
| OS | {OS/version} |
| Language / Runtime | {runtime/version or N/A} |
| Database | {version or N/A} |
| Deploy target | {target or N/A} |
| CI / Pipeline | {pipeline or local} |

## Свидетельства

Используйте только VERIFIED / DEFERRED / BLOCKED / N/A и объясняйте каждый результат, кроме VERIFIED.
Объединяйте AC, только если одна проверка закрывает их все. Невоспроизводимое утверждение
подтверждайте свидетельством: в строке укажите причину, способ получения значений и то, что вместо
повторения проверяет Reviewer.

В строке укажите относящиеся к утверждению входные и выходные данные, эталон или полномочие и
предположения о среде — только в объёме, необходимом для оценки повторного использования проверки.
Коммит, содержащий изменение, или правка только записи не делают все проверки автоматически
недействительными и не подтверждают их все автоматически. Изменённые зависимости или неясный охват
требуют обновить затронутые свидетельства. Сохраняйте прежние строки; добавляйте наблюдения за
окончательным результатом и ссылки на независимое суждение, а не переименовывайте прежнюю эпоху.

| # | AC | Проверено | Как | Наблюдение | Результат |
|---|---|---|---|---|---|
| E1 | AC-{N} | {claim checked} | {command or action; Candidate or target; environment} | {deciding values, not raw output} | {VERIFIED/DEFERRED/BLOCKED/N/A} |
| E-accounting | {accounting AC} | Exactly one row: approval ref; full Baseline/Candidate; selector and path/action/class/reason membership; phase-attribution detail including INVALID when unresolved; logical files; additions + deletions = touched LOC; binary/non-text N/A; trigger disposition; immutable-denominator authority/timing; exact NUL-safe method | {command; repo/Git/runtime} | {numbers} | {VERIFIED/DEFERRED/BLOCKED/N/A} |

`E-accounting` воспроизводит утверждённый селектор TS. Он не может определять селектор, перемещать
Candidate, увеличивать знаменатель или задним числом предоставлять полномочия.

## Вердикт

Вердикт по свидетельствам: {N}/{M} VERIFIED, {X} DEFERRED, {Y} BLOCKED, {Z} N/A

---

*EV — {ID} / Phase {X}: {Title} | YYYY-MM-DD*
