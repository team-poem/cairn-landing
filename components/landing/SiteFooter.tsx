'use client';
import { ArrowUpRight } from 'lucide-react';
import { cairnLinks } from '@/lib/cairn';
import { useI18n } from './LocaleProvider';
export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="cairn-footer cairn-container">
      <div className="footer-masthead">
        <a href="#main" aria-label={t.header.home}>
          cairn<span>.</span>
        </a>
        <p>
          {t.footer.taglineTop}
          <br />
          <a href="https://github.com/team-poem">{t.footer.taglineBottom}</a>
        </p>
      </div>
      <nav aria-label={t.footer.navLabel}>
        <a href="#workflow">{t.footer.howItWorks}</a>
        <a href={cairnLinks.guide}>
          {t.footer.documentation} <ArrowUpRight size={15} />
        </a>
        <a href={cairnLinks.repository}>
          {t.footer.github} <ArrowUpRight size={15} />
        </a>
      </nav>
      <p className="footer-colophon">{t.footer.colophon}</p>
    </footer>
  );
}
