# Экономика проекта ООП — 21 октября 2026

По сохранённым измерениям: **341,419,591 токенов**, условный эквивалент Standard API **$60.80**. WEEK1 + WEEK2: **239,708,212 токенов / $43.74**. Это переоценка измеренных токенов по подтверждённым публичным тарифам, не фактическое списание подписки или кредитов.

| Этап | Токены | Свежий вход | Кэшированный вход | Выход | API USD |
|---|---:|---:|---:|---:|---:|
| INIT | 12,965,114 | 840,384 | 11,994,752 | 129,978 | $0.6028576 |
| BASE | 88,746,265 | 1,944,600 | 86,409,472 | 392,193 | $16.4520772 |
| WEEK1 | 111,354,957 | 3,192,674 | 107,749,632 | 412,651 | $21.2868212 |
| WEEK2 | 128,353,255 | 2,805,731 | 125,114,368 | 433,156 | $22.4544588 |
| **Итого** | **341,419,591** | 8,783,389 | 331,268,224 | 1,367,978 | **$60.7962148** |

## Что включено

INIT — начальное подключение TFW; BASE — каркас локального учебного сайта; WEEK1 — инкапсуляция/Avtobys; WEEK2 — SOLID/DI. Все четыре задания DONE, независимые результаты приняты по их status/RF/REVIEW. Числа включают измеренные планирование, исследование, реализацию, проверки и сопроводительные действия ролей, а не только написание кода.

## Тариф и формула

USD = fresh × тариф fresh / 1 000 000 + cached × тариф cached / 1 000 000 + output × тариф output / 1 000 000. Cache writes во всех выбранных строках — 0. Reasoning уже входит в output; кэш уже входит в input и не прибавляется дважды.

| Модель | Свежий вход / млн | Кэш / млн | Выход / млн | Источник |
|---|---:|---:|---:|---|
| gpt-6.1-sol | $2.00 | $0.10 | $10.00 | https://developers.openai.com/api/docs/models/gpt-6.1-sol |
| gpt-6-luna | $0.10 | $0.01 | $0.50 | https://developers.openai.com/api/docs/models/gpt-6-luna |

Сценарий: Standard, каждый запрос не более 272K input, без региональной надбавки. Реальные request bands/tiers неизвестны, поэтому сценарий не объявляется фактическим счётом. Даты начала действия тарифов не установлены: это current_revaluation, а не историческая реконструкция. Весь BASE/WEEK1/WEEK2 — gpt-6.1-sol; INIT также содержит gpt-6-luna. Для Sol переиспользована точная сохранённая котировка от 2026-10-15 (моложе 30 дней), совпавшая с повторно прочитанной официальной страницей; Luna проверена при этом расчёте.

Неизменяемая использованная база: [0c3fe850ef0a305b3d7cd9b8a9d6ab29fed4c121669912429da0866155605c18.json](economics-2026-10-21/economics/quotes/0c3fe850ef0a305b3d7cd9b8a9d6ab29fed4c121669912429da0866155605c18.json), SHA-256 `0c3fe850ef0a305b3d7cd9b8a9d6ab29fed4c121669912429da0866155605c18`.

## Покрытие и ограничения

- INIT неполон: Координатор вернул task_bound_unresolved вместо измеренного расхода. Поздний researcher-r2 исключён: unproved successor overlap; взят валидный r1, прежний полезный результат не потерян. Поэтому INIT и общий объём — измеренная часть, не полный lifetime расход.
- BASE: взято по одному последнему возвращённому snapshot каждого из четырёх различных источников; coordinator/researcher incomplete. Старые snapshots, ранний task-1-economics и копии roles не складывались.
- WEEK1/WEEK2: штатное reconciliation возвращённых файлов, без сложения накопительных ревизий. Между четырьмя этапами одинаковых native source IDs нет.
- Вне расчёта: отдельные Daily, текущий чат статусов/публикации/анализа, последующие push/deploy и конечные хвосты после cutoff; раннее обсуждение до INIT без возвращённых измерений тоже не включено. Это не полный расход аккаунта.
- Ошибки/расхождения native counters сохранены в исходных JSONL. Суммировался единственный уже проверенный response stream, не обе альтернативные системы счёта.

## Сверка выбора

**INIT:** Штатные validate_file/reconcile: verified successors заменяют predecessor, disjoint ranges складываются, одинаковые bytes учитываются один раз. Измерено units: 2.
**BASE:** Последний полученный snapshot каждого из 4 источников по принятому economics.md. Coordinator/researcher complete=false; это частичное покрытие, не complete successor reconciliation. Измерено units: 4.
**WEEK1:** Штатные validate_file/reconcile: verified successors заменяют predecessor, disjoint ranges складываются, одинаковые bytes учитываются один раз. Измерено units: 5.
**WEEK2:** Штатные validate_file/reconcile: verified successors заменяют predecessor, disjoint ranges складываются, одинаковые bytes учитываются один раз. Измерено units: 4.

| Этап | Файл | SHA-256 | Revision / range | Complete bound | Cutoff UTC |
|---|---|---|---|---|---|
| INIT | `workspace\2026\OOP_20261008-204754_INIT\economics\roles\researcher_01a11c34-f5c1-78e0-85ed-31e05181e193_r1.jsonl` | `b713fba7dc9ecfc3f83786bff7c29368b852ce4942560829ccee720bff8a5798` | 1 / [0,445) | False | 2026-10-08T16:05:11.020330+00:00 |
| INIT | `workspace\2026\OOP_20261008-204754_INIT\economics\roles\reviewer_01a11c56-112e-7a61-ab8f-09d6d64a663a_r1.jsonl` | `ab6653a6b37310092648d9a6e69b8c09f37a9853340f8688f27630b34217bfe6` | 1 / [0,858) | False | 2026-10-08T16:50:18.834712+00:00 |
| BASE | `workspace\2026\OOP_20261013-230804_BASE\economics\coordinator-r34.jsonl` | `d32e5f45a0d3969366ee6c049d1fd2d72f2354234dfa424cdb6fcc65c4e284ee` | 34 / [0,2381) | False | 2026-10-14T07:08:20.495279+00:00 |
| BASE | `workspace\2026\OOP_20261013-230804_BASE\economics\researcher-r12.jsonl` | `c99aba8f98520e05f1b823982dd31f9538c4c48a154a014fe0f0035b034f6df5` | 12 / [0,814) | False | 2026-10-13T20:51:19.029747+00:00 |
| BASE | `workspace\2026\OOP_20261013-230804_BASE\economics\executor-r2.jsonl` | `c3c4c06a262ae3ede0f970062d77a5a509bb07c0463cd936ffd80fcfa1a874af` | 2 / [0,364) | True | 2026-10-13T21:35:55.927095+00:00 |
| BASE | `workspace\2026\OOP_20261013-230804_BASE\economics\reviewer-r2.jsonl` | `63093b4e27db05816e275fd29049964dc4cd10ef6c5fe987f6f56ffb70f473f7` | 2 / [0,337) | True | 2026-10-14T06:55:36.146914+00:00 |
| WEEK1 | `workspace\2026\OOP_20261015-170833_WEEK1\economics\roles\0a76791bd3427666064bd5a6c3e360802c9edba60adcf728f5a3db1cb20297c1.jsonl` | `0a76791bd3427666064bd5a6c3e360802c9edba60adcf728f5a3db1cb20297c1` | 3 / [0,748) | True | 2026-10-16T06:13:41.545001+00:00 |
| WEEK1 | `workspace\2026\OOP_20261015-170833_WEEK1\economics\roles\49845f8c09edd2a4cab9e9002ccd93ac9809d5c54125784e8b83d48f9b16e1b4.jsonl` | `49845f8c09edd2a4cab9e9002ccd93ac9809d5c54125784e8b83d48f9b16e1b4` | 2 / [281,398) | False | 2026-10-15T12:19:11.234360+00:00 |
| WEEK1 | `workspace\2026\OOP_20261015-170833_WEEK1\economics\roles\87abb959324610c5c7808be82ed91f62a1257f9c3646783403faa84041a5eaf0.jsonl` | `87abb959324610c5c7808be82ed91f62a1257f9c3646783403faa84041a5eaf0` | 8 / [0,1946) | True | 2026-10-16T06:16:26.487992+00:00 |
| WEEK1 | `workspace\2026\OOP_20261015-170833_WEEK1\economics\roles\abfd5048c7c5241a7b6ab46de9e554c0dca73e7fb3314445d9f43c1af6dc7092.jsonl` | `abfd5048c7c5241a7b6ab46de9e554c0dca73e7fb3314445d9f43c1af6dc7092` | 1 / [100,281) | False | 2026-10-15T12:13:56.641119+00:00 |
| WEEK1 | `workspace\2026\OOP_20261015-170833_WEEK1\economics\roles\d6651b72c5e3fafdfcb511444d93d9989847e22d70fcdafd7b31c7f612537877.jsonl` | `d6651b72c5e3fafdfcb511444d93d9989847e22d70fcdafd7b31c7f612537877` | 2 / [0,780) | True | 2026-10-15T20:59:01.773376+00:00 |
| WEEK1 | `workspace\2026\OOP_20261015-170833_WEEK1\economics\roles\e8be23c41bfed822fc44d3481b4e42e9320c89b507841bf3c4bfbfdd9bfaf9bd.jsonl` | `e8be23c41bfed822fc44d3481b4e42e9320c89b507841bf3c4bfbfdd9bfaf9bd` | 2 / [0,725) | True | 2026-10-15T15:29:17.842405+00:00 |
| WEEK2 | `workspace\2026\OOP_20261018-194835_WEEK2\economics\roles\17cca2200cc4fea929beb463430c374143e7343b62eea7ef07adae9c9689c201.jsonl` | `17cca2200cc4fea929beb463430c374143e7343b62eea7ef07adae9c9689c201` | 1 / [0,420) | True | 2026-10-19T10:06:22.737579+00:00 |
| WEEK2 | `workspace\2026\OOP_20261018-194835_WEEK2\economics\roles\5dbabc1455fa120ec2e3892405a71569c4edcbc622df9066c769406e5340987a.jsonl` | `5dbabc1455fa120ec2e3892405a71569c4edcbc622df9066c769406e5340987a` | 8 / [0,2854) | True | 2026-10-20T00:54:51.865120+00:00 |
| WEEK2 | `workspace\2026\OOP_20261018-194835_WEEK2\economics\roles\70e20bdb811688e1d1a6db6d20a244c9a88b8b9902a6770a7f639adac0f4e99b.jsonl` | `70e20bdb811688e1d1a6db6d20a244c9a88b8b9902a6770a7f639adac0f4e99b` | 3 / [0,1132) | True | 2026-10-19T09:08:54.459261+00:00 |
| WEEK2 | `workspace\2026\OOP_20261018-194835_WEEK2\economics\roles\d7232488758fabcbb62374905e35376c84b44c967ad8d1f187c4d2617cfd4355.jsonl` | `d7232488758fabcbb62374905e35376c84b44c967ad8d1f187c4d2617cfd4355` | 3 / [0,595) | True | 2026-10-20T00:24:36.949208+00:00 |

Complete означает полноту выбранной границы источника, а не полноту всех будущих действий.

Исключённые при reconciliation SHA-256:

- INIT: `0b594f9791bafdb8dac0afa38c6f7451c9ffd6bb21475c2f999633e2d7e06a85`
- INIT: `f4d098fbe68117b604b22bd89d5be5f611b1d59569c0e990f5dcbe89378fb6ee`
- WEEK1: `05340bfb0dba0fff8abbdada7733cd2122a24f579dde99b74eb7166f2dea95d7`
- WEEK1: `1b9fc1bc7913038815318451ce0ed93988f8fb6f7e00ca35592c58b0f5b84966`
- WEEK1: `42de40fdf617922734b59492698b349fb1559570ea62c720fba092a5723daaaa`
- WEEK1: `47b1c2ca602aaef824293f83acd46389859ee78ce418db3ed13ad5f6bd4fb77e`
- WEEK1: `4c7082d1f7fc327e8ab71185bef74bdad07d442281c6f6a2e2de3fc93327ec2c`
- WEEK1: `613e6966158d53959b1727ae47d3b88aa8b240a95e833c73abc9f8f3556f6c76`
- WEEK1: `7fe46160e5011c89cb7ae9fb005769d9a9427611748b7070aea9ab133b6d16ce`
- WEEK1: `a5cdf26c64ef9f1a319378edaf9aa89abc27433b7647282bbf9c09e58e8de57c`
- WEEK1: `acce4fcb1aa88b564a5eeb29ea7e59f7ea14157e7537dc8a0f874b3d92ac136e`
- WEEK1: `c421639c494a05e4794a8a0d894532cb66586ff9dd775219638f700eb71967db`
- WEEK1: `ee4431428f02b29fd7908a7daba8c29dfa8a3c7d8582276ac8c632685abeb4a7`
- WEEK2: `07c923100a7f5ddd1f154d345780f48788da5994743a53f36ac61754ba6400d7`
- WEEK2: `4129dd7c08bd2862b50ce36de833b914bc8e3acad6eda8301719dce3d0672d10`
- WEEK2: `4f79804b230ad374b14a1c5eb889d44a7a60c0ca31fa4340272b43f68c76e93d`
- WEEK2: `8acb79e56d0e6b9aab15f723ea6226046c16693b8b2aefd674407974a67eab0f`
- WEEK2: `a0d7748f3d225362d50683ee4d5743e7b9198685df8aaa280b48cc2d7016c08b`
- WEEK2: `a7355e37538f1523717c5e1bfc9d035b6b1ca0e3707e1d7d796ccca107d23260`
- WEEK2: `a83f15f916607aba0d3a94c14267fb46b3e711b50b55aef3b4bf1b3b776a1828`
- WEEK2: `ab8ab4f456bda2ec73b3ea5a64242e6ae7fcaee3565b3b09f6c334c30a456772`
- WEEK2: `e3421ae9c992e519809680d9421f4bb1d1b63022a4f0033d8530ed2bc905962e`
- WEEK2: `ee36894ace862ca9c89fbe9f273e4537b6ab3b80e0bf6a6accf43391e944d4b3`
- WEEK2: `ef256bb474331d76c31ae743261f7aabb287b3eb4436526fc89d313059a11cd8`

Точные failure receipts:

- codex:thread:local:01a11c19-1d6a-72b3-8b7f-c28da8ff3829: task_bound_unresolved; [0,1); SHA `f4d098fbe68117b604b22bd89d5be5f611b1d59569c0e990f5dcbe89378fb6ee`; Collection preflight failed timezone and source ID. Metadata read identified two root-ID rollouts; exclusive task bound was not proven and physical line-count read was refused because source was in use. Attempted 0:1 is metadata-only, not task coverage. No measured usage or cost is claimed.
- codex:thread:local:01a14fe6-b83e-7b91-9916-9d8ebad36666: capture_preparation_failed; [0,601); SHA `ee36894ace862ca9c89fbe9f273e4537b6ab3b80e0bf6a6accf43391e944d4b3`; First preparation could not count the actively written own rollout with .NET File.ReadLines (sharing violation). Unresolved end became empty; collect and failure argument parsing rejected --end before numeric extraction. This receipt binds the now-observed source end, not a reconstructed original cutoff; no measured coverage.

## Интерпретация

Кэш — 97.42% входных токенов; его цена существенно ниже свежего входа. Поэтому нельзя умножать все 341 млн на цену свежего input. По этим данным нельзя определить отдельную цену интеграции TFW внутри WEEK1/WEEK2 или экономию от процесса: это расходы связанных заданий целиком. Обоснованное улучшение учёта — не допускать failure-only Coordinator и непроверяемых successor prefixes в будущих INIT; предполагаемая долларовая экономия от этого не заявляется.
