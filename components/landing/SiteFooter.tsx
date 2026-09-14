'use client';
import { ArrowUpRight } from 'lucide-react';
import { cairnLinks } from '@/lib/cairn';
import { useI18n } from './LocaleProvider';
export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="cairn-footer">
      <div className="cairn-container footer-grid">
        <div className="footer-masthead">
          <a href="#main" aria-label={t.header.home}>
            cairn<span>.</span>
          </a>
          <p>{t.footer.tagline}</p>
        </div>
        <nav className="footer-column" aria-label={t.footer.productLabel}>
          <span>{t.footer.productLabel}</span>
          <a href="#workflow">{t.footer.howItWorks}</a>
          <a href={cairnLinks.guide}>
            {t.footer.documentation} <ArrowUpRight size={13} />
          </a>
          <a href={cairnLinks.quickstart}>
            {t.footer.quickstart} <ArrowUpRight size={13} />
          </a>
          <a href={cairnLinks.npm}>
            {t.footer.npm} <ArrowUpRight size={13} />
          </a>
        </nav>
        <nav className="footer-column" aria-label={t.footer.teamLabel}>
          <span>{t.footer.teamLabel}</span>
          <a href={cairnLinks.team}>
            {t.footer.github} <ArrowUpRight size={13} />
          </a>
          <a href={cairnLinks.repository}>
            {t.footer.repository} <ArrowUpRight size={13} />
          </a>
        </nav>
      </div>
      <div className="cairn-container footer-bar">
        <p>{t.footer.copyright}</p>
        <p>{t.footer.license}</p>
      </div>
    </footer>
  );
}
