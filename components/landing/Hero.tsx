'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cairnLinks } from '@/lib/cairn';
import styles from './NightSky.module.css';
import { GalaxyBackdrop } from './GalaxyBackdrop';
const stages = [
  ['01', 'discover', 'AI가 경로를 발견', 'LLM · ONCE'],
  ['02', 'freeze', '읽을 수 있는 파일로', 'PLAIN JSON'],
  ['03', 'replay', '저장한 경로를 반복', 'NO LLM CALLS'],
  ['04', 'self-heal', '바뀐 단계만 복구', 'REPAIR & SAVE'],
];
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
    <section
      className={`hero ${styles.nightHero}`}
      aria-labelledby="hero-title"
    >
      <GalaxyBackdrop animated={animated} />
      <div className="hero-main wrap">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> THE BROWSER TESTING ENGINE BY POEM
          </p>
          <h1 id="hero-title">
            Discover once.
            <br />
            <span>Replay forever.</span>
          </h1>
          <p className="hero-kicker">
            한 번 찾은 길이, 다음 실행의 이정표가 됩니다.
          </p>
          <p className="hero-description">
            AI가 브라우저 흐름을 찾고, Cairn이 기록합니다.
            <br className="desktop-break" /> 다음 테스트는 저장한 경로로. UI가
            바뀌면 그 단계만 복구하세요.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#workflow">
              Cairn 작동 방식 보기 <ArrowDown size={18} />
            </a>
            <a
              className="text-link"
              href={`${cairnLinks.guide}#try-it-in-60-seconds`}
            >
              시작 가이드 <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="hero-proof">
            <span>
              <i />
              기본 재생에 LLM 호출 없음
            </span>
            <span>OPEN SOURCE</span>
          </div>
        </div>
        <div className="beacon-scene">
          <Image
            src={animated ? '/cairn-scene.svg' : '/cairn-scene-still.svg'}
            alt="밤하늘의 능선 위에 쌓인 돌무더기. 꼭대기의 황금빛 돌이 경로를 비춥니다."
            width="700"
            height="590"
            priority
            unoptimized
          />
          <div className="scene-caption">
            <span className="beacon-dot" />
            <span>cairn / 길을 남기는 이정표</span>
          </div>
          <Button
            variant="ghost"
            className="scene-toggle"
            disabled={reducedMotion}
            onClick={() => setAnimated((previous) => !previous)}
            aria-label={
              animated ? '배경 애니메이션 멈추기' : '배경 애니메이션 재생하기'
            }
          >
            {animated ? <Pause size={14} /> : <Play size={14} />}
            <span>
              {reducedMotion
                ? '모션 감소'
                : animated
                  ? '모션 끄기'
                  : '모션 켜기'}
            </span>
          </Button>
        </div>
      </div>
      <div
        className="hero-pipeline wrap"
        aria-label="탐색, 저장, 재생, 복구 순서"
      >
        {stages.map(([number, title, description, meta], index) => (
          <div className={`pipeline-stage pipeline-${index}`} key={title}>
            <span className="pipeline-number">{number}</span>
            <div>
              <span className="pipeline-name">
                {title}
                {index === 2 && <span className="infinity">∞</span>}
              </span>
              <p>{description}</p>
              <span className="pipeline-meta">{meta}</span>
            </div>
            {index < 3 && <ArrowRight className="pipeline-arrow" size={18} />}
          </div>
        ))}
      </div>
    </section>
  );
}
