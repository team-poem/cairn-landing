export type DemoPhase = 'discover' | 'freeze' | 'replay' | 'heal';
export type DemoState = {
  phase: DemoPhase;
  completed: number;
  running: boolean;
  runId: number;
};
export type DemoEvent =
  | { type: 'select'; phase: DemoPhase }
  | { type: 'play' }
  | { type: 'pause' }
  | { type: 'reset' }
  | { type: 'tick'; runId: number };
export const initialDemo: DemoState = {
  phase: 'discover',
  completed: 0,
  running: false,
  runId: 0,
};
const startAt = (phase: DemoPhase) =>
  phase === 'freeze' ? 3 : phase === 'heal' ? 2 : 0;
export function demoReducer(state: DemoState, event: DemoEvent): DemoState {
  if (event.type === 'select')
    return {
      phase: event.phase,
      completed: startAt(event.phase),
      running: false,
      runId: state.runId + 1,
    };
  if (event.type === 'reset')
    return {
      ...state,
      completed: startAt(state.phase),
      running: false,
      runId: state.runId + 1,
    };
  if (event.type === 'pause')
    return { ...state, running: false, runId: state.runId + 1 };
  if (event.type === 'play')
    return state.phase === 'freeze'
      ? state
      : {
          ...state,
          completed:
            state.completed === 3 ? startAt(state.phase) : state.completed,
          running: true,
          runId: state.runId + 1,
        };
  if (!state.running || event.runId !== state.runId) return state;
  const completed = Math.min(3, state.completed + 1);
  return { ...state, completed, running: completed < 3 };
}
export function demoFrame(state: DemoState) {
  return {
    screen:
      state.completed === 3
        ? 'bag'
        : state.completed === 0
          ? 'login'
          : 'catalog',
    activeStep: Math.min(state.completed, 2),
    done: state.completed === 3,
    changed: state.phase === 'heal',
    repairing: state.phase === 'heal' && state.running,
    loggedIn: state.completed >= 1,
    itemAdded: state.completed >= 2,
    saved:
      state.phase === 'freeze' ||
      (state.phase === 'heal' && state.completed === 3),
  } as const;
}
