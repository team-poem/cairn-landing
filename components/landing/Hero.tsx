import {
  ArrowDown,
  ArrowUpRight,
  Check,
  FileJson,
  MousePointer2,
} from 'lucide-react';
import { cairnLinks } from '@/lib/cairn';
import { Handwritten, InkLine } from './Handwritten';
export function Hero() {
  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" /> POEM — BROWSER TESTING ENGINE
        </p>
        <h1 id="hero-title">
          <Handwritten text="한 번 찾은 길," />
          <br />
          <span className="title-last">
            <Handwritten text="오래 남도록." delay={0.5} />
            <InkLine />
          </span>
        </h1>
        <p className="hero-description">
          말로 찾고, 파일로 남기고, 그대로 다시 실행하세요.
          <br className="desktop-break" /> Cairn은 브라우저의 흐름을 기록하는
          테스트 엔진입니다.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#workflow">
            작동 방식 체험하기 <ArrowDown size={18} />
          </a>
          <a
            className="text-link"
            href={`${cairnLinks.guide}#try-it-in-60-seconds`}
          >
            시작 가이드 <ArrowUpRight size={16} />
          </a>
        </div>
        <p className="hero-note">OPEN SOURCE / TYPESCRIPT / CLI & ENGINE</p>
      </div>
      <div
        className="execution-notebook"
        aria-label="로그인과 장바구니 탐색 흐름 예시"
      >
        <div className="notebook-heading">
          <span>FIELD NOTES / 001</span>
          <span className="seal" aria-label="시작">
            시<br />작
          </span>
        </div>
        <p className="notebook-prompt handwritten">
          “로그인하고, 장바구니 열어줘.”
        </p>
        <div className="browser-sketch">
          <div className="browser-bar">
            <span className="window-dots">
              <i />
              <i />
              <i />
            </span>
            <span>your.app / cart</span>
            <span>↗</span>
          </div>
          <div className="sketch-content">
            <div className="sketch-row">
              <span className="sketch-index">01</span>
              <span>로그인</span>
              <Check size={16} />
            </div>
            <div className="sketch-row">
              <span className="sketch-index">02</span>
              <span>상품 선택</span>
              <Check size={16} />
            </div>
            <div className="sketch-row selected">
              <span className="sketch-index">03</span>
              <span>장바구니 열기</span>
              <MousePointer2 size={19} />
            </div>
          </div>
          <svg
            className="sketch-route"
            viewBox="0 0 370 220"
            fill="none"
            aria-hidden="true"
          >
            <path
              pathLength="1"
              d="M44 43C20 56 29 75 43 79S67 83 45 107S28 141 43 149C66 164 112 155 197 163S273 174 300 179"
            />
            <circle cx="300" cy="179" r="4" />
          </svg>
        </div>
        <div className="saved-note">
          <FileJson size={19} />
          <span>
            cart.skill.json<small>발견한 경로를 다음 실행의 이정표로.</small>
          </span>
          <span className="handwritten">기록 완료 ✓</span>
        </div>
        <p className="notebook-caption">흐름 설명을 위한 예시입니다.</p>
      </div>
      <div className="hero-bottom">
        <span>DISCOVER ONCE. REPLAY THE PATH.</span>
        <span className="handwritten">발견에서 반복까지, 한 줄로.</span>
        <a href="#workflow" aria-label="실행 흐름으로 이동">
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  );
}
