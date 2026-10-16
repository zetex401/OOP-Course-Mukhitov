import test from 'node:test';
import assert from 'node:assert/strict';
import { grade, newAttempt, attemptReducer, resultText, MODULE_VERSION } from '../src/assessment.js';

// Oracle: the published contract, including each independently stated ticket observation.
const correct = {
  class: 1, invariant: 2, responsibility: 0, private: 1, decimal: 2, discount: 0, exception: 1, time: 2,
  'card-access': 1, 'card-damage': 0, 'card-order': 2,
  'ticket-new': 0, 'ticket-used': 2, 'ticket-expired': 1,
  'route-leak': 2, 'route-protect': 0, 'route-proof': 1,
  'bus-error': 1, 'bus-state': 2, 'bus-proof': 0,
};
const date = '2026-10-16T01:00:00.000Z';
const finish = (state) => attemptReducer(state, { type: 'finish', completedAt: date });
function answerAll(answers) {
  return Object.entries(answers).reduce((state, [id, value]) => attemptReducer(state, { type: 'answer', id, value }), newAttempt());
}

test('empty and incomplete attempts never produce a score or an export', () => {
  const empty = finish(newAttempt());
  assert.equal(empty.result, null);
  assert.equal(empty.missing.length, 20);
  assert.equal(resultText(empty), null);
  const partial = finish(attemptReducer(empty, { type: 'answer', id: 'class', value: 1 }));
  assert.equal(partial.result, null);
  assert.equal(partial.missing.length, 19);
});

test('published fully correct and fully incorrect choices give exactly 20 and 0', () => {
  assert.equal(finish(answerAll(correct)).result.score, 20);
  const wrong = Object.fromEntries(Object.entries(correct).map(([id, value]) => [id, (value + 1) % 3]));
  assert.equal(finish(answerAll(wrong)).result.score, 0);
});

test('a wrong first ticket component cannot change later states or award hidden partial credit', () => {
  const answers = { ...correct, 'ticket-new': 1 };
  assert.equal(grade(answers).score, 19);
  answers['ticket-used'] = 1;
  assert.equal(grade(answers).score, 18);
  answers['ticket-expired'] = 2;
  assert.equal(grade(answers).score, 17);
});

test('a known mixed response gives 11 independent points', () => {
  const selected = new Set(['class', 'invariant', 'responsibility', 'private', 'decimal', 'discount', 'exception', 'time', 'ticket-used', 'ticket-expired', 'bus-proof']);
  const answers = Object.fromEntries(Object.entries(correct).map(([id, value]) => [id, selected.has(id) ? value : (value + 1) % 3]));
  assert.equal(finish(answerAll(answers)).result.score, 11);
});

test('finish is idempotent, completed answers lock, reset removes the previous result', () => {
  const complete = finish(answerAll(correct));
  assert.deepEqual(finish(complete), complete);
  assert.deepEqual(attemptReducer(complete, { type: 'answer', id: 'class', value: 0 }), complete);
  const fresh = attemptReducer(complete, { type: 'reset' });
  assert.deepEqual(fresh, newAttempt());
  assert.equal(resultText(fresh), null);
  assert.equal(finish(fresh).result, null);
});

test('unknown IDs and out-of-range or nonnumeric choices cannot finish an attempt', () => {
  for (const value of [-1, 3, 1.5, '1', undefined]) {
    const invalid = attemptReducer(newAttempt(), { type: 'answer', id: 'class', value });
    assert.deepEqual(invalid.answers, {});
    assert.equal(grade({ ...correct, class: value }).complete, false);
  }
  assert.deepEqual(attemptReducer(newAttempt(), { type: 'answer', id: 'foreign', value: 0 }), newAttempt());
});

test('export reflects the current completed attempt with its date, version, responses and separate rubric', () => {
  const output = resultText(finish(answerAll(correct)));
  assert.ok(output.includes(date));
  assert.ok(output.includes(MODULE_VERSION));
  assert.ok(output.includes('20/20'));
  assert.ok(output.includes('Баллы не суммируются'));
  assert.equal((output.match(/Ответ:/g) || []).length, 20);
  assert.equal((output.match(/Балл: 1\/1/g) || []).length, 20);
});
