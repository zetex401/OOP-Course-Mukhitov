import { useEffect, useReducer, useRef, useState } from 'react';
import StudyMaterial from './StudyMaterial.jsx';
import Assessment, { AttemptResult } from './Assessment.jsx';
import * as week1Assessment from './assessment.js';
import * as week2Assessment from './assessment2.js';
import { weeks, courseHref, courseRoute } from './course.js';

const assessments = { 1: week1Assessment, 2: week2Assessment };
function reduceAttempts(state, action) {
  return { ...state, [action.week]: assessments[action.week].attemptReducer(state[action.week], action) };
}

const sections = [
  { id: 'home', title: 'Главная' },
  {
    id: 'theory', title: 'Теория', number: '01',
    description: 'Понятные объяснения основ ООП и примеры кода.',
  },
  {
    id: 'practice', title: 'Практика', number: '02',
    description: 'Учебные задания и работа с примерами.',
  },
  {
    id: 'tests', title: 'Тестирование', number: '03',
    description: 'Вопросы для проверки понимания и сверки решений.',
  },
  {
    id: 'results', title: 'Результаты', number: '04',
    description: 'Завершённая попытка, разбор и файл результата.',
  },
];

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);
  const [attempts, dispatchAttempt] = useReducer(reduceAttempts, undefined, () => ({ 1: week1Assessment.newAttempt(), 2: week2Assessment.newAttempt() }));
  const route = courseRoute(hash);
  const week = weeks.find((item) => item.id === route.week);
  const section = sections.find((item) => item.id === route.section);
  const visibleSections = sections;
  const attempt = attempts[week.id];
  const dispatch = (action) => dispatchAttempt({ ...action, week: week.id });
  const model = assessments[week.id];
  const href = (id) => courseHref(week.id, id);
  const heading = useRef(null);
  const movedFocus = useRef(false);

  useEffect(() => {
    function navigate() {
      const active = document.activeElement;
      movedFocus.current = active !== document.body && !!active?.closest('main');
      setHash(window.location.hash);
    }
    window.addEventListener('hashchange', navigate);
    return () => window.removeEventListener('hashchange', navigate);
  }, []);

  useEffect(() => {
    document.title = section.id === 'home'
      ? `Неделя ${week.id} — ООП`
      : `${section.title} · Неделя ${week.id} — ООП`;
    if (movedFocus.current) {
      heading.current?.focus();
      movedFocus.current = false;
    }
    if (hash.endsWith('answers') || hash.endsWith('practice-contract')) {
      const answers = document.getElementById(hash.split('/').at(-1).replace('#', ''));
      answers?.scrollIntoView();
      answers?.querySelector('summary')?.focus();
    }
  }, [section, hash, week.id]);

  return (
    <>
      <a className="skip-link" href="#content" onClick={(event) => {
        event.preventDefault();
        heading.current?.focus();
      }}>К содержимому</a>
      <header className="site-header">
        <div className="container">
          <a className="brand" href={href('home')} aria-label="ООП — на главную">
            <span className="brand-mark" aria-hidden="true">ООП</span>
            <span>Учебная платформа<span className="brand-caption">Учимся вместе</span></span>
          </a>
          <nav className="week-nav" aria-label="Выбор недели">
            {weeks.map((item) => <a key={item.id} href={courseHref(item.id, 'home')} aria-current={week.id === item.id ? 'true' : undefined}>Неделя {item.id} · {item.id === 1 ? 'Инкапсуляция' : 'SOLID и DI'}</a>)}
          </nav>
          <nav aria-label="Основная навигация">
            {visibleSections.map((item) => (
              <a key={item.id} href={href(item.id)} aria-current={section.id === item.id ? 'page' : undefined}>
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="content" className="container" key={`${week.id}-${section.id}`}>
        {section.id === 'home' ? (
          <>
            <section className="hero" aria-labelledby="page-title">
              <p className="eyebrow">Для нашей учебной группы</p>
              <h1 id="page-title" ref={heading} tabIndex={-1}>Неделя {week.id}. {week.title}</h1>
              <p className="hero-description">{week.description}</p>
              <a className="primary-link" href={href('theory')}>Начать обучение <span aria-hidden="true">→</span></a>
              <p className="muted hero-note">{week.note}</p>
            </section>
            <section className="section-list" aria-labelledby="sections-title">
              <div className="section-intro">
                <h2 id="sections-title">Разделы обучения</h2>
                <p className="muted">{week.id === 2 ? 'Теория, пошаговая практика в VS Code, самостоятельное расширение и самопроверка 0–20. План 60 + 60 + 60 минут; фактический темп группы не измерен.' : 'Один исходный комплект. Полная лабораторная, тесты, защита и онлайн-разбор включены в план 180 минут. Это план нагрузки; темп вашей группы пока не измерен.'}</p>
              </div>
              <div className="card-grid">
                {visibleSections.slice(1).map((item) => (
                  <a className="section-card" key={item.id} href={href(item.id)}>
                    <span className="card-number" aria-hidden="true">{item.number}</span>
                    <span className="badge">Неделя {week.id}</span>
                    <h3>{item.title}</h3>
                    <p>{week.id === 2 && item.id === 'practice' ? 'Пошаговая сборка в VS Code: файлы, полный код и команды проверки.' : item.description}</p>
                    <span className="card-action">Перейти в раздел <span aria-hidden="true">→</span></span>
                  </a>
                ))}
              </div>
            </section>
            <StudyMaterial section="home" week={week.id} />
          </>
        ) : (
          <section className="lesson" aria-labelledby="page-title">
            <p className="eyebrow">Неделя {week.id} · {`Раздел ${section.number}`}</p>
            <h1 id="page-title" ref={heading} tabIndex={-1}>{week.id === 2 && section.id === 'theory' ? 'Архитектурный порядок и SOLID' : section.title}</h1>
            <p className="placeholder-description">{week.id === 2 && section.id === 'practice' ? 'Пошаговая сборка в VS Code: файлы, полный код и команды проверки.' : section.description}</p>
            {section.id === 'tests' && <Assessment attempt={attempt} dispatch={dispatch} model={model} week={week.id} />}
            {section.id === 'results' && <AttemptResult attempt={attempt} dispatch={dispatch} model={model} week={week.id} />}
            <StudyMaterial section={section.id} week={week.id} showAnswers={hash.endsWith('answers') || hash.endsWith('practice-contract')} />
            <a className="back-link" href={href('home')}>← На главную недели</a>
          </section>
        )}
      </main>
      <footer className="container site-footer">
        <p>ООП · Учебный проект нашей группы</p>
        <p>Начинаем с простого, развиваем постепенно.</p>
      </footer>
    </>
  );
}
