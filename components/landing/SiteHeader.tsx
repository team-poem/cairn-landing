'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { sitePath } from '@/lib/site-path';
import { ArrowUpRight } from 'lucide-react';
import { cairnLinks } from '@/lib/cairn';
import { useI18n } from './LocaleProvider';
import { LanguageToggle } from './LanguageToggle';
/* 헤더는 화면 위에 고정된다. 첫 화면에서는 밤하늘 위에 투명하게 떠 있고,
 * 스크롤이 시작되면 배경과 밑선이 생겨 아래 섹션 위에서도 읽힌다. */
export function SiteHeader() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        {t.header.skip}
      </a>
      <header className="cairn-header" data-scrolled={scrolled}>
        <div className="cairn-header-inner cairn-container">
          <a
            className="cairn-wordmark"
            href="#main"
            aria-label={t.header.home}
          >
            <Image
              src={sitePath('/favicon.svg')}
              width={26}
              height={32}
              alt=""
              unoptimized
            />
            cairn
          </a>
          <div className="cairn-header-end">
            <LanguageToggle />
            <a className="cairn-link" href={cairnLinks.repository}>
              {t.header.github} <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
