'use client';
import { useEffect, useReducer } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Pause,
  Play,
  RotateCcw,
  X,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  demoReducer,
  demoFrame,
  initialDemo,
  type DemoPhase,
} from '@/lib/demo-state';
import { cairnLinks } from '@/lib/cairn';
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
const nextPhase: Record<DemoPhase, DemoPhase | null> = {
  discover: 'freeze',
  freeze: 'replay',
  replay: 'heal',
  heal: null,
};
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
  const steps = t.workflow.steps;
  /* 복구 단계의 셋째 줄: 들어가면 실패, 재생하면 옛 줄을 지우고 새 줄이 온다 */
  const healBroken = frame.changed && !state.running && !frame.done;
  const healFixed = frame.changed && (frame.repairing || frame.done);
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
        {phases.map((item, index) => {
          const phase = t.workflow.phases[item.id];
          const next = nextPhase[item.id];
          const isFreeze = item.id === 'freeze';
          /* 주 버튼은 하나다: 실행 전엔 실행, 실행 중엔 일시정지,
           * 끝나면 다음 단계. 다시 실행·초기화는 보조로 내린다. */
          const primary = isFreeze
            ? { label: phase.action, icon: <ArrowRight size={16} />, onClick: () => selectPhase('replay') }
            : frame.done && next
              ? { label: t.workflow.next[next as keyof typeof t.workflow.next], icon: <ArrowRight size={16} />, onClick: () => selectPhase(next) }
              : frame.done
                ? { label: t.workflow.runAgain, icon: <Play size={16} />, onClick: () => dispatch({ type: 'play' }) }
                : state.running
                  ? { label: t.workflow.pause, icon: <Pause size={16} />, onClick: () => dispatch({ type: 'pause' }) }
                  : {
                      label: state.completed > (item.id === 'heal' ? 2 : 0) ? t.workflow.resume : phase.action,
                      icon: <Play size={16} />,
                      onClick: () => dispatch({ type: 'play' }),
                    };
          return (
            <TabsContent
              key={item.id}
              value={item.id}
              className="flow-panel sync-panel"
              data-phase={item.id}
              data-running={state.running}
            >
              <div className="flow-story">
                <span className="flow-step-label">
                  {t.workflow.stepOf(index + 1)}
                </span>
                <h3>{phase.subtitle}</h3>
                <p>{phase.description}</p>
                <div className="flow-actions">
                  <Button className="cairn-button" onClick={primary.onClick}>
                    {primary.label}
                    {primary.icon}
                  </Button>
                  {!isFreeze && frame.done && next && (
                    <Button
                      variant="ghost"
                      className="flow-next"
                      onClick={() => dispatch({ type: 'play' })}
                    >
                      <RotateCcw size={15} />
                      {t.workflow.runAgain}
                    </Button>
                  )}
                  {!isFreeze && !frame.done && (state.running || state.completed > (item.id === 'heal' ? 2 : 0)) && (
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
                  {item.id === 'heal' && frame.done && (
                    <>
                      <Button
                        variant="ghost"
                        className="flow-next"
                        onClick={() => selectPhase('discover')}
                      >
                        <RotateCcw size={15} />
                        {t.workflow.startOver}
                      </Button>
                      <a className="cairn-link" href={cairnLinks.guide}>
                        {t.hero.secondary} <ArrowUpRight size={15} />
                      </a>
                    </>
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
                    {['click("Log in")', 'click("Add to bag")', 'click("Cart")'].map(
                      (line, i) => {
                        const isThird = i === 2;
                        const failed = isThird && healBroken;
                        const fixed = isThird && healFixed;
                        return (
                          <code
                            key={i}
                            className={`sync-code-line ${!frame.done && i === frame.activeStep ? 'code-active' : ''} ${i < state.completed ? 'code-done' : ''} ${failed ? 'code-failed' : ''}`}
                          >
                            <span>{i + 1}</span>
                            <span>
                              {fixed ? (
                                <>
                                  <span className="code-old">{line}</span>
                                  <span className="code-new">{'click("View bag")'}</span>
                                </>
                              ) : (
                                line
                              )}
                            </span>
                            {i < state.completed ? (
                              fixed ? (
                                <span className="code-state state-repaired">
                                  {t.workflow.repaired}
                                </span>
                              ) : (
                                <Check size={14} aria-label={t.workflow.completedLabel} />
                              )
                            ) : failed ? (
                              <span className="code-state state-failed">
                                <X size={12} /> {t.workflow.notFound}
                              </span>
                            ) : i === frame.activeStep ? (
                              <span className="code-state">
                                {state.running ? t.workflow.running : t.workflow.ready}
                              </span>
                            ) : null}
                          </code>
                        );
                      },
                    )}
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
                    {[20, 160, 300, 440].map((x, i) => (
                      <circle
                        key={x}
                        cx={x}
                        cy="32"
                        r="5"
                        className={i <= state.completed ? 'route-lit' : ''}
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
                    {steps.map((step, i) => (
                      <li
                        key={step}
                        data-active={!frame.done && i === frame.activeStep}
                        data-done={i < state.completed}
                      >
                        <span>
                          {i < state.completed ? <Check size={13} /> : `0${i + 1}`}
                        </span>
                        {frame.changed && i === 2 ? t.workflow.findNewButton : step}
                      </li>
                    ))}
                  </ol>
                </div>
                <output className="flow-output sync-output" aria-live="polite">
                  {frame.done
                    ? item.id === 'heal'
                      ? t.workflow.outputHealed
                      : isFreeze
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
                <span>{isFreeze ? t.workflow.savedAs : t.workflow.tryInTerminal}</span>
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
