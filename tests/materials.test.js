import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { groups } from '../src/assessment.js';

test('all local Markdown destinations in the module and preserved archive resolve', () => {
  const files = ['README.md', 'materials/course-plan.md', ...readdirSync('materials/week-02').filter((name) => name.endsWith('.md')).map((name) => `materials/week-02/${name}`), ...readdirSync('materials/week-01').filter((name) => name.endsWith('.md')).map((name) => `materials/week-01/${name}`)];
  for (const file of files) {
    for (const link of readFileSync(file, 'utf8').matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      if (/^https?:|^#/.test(link[1])) continue;
      assert.ok(existsSync(resolve(dirname(file), link[1].split('#')[0])), `${file}: ${link[1]}`);
    }
  }
});

test('downloadable questions and explanations agree with the interactive version', () => {
  const paper = readFileSync('materials/week-01/quiz.md', 'utf8');
  const key = readFileSync('materials/week-01/answers.md', 'utf8');
  for (const group of groups) for (const q of group.questions) {
    assert.ok(paper.includes(q.title));
    for (const option of q.options) assert.ok(paper.includes(option));
    assert.ok(key.includes(q.explanation));
  }
});
