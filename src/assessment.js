export const MODULE_VERSION = 'WEEK1 · 1.0 · 2026-10-16';

const question = (id, title, options, correct, explanation) => ({ id, title, options, correct, explanation });
export const groups = [
  { id: 'basics', title: 'Основы · 8 баллов', context: 'Один ответ — один балл.', questions: [
    question('class', 'Bus — класс; a = Bus(...), b = Bus(...) с одинаковыми данными. Что верно?',
      ['a и b обязательно один объект', 'Это два экземпляра; равные данные не делают их одним объектом', 'Bus — конкретный пассажир'], 1,
      'Класс задаёт устройство экземпляров. Два вызова создают разные объекты; идентичность отличается от равенства состояния.'),
    question('invariant', 'Какой инвариант пассажиров автобуса верен после успеха и отказа?',
      ['current_passengers > 0', 'current_passengers = capacity всегда', '0 <= current_passengers <= capacity'], 2,
      'Пустой автобус допустим. Отказ тоже обязан сохранить число в допустимых границах.'),
    question('responsibility', 'Кто должен проверять баланс и менять его при оплате?',
      ['Метод карты pay(fare)', 'Каждый вызывающий экран отдельно', 'Общий setter balance без проверок'], 0,
      'Карта объединяет правило и изменение состояния. Это Tell, Don’t Ask; чтение balance для отчёта остаётся допустимым.'),
    question('private', 'Что означает поле _balance в Python?',
      ['Оно зашифровано', 'Это соглашение о непубличной детали, а не запрет намеренного доступа', 'Никто не может его прочитать'], 1,
      'Подчёркивание обозначает внутренний интерфейс. Property без setter ограничивает обычное публичное присваивание, но Python не становится песочницей.'),
    question('decimal', 'Как задать точную десятичную сумму 0.10?',
      ['Decimal(0.1)', 'float("0.10")', 'Decimal("0.10")'], 2,
      'Строка сохраняет десятичную запись. Decimal из float получает уже существующее двоичное приближение.'),
    question('discount', 'Тариф Decimal("100.00"), скидка Decimal("0.25"). Сколько спишет активная карта с достаточным балансом?',
      ['75.00', '25.00', '125.00'], 0,
      'Скидка — неоплачиваемая доля: 100 × (1 − 0.25) = 75. Полная скидка даёт нулевую сумму, но не отменяет блокировку.'),
    question('exception', 'Чем полезен InsufficientFundsError в контракте pay?',
      ['Автоматически отменяет уже выполненное списание', 'Различает причину отказа; код должен сам сохранить баланс', 'Разрешает отрицательный остаток'], 1,
      'Исключение сообщает причину. Оно не откатывает присваивания: проверка достаточности должна стоять до списания.'),
    question('time', 'Как проверять срок билета без ожидания 60 минут?',
      ['Удалить проверку срока', 'Ждать sleep(3600)', 'Передать фиксированные aware issued_at и now'], 2,
      'В учебной адаптации явное now делает границы воспроизводимыми. В рабочем вызове now можно не передавать; используется UTC.'),
  ] },
  { id: 'card', title: 'Случай 1 · Ошибка карты · 3 балла', context: 'Ошибочный класс разрешает card.balance = -1. В pay он сначала уменьшает balance и лишь потом проверяет, стал ли он отрицательным. Каждый вопрос описывает отдельное наблюдение.', questions: [
    question('card-access', 'Как клиент обходит инвариант?',
      ['Любое чтение balance меняет его', 'Публичное присваивание balance позволяет записать -1', 'Исключение скрывает баланс'], 1,
      'Свободная публичная запись обходит доменную операцию. Нужен интерфейс чтения и проверенные top_up/pay.'),
    question('card-damage', 'Баланс до pay равен 50.00, пытаются списать 100.00. Ошибочный метод меняет баланс, затем бросает исключение. Что осталось?',
      ['-50.00: исключение не отменяет присваивание', '50.00: Python сам откатывает', '100.00: возвращён тариф'], 0,
      'Списание до проверки оставляет -50.00. Само возникновение ошибки не восстанавливает состояние.'),
    question('card-order', 'Какой порядок защищает исправный pay?',
      ['Списать → проверить → при ошибке надеяться на откат', 'Проверить только в интерфейсе сайта', 'Проверить блокировку/тариф/скидочную сумму/остаток → изменить баланс → вернуть сумму'], 2,
      'Все причины отказа проверяются до изменения. При нехватке допустимый старый баланс сохраняется.'),
  ] },
  { id: 'ticket', title: 'Случай 2 · Билет · 3 балла', context: 'Каждая часть начинает с отдельно заданного билета. Ответ на предыдущую часть не меняет следующую. Один балл требует одновременно правильного исхода и состояния. Возраст допустим при 0 ≤ возраст < 60 минут; валидация не сажает пассажиров.', questions: [
    question('ticket-new', 'Отдельный новый билет: is_validated=False, возраст 10 минут, допустимый Bus. validate(bus) даёт…',
      ['Успех; is_validated=True', 'Успех; is_validated=False', 'TicketExpiredError; False'], 0,
      'Новый непросроченный билет становится использованным только после успешных проверок.'),
    question('ticket-used', 'Отдельный билет уже использован в Bus A: is_validated=True, возраст 20 минут. Проверяют в Bus B. Результат?',
      ['Успех; True', 'TicketAlreadyUsedError; False', 'TicketAlreadyUsedError; True'], 2,
      'Одноразовость принадлежит всему билету, а не паре билет/автобус. Отказ сохраняет True.'),
    question('ticket-expired', 'Отдельный новый билет: is_validated=False, возраст ровно 60:00. Допустимый Bus. Результат?',
      ['Успех; True', 'TicketExpiredError; False', 'TicketExpiredError; True'], 1,
      'В этой явной адаптации верхняя граница исключена. Первая просрочка отвергается до изменения, поэтому False сохраняется.'),
  ] },
  { id: 'route', title: 'Случай 3 · Коллекция Route · 3 балла', context: 'Конструктор сохраняет переданный список stops напрямую, а property возвращает этот же список. Сначала в нём ["A", "B"].', questions: [
    question('route-leak', 'Что произойдёт после route.stops.clear()?',
      ['Property без setter запретит clear', 'Очистится только временная копия', 'Внутри маршрута останется 0 остановок: инвариант нарушен'], 2,
      'Отсутствие setter запрещает замену свойства, но не изменение объекта, на который оно ссылается.'),
    question('route-protect', 'Как защитить и входную ссылку, и выдаваемое значение?',
      ['Скопировать нормализованные строки в tuple и возвращать его', 'Только убрать setter, возвращая исходный list', 'Сохранить исходный list под именем с _'], 0,
      'Копирование отделяет входной список; tuple со строками нельзя очистить через публичный интерфейс.'),
    question('route-proof', 'Какое наблюдение обнаруживает утечку входного списка?',
      ['Проверить только route_number', 'Создать Route из stops, очистить stops, проверить route.stops == ("A", "B")', 'Проверить только что ошибок не было'], 1,
      'Проверяется состояние после внешней мутации. Дополнительно нужно проверить, что выдаваемое значение тоже нельзя разрушить.'),
  ] },
  { id: 'bus', title: 'Случай 4 · Переполнение Bus · 3 балла', context: 'В каждой части заново задан автобус: capacity=10, current_passengers=9; вызов board_passengers(2).', questions: [
    question('bus-error', 'Какой исход требует контракт?',
      ['Успешная посадка', 'CapacityExceededError', 'TicketExpiredError'], 1,
      '9 + 2 > 10, поэтому посадка отвергается доменным исключением переполнения.'),
    question('bus-state', 'Сколько пассажиров должно остаться после отказа исправного метода?',
      ['11', '0', '9'], 2,
      'Отклонённая операция не добавляет людей и не обнуляет салон. Прежнее значение 9 сохраняется.'),
    question('bus-proof', 'Какой тест поймает метод, который сначала добавил людей, затем бросил ошибку?',
      ['pytest.raises(CapacityExceededError) и затем assert bus.current_passengers == 9', 'Только pytest.raises(CapacityExceededError)', 'Только assert bus.capacity == 10'], 0,
      'Одно исключение не доказывает сохранность. Assert после отказа обнаружит оставшиеся 11 пассажиров.'),
  ] },
];

export const questions = groups.flatMap((group) => group.questions);
export function newAttempt() { return { answers: {}, result: null, missing: [] }; }

export function grade(answers) {
  const missing = questions.filter((q) => !Number.isInteger(answers[q.id]) || !q.options[answers[q.id]]).map((q) => q.id);
  if (missing.length) return { complete: false, missing, score: null };
  return { complete: true, missing: [], score: questions.reduce((sum, q) => sum + Number(answers[q.id] === q.correct), 0) };
}

export function attemptReducer(state, action) {
  if (action.type === 'reset') return newAttempt();
  if (state.result) return state;
  if (action.type === 'answer') {
    const q = questions.find((item) => item.id === action.id);
    if (!q || !Number.isInteger(action.value) || !q.options[action.value]) return state;
    return { ...state, answers: { ...state.answers, [q.id]: action.value }, missing: [] };
  }
  if (action.type === 'finish') {
    const assessed = grade(state.answers);
    if (!assessed.complete) return { ...state, missing: assessed.missing };
    return { ...state, missing: [], result: { score: assessed.score, completedAt: action.completedAt, version: MODULE_VERSION } };
  }
  return state;
}

export function resultText(attempt) {
  if (!attempt.result) return null;
  return [
    'Неделя 1 · Инкапсуляция и доменная модель Avtobys',
    `Версия: ${attempt.result.version}`,
    `Дата завершения (ISO 8601): ${attempt.result.completedAt}`,
    `Онлайн-самопроверка выбранных действий: ${attempt.result.score}/20`,
    '8 базовых вопросов × 1 + 4 случая × 3 отдельных компонента. Каждый компонент = 0 или 1.',
    'Это результат выбранных ответов, не автоматическая проверка Python-кода.',
    'Лабораторная оценивается отдельно вручную: Route/Bus 5 + карта/билет 7 + тесты 5 + защита 3 = 20. Баллы не суммируются.',
    '',
    ...groups.flatMap((group) => [group.title, ...group.questions.map((q) =>
      `${q.title}\nОтвет: ${q.options[attempt.answers[q.id]]}\nБалл: ${Number(attempt.answers[q.id] === q.correct)}/1\nВерно: ${q.options[q.correct]}\nРазбор: ${q.explanation}\n`)]),
  ].join('\n');
}
