import { ArrowDown, ArrowUpRight, Terminal } from 'lucide-react';
import { cairnLinks } from '@/lib/cairn';
const repo = cairnLinks.repository;
export function Hero() {
  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" /> POEM / BROWSER TESTING ENGINE
        </p>
        <h1 id="hero-title">
          한 번 찾은 길을,
          <br />
          <span>테스트로 남기다.</span>
        </h1>
        <p className="hero-description">
          AI가 브라우저를 탐색하고, 실행할 경로를 기록합니다.
          <br className="desktop-break" /> 다음 테스트는 저장한 경로로. UI가
          바뀌면 다시 복구합니다.
        </p>
        <div className="hero-actions">
          <a
            className="button primary"
            href={`${repo}/blob/main/docs/guide.md#try-it-in-60-seconds`}
          >
            시작하기 <ArrowUpRight size={18} />
          </a>
          <a className="text-link" href="#workflow">
            어떻게 작동하나요 <ArrowDown size={16} />
          </a>
        </div>
        <p className="hero-note">오픈소스 · TypeScript · CLI & Engine</p>
      </div>
      <div className="terminal-panel" aria-label="Cairn 명령 사용 예제">
        <div className="terminal-header">
          <span>
            <Terminal size={15} /> cairn / cart.skill.json
          </span>
          <span className="example-label">사용 예제</span>
        </div>
        <div className="terminal-body">
          <p className="code-comment">01 / 원하는 흐름을 말하세요</p>
          <pre>
            <code>
              <span className="prompt">$</span> cairn discover{' '}
              <span className="code-string">
                &quot;log in and open the cart&quot;
              </span>{' '}
              &#92;
              <br /> --url=https://your.app &#92;
              <br /> --freeze=cart.skill.json
            </code>
          </pre>
          <div className="trace-line">
            <span className="trace-node" />
            discover <span>→</span> freeze <span>→</span> <b>cart.skill.json</b>
          </div>
          <p className="code-comment">02 / 저장한 경로를 다시 실행하세요</p>
          <pre>
            <code>
              <span className="prompt">$</span> cairn replay cart.skill.json
            </code>
          </pre>
          <div className="replay-proof">
            <span className="proof-dot" /> 결정론적 재생{' '}
            <span className="proof-value">LLM 호출 없이</span>
          </div>
          <p className="code-comment">03 / UI가 달라졌다면</p>
          <pre>
            <code>
              <span className="prompt">$</span> cairn replay cart.skill.json{' '}
              <span className="code-string">--heal</span>
            </code>
          </pre>
        </div>
        <div className="terminal-footer">
          <span>DISCOVER ONCE. REPLAY THE PATH.</span>
          <span>↵</span>
        </div>
      </div>
    </section>
  );
}
