import overview from '../materials/week-01/README.md?raw';
import theory from '../materials/week-01/theory.md?raw';
import practice from '../materials/week-01/practice.md?raw';
import quiz from '../materials/week-01/quiz.md?raw';
import answers from '../materials/week-01/answers.md?raw';
import solution from '../materials/week-01/examples/reference_solution.py?raw';
import tests from '../materials/week-01/examples/test_reference.py?raw';

const downloads = import.meta.glob('../materials/week-01/**/*', {
  query: '?url', import: 'default', eager: true,
});
const sources = import.meta.glob('../.tfw/COURSE-MATERIALS/{01_Лекция_01_*,02_Лабораторная_01_*}.pdf', {
  query: '?url', import: 'default', eager: true,
});
const pages = { 'README.md': '#home', 'theory.md': '#theory', 'practice.md': '#practice', 'quiz.md': '#tests', 'answers.md': '#answers' };

function materialLink(path) {
  return pages[path] || downloads[`../materials/week-01/${path}`]
    || sources[path.replace('../../', '../')];
}

function inline(text) {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    if (part.startsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
    if (part.startsWith('**')) return <strong key={index}>{inline(part.slice(2, -2))}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a key={index} href={materialLink(link[2])}>{link[1]}</a>;
    return part;
  });
}

// The course files use headings, paragraphs, lists, tables and fenced code only.
// Render that subset as React elements; document HTML is never executed.
function Markdown({ text }) {
  const lines = text.replace(/\r/g, '').trim().split('\n');
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const key = i;
    if (!line.trim()) { i++; continue; }
    if (line.startsWith('```')) {
      const language = line.slice(3);
      const code = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) code.push(lines[i++]);
      i++;
      blocks.push(<pre key={key} tabIndex={0} aria-label={`Пример кода: ${language || 'текст'}`}><code>{code.join('\n')}</code></pre>);
    } else if (/^#{1,3} /.test(line)) {
      const [, marks, title] = line.match(/^(#{1,3}) (.*)$/);
      const Heading = marks.length < 3 ? 'h2' : 'h3';
      blocks.push(<Heading key={key}>{inline(title)}</Heading>);
      i++;
    } else if (line.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        rows.push(lines[i++].slice(1, -1).split('|').map((cell) => cell.trim()));
      }
      blocks.push(<div className="table-scroll" key={key} tabIndex={0} role="region" aria-label="Учебная таблица: прокрутка по горизонтали">
        <table><thead><tr>{rows[0].map((cell, n) => <th key={n} scope="col">{inline(cell)}</th>)}</tr></thead>
          <tbody>{rows.slice(2).map((row, n) => <tr key={n}>{row.map((cell, j) => <td key={j}>{inline(cell)}</td>)}</tr>)}</tbody></table>
      </div>);
    } else if (/^(?:- |\d+\. )/.test(line)) {
      const ordered = /^\d+\. /.test(line);
      const pattern = ordered ? /^\d+\. / : /^- /;
      const items = [];
      while (i < lines.length && pattern.test(lines[i])) items.push(lines[i++].replace(pattern, ''));
      const List = ordered ? 'ol' : 'ul';
      blocks.push(<List key={key}>{items.map((item, n) => <li key={n}>{inline(item)}</li>)}</List>);
    } else {
      const paragraph = [];
      while (i < lines.length && lines[i].trim() && !/^(?:#{1,3} |```|\||- |\d+\. )/.test(lines[i])) paragraph.push(lines[i++]);
      blocks.push(<p key={key}>{inline(paragraph.join('\n'))}</p>);
    }
  }
  return <div className="study-text">{blocks}</div>;
}

function Download({ file, children }) {
  return <a href={downloads[`../materials/week-01/${file}`]} download={file.split('/').pop()}>{children}</a>;
}

export default function StudyMaterial({ section, showAnswers }) {
  if (section === 'home') return <article className="study-panel"><Markdown text={overview} /></article>;
  if (section === 'results') return <article className="study-panel">
    <h2>Проверка и прогресс недели 1</h2>
    <p>Проверьте работу с напарником по рубрике ниже. Запишите результат в свой файл или тетрадь: сайт не хранит оценки и ответы.</p>
    <Markdown text={practice.slice(practice.indexOf('## 7.'))} />
    <Markdown text={answers.slice(answers.indexOf('## Завершение недели'))} />
    <Download file="practice.md">Скачать задание с формой обратной связи (.md)</Download>
  </article>;
  return <>
    <article className="study-panel">
      <p className="download-link"><Download file={`${section === 'tests' ? 'quiz' : section}.md`}>Скачать материал (.md)</Download></p>
      <Markdown text={{ theory, practice, tests: quiz }[section]} />
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
  </>;
}
