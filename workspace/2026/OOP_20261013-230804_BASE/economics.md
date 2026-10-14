# Экономика BASE — основа итоговой приёмки

Цель — простой локальный учебный сайт ООП для владельца и одногруппников. Final Candidate8a52bf5d98e404d0e7391980255e0cf0d86b754c независимо APPROVE (REVIEW@ae3c84e06c00cd262becf60c77db0d84debd6ed1); владелец ещё не принял итог, landing/DONE не выполнены. Product area: учебный фронтенд (derived classification); keywords: ООП, локальный запуск, навигация, учебная группа. Основание: HL A1, RF, original/affected REVIEW.

Это сумма доступных измеренных counters четырёх разных units по latest received finite prefixes, не полный будущий расход/счёт к оплате.

| Роль | JSONL / range | Наблюдённые model/effort | Input (cache внутри) | Output | Total |
|---|---|---|---:|---:|---:|
| coordinator | [coordinator-r33.jsonl](economics/coordinator-r33.jsonl) / [0,2229) | gpt-6.1-sol/high, gpt-6.1-sol/medium | 53809209 (52629504) | 263943 | 54073152 |
| researcher | [researcher-r12.jsonl](economics/researcher-r12.jsonl) / [0,814) | gpt-6.1-sol/medium | 18527453 (18176128) | 63566 | 18591019 |
| executor | [executor-r2.jsonl](economics/executor-r2.jsonl) / [0,364) | gpt-6.1-sol/medium | 6005448 (5821696) | 26169 | 6031617 |
| reviewer | [reviewer-r2.jsonl](economics/reviewer-r2.jsonl) / [0,337) | gpt-6.1-sol/medium | 5196894 (4997248) | 24327 | 5221221 |

Итого input 83539004 + output 378005 = **83917009 tokens**. Cached 81624576 — часть input; reasoning 111321 — часть output, не прибавляются повторно. Daily source rows сохраняют consumption dates и+05:00, дата приёмки не подменяет дату расхода.

**Стоимость/фактическое списание/API-эквивалент неизвестны:** подтверждённой цены/условий и данных списания нет. Денежная оценка не вычислялась, подписка не token bill. Не выведены ROI/экономия/цена отдельной функции: нет независимой базы; расход относится ко всей задаче, включая планирование/исследование/проверку/документы. Completed-turn duration в JSONL — только завершённые ходы, open turns не дают полного времени работы; collector operation_seconds не труд/elapsed.

## Выборка и воспроизведение

Файлы прошли штатные collect/validate/receive. Независимое суммирование JSON tokens rows выбранных4 файлов проверило total=input+output; namespace/source_id различны и includes_sources пусты. Для каждого unit один latest received prefix; predecessor revisions/received hash duplicates исключены. Суммирование incomplete finite prefixes не означает complete lifetime coverage. Штатный helper report исключает incomplete covering successors; эту отдельную арифметику не выдаём за его complete portfolio. Product reports/task-1-economics.md остаётся прежним независимо воспроизведённым bounded snapshot6606616, не итогом всей задачи.

- coordinator: `codex.rollout:01a1366e-05e8-7d93-967e-029096938d9c`, unit `codex:thread:local:01a1366e-05e8-7d93-967e-029096938d9c`, revision33, SHA256 `f03d72cf56292ec0d9161670ccaf7ba637b3f18a36ea195b1ce0f4b542192d83`, cutoff `2026-10-14T06:58:20.314931+00:00`, complete=false.
  Numeric discrepancy: Codex token_count total 53423620 differs from 266 unique-response native thread total 54073152; chose response stream reconciled to its native thread counter, never added both. Response stream reconciled с native counter, не сумма потоков.
- researcher: `codex.rollout:01a13692-f8c7-77d0-beb8-c487f35251e5`, unit `codex:thread:local:01a13692-f8c7-77d0-beb8-c487f35251e5`, revision12, SHA256 `c99aba8f98520e05f1b823982dd31f9538c4c48a154a014fe0f0035b034f6df5`, cutoff `2026-10-13T20:51:19.029747+00:00`, complete=false.
  Numeric discrepancy: Codex token_count total 18242103 differs from 108 unique-response native thread total 18591019; chose response stream reconciled to its native thread counter, never added both. Response stream reconciled с native counter, не сумма потоков.
- executor: `codex.rollout:01a13724-5e56-7523-878d-53569685f99e`, unit `codex:thread:local:01a13724-5e56-7523-878d-53569685f99e`, revision2, SHA256 `c3c4c06a262ae3ede0f970062d77a5a509bb07c0463cd936ffd80fcfa1a874af`, cutoff `2026-10-13T21:35:55.927095+00:00`, complete=true.
  Numeric discrepancy: Codex token_count total 5843354 differs from 50 unique-response native thread total 6031617; chose response stream reconciled to its native thread counter, never added both. Response stream reconciled с native counter, не сумма потоков.
- reviewer: `codex.rollout:01a13917-0566-7230-a11c-760f3cc767bd`, unit `codex:thread:local:01a13917-0566-7230-a11c-760f3cc767bd`, revision2, SHA256 `63093b4e27db05816e275fd29049964dc4cd10ef6c5fe987f6f56ffb70f473f7`, cutoff `2026-10-14T06:55:36.146914+00:00`, complete=true.
  Numeric discrepancy: Codex token_count total 5029260 differs from 45 unique-response native thread total 5221221; chose response stream reconciled to its native thread counter, never added both. Response stream reconciled с native counter, не сумма потоков.

## Пределы

Все actual dispatched Researcher/Executor/Reviewer вернули numeric bytes; Coordinator отдельный. Не покрыты конечные сообщения/commit/send/cleanup после cutoffs, будущая owner acceptance/landing/закрытие; native unknowns не заменены нулями. Исходники чужих rollouts не читались. Это подготовленная basis до terminal acceptance; после owner verdict допустим final bounded Coordinator snapshot перед DONE. Доставка финального отчёта/безопасная очистка не запускают бесконечный пересчёт.
