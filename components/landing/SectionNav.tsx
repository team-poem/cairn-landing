'use client';
import { useEffect, useState } from 'react';
import { useI18n } from './LocaleProvider';
const sections = ['top', 'workflow', 'get-started'] as const;
type SectionId = (typeof sections)[number];
/* 왼쪽 세로 중앙의 선 네비. 섹션마다 선 하나, 지금 보는 섹션은 길다.
 * 화면 가운데 띠(위아래 45% 를 뺀 10%)에 걸린 섹션을 현재로 본다. */
export function SectionNav() {
  const { t } = useI18n();
  const [active, setActive] = useState<SectionId>('top');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    for (const id of sections) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);
  return (
    <nav className="section-nav" aria-label={t.nav.label}>
      {sections.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={active === id ? 'true' : undefined}
        >
          <span className="cairn-sr-only">{t.nav.sections[id]}</span>
        </a>
      ))}
    </nav>
  );
}
