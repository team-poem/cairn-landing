export type Locale = 'en' | 'ko';
export const locales: readonly Locale[] = ['en', 'ko'];
export const defaultLocale: Locale = 'en';
export const localeStorageKey = 'cairn-locale';
export const localeOptions: Record<Locale, { short: string; name: string }> = {
  en: { short: 'EN', name: 'English' },
  ko: { short: 'KO', name: '한국어' },
};
export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'ko';
}
/* 샘플 앱(ShopDemo)의 버튼 문구와 동작 기록 코드는 두 언어에서 같다.
 * click("Log in") 같은 줄이 화면의 버튼 글자를 그대로 가리키므로,
 * 한쪽만 번역하면 데모가 설명하려는 대응이 끊어진다. */
const en = {
  header: {
    skip: 'Skip to content',
    home: 'Cairn home',
    github: 'GitHub',
    language: 'Language',
  },
  hero: {
    name: 'Cairn',
    eyebrow: ', an agentic testing engine.',
    nameMeaning:
      'A cairn is a stack of stones hikers leave on a trail to mark the way. This one marks a path through your app so the next run can follow it.',
    titleTop: 'Find a path.',
    titleBottom: 'Run it again.',
    description:
      'Describe a browser task. Cairn uses AI to find the steps, saves them as JSON, and runs them again without a model call.',
    primary: 'See it run',
    secondary: 'Read the guide',
    footnote: 'Basic replay makes no model calls.',
    motionReduced: 'Reduced motion',
    motionPause: 'Pause sky',
    motionPlay: 'Play sky',
    motionPauseLabel: 'Pause sky animation',
    motionPlayLabel: 'Play sky animation',
  },
  sculpture: {
    hint: 'Tap to topple',
    label: 'Knock down the cairn. It rebuilds after three seconds.',
    arriving: 'One stone at a time.',
    ready: 'Knock it down. It finds its way back.',
    rebuilding: (seconds: number) => `Rebuilding in ${seconds}…`,
    repairing: 'Finding its balance again.',
  },
  workflow: {
    titleTop: 'A browser task,',
    titleBottom: 'step by step.',
    lead: 'One task, three views. Follow the sample app, the action being executed, and the path it leaves behind.',
    tabsLabel: 'Cairn workflow stages',
    phases: {
      discover: {
        label: 'Find the steps',
        subtitle: 'Start with a task.',
        description:
          'Tell Cairn what to do. Watch it log in, add a daypack, and open the cart. Each action becomes a step you can save.',
        action: 'Run discovery',
      },
      freeze: {
        label: 'Save the path',
        subtitle: 'Keep what worked.',
        description:
          'The task is complete. Cairn saves the steps as JSON so the next run can follow the same path.',
        action: 'Replay the file',
      },
      replay: {
        label: 'Run it again',
        subtitle: 'Follow the saved steps.',
        description:
          'The same task runs from the recorded path. The screen, action list, and route move together. Basic replay makes no model calls.',
        action: 'Play replay',
      },
      heal: {
        label: 'Repair a change',
        subtitle: 'The cart button moved.',
        description:
          'The first two steps still work. AI finds the new “View bag” button, repairs the last step, and saves the updated path.',
        action: 'Repair the step',
      },
    },
    pause: 'Pause',
    runAgain: 'Run again',
    resume: 'Resume',
    reset: 'Reset',
    resetLabel: 'Reset the demo',
    savePath: 'Save this path',
    stepOf: (step: number) => `Step ${step} of 4`,
    next: {
      discover: 'Next: save the path',
      freeze: 'Next: run it again',
      replay: 'Next: repair a change',
    },
    startOver: 'Start over',
    notFound: 'not found',
    repaired: 'repaired',
    note: 'Simulated app and actions. No external site is opened.',
    savedSummary: 'Saved action summary',
    actionTrace: 'Action trace',
    illustrative: 'Illustrative code',
    codeLabel: 'Actions synchronized with the demo',
    running: 'running',
    ready: 'ready',
    completedLabel: 'Completed',
    steps: ['Log in', 'Add a daypack', 'Open the cart'],
    findNewButton: 'Find new button',
    savedAs: 'Saved as',
    tryInTerminal: 'Try this in your terminal',
    outputHealed: 'New button found. Updated path saved.',
    outputFrozen: 'Three steps saved in cart.skill.json.',
    outputDone: 'All three actions completed.',
    outputRepairing: 'Locating “View bag” and updating the last step…',
    outputRunning: (step: string) => `${step}…`,
    outputHealPrompt: '“Cart” was not found. Repair the step to continue.',
    outputIdle: 'Press play to follow the task.',
  },
  shop: {
    caption: 'Sample app',
    statusSaved: 'Path saved',
    statusRepairing: 'Finding the new button…',
    statusRunning: 'Cairn is running',
    statusDone: 'Task complete',
    statusIdle: 'Ready to run',
    storeLabel: 'Illustrated Trail Supply shopping app',
    guest: 'Guest',
    cartNotFound: 'Cart · not found',
    bagTitle: 'Your bag',
    bagCount: '1 item',
    bagVariant: 'Slate / One size',
    bagDone: 'Login, add, and open. All done.',
    cursorRepair: 'Find replacement',
    cursorSteps: ['Log in', 'Add item', 'Open cart'],
    cursorViewBag: 'View bag',
  },
  features: {
    titleTop: 'Your tools.',
    titleBottom: 'Cairn underneath.',
    lead: 'Run Cairn from the CLI or embed it in a QA tool, a CI check, or a browser monitor. One pipeline, six ports — nothing app-specific lives inside.',
    link: 'Explore the engine API',
    pipelineLabel: 'Pipeline',
    stages: {
      context: { name: 'Context', role: 'Assembles grounding' },
      plan: { name: 'Plan', role: 'Intent to Scenario' },
      execute: { name: 'Execute', role: 'Drives the browser' },
      judge: { name: 'Judge', role: 'Rules on evidence' },
      report: { name: 'Report', role: 'Emits the result' },
    },
    portsLabel: 'Six ports. Replace any one without forking.',
    ports: {
      ContextProvider: {
        stage: 'context',
        description:
          'Gathers what the run should know — the intent now; a git diff, a ticket, or docs later.',
      },
      Planner: {
        stage: 'plan',
        description:
          'Turns intent into a Scenario. A static planner replays a frozen file; an LLM loop discovers a new one.',
      },
      SkillStore: {
        stage: 'plan',
        description:
          'Where frozen *.skill.json files live. A folder on disk by default, or your own store.',
      },
      Driver: {
        stage: 'execute',
        description:
          'Drives the browser and waits for the page to settle. Chrome DevTools ships; bring Playwright or your own.',
      },
      Critic: {
        stage: 'judge',
        description:
          'Decides pass or fail from three layers of evidence — execution, perception, logic — not a screenshot guess.',
      },
      Reporter: {
        stage: 'report',
        description:
          'Sends the result anywhere: console, JSON, or the tracker your team already uses.',
      },
    },
    compareLabel: 'Where it sits',
    compare: {
      columns: ['Scripted (Playwright, Cypress)', 'LLM browser agents', 'Cairn'],
      rows: [
        { label: 'Authoring', cells: ['Hand-written selectors and code', 'Plain language', 'Plain language'] },
        { label: 'Every run', cells: ['Deterministic, cheap', 'LLM in the loop — slow, costly, flaky', 'Deterministic, cheap'] },
        { label: 'UI changes', cells: ['You fix the selectors', 'Re-reasons, may drift', 'Self-heals, then re-freezes'] },
        { label: 'LLM calls', cells: ['None', 'Every run', 'Once to discover, again only to heal'] },
      ],
    },
    codeLabel: 'What you actually write',
    codeTabs: {
      skill: 'A frozen scenario',
      embed: 'Embed the engine',
      suite: 'A case list',
    },
    codeNotes: {
      skill: 'Just data. Flat, readable, diffable. Each target keeps several locators — text first, role and index as a rename-resilient fallback, a CSS selector as the escape hatch.',
      embed: 'Replay with no model in the loop. Pass heal: true and a broken step is repaired instead of going red; write the healed path back.',
      suite: 'Hand it your QA cases with your own success criteria. Cached skills replay; misses are discovered once and frozen with the criteria merged in.',
    },
    measuredLabel: 'Measured, not claimed',
    measured:
      'On the multi-step checkout in bench/, replayed four times with Claude via Claude Code: 4 of 4 replays deterministic, 0 model calls on replay, discovery paid once. Every result carries its own count in result.usage.',
    measuredLink: 'See the bench',
    modelsLabel: 'Bring a model',
    models: 'Set a key and Cairn picks the backend — Anthropic, OpenAI, or Gemini. No key? A local Claude Code or Codex CLI login works too. Or implement the LlmClient port.',
    buildLabel: 'Things it powers',
    builds: [
      { term: 'A QA tool', description: 'Non-developers write flows in plain language, then watch them replay and self-heal.' },
      { term: 'A CI regression gate', description: 'Frozen flows run on every PR. Drift heals instead of going red.' },
      { term: 'A synthetic monitor', description: 'Replay critical paths against production. Alert only when one truly breaks.' },
      { term: 'A visual-replay app', description: 'The engine streams per-step progress and screenshots. You draw the UI.' },
    ],
  },
  start: {
    title: 'Give it a task.',
    leadTop: 'Bring Node.js 20+, Chrome, and a model.',
    leadBottom: 'The guide takes you from installation to your first replay.',
    installLabel: 'Install Cairn',
    primary: 'Start with the guide',
    secondary: 'Example project',
    note: 'Discovery, repair, and AI checks may call a model.',
  },
  nav: {
    label: 'Sections',
    sections: {
      top: 'Top',
      workflow: 'How it works',
      'get-started': 'Get started',
    },
  },
  footer: {
    tagline: 'An agentic testing engine.',
    navLabel: 'Footer',
    productLabel: 'Product',
    howItWorks: 'How it works',
    documentation: 'Documentation',
    quickstart: 'Quickstart',
    npm: 'npm',
    teamLabel: 'Poem',
    github: 'GitHub',
    repository: 'Cairn repository',
    copyright: 'Copyright © 2026 Poem. All rights reserved.',
    license: 'cairn-engine is released under the MIT License.',
  },
};
export type Copy = typeof en;
const ko: Copy = {
  header: {
    skip: '본문으로 건너뛰기',
    home: 'Cairn 홈',
    github: 'GitHub',
    language: '언어',
  },
  hero: {
    name: '케언',
    eyebrow: ', 에이전틱 테스팅 엔진.',
    nameMeaning:
      '케언(cairn)은 산길에 길을 표시하려고 쌓아 둔 돌무더기입니다. 이 케언은 앱을 지나는 경로를 찾아 표시해 두고, 다음 실행이 그 길을 따라가게 합니다.',
    titleTop: '경로를 찾고,',
    titleBottom: '다시 실행한다.',
    description:
      '브라우저에서 할 일을 설명하면 Cairn이 AI로 단계를 찾아 JSON으로 저장하고, 다음부터는 모델 호출 없이 그대로 실행합니다.',
    primary: '실행 보기',
    secondary: '가이드 읽기',
    footnote: '기본 재생은 모델을 호출하지 않습니다.',
    motionReduced: '모션 최소화',
    motionPause: '밤하늘 정지',
    motionPlay: '밤하늘 재생',
    motionPauseLabel: '밤하늘 애니메이션 정지',
    motionPlayLabel: '밤하늘 애니메이션 재생',
  },
  sculpture: {
    hint: '눌러서 무너뜨리기',
    label: '돌무더기를 무너뜨립니다. 3초 뒤에 다시 쌓입니다.',
    arriving: '돌을 하나씩 쌓습니다.',
    ready: '무너뜨려 보세요. 다시 제자리를 찾습니다.',
    rebuilding: (seconds: number) => `${seconds}초 뒤 다시 쌓습니다…`,
    repairing: '균형을 다시 잡는 중입니다.',
  },
  workflow: {
    titleTop: '브라우저 작업을,',
    titleBottom: '한 단계씩.',
    lead: '하나의 작업을 세 화면으로 봅니다. 샘플 앱, 지금 실행 중인 동작, 그리고 뒤에 남는 경로를 함께 따라가세요.',
    tabsLabel: 'Cairn 작업 단계',
    phases: {
      discover: {
        label: '단계 찾기',
        subtitle: '할 일에서 시작합니다.',
        description:
          '무엇을 할지 알려주세요. 로그인하고, 데이팩을 담고, 장바구니를 여는 과정을 볼 수 있습니다. 각 동작은 저장할 수 있는 단계가 됩니다.',
        action: '탐색 실행',
      },
      freeze: {
        label: '경로 저장',
        subtitle: '된 것을 남깁니다.',
        description:
          '작업이 끝났습니다. Cairn이 단계를 JSON으로 저장해 다음 실행이 같은 경로를 따라가게 합니다.',
        action: '파일로 재생',
      },
      replay: {
        label: '다시 실행',
        subtitle: '저장된 단계를 따라갑니다.',
        description:
          '기록된 경로 그대로 같은 작업이 실행됩니다. 화면과 동작 목록, 경로가 함께 움직입니다. 기본 재생은 모델을 호출하지 않습니다.',
        action: '재생하기',
      },
      heal: {
        label: '변경 복구',
        subtitle: '장바구니 버튼이 바뀌었습니다.',
        description:
          '앞의 두 단계는 그대로 동작합니다. AI가 새 “View bag” 버튼을 찾아 마지막 단계를 고치고, 바뀐 경로를 저장합니다.',
        action: '단계 복구',
      },
    },
    pause: '일시정지',
    runAgain: '다시 실행',
    resume: '이어서 실행',
    reset: '초기화',
    resetLabel: '데모 초기화',
    savePath: '이 경로 저장',
    stepOf: (step: number) => `${step} / 4 단계`,
    next: {
      discover: '다음: 경로 저장',
      freeze: '다음: 다시 실행',
      replay: '다음: 변경 복구',
    },
    startOver: '처음부터',
    notFound: '찾지 못함',
    repaired: '복구됨',
    note: '설명용 샘플 앱과 동작입니다. 외부 사이트를 열지 않습니다.',
    savedSummary: '저장된 동작 요약',
    actionTrace: '동작 기록',
    illustrative: '설명용 코드',
    codeLabel: '데모와 함께 움직이는 동작 목록',
    running: '실행 중',
    ready: '대기',
    completedLabel: '완료됨',
    steps: ['로그인', '데이팩 담기', '장바구니 열기'],
    findNewButton: '새 버튼 찾기',
    savedAs: '저장 위치',
    tryInTerminal: '터미널에서 시도해 보세요',
    outputHealed: '새 버튼을 찾았습니다. 바뀐 경로를 저장했습니다.',
    outputFrozen: '세 단계를 cart.skill.json에 저장했습니다.',
    outputDone: '세 동작을 모두 마쳤습니다.',
    outputRepairing: '“View bag”을 찾아 마지막 단계를 고치는 중…',
    outputRunning: (step: string) => `${step}…`,
    outputHealPrompt: '“Cart”를 찾지 못했습니다. 단계를 복구하면 이어집니다.',
    outputIdle: '재생을 누르면 작업을 따라갑니다.',
  },
  shop: {
    caption: '샘플 앱',
    statusSaved: '경로 저장됨',
    statusRepairing: '새 버튼을 찾는 중…',
    statusRunning: 'Cairn 실행 중',
    statusDone: '작업 완료',
    statusIdle: '실행 준비됨',
    storeLabel: '설명용 Trail Supply 쇼핑 앱',
    guest: 'Guest',
    cartNotFound: 'Cart · 찾지 못함',
    bagTitle: 'Your bag',
    bagCount: '1 item',
    bagVariant: 'Slate / One size',
    bagDone: 'Login, add, and open. All done.',
    cursorRepair: '대체 버튼 찾기',
    cursorSteps: ['Log in', 'Add item', 'Open cart'],
    cursorViewBag: 'View bag',
  },
  features: {
    titleTop: '쓰던 도구 그대로,',
    titleBottom: '그 아래에 Cairn.',
    lead: 'CLI로 실행하거나 QA 도구, CI 검사, 브라우저 모니터 안에 넣어 쓸 수 있습니다. 파이프라인 하나, 포트 여섯 — 앱에 특정한 로직은 엔진 안에 없습니다.',
    link: '엔진 API 살펴보기',
    pipelineLabel: '파이프라인',
    stages: {
      context: { name: 'Context', role: '근거를 모은다' },
      plan: { name: 'Plan', role: '의도를 시나리오로' },
      execute: { name: 'Execute', role: '브라우저를 움직인다' },
      judge: { name: 'Judge', role: '증거로 판정한다' },
      report: { name: 'Report', role: '결과를 내보낸다' },
    },
    portsLabel: '포트 여섯. 포크하지 않고 어느 하나든 바꿀 수 있습니다.',
    ports: {
      ContextProvider: {
        stage: 'context',
        description: '실행이 알아야 할 것을 모읍니다. 지금은 의도, 앞으로는 git diff·티켓·문서.',
      },
      Planner: {
        stage: 'plan',
        description: '의도를 시나리오로 바꿉니다. 정적 플래너는 저장된 파일을 재생하고, LLM 루프는 새로 탐색합니다.',
      },
      SkillStore: {
        stage: 'plan',
        description: '저장된 *.skill.json 이 사는 곳. 기본은 디스크의 폴더, 원하면 직접 만든 저장소.',
      },
      Driver: {
        stage: 'execute',
        description: '브라우저를 움직이고 화면이 안정될 때까지 기다립니다. Chrome DevTools 가 기본, Playwright 나 직접 만든 드라이버도 됩니다.',
      },
      Critic: {
        stage: 'judge',
        description: '실행·인식·로직 세 겹의 증거로 통과 여부를 정합니다. 스크린샷 추측이 아닙니다.',
      },
      Reporter: {
        stage: 'report',
        description: '결과를 어디로든 보냅니다. 콘솔, JSON, 팀이 쓰는 트래커.',
      },
    },
    compareLabel: '어디에 있는 도구인가',
    compare: {
      columns: ['스크립트 (Playwright, Cypress)', 'LLM 브라우저 에이전트', 'Cairn'],
      rows: [
        { label: '작성', cells: ['셀렉터와 코드를 직접', '자연어', '자연어'] },
        { label: '매 실행', cells: ['결정적, 저렴', '매번 LLM — 느리고 비싸고 흔들림', '결정적, 저렴'] },
        { label: 'UI 변경', cells: ['셀렉터를 고친다', '다시 추론, 흔들릴 수 있음', '스스로 고치고 다시 저장'] },
        { label: 'LLM 호출', cells: ['없음', '매 실행', '탐색에 한 번, 복구할 때만 다시'] },
      ],
    },
    codeLabel: '실제로 쓰게 되는 것',
    codeTabs: {
      skill: '저장된 시나리오',
      embed: '엔진 임베드',
      suite: '케이스 목록',
    },
    codeNotes: {
      skill: '그냥 데이터입니다. 평평하고, 읽히고, diff 됩니다. 각 target 은 여러 로케이터를 갖습니다 — 텍스트 먼저, 이름이 바뀌어도 버티는 role·index, 마지막 탈출구로 CSS 셀렉터.',
      embed: '모델 없이 재생합니다. heal: true 를 주면 깨진 단계를 빨간불 대신 고치고, 고친 경로를 다시 씁니다.',
      suite: 'QA 케이스와 팀의 성공 기준을 그대로 넘깁니다. 캐시된 스킬은 재생하고, 없는 것만 한 번 탐색해 기준을 합쳐 저장합니다.',
    },
    measuredLabel: '주장이 아니라 측정',
    measured:
      'bench/ 의 다단계 결제 흐름을 Claude Code 의 Claude 로 네 번 재생: 4/4 결정적 재생, 재생 중 모델 호출 0, 탐색 비용은 한 번. 모든 결과가 result.usage 에 자기 호출 수를 담습니다.',
    measuredLink: '벤치 보기',
    modelsLabel: '모델은 가져오세요',
    models: '키를 넣으면 Cairn 이 백엔드를 고릅니다 — Anthropic, OpenAI, Gemini. 키가 없으면 로컬 Claude Code 나 Codex CLI 로그인으로도 됩니다. 아니면 LlmClient 포트를 구현하세요.',
    buildLabel: '위에 지을 수 있는 것',
    builds: [
      { term: 'QA 도구', description: '개발자가 아니어도 자연어로 흐름을 쓰고, 재생과 자가 복구를 지켜봅니다.' },
      { term: 'CI 회귀 게이트', description: '저장된 흐름이 PR 마다 돕니다. 어긋나면 빨간불 대신 고칩니다.' },
      { term: '합성 모니터', description: '핵심 경로를 프로덕션에 재생합니다. 진짜 깨졌을 때만 알립니다.' },
      { term: '시각 재생 앱', description: '엔진이 단계별 진행과 스크린샷을 흘려줍니다. UI 는 당신이 그립니다.' },
    ],
  },
  start: {
    title: '할 일을 알려주세요.',
    leadTop: 'Node.js 20 이상과 Chrome, 그리고 모델을 준비하세요.',
    leadBottom: '가이드가 설치부터 첫 재생까지 안내합니다.',
    installLabel: 'Cairn 설치',
    primary: '가이드로 시작하기',
    secondary: '예제 프로젝트',
    note: '탐색, 복구, AI 판정은 모델을 호출할 수 있습니다.',
  },
  nav: {
    label: '섹션',
    sections: {
      top: '처음',
      workflow: '동작 방식',
      'get-started': '시작하기',
    },
  },
  footer: {
    tagline: '에이전틱 테스팅 엔진.',
    navLabel: '푸터',
    productLabel: '제품',
    howItWorks: '동작 방식',
    documentation: '문서',
    quickstart: '퀵스타트',
    npm: 'npm',
    teamLabel: 'Poem',
    github: 'GitHub',
    repository: 'Cairn 저장소',
    copyright: 'Copyright © 2026 Poem. All rights reserved.',
    license: 'cairn-engine 은 MIT 라이선스로 배포됩니다.',
  },
};
export const dictionaries: Record<Locale, Copy> = { en, ko };
