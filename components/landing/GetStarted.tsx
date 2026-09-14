'use client';
import { ArrowUpRight } from 'lucide-react';
import { cairnLinks } from '@/lib/cairn';
import { useI18n } from './LocaleProvider';
export function GetStarted() {
  const { t } = useI18n();
  return (
    <section
      className="start-section"
      id="get-started"
      aria-labelledby="start-title"
    >
      <div className="start-layout cairn-container">
        <div>
          <h2 id="start-title">{t.start.title}</h2>
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
    </section>
  );
}
