'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cairnArtwork } from '@/lib/cairn-artwork';
import { useI18n } from './LocaleProvider';
type Stage = 'arriving' | 'ready' | 'fallen' | 'repairing';
export function CairnSculpture({ animated }: { animated: boolean }) {
  const { t } = useI18n();
  const [stage, setStage] = useState<Stage>('arriving');
  const [countdown, setCountdown] = useState(3);
  useEffect(() => {
    if (stage === 'ready') return;
    if (stage === 'fallen') {
      const interval = window.setInterval(
        () => setCountdown((value) => Math.max(1, value - 1)),
        1000,
      );
      const timer = window.setTimeout(() => setStage('repairing'), 3000);
      return () => {
        window.clearInterval(interval);
        window.clearTimeout(timer);
      };
    }
    const timer = window.setTimeout(() => setStage('ready'), 1900);
    return () => window.clearTimeout(timer);
  }, [stage]);
  const message =
    stage === 'fallen'
      ? t.sculpture.rebuilding(countdown)
      : stage === 'repairing'
        ? t.sculpture.repairing
        : stage === 'arriving'
          ? t.sculpture.arriving
          : t.sculpture.ready;
  return (
    <figure
      className="night-landmark cairn-sculpture"
      data-stage={stage}
      data-motion={animated}
    >
      <svg
        className="sculpture-art"
        viewBox="155 35 355 500"
        fill="none"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: cairnArtwork }}
      />
      <Button
        variant="ghost"
        className="sculpture-hit"
        onClick={() => {
          setCountdown(3);
          setStage('fallen');
        }}
        disabled={stage !== 'ready'}
        aria-label={t.sculpture.label}
        aria-describedby="sculpture-status"
      >
        <span className="sculpture-hint">{t.sculpture.hint}</span>
      </Button>
      <figcaption
        id="sculpture-status"
        className="cairn-sr-only"
        aria-live="polite"
      >
        {message}
      </figcaption>
    </figure>
  );
}
