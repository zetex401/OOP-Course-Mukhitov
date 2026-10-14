import { useEffect, useRef, useState } from 'react';
import StudyMaterial from './StudyMaterial.jsx';

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
    description: 'Итоги обучения и личный прогресс.',
  },
];

function currentSection(hash) {
  return sections.find((section) => `#${section.id}` === (hash === '#answers' ? '#tests' : hash)) || sections[0];
}

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);
  const section = currentSection(hash);
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
      ? 'ООП — учебная платформа'
      : `${section.title} — ООП`;
    if (movedFocus.current) {
      heading.current?.focus();
      movedFocus.current = false;
    }
    if (hash === '#answers') {
      const answers = document.getElementById('answers');
      answers?.scrollIntoView();
      answers?.querySelector('summary')?.focus();
    }
  }, [section, hash]);

  return (
    <>
      <a className="skip-link" href="#content" onClick={(event) => {
        event.preventDefault();
        heading.current?.focus();
      }}>К содержимому</a>
      <header className="site-header">
        <div className="container">
          <a className="brand" href="#home" aria-label="ООП — на главную">
            <span className="brand-mark" aria-hidden="true">ООП</span>
            <span>Учебная платформа<span className="brand-caption">Учимся вместе</span></span>
          </a>
          <nav aria-label="Основная навигация">
            {sections.map((item) => (
              <a key={item.id} href={`#${item.id}`} aria-current={section.id === item.id ? 'page' : undefined}>
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="content" className="container" key={section.id}>
        {section.id === 'home' ? (
          <>
            <section className="hero" aria-labelledby="page-title">
              <p className="eyebrow">Для нашей учебной группы</p>
              <h1 id="page-title" ref={heading} tabIndex={-1}>ООП — учебная платформа</h1>
              <p className="hero-description">Разбираемся в объектно-ориентированном программировании: от понятных объяснений к самостоятельной практике.</p>
              <a className="primary-link" href="#theory">Начать обучение <span aria-hidden="true">→</span></a>
              <p className="muted hero-note">Неделя 1 · Python 3.12+ · Инкапсуляция и инварианты · Модель Avtobys</p>
            </section>
            <section className="section-list" aria-labelledby="sections-title">
              <div className="section-intro">
                <h2 id="sections-title">Разделы обучения</h2>
                <p className="muted">Пройдите теорию, выполните лабораторную и обсудите решение с напарником.</p>
              </div>
              <div className="card-grid">
                {sections.slice(1).map((item) => (
                  <a className="section-card" key={item.id} href={`#${item.id}`}>
                    <span className="card-number" aria-hidden="true">{item.number}</span>
                    <span className="badge">Неделя 1</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <span className="card-action">Перейти в раздел <span aria-hidden="true">→</span></span>
                  </a>
                ))}
              </div>
            </section>
            <StudyMaterial section="home" />
          </>
        ) : (
          <section className="lesson" aria-labelledby="page-title">
            <p className="eyebrow">Неделя 1 · Раздел {section.number}</p>
            <h1 id="page-title" ref={heading} tabIndex={-1}>{section.title}</h1>
            <p className="placeholder-description">{section.description}</p>
            <StudyMaterial section={section.id} showAnswers={hash === '#answers'} />
            <a className="back-link" href="#home">← На главную</a>
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
