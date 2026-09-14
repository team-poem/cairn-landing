'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Pause, Play, RotateCcw } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { cairnLinks } from '@/lib/cairn';
import { useI18n } from './LocaleProvider';
const stages = ['context', 'plan', 'execute', 'judge', 'report'] as const;
type Stage = (typeof stages)[number];
const ports = [
  'ContextProvider',
  'Planner',
  'SkillStore',
  'Driver',
  'Critic',
  'Reporter',
] as const;
type Port = (typeof ports)[number];
/* 단계를 누르면 그 단계를 담당하는 포트로 안내한다 */
const stagePort: Record<Stage, Port> = {
  context: 'ContextProvider',
  plan: 'Planner',
  execute: 'Driver',
  judge: 'Critic',
  report: 'Reporter',
};
const TICK = 820;
export function GetStarted() {
  const { t } = useI18n();
  const [port, setPort] = useState<Port>('Driver');
  const tabRefs = useRef<Partial<Record<Port, HTMLElement | null>>>({});
  /* 파이프라인 카드를 누르면 왼쪽 탭이 선택되고 한 번 톡 튀며 빛난다.
   * 여기서 고르는 것이라는 안내를 말 없이 한다. */
  const nudge = (stage: Stage) => {
    const target = stagePort[stage];
    setPort(target);
    const tab = tabRefs.current[target];
    if (!tab) return;
    tab.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    tab.animate(
      [
        { transform: 'translateX(0)', boxShadow: '0 0 0 0 transparent' },
        { transform: 'translateX(-6px)', boxShadow: '0 0 0 3px color-mix(in oklch, var(--color-accent) 55%, transparent)', offset: 0.25 },
        { transform: 'translateX(3px)', offset: 0.55 },
        { transform: 'translateX(0)', boxShadow: '0 0 0 0 transparent' },
      ],
      { duration: 720, easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)' },
    );
  };
  const [running, setRunning] = useState(false);
  const [reached, setReached] = useState(-1); // 실행이 지나간 마지막 단계
  const done = reached === stages.length - 1;
  useEffect(() => {
    if (!running || done) return;
    const timer = window.setTimeout(() => {
      const next = reached + 1;
      setReached(next);
      if (next === stages.length - 1) setRunning(false);
    }, TICK);
    return () => window.clearTimeout(timer);
  }, [running, reached, done]);
  const play = () => {
    if (done) setReached(-1);
    setRunning(true);
  };
  const reset = () => {
    setRunning(false);
    setReached(-1);
  };
  const portStage = t.features.ports[port].stage as Stage;
  return (
    <section
      className="start-section"
      id="get-started"
      aria-labelledby="fit-title"
    >
      <div className="cairn-container start-stack">
        <div className="flow-heading">
          <h2 id="fit-title">
            {t.features.titleTop}
            <br />
            {t.features.titleBottom}
          </h2>
          <p>
            {t.features.lead}{' '}
            <a className="cairn-link" href={`${cairnLinks.guide}#embed-it`}>
              {t.features.link} <ArrowUpRight size={15} />
            </a>
          </p>
        </div>
        <Tabs
          value={port}
          onValueChange={(value) => setPort(value as Port)}
          orientation="vertical"
          className="flow-workbench engine-workbench"
        >
          <TabsList className="engine-port-list" aria-label={t.engine.tabsLabel}>
            {ports.map((name, index) => (
              <TabsTrigger
                key={name}
                value={name}
                className="flow-tab engine-port"
                data-stage={t.features.ports[name].stage}
                ref={(element) => {
                  tabRefs.current[name] = element;
                }}
              >
                <span className="flow-tab-index">0{index + 1}</span>
                <span>
                  <span className="flow-tab-title">{name}</span>
                  <span className="flow-tab-description">
                    {t.engine.portRole[name]}
                  </span>
                </span>
                <ArrowRight size={17} />
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="engine-stage-panel" data-running={running}>
            {/* 파이프라인. 고른 포트의 단계가 켜지고, 실행이 지나간 단계는 불이 남는다. */}
            <div className="pipe">
              <span className="fit-label">{t.features.pipelineLabel}</span>
              <ol className="pipe-stages">
                {stages.map((stage, index) => (
                  <li
                    key={stage}
                    className="pipe-stage"
                    data-port={portStage === stage}
                    data-lit={index <= reached}
                    data-current={running && index === reached + 1}
                  >
                    <button
                      type="button"
                      className="pipe-stage-hit"
                      onClick={() => nudge(stage)}
                      aria-label={t.engine.stageHint(stagePort[stage])}
                    >
                      <strong>{t.features.stages[stage].name}</strong>
                      <span>{t.features.stages[stage].role}</span>
                      <em className="pipe-stage-link" aria-hidden="true">
                        ← {stagePort[stage]}
                      </em>
                    </button>
                  </li>
                ))}
              </ol>
              <svg className="pipe-track" viewBox="0 0 500 24" aria-hidden="true" fill="none">
                <path className="flow-path-guide" d="M12 12H488" />
                <path
                  className="flow-path-fill"
                  pathLength="4"
                  d="M12 12H488"
                  style={{
                    strokeDasharray: '4',
                    strokeDashoffset: 4 - Math.max(0, reached),
                  }}
                />
                {[12, 131, 250, 369, 488].map((x, index) => (
                  <circle
                    key={x}
                    cx={x}
                    cy="12"
                    r="4"
                    className={index <= reached ? 'route-lit' : ''}
                  />
                ))}
                <circle
                  className="route-runner"
                  cx="12"
                  cy="12"
                  r="6"
                  style={{
                    transform: `translateX(${Math.max(0, reached) * 119}px)`,
                  }}
                />
              </svg>
              <p className="pipe-note" aria-live="polite">
                <strong>{port}</strong> — {t.features.ports[port].description}
              </p>
            </div>
            <div className="engine-output">
              <span className="fit-label">{t.engine.outputLabel}</span>
              <output className="engine-log" aria-live="polite">
                {reached < 0 ? (
                  <span className="engine-log-idle">{t.engine.idle}</span>
                ) : (
                  stages.slice(0, reached + 1).map((stage) => (
                    <span key={stage} className="engine-log-line" data-stage={stage}>
                      {t.engine.stageOutput[stage]}
                    </span>
                  ))
                )}
                {done && <span className="engine-log-done">{t.engine.done}</span>}
              </output>
              <div className="flow-actions">
                <Button className="cairn-button" onClick={running ? () => setRunning(false) : play}>
                  {running ? t.engine.pause : done ? t.engine.runAgain : t.engine.run}
                  {running ? <Pause size={16} /> : <Play size={16} />}
                </Button>
                {reached >= 0 && (
                  <Button variant="ghost" className="flow-next" onClick={reset}>
                    <RotateCcw size={15} />
                    {t.engine.reset}
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="flow-command engine-install">
            <span>{t.start.title}</span>
            <pre aria-label={t.start.installLabel}>
              <code>
                <span aria-hidden="true">$ </span>npm install -g cairn-engine
              </code>
            </pre>
            <div className="start-actions">
              <a className="cairn-button" href={`${cairnLinks.guide}#try-it-in-60-seconds`}>
                {t.start.primary} <ArrowUpRight size={17} />
              </a>
              <a className="cairn-link" href={cairnLinks.quickstart}>
                {t.start.secondary} <ArrowUpRight size={16} />
              </a>
              <span className="start-note">{t.start.note}</span>
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
