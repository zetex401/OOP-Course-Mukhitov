export const weeks = [
  { id: 1, title: 'Инкапсуляция и Avtobys', description: 'Учимся защищать состояние: от поломки баланса к четырём классам, проверяемым отказам и своей Python-модели.', note: 'План: теория 60 минут + практика 60 минут + самостоятельная работа 60 минут · Python 3.12+' },
  { id: 2, title: 'Принципы проектирования SOLID и Dependency Injection', description: 'Архитектурный порядок: распределяем ответственность, сохраняем контракты и связываем компоненты через зависимости.', note: 'План: теория 60 минут + практика 60 минут + самостоятельная работа 60 минут · Python 3.12+' },
];

export function courseHref(week, section) {
  return week === 2 ? `#week-2/${section}` : `#${section}`;
}

export function courseRoute(hash) {
  const week = hash.startsWith('#week-2/') ? 2 : 1;
  const section = week === 2 ? hash.slice('#week-2/'.length) : hash.slice(1);
  const alias = { answers: 'tests', 'practice-contract': 'practice' };
  const allowed = ['home', 'theory', 'practice', 'tests', 'results'];
  return { week, section: allowed.includes(alias[section] || section) ? (alias[section] || section) : 'home' };
}
