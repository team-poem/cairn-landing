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
import { useI18n } from './LocaleProvider';
/* 단계 이름과 명령은 실제 CLI 를 그대로 적은 것이라 언어와 무관하다.
 * 번역되는 것은 설명과 버튼뿐이다. */
const phases = [
  {
    id: 'discover',
    title: 'Discover',
    command:
      'cairn discover "log in, add a daypack, and open the cart" \\\n  --url=https://your.app --freeze=cart.skill.json',
  },
  {
    id: 'freeze',
    title: 'Freeze',
    command: 'cart.skill.json',
  },
  {
    id: 'replay',
    title: 'Replay',
    command: 'cairn replay cart.skill.json',
  },
  {
    id: 'heal',
    title: 'Heal',
    command: 'cairn replay cart.skill.json --heal',
  },
] as const;
export function Workflow() {
  const { t } = useI18n();
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
  const steps = t.workflow.steps;
  return (
    <section
      className="flow-section cairn-container"
      id="workflow"
      aria-labelledby="workflow-title"
    >
      <div className="flow-heading">
        <h2 id="workflow-title">
          {t.workflow.titleTop}
          <br />
          {t.workflow.titleBottom}
        </h2>
        <p>{t.workflow.lead}</p>
      </div>
      <Tabs
        value={state.phase}
        onValueChange={(value) => selectPhase(value as DemoPhase)}
        className="flow-workbench synchronized-demo"
      >
        <TabsList className="flow-tabs" aria-label={t.workflow.tabsLabel}>
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
                <span className="flow-tab-description">
                  {t.workflow.phases[item.id].label}
                </span>
              </span>
              <ArrowRight size={17} />
            </TabsTrigger>
          ))}
        </TabsList>
        {phases.map((item) => {
          const phase = t.workflow.phases[item.id];
          return (
            <TabsContent
              key={item.id}
              value={item.id}
              className="flow-panel sync-panel"
              data-phase={item.id}
              data-running={state.running}
            >
              <div className="flow-story">
                <h3>{phase.subtitle}</h3>
                <p>{phase.description}</p>
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
                      ? t.workflow.pause
                      : frame.done
                        ? item.id === 'freeze'
                          ? phase.action
                          : t.workflow.runAgain
                        : state.completed > 0 && item.id !== 'heal'
                          ? t.workflow.resume
                          : phase.action}
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
                      aria-label={t.workflow.resetLabel}
                    >
                      <RotateCcw size={15} />
                      {t.workflow.reset}
                    </Button>
                  )}
                  {frame.done && item.id === 'discover' && (
                    <Button
                      variant="ghost"
                      className="flow-next"
                      onClick={() => selectPhase('freeze')}
                    >
                      {t.workflow.savePath} <ArrowRight size={15} />
                    </Button>
                  )}
                </div>
                <p className="flow-note">{t.workflow.note}</p>
              </div>
              <div className="sync-visuals">
                <ShopDemo state={state} />
                <div className="sync-code">
                  <div>
                    <span>
                      {frame.saved
                        ? t.workflow.savedSummary
                        : t.workflow.actionTrace}
                    </span>
                    <span>{t.workflow.illustrative}</span>
                  </div>
                  <pre aria-label={t.workflow.codeLabel}>
                    {lines.map((line, index) => (
                      <code
                        key={index}
                        className={`sync-code-line ${!frame.done && index === frame.activeStep ? 'code-active' : ''} ${index < state.completed ? 'code-done' : ''}`}
                      >
                        <span>{index + 1}</span>
                        <span>{line}</span>
                        {index < state.completed ? (
                          <Check size={14} aria-label={t.workflow.completedLabel} />
                        ) : index === frame.activeStep ? (
                          <span className="code-state">
                            {state.running
                              ? t.workflow.running
                              : t.workflow.ready}
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
                    {steps.map((step, index) => (
                      <li
                        key={step}
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
                          ? t.workflow.findNewButton
                          : step}
                      </li>
                    ))}
                  </ol>
                </div>
                <output className="flow-output sync-output" aria-live="polite">
                  {frame.done
                    ? item.id === 'heal'
                      ? t.workflow.outputHealed
                      : item.id === 'freeze'
                        ? t.workflow.outputFrozen
                        : t.workflow.outputDone
                    : state.running
                      ? frame.repairing
                        ? t.workflow.outputRepairing
                        : t.workflow.outputRunning(steps[frame.activeStep])
                      : item.id === 'heal'
                        ? t.workflow.outputHealPrompt
                        : t.workflow.outputIdle}
                </output>
              </div>
              <div className="flow-command">
                <span>
                  {item.id === 'freeze'
                    ? t.workflow.savedAs
                    : t.workflow.tryInTerminal}
                </span>
                <pre>
                  <code>{item.command}</code>
                </pre>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}
