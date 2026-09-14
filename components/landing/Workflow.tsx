'use client';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Check,
  FileJson,
  Play,
  RotateCcw,
  Search,
  Wrench,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const phases = [
  {
    id: 'discover',
    title: 'Discover',
    subtitle: '말에서 경로로.',
    description:
      '“로그인하고 장바구니를 열어줘.” AI가 브라우저를 탐색하며 실행할 단계를 찾습니다.',
    note: '01 / INTENT → PATH',
    action: '경로 찾기',
    command:
      'cairn discover "log in and open the cart" \\\n  --url=https://your.app --freeze=cart.skill.json',
  },
  {
    id: 'freeze',
    title: 'Freeze',
    subtitle: '경로에서 파일로.',
    description:
      '찾아낸 단계를 JSON 파일에 남깁니다. 읽고, 변경을 비교하고, 버전 관리할 수 있는 실행 기록입니다.',
    note: '02 / PATH → JSON',
    action: '',
    command: 'cart.skill.json',
  },
  {
    id: 'replay',
    title: 'Replay',
    subtitle: '다음에도, 같은 길.',
    description:
      '저장된 단계를 순서대로 다시 실행합니다. 기본 재생에는 LLM 호출이 필요 없습니다.',
    note: '03 / JSON → REPLAY',
    action: '저장한 경로 재생',
    command: 'cairn replay cart.skill.json',
  },
  {
    id: 'heal',
    title: 'Heal',
    subtitle: '달라진 길도, 이어서.',
    description:
      '장바구니 버튼이 바뀌어 기존 단계가 깨진 상황입니다. AI로 바뀐 단계를 복구하고 새 경로를 저장합니다.',
    note: '04 / REPAIR → SAVE',
    action: '바뀐 단계 복구',
    command: 'cairn replay cart.skill.json --heal',
  },
] as const;
type Phase = (typeof phases)[number]['id'];
const actions = ['로그인', '상품 선택', '장바구니 열기'];

export function Workflow() {
  const [phase, setPhase] = useState<Phase>('discover');
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [run, setRun] = useState(0);
  const complete = progress === 3;
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      setProgress((previous) => Math.min(previous + 1, 3));
      if (progress >= 2) setRunning(false);
    }, 750);
    return () => window.clearTimeout(timer);
  }, [running, progress]);
  function selectPhase(value: Phase) {
    setPhase(value);
    setRunning(false);
    setProgress(value === 'heal' ? 2 : 0);
  }
  function start() {
    setProgress(phase === 'heal' ? 2 : 0);
    setRunning(true);
    setRun((previous) => previous + 1);
  }
  return (
    <section
      className="workflow wrap"
      id="workflow"
      aria-labelledby="workflow-title"
    >
      <div className="section-heading">
        <p className="eyebrow">01 / A PATH WORTH KEEPING</p>
        <h2 id="workflow-title">
          발견은 한 번.
          <br />
          검증은 계속.
        </h2>
        <p>
          한 번 찾은 브라우저 흐름이 어떻게 테스트가 될까요?
          <br />네 단계를 눌러 Cairn의 실행 방식을 따라가 보세요.
        </p>
      </div>
      <Tabs
        value={phase}
        onValueChange={(value) => selectPhase(value as Phase)}
        className="engine-demo"
      >
        <TabsList className="phase-tabs" aria-label="Cairn 실행 단계">
          {phases.map((item, index) => (
            <TabsTrigger
              key={item.id}
              value={item.id}
              className="phase-tab"
              data-phase={item.id}
            >
              <span className="phase-number">0{index + 1}</span>
              <span className="phase-label">{item.title}</span>
              <ArrowRight size={16} />
            </TabsTrigger>
          ))}
        </TabsList>
        {phases.map((item) => (
          <TabsContent key={item.id} value={item.id} className="phase-content">
            <div className="phase-story">
              <p className="phase-margin-note">{item.note}</p>
              <h3>{item.subtitle}</h3>
              <p>{item.description}</p>
              <div className="demo-actions">
                {item.id !== 'freeze' && (
                  <Button
                    className="button primary"
                    onClick={start}
                    disabled={running}
                  >
                    {running
                      ? '실행 중…'
                      : complete
                        ? '다시 보기'
                        : item.action}
                    {item.id === 'heal' ? (
                      <Wrench size={16} />
                    ) : complete ? (
                      <RotateCcw size={16} />
                    ) : (
                      <Play size={16} />
                    )}
                  </Button>
                )}
                {item.id === 'freeze' && (
                  <Button
                    className="button primary"
                    onClick={() => selectPhase('replay')}
                  >
                    저장한 경로 재생하기 <ArrowRight size={16} />
                  </Button>
                )}
                {complete && item.id === 'discover' && (
                  <Button
                    variant="ghost"
                    className="demo-next"
                    onClick={() => selectPhase('freeze')}
                  >
                    저장된 파일 보기 <ArrowRight size={16} />
                  </Button>
                )}
              </div>
              <p className="simulation-note">
                설명용 인터랙티브 데모 · 실제 사이트에 접속하지 않습니다.
              </p>
            </div>
            <div
              className={`demo-surface ${item.id === 'heal' ? 'healing' : item.id === 'replay' ? 'replaying' : ''}`}
            >
              <div className="demo-topline">
                <span>
                  {item.id === 'freeze' ? (
                    <FileJson size={15} />
                  ) : (
                    <Search size={15} />
                  )}{' '}
                  {item.id === 'freeze'
                    ? 'cart.skill.json'
                    : 'your.app / shopping'}
                </span>
                <span>
                  {item.id === 'replay'
                    ? 'BASIC REPLAY'
                    : item.id.toUpperCase()}
                </span>
              </div>
              {item.id === 'freeze' ? (
                <div className="freeze-view">
                  <span className="file-note">실행할 단계가 파일 안에.</span>
                  <div className="recorded-steps">
                    {actions.map((action, index) => (
                      <div key={action}>
                        <span>0{index + 1}</span>
                        <Check size={16} />
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                  <div className="file-bottom">
                    <FileJson size={18} />
                    <span>JSON으로 기록 · Git으로 버전 관리</span>
                  </div>
                </div>
              ) : (
                <div className="run-view">
                  <div
                    className="demo-path"
                    key={`${item.id}-${run}`}
                    data-progress={progress}
                    data-running={running}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 400 76" fill="none">
                      <path
                        className="route-guide"
                        d="M30 38C90 9 104 63 155 38S220 9 265 38S330 63 370 38"
                      />
                      <path
                        className="route-progress"
                        pathLength="3"
                        d="M30 38C90 9 104 63 155 38S220 9 265 38S330 63 370 38"
                        style={{
                          strokeDasharray: '3',
                          strokeDashoffset: 3 - progress,
                        }}
                      />
                      {[30, 155, 265, 370].map((x, index) => (
                        <circle
                          key={x}
                          cx={x}
                          cy="38"
                          r={index <= progress ? 5 : 3}
                          className={index <= progress ? 'reached' : ''}
                        />
                      ))}
                    </svg>
                  </div>
                  <div className="demo-step-list">
                    {actions.map((action, index) => {
                      const done =
                        index < progress || (item.id === 'heal' && index < 2);
                      const broken =
                        item.id === 'heal' && index === 2 && !complete;
                      return (
                        <div
                          key={action}
                          className={`demo-step ${done ? 'is-done' : ''} ${broken ? 'is-broken' : ''}`}
                        >
                          <span className="demo-step-number">0{index + 1}</span>
                          <span>
                            {item.id === 'heal' && index === 2 ? (
                              <>
                                <del>장바구니 열기</del>
                                <span className="new-target">쇼핑백 보기</span>
                              </>
                            ) : (
                              action
                            )}
                          </span>
                          <span className="step-status">
                            {broken ? (
                              running ? (
                                '복구 중'
                              ) : (
                                '버튼 변경'
                              )
                            ) : done ? (
                              <Check size={17} />
                            ) : running && index === progress ? (
                              '실행 중'
                            ) : (
                              '대기'
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <output
                    className={`run-result ${complete ? 'is-complete' : ''}`}
                  >
                    {complete
                      ? item.id === 'heal'
                        ? '바뀐 단계를 복구하고 새 경로를 저장했어요.'
                        : item.id === 'replay'
                          ? '기록한 세 단계를 같은 순서로 재생했어요.'
                          : '세 단계를 찾았어요. 파일로 남길 준비가 됐어요.'
                      : running
                        ? '경로를 따라 실행하고 있어요…'
                        : item.id === 'heal'
                          ? '기존 버튼을 찾지 못했어요. 복구를 눌러 이어보세요.'
                          : '실행 버튼을 눌러 경로를 따라가 보세요.'}
                  </output>
                </div>
              )}
              <div className="demo-command">
                <span>{item.id === 'freeze' ? 'OUTPUT' : 'CLI'}</span>
                <pre>
                  <code>{item.command}</code>
                </pre>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
