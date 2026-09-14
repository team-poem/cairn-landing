import { ArrowRight } from 'lucide-react';
export function Workflow() {
  return (
    <section
      className="workflow wrap"
      id="workflow"
      aria-labelledby="workflow-title"
    >
      <div className="section-heading">
        <p className="eyebrow">01 / THE LOOP</p>
        <h2 id="workflow-title">
          발견은 한 번.
          <br />
          검증은 계속.
        </h2>
        <p>
          경로를 표시하는 작은 돌무더기, cairn.
          <br />한 번 발견한 흐름을 다음 실행의 이정표로 남깁니다.
        </p>
      </div>
      <div className="flow-grid">
        {[
          [
            '01',
            'Discover',
            '말로 시작하기',
            '“로그인하고 장바구니를 열어줘.” AI가 실제 브라우저에서 흐름을 찾습니다.',
          ],
          [
            '02',
            'Freeze',
            '파일로 남기기',
            '찾아낸 단계를 읽고 비교할 수 있는 JSON 파일로 저장합니다.',
          ],
          [
            '03',
            'Replay',
            '같은 경로 다시 걷기',
            '저장된 흐름을 결정론적으로 실행합니다. 기본 재생에는 LLM 호출이 필요 없습니다.',
          ],
          [
            '04',
            'Heal',
            '달라진 길 복구하기',
            'UI 변경으로 단계가 깨졌을 때 AI가 복구하고, 수정한 경로를 다시 저장합니다.',
          ],
        ].map(([n, title, subtitle, description]) => (
          <article className="flow-step" key={n}>
            <div className="step-top">
              <span>{n}</span>
              <ArrowRight size={18} />
            </div>
            <h3>{title}</h3>
            <strong>{subtitle}</strong>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
