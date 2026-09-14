'use client';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Check,
  FileJson,
  Play,
  RotateCcw,
  Wrench,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
const phases = [
  {
    id: 'discover',
    title: 'Discover',
    label: 'Find the steps',
    subtitle: 'Start with a task.',
    description:
      'Tell Cairn what to do in the browser. AI works out the actions needed to complete the task.',
    action: 'Find the steps',
    command:
      'cairn discover "log in and open the cart" \\\n  --url=https://your.app --freeze=cart.skill.json',
  },
  {
    id: 'freeze',
    title: 'Freeze',
    label: 'Save the path',
    subtitle: 'Keep what worked.',
    description:
      'Cairn saves the steps in a JSON file. Read it, compare changes, and commit it with your code.',
    action: 'Replay the file',
    command: 'cart.skill.json',
  },
  {
    id: 'replay',
    title: 'Replay',
    label: 'Run it again',
    subtitle: 'Run the saved steps.',
    description:
      'Cairn follows the recorded path. Basic replay makes no model calls, so AI does not need to find the same steps on every run.',
    action: 'Run the steps',
    command: 'cairn replay cart.skill.json',
  },
  {
    id: 'heal',
    title: 'Heal',
    label: 'Repair a change',
    subtitle: 'Pick up where it broke.',
    description:
      'When a changed button breaks a step, use AI to find a replacement. Save the repaired path for the next run.',
    action: 'Repair the step',
    command: 'cairn replay cart.skill.json --heal',
  },
] as const;
type Phase = (typeof phases)[number]['id'];
const actions = ['Log in', 'Select a product', 'Open the cart'];
export function Workflow() {
  const [phase, setPhase] = useState<Phase>('discover');
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const complete = progress === 3;
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      setProgress((previous) => Math.min(previous + 1, 3));
      if (progress >= 2) setRunning(false);
    }, 750);
    return () => window.clearTimeout(timer);
  }, [running, progress]);
  function selectPhase(value: Phase) {
    setPhase(value);
    setRunning(false);
    setProgress(value === 'heal' ? 2 : 0);
  }
  function start() {
    setProgress(phase === 'heal' ? 2 : 0);
    setRunning(true);
  }
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
          Follow a shopping task from the first discovery to a saved test. Then
          see what happens when a button changes.
        </p>
      </div>
      <Tabs
        value={phase}
        onValueChange={(value) => selectPhase(value as Phase)}
        className="flow-workbench"
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
            className="flow-panel"
            data-phase={item.id}
          >
            <div className="flow-story">
              <h3>{item.subtitle}</h3>
              <p>{item.description}</p>
              <div className="flow-actions">
                <Button
                  className="cairn-button"
                  onClick={
                    item.id === 'freeze' ? () => selectPhase('replay') : start
                  }
                  disabled={running}
                  aria-busy={running}
                >
                  {running ? 'Running…' : complete ? 'Run again' : item.action}
                  {item.id === 'freeze' ? (
                    <ArrowRight size={16} />
                  ) : item.id === 'heal' ? (
                    <Wrench size={16} />
                  ) : complete ? (
                    <RotateCcw size={16} />
                  ) : (
                    <Play size={16} />
                  )}
                </Button>
                {complete && item.id === 'discover' && (
                  <Button
                    variant="ghost"
                    className="flow-next"
                    onClick={() => selectPhase('freeze')}
                  >
                    View saved steps <ArrowRight size={16} />
                  </Button>
                )}
              </div>
              <p className="flow-note">
                Illustrated demo. No browser session is started.
              </p>
            </div>
            <div className="flow-trace">
              <div className="flow-trace-heading">
                <span>
                  {item.id === 'freeze' ? 'Saved steps' : 'Shopping task'}
                </span>
                <span>
                  {item.id === 'replay'
                    ? 'No model calls'
                    : item.id === 'freeze'
                      ? 'JSON file'
                      : item.id === 'heal'
                        ? 'AI repair'
                        : 'AI discovery'}
                </span>
              </div>
              {item.id === 'freeze' ? (
                <div className="flow-file">
                  <div className="flow-file-name">
                    <FileJson size={26} />
                    <span>
                      cart.skill.json<small>Step summary</small>
                    </span>
                  </div>
                  <ol className="flow-steps">
                    {actions.map((action, index) => (
                      <li key={action} className="flow-step is-finished">
                        <span className="flow-step-index">0{index + 1}</span>
                        <span>{action}</span>
                        <span className="flow-step-status">
                          <Check size={17} aria-label="Saved" />
                        </span>
                      </li>
                    ))}
                  </ol>
                  <p className="flow-output">
                    A readable file to review and version in Git.
                  </p>
                </div>
              ) : (
                <div className="flow-run">
                  <div className="flow-path" aria-hidden="true">
                    <svg viewBox="0 0 460 88" fill="none">
                      <path className="flow-path-guide" d="M20 44H440" />
                      <path
                        className="flow-path-fill"
                        pathLength="3"
                        d="M20 44H440"
                        style={{
                          strokeDasharray: '3',
                          strokeDashoffset: 3 - progress,
                        }}
                      />
                      {[20, 160, 300, 440].map((x, index) => (
                        <g key={x}>
                          <circle
                            cx={x}
                            cy="44"
                            r={index <= progress ? 7 : 4}
                            className={index <= progress ? 'is-reached' : ''}
                          />
                          {index <= progress && (
                            <circle
                              cx={x}
                              cy="44"
                              r="13"
                              className="flow-path-halo"
                            />
                          )}
                        </g>
                      ))}
                    </svg>
                  </div>
                  <ol className="flow-steps">
                    {actions.map((action, index) => {
                      const done =
                        index < progress || (item.id === 'heal' && index < 2);
                      const broken =
                        item.id === 'heal' && index === 2 && !complete;
                      return (
                        <li
                          key={action}
                          className={`flow-step ${done ? 'is-finished' : ''} ${broken ? 'needs-repair' : ''}`}
                        >
                          <span className="flow-step-index">0{index + 1}</span>
                          <span className="flow-step-name">
                            {item.id === 'heal' && index === 2 ? (
                              <>
                                <del>Open the cart</del>
                                <span>
                                  {complete
                                    ? 'View shopping bag'
                                    : 'Button changed'}
                                </span>
                              </>
                            ) : (
                              action
                            )}
                          </span>
                          <span className="flow-step-status">
                            {broken ? (
                              running ? (
                                'Repairing'
                              ) : (
                                'Not found'
                              )
                            ) : done ? (
                              <Check size={17} aria-label="Completed" />
                            ) : running && index === progress ? (
                              'Running'
                            ) : (
                              'Waiting'
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                  <output
                    className={`flow-output ${complete ? 'is-finished' : ''}`}
                    aria-live="polite"
                  >
                    {complete
                      ? item.id === 'heal'
                        ? 'Repaired step saved. The next run uses the updated path.'
                        : item.id === 'replay'
                          ? 'All three steps replayed in order.'
                          : 'Three steps found. Ready to save.'
                      : running
                        ? 'Following the path…'
                        : item.id === 'heal'
                          ? 'The cart button has changed. Repair this step to continue.'
                          : 'Run the demo to follow each step.'}
                  </output>
                </div>
              )}
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
