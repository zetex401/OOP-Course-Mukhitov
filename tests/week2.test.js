import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as week2 from '../src/assessment2.js';
import * as week1 from '../src/assessment.js';

const correct = { srp: 1, cohesion: 0, ocp: 2, lsp: 0, isp: 1, dip: 2, di: 1, protocol: 0,
  'extension-place': 1, 'extension-contract': 2, 'extension-test': 0,
  'refusal-return': 1, 'refusal-record': 2, 'refusal-signals': 0,
  'scanner-order': 1, 'scanner-payment': 2, 'scanner-proof': 0,
  'assembly-location': 0, 'assembly-test': 1, 'assembly-scope': 2 };
const finish = answers => week2.attemptReducer({ ...week2.newAttempt(), answers }, { type: 'finish', completedAt: '2026-10-18T14:00:00.000Z' });

test('week 2 assesses complete answers only and gives independent 0, 19 and 20 scores', () => {
  assert.equal(finish({}).result, null);
  assert.equal(finish({ srp: 1 }).missing.length, 19);
  assert.equal(week2.resultText(finish({})), null);
  assert.equal(finish(correct).result.score, 20);
  assert.equal(finish({ ...correct, 'extension-contract': 0 }).result.score, 19);
  assert.equal(finish(Object.fromEntries(Object.entries(correct).map(([id, value]) => [id, (value + 1) % 3]))).result.score, 0);
  for (const value of [3, -1, '1', 1.5]) {
    assert.equal(week2.grade({ ...correct, srp: value }).complete, false);
  }
});

test('week 2 locks completed attempts, resets locally and exports the right module', () => {
  const done = finish(correct);
  assert.deepEqual(week2.attemptReducer(done, { type: 'answer', id: 'srp', value: 0 }), done);
  const output = week2.resultText(done);
  assert.ok(output.startsWith('Неделя 2'));
  assert.ok(output.includes(week2.MODULE_VERSION));
  assert.ok(output.includes('20/20'));
  assert.ok(output.includes('Баллы не суммируются'));
  assert.equal((output.match(/Ответ:/g) || []).length, 20);
  assert.deepEqual(week2.attemptReducer(done, { type: 'reset' }), week2.newAttempt());
  const first = week1.attemptReducer(week1.newAttempt(), { type: 'answer', id: 'class', value: 1 });
  assert.deepEqual(week2.attemptReducer(first, { type: 'answer', id: 'class', value: 0 }), first);
  assert.deepEqual(first.answers, { class: 1 });
});

test('week 2 downloadable questions and explanations match every interactive question', () => {
  const paper = readFileSync('materials/week-02/quiz.md', 'utf8');
  const key = readFileSync('materials/week-02/answers.md', 'utf8');
  for (const q of week2.questions) {
    assert.ok(paper.includes(q.title));
    for (const option of q.options) assert.ok(paper.includes(option));
    assert.ok(key.includes(q.explanation));
  }
});
