'use client';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cairnLinks } from '@/lib/cairn';
import { useI18n } from './LocaleProvider';
const stages = ['context', 'plan', 'execute', 'judge', 'report'] as const;
const ports = [
  'ContextProvider',
  'Planner',
  'SkillStore',
  'Driver',
  'Critic',
  'Reporter',
] as const;
type Port = (typeof ports)[number];
/* 3번 섹션의 주제는 하나다: 테스트 러너가 아니라 엔진이고, 그 위에 짓는다.
 * 파이프라인 다섯 단계와 포트 여섯을 보여주고 바로 설치로 잇는다. */
export function GetStarted() {
  const { t } = useI18n();
  const [port, setPort] = useState<Port>('Driver');
  const activeStage = t.features.ports[port].stage;
  return (
    <section
      className="start-section"
      id="get-started"
      aria-labelledby="fit-title"
    >
      <div className="cairn-container start-stack">
        <div className="fit-grid">
          <div className="engine-intro">
            <h2 id="fit-title">
              {t.features.titleTop}
              <br />
              {t.features.titleBottom}
            </h2>
            <p>{t.features.lead}</p>
            <a className="cairn-link" href={`${cairnLinks.guide}#embed-it`}>
              {t.features.link} <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="pipeline">
            <span className="fit-label">{t.features.pipelineLabel}</span>
            <ol className="pipeline-stages" aria-label={t.features.pipelineLabel}>
              {stages.map((stage, index) => (
                <li
                  key={stage}
                  className="pipeline-stage"
                  data-active={activeStage === stage}
                >
                  <strong>{t.features.stages[stage].name}</strong>
                  <span>{t.features.stages[stage].role}</span>
                  {index < stages.length - 1 && (
                    <ArrowRight size={14} aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
            <span className="fit-label">{t.features.portsLabel}</span>
            <div className="pipeline-ports">
              {ports.map((name) => (
                <button
                  key={name}
                  type="button"
                  className="pipeline-port"
                  aria-pressed={port === name}
                  onClick={() => setPort(name)}
                  onPointerEnter={() => setPort(name)}
                  onFocus={() => setPort(name)}
                >
                  {name}
                </button>
              ))}
            </div>
            <p className="pipeline-note" aria-live="polite">
              <strong>{port}</strong> — {t.features.ports[port].description}
            </p>
          </div>
        </div>
        <div className="start-layout">
          <div>
            <h3 id="start-title">{t.start.title}</h3>
            <p>
              {t.start.leadTop}
              <br />
              {t.start.leadBottom}
            </p>
          </div>
          <div className="start-command">
            <pre aria-label={t.start.installLabel}>
              <code>
                <span aria-hidden="true">$ </span>npm install -g cairn-engine
              </code>
            </pre>
            <div className="start-actions">
              <a
                className="cairn-button"
                href={`${cairnLinks.guide}#try-it-in-60-seconds`}
              >
                {t.start.primary} <ArrowUpRight size={17} />
              </a>
              <a className="cairn-link" href={cairnLinks.quickstart}>
                {t.start.secondary} <ArrowUpRight size={16} />
              </a>
            </div>
            <p className="start-note">{t.start.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
