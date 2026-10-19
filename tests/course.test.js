import test from 'node:test';
import assert from 'node:assert/strict';
import { courseHref, courseRoute } from '../src/course.js';

test('week 1 routes and deep links retain their sections', () => {
  for (const section of ['home', 'theory', 'practice', 'tests', 'results']) {
    assert.deepEqual(courseRoute(courseHref(1, section)), { week: 1, section });
  }
  assert.deepEqual(courseRoute('#answers'), { week: 1, section: 'tests' });
  assert.deepEqual(courseRoute('#practice-contract'), { week: 1, section: 'practice' });
});

test('week 2 provides all learning routes and its own deep links', () => {
  for (const section of ['home', 'theory', 'practice', 'tests', 'results']) {
    assert.deepEqual(courseRoute(courseHref(2, section)), { week: 2, section });
  }
  assert.deepEqual(courseRoute('#week-2/answers'), { week: 2, section: 'tests' });
  assert.deepEqual(courseRoute('#week-2/practice-contract'), { week: 2, section: 'practice' });
  assert.deepEqual(courseRoute('#week-2/unknown'), { week: 2, section: 'home' });
});
