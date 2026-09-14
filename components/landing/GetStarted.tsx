import { ArrowUpRight } from 'lucide-react';
import { cairnLinks } from '@/lib/cairn';
export function GetStarted() {
  return (
    <section
      className="get-started wrap"
      id="get-started"
      aria-labelledby="start-title"
    >
      <div>
        <p className="eyebrow">03 / YOUR FIRST TRAIL</p>
        <h2 id="start-title">
          첫 번째 경로를
          <br />
          남겨보세요.
        </h2>
        <p>
          Node.js 20 이상, Chrome, 사용할 모델을 준비하세요.
          <br />
          설치부터 첫 재생까지 가이드가 안내합니다.
        </p>
      </div>
      <div className="install">
        <p className="install-label">터미널에서 시작하기</p>
        <pre>
          <code>
            <span>$ </span>npm install -g cairn-engine
          </code>
        </pre>
        <div className="install-links">
          <a
            className="button primary"
            href={`${cairnLinks.guide}#try-it-in-60-seconds`}
          >
            시작 가이드 <ArrowUpRight size={17} />
          </a>
          <a className="text-link" href={cairnLinks.quickstart}>
            예제 프로젝트 <ArrowUpRight size={16} />
          </a>
        </div>
        <p className="install-note">
          탐색·복구와 AI 기반 판정에는 모델 호출이 필요할 수 있습니다.
        </p>
      </div>
    </section>
  );
}
