'use client';
import { useEffect, useState } from 'react';
import { CairnSculpture } from './CairnSculpture';
import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cairnLinks } from '@/lib/cairn';
import { GalaxyBackdrop } from './GalaxyBackdrop';
export function Hero() {
  const [animated, setAnimated] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setReducedMotion(preference.matches);
      setAnimated(!preference.matches);
    };
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  return (
    <section className="night-opening" aria-labelledby="hero-title">
      <GalaxyBackdrop animated={animated} />
      <div className="night-composition cairn-container">
        <div className="night-heading">
          <p>Browser testing, by Poem.</p>
          <h1 id="hero-title">
            Find a path.
            <br />
            Run it again.
          </h1>
        </div>
        <p className="night-description">
          Describe a browser task. Cairn uses AI to find the steps, saves them
          as JSON, and runs them again without a model call.
        </p>
        <CairnSculpture animated={animated} />
        <div className="night-actions">
          <a className="cairn-button" href="#workflow">
            See it run <ArrowDown size={17} />
          </a>
          <a
            className="cairn-link"
            href={`${cairnLinks.guide}#try-it-in-60-seconds`}
          >
            Read the guide <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="night-footnote">
          <p>Basic replay makes no model calls.</p>
          <Button
            variant="ghost"
            className="cairn-motion"
            disabled={reducedMotion}
            onClick={() => setAnimated((value) => !value)}
            aria-pressed={!animated}
            aria-label={animated ? 'Pause sky animation' : 'Play sky animation'}
          >
            {animated ? <Pause size={14} /> : <Play size={14} />}
            {reducedMotion
              ? 'Reduced motion'
              : animated
                ? 'Pause sky'
                : 'Play sky'}
          </Button>
        </div>
      </div>
    </section>
  );
}
