---
handle: ars
name: Арс
type: human
since: 2026-10-08
---

**Профиль участника.** Заявленная атрибуция, а не аутентификация. Он ничего не предоставляет и не подтверждает.

<!--
КАНОНИЧЕСКИЙ ШАБЛОН — копируйте в team/ под именем {handle}.md, отдельный файл для каждого участника.

Principal — это стабильный идентификатор внутри проекта, подтверждённый действительным профилем
человека или агента. Это никогда не поставщик, модель, исполняемый файл, процесс, сеанс, роль
рабочего процесса или подразделение, доступное для прямой адресации. Не создавайте отдельный
principal для каждого запуска, сеанса, Coordinator, Researcher, Executor или Reviewer. Один
необязательный principal может указывать на несколько разных подразделений, не объединяя их
адреса, родительские подразделения, работу, полномочия или происхождение предложений.

| Ключ | Ограничение | Человек | Агент |
|---|---|---|---|
| `handle` | `[a-z0-9][a-z0-9-]*`; matches filename | required | required |
| `name` | non-empty; ≤80 code points | required | required |
| `type` | `human` or `agent` | required | required |
| `since` | `YYYY-MM-DD` | required | required |
| `organization_role` | description or `not_applicable` | optional | optional |
| `project_role` | description or `not_applicable` | optional | optional |
| `accountable_to` | existing human handle | forbidden | required |
| `may_rule_amendments` | legacy Boolean `true` or `false` | forbidden | optional; read-only |
| `mentality` | non-empty guidance | forbidden | optional |

Исходные четыре ключа по-прежнему образуют действительный профиль человека. Необязательные роли
не должны быть пустыми; отсутствие значения означает «неизвестно/не указано», а точное значение
`not_applicable` — «заведомо неприменимо». Роли задают контекст, но не аутентифицируют участника,
не предоставляют разрешений, не определяют объём поручения и не заменяют роли рабочего процесса.

Профиль агента действителен, только если `accountable_to` указывает на участника с `type: human`.
Историческое логическое поле `may_rule_amendments` остаётся читаемым, но больше не выдаётся и не
предоставляет маршрут, активацию или полномочия на поправки. Текущие полномочия исходят только от
точного неизменяемого объекта, указанного в маршруте передачи поручения. `mentality` задаёт только
стиль и не может менять разрешения или Role Lock.

Совместимый профиль человека с четырьмя ключами:

```yaml
---
handle: saubakirov
name: Sanzhar Aubakirov
type: human
since: 2025-09-08
---
```

Текущий principal агента:

```yaml
---
handle: method-ruler
name: Method Ruler
type: agent
since: 2026-09-05
organization_role: not_applicable
project_role: phase coordinator
accountable_to: saubakirov
mentality: critical opponent
---
```

В новых профилях агента не указывайте `may_rule_amendments`. Создайте профиль до того, как на него
сошлётся привязка или текущий `writer`. Каждое событие по-прежнему содержит человеческое поле
`on_behalf_of`. Полные правила writer, инструмента, токена и привязки см. в `conventions.md` §4.
-->
