'use client';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { sitePath } from '@/lib/site-path';
import { EffectBoundary } from './EffectBoundary';
import styles from './NightSky.module.css';
const Galaxy = lazy(() => import('./reactbits/Galaxy'));
const focal: [number, number] = [0.32, 0.36];
const rotation: [number, number] = [1, 0];
export function GalaxyBackdrop({ animated }: { animated: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 },
    );
    if (container.current) observer.observe(container.current);
    const update = () => setVisible(!document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, []);
  const active = animated && inView && visible;
  return (
    <>
      <div
        ref={container}
        className={styles.sky}
        data-active={active}
        aria-hidden="true"
      >
        <Image
          className={active ? styles.faintStars : ''}
          src={sitePath('/cairn-sky-still.svg')}
          alt=""
          width={1440}
          height={780}
          unoptimized
          priority
        />
        {active && (
          <div className={styles.galaxy}>
            {/* 셰이더는 픽셀마다 별 36개를 계산한다. 62.5% 로 그리고 GPU 로
                확대하면 연산이 2.5분의 1. 별은 원래 번져 보여 차이가 없다. */}
            <div className={styles.galaxyScale}>
              <EffectBoundary>
              <Suspense fallback={null}>
                {/* WebGL 이 되는 눈에는 이게 그동안 "화려하게" 요청을 거듭
                    누적한 값이었다. 정작 WebGL 이 꺼진 화면으로 조정해 와서
                    아무도 실제로 보지 못한 채 계속 올라갔다. 원래 원하던
                    "배경의 점 몇 개" 쪽으로 되돌린다. */}
                <Galaxy
                  focal={focal}
                  rotation={rotation}
                  density={1.1}
                  starSpeed={0.15}
                  speed={0.4}
                  glowIntensity={0.3}
                  twinkleIntensity={0.5}
                  rotationSpeed={0.02}
                  hueShift={210}
                  saturation={0.15}
                  mouseInteraction
                  transparent
                />
              </Suspense>
              </EffectBoundary>
            </div>
          </div>
        )}
      </div>
      {/* 능선은 돌무더기 SVG 에서 떼어내 화면 전체를 가로지르게 둔다. */}
      <Image
        className={styles.ridge}
        src={sitePath('/cairn-ridge.svg')}
        alt=""
        width={1200}
        height={150}
        unoptimized
        aria-hidden="true"
      />
      <div className={styles.mist} data-active={active} aria-hidden="true" />
    </>
  );
}
