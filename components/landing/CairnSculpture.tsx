'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cairnArtwork } from '@/lib/cairn-artwork';
type Stage = 'arriving' | 'ready' | 'fallen' | 'repairing';
export function CairnSculpture({ animated }: { animated: boolean }) {
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
      ? `Rebuilding in ${countdown}…`
      : stage === 'repairing'
        ? 'Finding its balance again.'
        : stage === 'arriving'
          ? 'One stone at a time.'
          : 'Knock it down. It finds its way back.';
  return (
    <figure
      className="night-landmark cairn-sculpture"
      data-stage={stage}
      data-motion={animated}
    >
      <svg
        className="sculpture-art"
        viewBox="0 0 700 590"
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
        aria-label="Knock down the cairn. It rebuilds after three seconds."
        aria-describedby="sculpture-status"
      >
        <span className="sculpture-hint">Tap to topple</span>
      </Button>
      <figcaption id="sculpture-status" aria-live="polite">
        {message}
      </figcaption>
    </figure>
  );
}
