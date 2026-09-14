'use client';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { cairnLinks } from '@/lib/cairn';
import { useI18n } from './LocaleProvider';
import { LanguageToggle } from './LanguageToggle';
export function SiteHeader() {
  const { t } = useI18n();
  return (
    <>
      <a className="skip-link" href="#main">
        {t.header.skip}
      </a>
      <header className="cairn-header cairn-container">
        <a className="cairn-wordmark" href="#main" aria-label={t.header.home}>
          <Image src="/favicon.svg" width={26} height={32} alt="" unoptimized />
          cairn
        </a>
        <div className="cairn-header-end">
          <LanguageToggle />
          <a className="cairn-link" href={cairnLinks.repository}>
            {t.header.github} <ArrowUpRight size={16} />
          </a>
        </div>
      </header>
    </>
  );
}
