import test from 'node:test';
import assert from 'node:assert/strict';
import { demoReducer, demoFrame, initialDemo } from '../lib/demo-state.ts';
const tick = (s) => demoReducer(s, { type: 'tick', runId: s.runId });
test('one timeline drives login, product, and bag in order', () => {
  let s = demoReducer(initialDemo, { type: 'play' });
  assert.deepEqual(
    [demoFrame(s).screen, demoFrame(s).activeStep],
    ['login', 0],
  );
  s = tick(s);
  assert.equal(demoFrame(s).screen, 'catalog');
  assert.equal(demoFrame(s).itemAdded, false);
  assert.equal(demoFrame(s).activeStep, 1);
  s = tick(s);
  assert.equal(demoFrame(s).itemAdded, true);
  assert.equal(demoFrame(s).activeStep, 2);
  s = tick(s);
  assert.equal(demoFrame(s).screen, 'bag');
  assert.equal(s.running, false);
  assert.equal(s.completed, 3);
});
test('pause invalidates the pending tick and preserves all views', () => {
  let s = demoReducer(initialDemo, { type: 'play' });
  const old = s.runId;
  s = tick(s);
  s = demoReducer(s, { type: 'pause' });
  assert.deepEqual(demoReducer(s, { type: 'tick', runId: old }), s);
  const resumed = demoReducer(s, { type: 'play' });
  assert.equal(resumed.completed, 1);
  assert.equal(demoFrame(resumed).screen, 'catalog');
  assert.deepEqual(demoReducer(resumed, { type: 'tick', runId: old }), resumed);
});
test('changing tabs during a run cannot advance the new phase', () => {
  const running = demoReducer(initialDemo, { type: 'play' });
  const saved = demoReducer(running, { type: 'select', phase: 'freeze' });
  assert.deepEqual(
    demoReducer(saved, { type: 'tick', runId: running.runId }),
    saved,
  );
  assert.equal(demoFrame(saved).saved, true);
  assert.equal(demoFrame(saved).screen, 'bag');
});
test('heal resumes at the broken third action and saves the replacement', () => {
  let s = demoReducer(initialDemo, { type: 'select', phase: 'heal' });
  assert.equal(s.completed, 2);
  assert.equal(demoFrame(s).changed, true);
  assert.equal(demoFrame(s).screen, 'catalog');
  s = demoReducer(s, { type: 'play' });
  assert.equal(demoFrame(s).repairing, true);
  s = tick(s);
  assert.equal(demoFrame(s).saved, true);
  assert.equal(demoFrame(s).screen, 'bag');
  s = demoReducer(s, { type: 'reset' });
  assert.equal(s.completed, 2);
  assert.equal(demoFrame(s).saved, false);
});
test('replay restarts from login, freeze is not executable, and completion cannot overrun', () => {
  let s = demoReducer(initialDemo, { type: 'select', phase: 'freeze' });
  assert.deepEqual(demoReducer(s, { type: 'play' }), s);
  s = demoReducer(s, { type: 'select', phase: 'replay' });
  assert.equal(s.completed, 0);
  s = demoReducer(s, { type: 'play' });
  s = tick(tick(tick(s)));
  assert.deepEqual(tick(s), s);
  s = demoReducer(s, { type: 'play' });
  assert.equal(demoFrame(s).screen, 'login');
});
