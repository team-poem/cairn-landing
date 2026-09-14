'use client';
import { ArrowUpRight, Cpu, Sparkles, Monitor } from 'lucide-react';
import { cairnLinks } from '@/lib/cairn';
import { useI18n } from './LocaleProvider';
/* 엔진 소개와 설치 안내를 한 화면에 둔다. 데모를 본 사람이 "내 스택에
 * 들어가나?" 를 확인하고 바로 설치로 이어지게. */
export function GetStarted() {
  const { t } = useI18n();
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
          <div className="engine-art">
            <div className="engine-network" aria-label={t.features.networkLabel}>
              <div className="network-node network-model">
                <Sparkles size={20} />
                <strong>{t.features.model}</strong>
                <span>{t.features.modelRole}</span>
              </div>
              <div className="network-wire wire-in" aria-hidden="true">
                <i />
              </div>
              <a
                className="network-node network-core"
                href="#workflow"
                aria-label={t.features.coreLabel}
              >
                <Cpu size={28} />
                <strong>{t.features.core}</strong>
                <span>{t.features.coreRole}</span>
              </a>
              <div className="network-wire wire-out" aria-hidden="true">
                <i />
              </div>
              <div className="network-node network-browser">
                <Monitor size={20} />
                <strong>{t.features.browser}</strong>
                <span>{t.features.browserRole}</span>
              </div>
            </div>
            <p className="network-caption">{t.features.caption}</p>
          </div>
        </div>
        <ul className="fit-points">
          {t.features.details.map((detail) => (
            <li key={detail.term}>
              <strong>{detail.term}</strong>
              <span>{detail.description}</span>
            </li>
          ))}
        </ul>
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
