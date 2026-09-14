'use client';
import { useEffect, useState } from 'react';
import { CairnSculpture } from './CairnSculpture';
import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cairnLinks } from '@/lib/cairn';
import { GalaxyBackdrop } from './GalaxyBackdrop';
import { useI18n } from './LocaleProvider';
export function Hero() {
  const { t } = useI18n();
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
        <CairnSculpture animated={animated} />
        <div className="night-copy">
          <p className="night-eyebrow">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="night-name">
                  {t.hero.name}
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  align="start"
                  sideOffset={8}
                  className="night-name-tip"
                >
                  {t.hero.nameMeaning}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {t.hero.eyebrow}
          </p>
          <h1 id="hero-title">
            {t.hero.titleTop}
            <br />
            {t.hero.titleBottom}
          </h1>
          <p className="night-description">{t.hero.description}</p>
          <div className="night-actions">
            <a className="cairn-button" href="#workflow">
              {t.hero.primary} <ArrowDown size={17} />
            </a>
            <a
              className="cairn-link"
              href={`${cairnLinks.guide}#try-it-in-60-seconds`}
            >
              {t.hero.secondary} <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
      <div className="night-footnote cairn-container">
        <p>{t.hero.footnote}</p>
        <Button
          variant="ghost"
          className="cairn-motion"
          disabled={reducedMotion}
          onClick={() => setAnimated((value) => !value)}
          aria-pressed={!animated}
          aria-label={
            animated ? t.hero.motionPauseLabel : t.hero.motionPlayLabel
          }
        >
          {animated ? <Pause size={14} /> : <Play size={14} />}
          {reducedMotion
            ? t.hero.motionReduced
            : animated
              ? t.hero.motionPause
              : t.hero.motionPlay}
        </Button>
      </div>
    </section>
  );
}
