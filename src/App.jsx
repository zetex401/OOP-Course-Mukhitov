import { useEffect, useRef, useState } from 'react';

const sections = [
  { id: 'home', title: 'Главная' },
  {
    id: 'theory', title: 'Теория', number: '01',
    description: 'Понятные объяснения основ ООП и примеры кода.',
    future: 'Здесь появятся материалы об объектах, классах и принципах ООП. Будем разбирать примеры и учиться понимать структуру программ.',
  },
  {
    id: 'practice', title: 'Практика', number: '02',
    description: 'Учебные задания и работа с примерами.',
    future: 'Здесь появятся задания для самостоятельной работы. Позже обсудим взаимную проверку решений по понятным критериям.',
  },
  {
    id: 'tests', title: 'Тестирование', number: '03',
    description: 'Вопросы для проверки понимания и сверки решений.',
    future: 'Здесь появятся вопросы по изученным темам и способы сверить решения. Сейчас действующих тестов и оценивания нет.',
  },
  {
    id: 'results', title: 'Результаты', number: '04',
    description: 'Итоги обучения и личный прогресс.',
    future: 'Здесь будем видеть результаты учебной работы и прогресс. Сейчас результаты не рассчитываются и не сохраняются.',
  },
];

function currentSection() {
  return sections.find((section) => `#${section.id}` === window.location.hash) || sections[0];
}

export default function App() {
  const [section, setSection] = useState(currentSection);
  const heading = useRef(null);
  const movedFocus = useRef(false);

  useEffect(() => {
    function navigate() {
      const active = document.activeElement;
      movedFocus.current = active !== document.body && !!active?.closest('main');
      setSection(currentSection());
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
  }, [section]);

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
              <p className="muted hero-note">Это первый каркас. Материалы и учебные функции добавим позже.</p>
            </section>
            <section className="section-list" aria-labelledby="sections-title">
              <div className="section-intro">
                <h2 id="sections-title">Разделы обучения</h2>
                <p className="muted">Выберите, с чего продолжить знакомство с платформой.</p>
              </div>
              <div className="card-grid">
                {sections.slice(1).map((item) => (
                  <a className="section-card" key={item.id} href={`#${item.id}`}>
                    <span className="card-number" aria-hidden="true">{item.number}</span>
                    <span className="badge">Скоро</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <span className="card-action">Перейти в раздел <span aria-hidden="true">→</span></span>
                  </a>
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className="placeholder" aria-labelledby="page-title">
            <p className="eyebrow">Раздел {section.number} · Учимся вместе</p>
            <h1 id="page-title" ref={heading} tabIndex={-1}>{section.title}</h1>
            <p className="placeholder-description">{section.description}</p>
            <div className="notice">
              <span className="badge">Заглушка · наполнение впереди</span>
              <h2>Раздел готовится</h2>
              <p>{section.future}</p>
              <p className="muted">Пока можно изучить структуру сайта и переходить между разделами.</p>
            </div>
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
