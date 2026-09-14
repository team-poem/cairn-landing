'use client';
import { ArrowUpRight, Cpu, Sparkles, Monitor } from 'lucide-react';
import { cairnLinks } from '@/lib/cairn';
import { AeroBackdrop } from './AeroBackdrop';
import { useI18n } from './LocaleProvider';
export function Features() {
  const { t } = useI18n();
  return (
    <section
      className="engine-section cairn-container"
      id="engine"
      aria-labelledby="features-title"
    >
      <div className="engine-intro">
        <h2 id="features-title">
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
        <AeroBackdrop />
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
      <dl className="engine-details">
        {t.features.details.map((detail) => (
          <div key={detail.term}>
            <dt>{detail.term}</dt>
            <dd>{detail.description}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
