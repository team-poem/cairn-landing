'use client';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
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
      <div ref={container} className={styles.sky} aria-hidden="true">
        <Image
          className={active ? styles.faintStars : ''}
          src="/cairn-sky-still.svg"
          alt=""
          width={1440}
          height={780}
          unoptimized
          priority
        />
        {active && (
          <div className={styles.galaxy}>
            <EffectBoundary>
              <Suspense fallback={null}>
                <Galaxy
                  focal={focal}
                  rotation={rotation}
                  density={1.9}
                  starSpeed={0.2}
                  speed={0.75}
                  glowIntensity={0.46}
                  twinkleIntensity={1}
                  rotationSpeed={0.04}
                  hueShift={210}
                  saturation={0.45}
                  mouseRepulsion={false}
                  mouseInteraction
                  transparent
                />
              </Suspense>
            </EffectBoundary>
          </div>
        )}
      </div>
      {/* 능선은 돌무더기 SVG 에서 떼어내 화면 전체를 가로지르게 둔다. */}
      <Image
        className={styles.ridge}
        src="/cairn-ridge.svg"
        alt=""
        width={1200}
        height={150}
        unoptimized
        aria-hidden="true"
      />
    </>
  );
}
