'use client';
import { useEffect, useReducer } from 'react';
import { ArrowRight, Check, Pause, Play, RotateCcw } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  demoReducer,
  demoFrame,
  initialDemo,
  type DemoPhase,
} from '@/lib/demo-state';
import { ShopDemo } from './ShopDemo';
const phases = [
  {
    id: 'discover',
    title: 'Discover',
    label: 'Find the steps',
    subtitle: 'Start with a task.',
    description:
      'Tell Cairn what to do. Watch it log in, add a daypack, and open the cart. Each action becomes a step you can save.',
    action: 'Run discovery',
    command:
      'cairn discover "log in, add a daypack, and open the cart" \\\n  --url=https://your.app --freeze=cart.skill.json',
  },
  {
    id: 'freeze',
    title: 'Freeze',
    label: 'Save the path',
    subtitle: 'Keep what worked.',
    description:
      'The task is complete. Cairn saves the steps as JSON so the next run can follow the same path.',
    action: 'Replay the file',
    command: 'cart.skill.json',
  },
  {
    id: 'replay',
    title: 'Replay',
    label: 'Run it again',
    subtitle: 'Follow the saved steps.',
    description:
      'The same task runs from the recorded path. The screen, action list, and route move together. Basic replay makes no model calls.',
    action: 'Play replay',
    command: 'cairn replay cart.skill.json',
  },
  {
    id: 'heal',
    title: 'Heal',
    label: 'Repair a change',
    subtitle: 'The cart button moved.',
    description:
      'The first two steps still work. AI finds the new “View bag” button, repairs the last step, and saves the updated path.',
    action: 'Repair the step',
    command: 'cairn replay cart.skill.json --heal',
  },
] as const;
const actions = ['Log in', 'Add a daypack', 'Open the cart'];
export function Workflow() {
  const [state, dispatch] = useReducer(demoReducer, initialDemo);
  const frame = demoFrame(state);
  useEffect(() => {
    if (!state.running) return;
    const timer = window.setTimeout(
      () => dispatch({ type: 'tick', runId: state.runId }),
      state.phase === 'heal' ? 2400 : 1700,
    );
    return () => window.clearTimeout(timer);
  }, [state.running, state.completed, state.runId, state.phase]);
  const selectPhase = (phase: DemoPhase) => dispatch({ type: 'select', phase });
  const lines = [
    'click("Log in")',
    'click("Add to bag")',
    frame.changed && (frame.repairing || frame.done)
      ? 'click("View bag")'
      : 'click("Cart")',
  ];
  return (
    <section
      className="flow-section cairn-container"
      id="workflow"
      aria-labelledby="workflow-title"
    >
      <div className="flow-heading">
        <h2 id="workflow-title">
          A browser task,
          <br />
          step by step.
        </h2>
        <p>
          One task, three views. Follow the sample app, the action being
          executed, and the path it leaves behind.
        </p>
      </div>
      <Tabs
        value={state.phase}
        onValueChange={(value) => selectPhase(value as DemoPhase)}
        className="flow-workbench synchronized-demo"
      >
        <TabsList className="flow-tabs" aria-label="Cairn workflow stages">
          {phases.map((item, index) => (
            <TabsTrigger
              key={item.id}
              value={item.id}
              className="flow-tab"
              data-phase={item.id}
            >
              <span className="flow-tab-index">0{index + 1}</span>
              <span>
                <span className="flow-tab-title">{item.title}</span>
                <span className="flow-tab-description">{item.label}</span>
              </span>
              <ArrowRight size={17} />
            </TabsTrigger>
          ))}
        </TabsList>
        {phases.map((item) => (
          <TabsContent
            key={item.id}
            value={item.id}
            className="flow-panel sync-panel"
            data-phase={item.id}
            data-running={state.running}
          >
            <div className="flow-story">
              <h3>{item.subtitle}</h3>
              <p>{item.description}</p>
              <div className="flow-actions">
                <Button
                  className="cairn-button"
                  onClick={
                    item.id === 'freeze'
                      ? () => selectPhase('replay')
                      : () =>
                          dispatch({ type: state.running ? 'pause' : 'play' })
                  }
                >
                  {state.running
                    ? 'Pause'
                    : frame.done
                      ? item.id === 'freeze'
                        ? item.action
                        : 'Run again'
                      : state.completed > 0 && item.id !== 'heal'
                        ? 'Resume'
                        : item.action}
                  {state.running ? (
                    <Pause size={16} />
                  ) : item.id === 'freeze' ? (
                    <ArrowRight size={16} />
                  ) : (
                    <Play size={16} />
                  )}
                </Button>
                {item.id !== 'freeze' && (
                  <Button
                    variant="ghost"
                    className="flow-next"
                    onClick={() => dispatch({ type: 'reset' })}
                    aria-label="Reset the demo"
                  >
                    <RotateCcw size={15} />
                    Reset
                  </Button>
                )}
                {frame.done && item.id === 'discover' && (
                  <Button
                    variant="ghost"
                    className="flow-next"
                    onClick={() => selectPhase('freeze')}
                  >
                    Save this path <ArrowRight size={15} />
                  </Button>
                )}
              </div>
              <p className="flow-note">
                Simulated app and actions. No external site is opened.
              </p>
            </div>
            <div className="sync-visuals">
              <ShopDemo state={state} />
              <div className="sync-code">
                <div>
                  <span>
                    {frame.saved ? 'Saved action summary' : 'Action trace'}
                  </span>
                  <span>Illustrative code</span>
                </div>
                <pre aria-label="Actions synchronized with the demo">
                  {lines.map((line, index) => (
                    <code
                      key={index}
                      className={`sync-code-line ${!frame.done && index === frame.activeStep ? 'code-active' : ''} ${index < state.completed ? 'code-done' : ''}`}
                    >
                      <span>{index + 1}</span>
                      <span>{line}</span>
                      {index < state.completed ? (
                        <Check size={14} aria-label="Completed" />
                      ) : index === frame.activeStep ? (
                        <span className="code-state">
                          {state.running ? 'running' : 'ready'}
                        </span>
                      ) : null}
                    </code>
                  ))}
                </pre>
              </div>
              <div className="sync-path">
                <svg viewBox="0 0 460 64" aria-hidden="true" fill="none">
                  <path className="flow-path-guide" d="M20 32H440" />
                  <path
                    className="flow-path-fill"
                    pathLength="3"
                    d="M20 32H440"
                    style={{
                      strokeDasharray: '3',
                      strokeDashoffset: 3 - state.completed,
                    }}
                  />
                  {[20, 160, 300, 440].map((x, index) => (
                    <circle
                      key={x}
                      cx={x}
                      cy="32"
                      r="5"
                      className={index <= state.completed ? 'route-lit' : ''}
                    />
                  ))}
                  <circle
                    className="route-runner"
                    cx="20"
                    cy="32"
                    r="7"
                    style={{
                      transform: `translateX(${state.completed * 140}px)`,
                    }}
                  />
                </svg>
                <ol>
                  {actions.map((action, index) => (
                    <li
                      key={action}
                      data-active={!frame.done && index === frame.activeStep}
                      data-done={index < state.completed}
                    >
                      <span>
                        {index < state.completed ? (
                          <Check size={13} />
                        ) : (
                          `0${index + 1}`
                        )}
                      </span>
                      {frame.changed && index === 2
                        ? 'Find new button'
                        : action}
                    </li>
                  ))}
                </ol>
              </div>
              <output className="flow-output sync-output" aria-live="polite">
                {frame.done
                  ? item.id === 'heal'
                    ? 'New button found. Updated path saved.'
                    : item.id === 'freeze'
                      ? 'Three steps saved in cart.skill.json.'
                      : 'All three actions completed.'
                  : state.running
                    ? frame.repairing
                      ? 'Locating “View bag” and updating the last step…'
                      : `${actions[frame.activeStep]}…`
                    : item.id === 'heal'
                      ? '“Cart” was not found. Repair the step to continue.'
                      : 'Press play to follow the task.'}
              </output>
            </div>
            <div className="flow-command">
              <span>
                {item.id === 'freeze'
                  ? 'Saved as'
                  : 'Try this in your terminal'}
              </span>
              <pre>
                <code>{item.command}</code>
              </pre>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
