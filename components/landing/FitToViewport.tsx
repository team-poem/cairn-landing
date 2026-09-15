'use client';
import { useEffect, useRef } from 'react';
/* 스냅 스크롤은 섹션이 한 화면에 들어갈 때만 뜻이 있다. 2·3번 섹션은
 * 노트북 높이에서 넘치므로, 콘텐츠 실제 높이와 가용 높이(뷰포트 − 헤더 −
 * 섹션 패딩 − reserve)를 재서 그 비율만큼 zoom 을 건다. zoom 은
 * transform 과 달리 레이아웃을 다시 잡아 섹션 높이가 정확히 한 화면이 된다.
 * 넓은 화면(zoom 1)에서는 아무것도 하지 않는다. 하한 아래로는 글자가 너무
 * 작아지므로 살짝 넘치는 쪽을 택한다. 60rem 아래는 proximity 스냅이라 제외. */
const MIN_ZOOM = 0.75;
export function FitToViewport({
  children,
  className,
  reserve,
}: {
  children: React.ReactNode;
  className?: string;
  /** 같은 스냅 칸을 나눠 쓰는 요소(예: 푸터). 그 높이만큼 가용 높이에서 뺀다 */
  reserve?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const section = element.closest('section');
    if (!section) return;
    let frame = 0;
    const fit = () => {
      frame = 0;
      if (!window.matchMedia('(min-width: 60rem)').matches) {
        if (element.style.zoom) element.style.zoom = '';
        return;
      }
      const root = getComputedStyle(document.documentElement);
      const header = parseFloat(root.getPropertyValue('--header-height')) || 88;
      const box = getComputedStyle(section);
      const padding = parseFloat(box.paddingTop) + parseFloat(box.paddingBottom);
      const reserved = reserve
        ? (document.querySelector<HTMLElement>(reserve)?.offsetHeight ?? 0)
        : 0;
      const available = window.innerHeight - header - padding - reserved;
      // zoom 을 잠깐 풀고 재야 원래 높이가 나온다
      const previous = element.style.zoom;
      element.style.zoom = '1';
      const needed = element.scrollHeight;
      const ratio = Math.min(1, Math.max(MIN_ZOOM, available / needed));
      const next = ratio < 0.995 ? ratio.toFixed(3) : '';
      element.style.zoom = next;
      if (next !== previous) element.dataset.fit = next || '1';
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(fit);
    };
    fit();
    window.addEventListener('resize', schedule);
    // 폰트·이미지가 늦게 로드돼 높이가 바뀌는 경우
    const observer = new ResizeObserver(schedule);
    observer.observe(element);
    return () => {
      window.removeEventListener('resize', schedule);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reserve]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
