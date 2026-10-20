import { useRef, useState } from 'react';
import overview from '../materials/week-01/README.md?raw';
import theory from '../materials/week-01/theory.md?raw';
import practice from '../materials/week-01/practice.md?raw';
import quiz from '../materials/week-01/quiz.md?raw';
import answers from '../materials/week-01/answers.md?raw';
import solution from '../materials/week-01/examples/reference_solution.py?raw';
import tests from '../materials/week-01/examples/test_reference.py?raw';
import coursePlan from '../materials/course-plan.md?raw';
import week2Overview from '../materials/week-02/README.md?raw';
import week2Theory from '../materials/week-02/theory.md?raw';
import week2Example from '../materials/week-02/examples/solid_demo.py?raw';
import week2Walkthrough from '../materials/week-02/walkthrough.md?raw';
import week2Practice from '../materials/week-02/practice.md?raw';
import week2Quiz from '../materials/week-02/quiz.md?raw';
import week2Answers from '../materials/week-02/answers.md?raw';
import { courseHref } from './course.js';

const downloads = import.meta.glob('../materials/**/*', {
  query: '?url', import: 'default', eager: true,
});
const sources = import.meta.glob('../.tfw/COURSE-MATERIALS/*.pdf', {
  query: '?url', import: 'default', eager: true,
});
const pages = { 'README.md': '#home', 'theory.md': '#theory', 'practice.md': '#practice', 'quiz.md': '#tests', 'answers.md': '#answers' };
const week2Pages = { ...pages, 'practice.md': '#practice-contract', 'walkthrough.md': '#practice' };

function CodeBlock({ code, language = 'text', label }) {
  const content = useRef(null);
  const [status, setStatus] = useState('');

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus('Скопировано');
    } catch {
      const selection = window.getSelection();
      if (selection && content.current) {
        const range = document.createRange();
        range.selectNodeContents(content.current);
        selection.removeAllRanges();
        selection.addRange(range);
        content.current.parentElement.focus();
        setStatus('Код выделен — нажмите Ctrl+C или Cmd+C');
      } else {
        setStatus('Выделите код и скопируйте его вручную');
      }
    }
  }

  return <div className="code-block">
    <div className="code-toolbar">
      <span>{label || (language === 'powershell' ? 'Терминал · PowerShell' : language === 'python' ? 'Код · Python' : 'Образец вывода / структура')}</span>
      {language !== 'text' && <button type="button" className="secondary-button" onClick={copy}>Копировать</button>}
    </div>
    <pre tabIndex={0} aria-label={label || `Пример кода: ${language}`}><code ref={content}>{code}</code></pre>
    <span className="copy-status" role="status">{status}</span>
  </div>;
}

function materialLink(path, base) {
  if (base === 'week-02' && week2Pages[path]) return courseHref(2, week2Pages[path].slice(1));
  if (base === 'week-01' && pages[path]) return pages[path];
  const parts = ['..', 'materials', ...base.split('/').filter(Boolean), ...path.split('/')];
  const resolved = [];
  for (const part of parts) {
    if (part === '..' && resolved.length && resolved.at(-1) !== '..') resolved.pop();
    else if (part !== '.') resolved.push(part);
  }
  const key = resolved.join('/');
  const week2Page = key.startsWith('../materials/week-02/') ? key.slice('../materials/week-02/'.length) : null;
  if (week2Pages[week2Page]) return courseHref(2, week2Pages[week2Page].slice(1));
  const page = key.startsWith('../materials/week-01/') ? key.slice('../materials/week-01/'.length) : null;
  return pages[page] || downloads[key] || sources[key];
}

function inline(text, base) {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    if (part.startsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
    if (part.startsWith('**')) return <strong key={index}>{inline(part.slice(2, -2), base)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a key={index} href={/^https?:\/\//.test(link[2]) ? link[2] : materialLink(link[2], base)}>{link[1]}</a>;
    return part;
  });
}

// The course files use headings, paragraphs, lists, tables and fenced code only.
// Render that subset as React elements; document HTML is never executed.
function Markdown({ text, base = 'week-01' }) {
  const lines = text.replace(/\r/g, '').trim().split('\n');
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const key = i;
    if (!line.trim()) { i++; continue; }
    if (line.startsWith('```')) {
      const [language, ...label] = line.slice(3).trim().split(/\s+/);
      const code = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) code.push(lines[i++]);
      i++;
      blocks.push(<CodeBlock key={key} language={language || 'text'} label={label.join(' ')} code={code.join('\n')} />);
    } else if (/^#{1,3} /.test(line)) {
      const [, marks, title] = line.match(/^(#{1,3}) (.*)$/);
      const Heading = marks.length < 3 ? 'h2' : 'h3';
      blocks.push(<Heading key={key}>{inline(title, base)}</Heading>);
      i++;
    } else if (line.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        rows.push(lines[i++].slice(1, -1).split('|').map((cell) => cell.trim()));
      }
      blocks.push(<div className="table-scroll" key={key} tabIndex={0} role="region" aria-label="Учебная таблица: прокрутка по горизонтали">
        <table><thead><tr>{rows[0].map((cell, n) => <th key={n} scope="col">{inline(cell, base)}</th>)}</tr></thead>
          <tbody>{rows.slice(2).map((row, n) => <tr key={n}>{row.map((cell, j) => <td key={j}>{inline(cell, base)}</td>)}</tr>)}</tbody></table>
      </div>);
    } else if (/^(?:- |\d+\. )/.test(line)) {
      const ordered = /^\d+\. /.test(line);
      const pattern = ordered ? /^\d+\. / : /^- /;
      const items = [];
      while (i < lines.length && pattern.test(lines[i])) items.push(lines[i++].replace(pattern, ''));
      const List = ordered ? 'ol' : 'ul';
      blocks.push(<List key={key}>{items.map((item, n) => <li key={n}>{inline(item, base)}</li>)}</List>);
    } else {
      const paragraph = [];
      while (i < lines.length && lines[i].trim() && !/^(?:#{1,3} |```|\||- |\d+\. )/.test(lines[i])) paragraph.push(lines[i++]);
      blocks.push(<p key={key}>{inline(paragraph.join('\n'), base)}</p>);
    }
  }
  return <div className="study-text">{blocks}</div>;
}

function Download({ file, children, base = 'week-01' }) {
  return <a href={downloads[`../materials/${base ? `${base}/` : ''}${file}`]} download={file.split('/').pop()}>{children}</a>;
}

function CoursePlans() {
  return <details className="study-panel"><summary>Необязательный архив прежних планов · вне WEEK1</summary>
    <p>Комплекты 2–9 не нужны для завершения этой недели. Сохранённые прежние планы не добавляют заданий к маршруту 180 минут.</p>
    <Download file="course-plan.md" base="">Скачать маршрут и архив (.md)</Download>
    <Markdown text={coursePlan} base="" />
  </details>;
}

export default function StudyMaterial({ section, showAnswers, week = 1 }) {
  if (week === 2) {
    const file = { home: 'README.md', theory: 'theory.md', practice: 'walkthrough.md', tests: 'quiz.md', results: 'practice.md' }[section];
    const text = { home: week2Overview, theory: week2Theory, practice: week2Walkthrough, tests: week2Quiz, results: week2Practice.slice(week2Practice.indexOf('## Отдельная ручная')) }[section];
    return <>
      <article className="study-panel">
        <p className="download-link"><Download base="week-02" file={file}>Скачать материал (.md)</Download></p>
        {section === 'tests' ? <details><summary>Бумажная версия правил и вопросов</summary><Markdown text={text} base="week-02" /></details> : <Markdown text={text} base="week-02" />}
      </article>
      {section === 'practice' && <details className="study-panel" id="practice-contract" open={showAnswers || undefined}>
        <summary>Самостоятельная работа: требования, критерии и сдача</summary>
        <Download base="week-02" file="practice.md">Скачать задание (.md)</Download>
        <Markdown text={week2Practice} base="week-02" />
      </details>}
      {section === 'tests' && <details className="study-panel" id="answers" open={showAnswers || undefined}>
        <summary>Открыть ответы и разбор после своей попытки</summary>
        <Markdown text={week2Answers} base="week-02" />
        <Download base="week-02" file="answers.md">Скачать разбор (.md)</Download>
      </details>}
      {section === 'theory' && <details className="study-panel"><summary>Полный пример из лекции · Python</summary>
        <p>Учебная демонстрация с имитацией оборудования. Все зависимости собираются в bootstrap; реальные платежи и устройства не используются.</p>
        <Download base="week-02" file="examples/solid_demo.py">Скачать solid_demo.py</Download>
        <CodeBlock code={week2Example} language="python" label="solid_demo.py · полный пример" />
      </details>}
    </>;
  }
  if (section === 'home') return <><article className="study-panel"><Markdown text={overview} /></article><CoursePlans /></>;
  if (section === 'results') return <><article className="study-panel">
    <h2>Отдельная ручная проверка лабораторной</h2>
    <p>На 30–40 минутах самостоятельного блока оформите README и объясните четыре вопроса защиты; онлайн-попытка, разбор и сохранение занимают 40–60 минуты. Ручную лабораторную /20 не прибавляйте к онлайн-баллу.</p>
    <Markdown text={practice.slice(practice.indexOf('## 7.'))} />
    <Markdown text={answers.slice(answers.indexOf('## Завершение недели'))} />
    <Download file="practice.md">Скачать задание с формой обратной связи (.md)</Download>
  </article><CoursePlans /></>;
  return <>
    <article className="study-panel">
      <p className="download-link"><Download file={`${section === 'tests' ? 'quiz' : section}.md`}>Скачать материал (.md)</Download></p>
      {section === 'tests' ? <details><summary>Бумажная версия правил и вопросов</summary><Markdown text={quiz} /></details>
        : <Markdown text={{ theory: theory.split('## Необязательное продолжение')[0], practice }[section]} />}
    </article>
    {section === 'tests' && <details className="study-panel" id="answers" open={showAnswers || undefined}>
      <summary>Открыть ответы и разбор после своей попытки</summary>
      <Markdown text={answers} />
      <Download file="answers.md">Скачать разбор (.md)</Download>
    </details>}
    {section === 'practice' && <details className="study-panel">
      <summary>Эталон и тесты — откройте после своего решения</summary>
      <p>Python выполняется на вашем компьютере. Эти файлы не запускают код в браузере.</p>
      <p><Download file="examples/reference_solution.py">Скачать reference_solution.py</Download> · <Download file="examples/test_reference.py">Скачать test_reference.py</Download></p>
      <details><summary>Посмотреть эталон</summary><pre tabIndex={0} aria-label="Эталон Python"><code>{solution}</code></pre></details>
      <details><summary>Посмотреть тесты</summary><pre tabIndex={0} aria-label="Тесты pytest"><code>{tests}</code></pre></details>
    </details>}
    {section === 'practice' && <article className="study-panel">
      <h2>Начать свою лабораторную</h2>
      <p>Каркас создаёт папку domain и сигнатуры с явным NotImplementedError. Пять валидаторов даны; доменная логика и собственные тесты остаются вам. Это учебная заготовка, не готовая сдача.</p>
      <Download file="examples/starter.py">Скачать starter.py</Download>
    </article>}
    {section === 'theory' && <details className="study-panel"><summary>Необязательное продолжение: прежние примеры комплектов 2–3</summary>
      <p>Для WEEK1 эти темы не требуются.</p><Markdown text={theory.split('## Необязательное продолжение')[1] || ''} />
    </details>}
    <CoursePlans />
  </>;
}
