import type { Locale } from './i18n';
import { siteUrl } from './site';

export const guideUrls = {
  en: `${siteUrl}/agentic-testing/`,
  ko: `${siteUrl}/ko/agentic-testing/`,
} as const;

export const testingGuide = {
  en: {
    title: 'Agentic testing for browsers: AI discovery and model-free replay',
    description:
      'Learn how Cairn uses AI agents to discover browser tests, save JSON scenarios, replay without model calls, and verify opt-in repairs for UI changes.',
    heading: 'Agentic testing for browser applications',
    intro:
      'Cairn is an open-source TypeScript engine and CLI for testing web applications with AI agents. Describe a user flow, let AI discover browser actions, and save the steps and assertions as a reusable JSON test. Ordinary mechanical replay then runs without a model.',
    home: 'Cairn home',
    language: 'Language',
    updated: 'Updated October 24, 2026 · Based on Cairn 2.9.5 documentation',
    overview: 'What is agentic testing?',
    definition:
      'Agentic testing uses an AI agent to help explore an application and perform test actions toward a goal. In Cairn, the agent discovers a browser flow; a saved scenario and explicit assertions make later regression checks repeatable. This tests a web application with an agent, rather than evaluating an AI model itself.',
    flowTitle: 'From a browser task to a regression test',
    steps: [
      [
        'Discover',
        'Describe a flow such as signing in, submitting a form, or placing a synthetic order. A configured model observes the browser and selects actions.',
      ],
      [
        'Freeze',
        'Save the discovered steps and assertions as a readable *.skill.json file. Review the assertions: reaching a page is not enough if the goal also requires a successful API response.',
      ],
      [
        'Replay',
        'Execute the saved steps and mechanical checks in the browser. Basic replay uses zero model calls; browser execution and infrastructure still have their own costs.',
      ],
      [
        'Repair',
        'Enable --heal explicitly when a UI change breaks a target. Save a repaired path only after verification succeeds. Application defects should remain failures.',
      ],
    ],
    fitTitle: 'When is Cairn useful?',
    fit: 'Use Cairn to author repeatable login, form, or checkout checks from a task description, or embed cairn-engine in a QA tool or CI workflow. Supply success criteria that match your application. If you need exact handwritten browser logic, conventional scripted tests may be a better fit; Cairn does not remove the need to review test coverage.',
    controlsTitle: 'App knowledge and execution budgets',
    controls:
      'Optional appContext gives discovery, exploration, and repair your app terminology and workflow rules. It is guidance, not evidence or proof of success. budget: { maxModelCalls, timeoutMs } shares limits across discovery and repair per run or suite case; separate top-level calls get separate budgets. Deadlines use cooperative cancellation, not a hard kill or billing cap.',
    faqTitle: 'Questions about AI browser testing',
    questions: [
      {
        question: 'Does every test run call an LLM?',
        answer:
          'No. Ordinary replay runs saved actions and mechanical assertions without a model. Discovery, opt-in repair, and optional semantic checks can call a model. Healthy mechanical replay needs neither appContext nor a model.',
      },
      {
        question: 'Can I try Cairn without an API key or model account?',
        answer:
          'Yes. The scripted quickstart supplies fixed responses while real Chrome discovers, saves, and replays a local form flow. It checks browser integration, not a real model’s ability to discover an unfamiliar app. Its README lists exact Node and Chrome requirements.',
      },
      {
        question: 'Does Cairn judge screenshots automatically?',
        answer:
          'Built-in critics judge execution and logic evidence. Screenshots are captured for records and host-defined custom checks. A custom check with missing evidence can be inconclusive; missing proof is not treated as a pass.',
      },
      {
        question: 'Is the order demo a live AI service?',
        answer:
          'No. It shows recorded engine 2.9.2 executions of a synthetic order journey, not live model calls or a new 2.9.5 benchmark. Recording details disclose the evidence-retention limitation and reproduction steps.',
      },
    ],
    nextTitle: 'Try it and inspect the evidence',
    quickstart: 'Run the no-account quickstart',
    demo: 'Inspect recorded engine executions',
    sources: 'Official sources',
    sourceNames: [
      'Cairn 2.9.5 README',
      'Usage and embedding guide',
      'Assertion and evidence contract',
      'Source code and MIT license',
    ],
    landing: 'Explore the interactive landing page',
  },
  ko: {
    title: '에이전틱 테스팅 가이드: AI 브라우저 테스트와 모델 없는 재실행',
    description:
      'Cairn으로 AI 에이전트가 브라우저 테스트 경로를 찾고 JSON으로 저장하는 방법을 알아보세요. 모델 없는 재실행, 검증 후 복구, CI 연동과 한계를 설명합니다.',
    heading: 'AI 에이전트로 웹 앱을 테스트하는 방법',
    intro:
      'Cairn은 웹 앱의 에이전틱 테스팅을 위한 오픈 소스 TypeScript 엔진이자 CLI입니다. 테스트할 사용자 흐름을 설명하면 AI 에이전트가 브라우저에서 실행 경로를 찾습니다. 실행 단계와 검증 조건을 JSON으로 저장하고, 기본 테스트는 모델 호출 없이 다시 실행합니다.',
    home: 'Cairn 홈',
    language: '언어',
    updated: '2026년 10월 24일 수정 · Cairn 2.9.5 문서 기준',
    overview: '에이전틱 테스팅이란?',
    definition:
      '에이전틱 테스팅은 AI 에이전트가 목표에 따라 앱을 탐색하고 테스트 동작을 수행하도록 하는 방식입니다. Cairn은 에이전트가 찾은 브라우저 경로와 검증 조건을 저장해 이후 회귀 테스트에 재사용합니다. AI 모델 자체의 성능을 평가하는 것이 아니라, AI 에이전트를 이용해 웹 앱을 검증하는 용도입니다.',
    flowTitle: '사용자 흐름을 회귀 테스트로 남기는 과정',
    steps: [
      [
        '경로 분석 · Discover',
        '로그인, 폼 제출, 합성 주문처럼 테스트할 흐름을 설명합니다. 연결한 모델이 브라우저를 관측하며 다음 동작을 선택합니다.',
      ],
      [
        '경로 저장 · Freeze',
        '찾은 단계와 검증 조건을 읽을 수 있는 *.skill.json으로 저장합니다. 성공 화면에 도착하는 것만으로 충분한지, API 응답도 확인해야 하는지 검토하세요.',
      ],
      [
        '재실행 · Replay',
        '저장된 단계와 기계적 검증 조건을 브라우저에서 실행합니다. 기본 재생의 모델 호출은 0회입니다. 브라우저 실행이나 인프라 비용까지 없어지는 것은 아닙니다.',
      ],
      [
        '자가 치유 · Repair',
        'UI 변경으로 타깃을 찾지 못하면 --heal로 복구를 명시적으로 허용합니다. 검증을 통과한 경로만 다시 저장합니다. 앱 자체의 오류는 실패로 남아야 합니다.',
      ],
    ],
    fitTitle: '어떤 테스트에 활용할 수 있나요?',
    fit: '로그인·폼·주문처럼 반복할 사용자 흐름을 설명해 테스트를 만들거나, cairn-engine을 자체 QA 도구와 CI에 연결할 수 있습니다. 성공 조건은 앱에 맞게 제공해야 합니다. 브라우저 동작을 코드로 세밀하게 제어해야 한다면 직접 작성한 테스트가 더 적합할 수 있습니다. Cairn을 써도 검증 범위를 검토하는 일은 필요합니다.',
    controlsTitle: '앱 컨텍스트와 실행 예산',
    controls:
      'appContext로 앱 용어와 업무 규칙을 탐색·UX 점검·복구에 전달할 수 있습니다. 참고 정보이며 관측 증거나 성공 판정을 대체하지 않습니다. budget: { maxModelCalls, timeoutMs }는 실행별 또는 suite 케이스별로 탐색·복구 예산을 공유합니다. 별도 최상위 호출은 별도 예산입니다. 시간 제한은 협력적 취소이며 강제 종료나 과금 상한이 아닙니다.',
    faqTitle: 'AI 브라우저 테스트에 관한 질문',
    questions: [
      {
        question: '테스트를 실행할 때마다 LLM을 호출하나요?',
        answer:
          '아니요. 기본 재실행은 저장된 동작과 기계적 검증 조건을 모델 없이 실행합니다. 탐색, 명시적으로 허용한 복구, 선택적 의미 검사는 모델을 호출할 수 있습니다. 정상적인 기본 재생에는 appContext도 모델도 필요 없습니다.',
      },
      {
        question: 'API 키나 모델 계정 없이 체험할 수 있나요?',
        answer:
          '네. scripted quickstart는 미리 정한 응답과 실제 Chrome으로 로컬 폼의 탐색·저장·재생을 확인합니다. 브라우저 연동을 검증하는 예제이며, 실제 모델이 처음 보는 앱을 얼마나 잘 탐색하는지 측정한 결과는 아닙니다. 정확한 Node·Chrome 준비 사항은 예제 README에 있습니다.',
      },
      {
        question: '스크린샷을 보고 자동으로 성공을 판정하나요?',
        answer:
          '기본 Critic은 실행·로직 증거로 판정합니다. 스크린샷은 실행 기록과 사용자 정의 검사에 활용하도록 수집합니다. 근거가 부족한 custom check는 inconclusive로 남을 수 있으며, 증거가 없다는 이유로 통과시키지 않습니다.',
      },
      {
        question: '주문 데모는 실시간 AI 서비스인가요?',
        answer:
          '아니요. 합성 주문 흐름을 실행한 엔진 2.9.2의 기록입니다. 실시간 모델 호출이나 새로 측정한 2.9.5 벤치마크가 아닙니다. 기록 안내에서 네트워크 증거 보존의 한계와 재현 방법을 확인할 수 있습니다.',
      },
    ],
    nextTitle: '직접 실행하고 증거를 확인해 보세요',
    quickstart: '계정 없이 퀵스타트 실행하기',
    demo: '엔진 실행 기록 살펴보기',
    sources: '공식 근거 문서',
    sourceNames: [
      'Cairn 2.9.5 README',
      '사용법·엔진 임베딩 가이드',
      '검증 조건과 증거 명세',
      '소스 코드와 MIT 라이선스',
    ],
    landing: '인터랙티브 랜딩 살펴보기',
  },
} satisfies Record<Locale, object>;
