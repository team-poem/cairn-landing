'use client';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EffectBoundary } from './EffectBoundary';
import styles from './AeroBackdrop.module.css';
const AeroShards = lazy(() => import('./reactbits/AeroShards'));
export function AeroBackdrop() {
  const container = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [supported, setSupported] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener('change', update);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSupported('gpu' in navigator && window.isSecureContext);
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    if (container.current) observer.observe(container.current);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', update);
    };
  }, []);
  return (
    <>
      <div ref={container} className={styles.effect} aria-hidden="true">
        {seen && supported && !failed && (
          <EffectBoundary>
            <Suspense fallback={null}>
              <AeroShards
                backgroundColor="#080c14"
                shardColor="#a8bdd6"
                accentColor="#e8b077"
                material="chrome"
                placement="center"
                flow="ribbon"
                detail="balanced"
                density={0.65}
                shardSize={1.1}
                scale={0.85}
                spread={0.7}
                depth={0.8}
                speed={0.38}
                spin={0.4}
                glow={0.8}
                bloom={0.3}
                grain={0}
                chromaticAberration={0.002}
                interaction="repel"
                interactionStrength={0.35}
                holdToGather={false}
                paused={paused || reduced}
                onError={() => setFailed(true)}
              />
            </Suspense>
          </EffectBoundary>
        )}
      </div>
      {supported && !failed && (
        <Button
          variant="ghost"
          className={styles.toggle}
          disabled={reduced}
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused || reduced}
          aria-label={paused ? 'Play shard animation' : 'Pause shard animation'}
        >
          {paused || reduced ? <Play size={14} /> : <Pause size={14} />}{' '}
          {reduced ? 'Reduced motion' : paused ? 'Play shards' : 'Pause shards'}
        </Button>
      )}
    </>
  );
}
