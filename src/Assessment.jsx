import { useEffect, useRef } from 'react';
import { groups, questions, MODULE_VERSION, resultText } from './assessment.js';

export function AttemptResult({ attempt, dispatch }) {
  const title = useRef(null);
  const copyField = useRef(null);
  useEffect(() => { if (attempt.result) title.current?.focus(); }, [attempt.result]);
  if (!attempt.result) return <article className="study-panel"><h2>Результата пока нет</h2>
    <p>Завершите все 20 компонентов в разделе «Тестирование». Ответы сохраняются при переходах в этой вкладке. Перезагрузка страницы начинает заново.</p>
    <a className="primary-link" href="#tests">Продолжить самопроверку</a></article>;
  return <article className="study-panel result-panel">
    <p className="eyebrow">Завершённая онлайн-попытка</p>
    <h2 ref={title} tabIndex={-1}>Самопроверка: {attempt.result.score}/20</h2>
    <p>{attempt.result.version}<br /><time dateTime={attempt.result.completedAt}>{new Date(attempt.result.completedAt).toLocaleString('ru-RU')}</time></p>
    <p>Проверены выбранные ответы. Написание Python-кода и свободное объяснение проверяются отдельно в лабораторной: 5 + 7 + 5 + 3 = 20. Эти две оценки не складываются.</p>
    <div className="attempt-actions"><button type="button" onClick={() => {
      copyField.current?.focus();
      copyField.current?.select();
    }}>Выделить результат для копирования</button>
      <a href="#tests">Посмотреть разбор всех ответов</a>
      <button type="button" className="secondary-button" onClick={() => dispatch({ type: 'reset' })}>Новая попытка — сбросить ответы</button></div>
    <label className="result-copy">Текст результата для копирования
      <textarea ref={copyField} readOnly rows={8} value={resultText(attempt)} />
    </label>
    <p className="muted">Нажмите «Выделить результат» и Ctrl+C (на macOS — Cmd+C), затем вставьте текст в свой файл и сохраните его. Можно выделить текст в поле через Ctrl+A. Сохраните итог до перезагрузки или сброса. Новая попытка удаляет текущие ответы и итог из этой вкладки.</p>
  </article>;
}

export default function Assessment({ attempt, dispatch }) {
  const firstMissing = useRef(null);
  useEffect(() => { if (attempt.missing.length) firstMissing.current?.focus(); }, [attempt.missing]);
  const answered = Object.keys(attempt.answers).length;
  function finish(event) {
    event.preventDefault();
    dispatch({ type: 'finish', completedAt: new Date().toISOString() });
  }
  return <>
    <article className="study-panel">
      <h2>Онлайн-самопроверка · 0–20</h2>
      <p>{MODULE_VERSION}. Восемь базовых вопросов и четыре случая по три отдельных компонента. Каждый верный ответ даёт 1 балл. Итог появится после всех 20 ответов и кнопки «Завершить попытку».</p>
      <p>Это проверка выбранных действий, а не исполнение вашего Python-кода. План: последние 20 минут самостоятельного блока — попытка, разбор и сохранение.</p>
      <p role="status">Заполнено {answered} из {questions.length}.{attempt.result ? ' Попытка завершена; ответы зафиксированы.' : ' Переходы по разделам сохраняют ответы в текущей вкладке.'}</p>
      {!!attempt.missing.length && <p className="attempt-error" role="alert">Осталось ответить: {attempt.missing.length}. Итог не сформирован. Фокус перемещён к первому пропуску.</p>}
    </article>
    <form onSubmit={finish}>
      {groups.map((group) => <section className="study-panel" key={group.id} aria-labelledby={`group-${group.id}`}>
        <h2 id={`group-${group.id}`}>{group.title}</h2><p>{group.context}</p>
        {group.questions.map((q) => <fieldset key={q.id} className={attempt.missing.includes(q.id) ? 'question missing' : 'question'} disabled={!!attempt.result}>
          <legend>{q.title}</legend>
          {q.options.map((option, index) => <label key={index} className="answer-option">
            <input type="radio" name={q.id} value={index} checked={attempt.answers[q.id] === index}
              ref={attempt.missing[0] === q.id && index === 0 ? firstMissing : undefined}
              onChange={() => dispatch({ type: 'answer', id: q.id, value: index })} />
            <span>{option}</span>
          </label>)}
          {attempt.result && <div className="answer-review">
            <p><strong>{attempt.answers[q.id] === q.correct ? 'Верно · 1/1' : 'Ошибка · 0/1'}</strong></p>
            <p>Правильный ответ: {q.options[q.correct]}</p><p>{q.explanation}</p>
          </div>}
        </fieldset>)}
      </section>)}
      {!attempt.result && <button className="finish-button" type="submit">Завершить попытку</button>}
    </form>
    {attempt.result && <AttemptResult attempt={attempt} dispatch={dispatch} />}
  </>;
}
