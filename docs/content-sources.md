# 랜딩 문구와 디자인 근거

2026-09-14에 `team-poem/cairn` 공식 README와 `banner.svg`를 확인했습니다.

- [README](https://github.com/team-poem/cairn): discover → freeze → replay → heal, CLI 명령, Node 20 이상과 Chrome 요구사항.
- [가이드](https://github.com/team-poem/cairn/blob/main/docs/guide.md): 시작하기 및 엔진 임베드 링크.
- [quickstart](https://github.com/team-poem/cairn/tree/main/examples/quickstart): 실행 예제.
- [README 배너](https://github.com/team-poem/cairn/blob/main/banner.svg): 짙은 밤하늘, 능선, 회청색 돌무더기, 황금색 꼭대기 돌과 파동, 이동하는 경로. 황금색 탐색·복구와 민트색 재생을 랜딩 전체로 확장했다.

## 아트워크

`public/cairn-scene.svg`와 `public/cairn-scene-still.svg`는 배너 원본의 SVG 도형과 그라디언트를 재사용한다. 배너의 텍스트·파이프라인·배경 사각형을 제외하고, 풍경과 돌무더기를 랜딩에 맞게 확대·배치했다. favicon도 원본 돌무더기에서 가져온다. MIT 고지는 `public/cairn-artwork-LICENSE.txt`에 포함한다.

돌 쌓기는 처음 한 번만 재생하며, 신호 파동과 경로는 반복된다. 사용자가 배경 모션을 끌 수 있고 `prefers-reduced-motion` 설정에서는 정지 SVG를 사용한다. 원래 손글씨 컨셉은 사용자 요청에 따라 교체했으며 해당 글꼴을 더 이상 로드하지 않는다.

## 데모와 문구의 범위

Workflow 인터랙션은 실제 Cairn 엔진에 연결하지 않은 설명용 데모다. 실행 시간은 애니메이션 진행 간격이고 성능 측정이 아니다. Freeze 화면은 단계를 요약한 표현이며 실제 JSON 스키마를 제시하지 않는다. CLI 영역도 사용 예제다.

LLM 호출이 없는 재생은 결정론적 기본 재생을 가리킨다. 탐색, 복구, AI 기반 판정은 모델 호출이 필요할 수 있다. 배너의 `free`와 `$0`는 무제한 실행 인프라까지 무료라는 의미로 확장하지 않는다. 랜딩에서는 기본 재생의 LLM 호출 없음으로 표현한다.

인증된 성공률, 고객 수, 보편적인 비용 절감률은 주장하지 않는다. 벤치마크를 추가할 때는 해당 fixture와 모델, 실행 횟수, 측정 범위를 함께 적는다.

## React Bits 배경

- [Galaxy](https://reactbits.dev/backgrounds/galaxy): 히어로의 별빛. 공식 `src/ts-default/Backgrounds/Galaxy` 소스와 ogl 1.0.11을 사용한다. 기존 별빛 SVG는 정지·GPU 실패 시 대체 배경이다. 섹션과 문서가 보일 때만 애니메이션을 실행하며 Hero 모션 설정을 공유한다.
- [Aero Shards](https://reactbits.dev/backgrounds/aero-shards): 엔진 소개 영역의 회청색·황금색 금속 조각. 공식 `src/ts-default/Backgrounds/AeroShards` 소스와 vgpu 0.3.1을 사용한다. WebGPU가 필요하며 지원하지 않거나 초기화에 실패하면 기본 배경과 본문을 유지한다. 원본의 화면 밖 일시정지·적응형 품질 기능과 모션 감소 설정을 유지하고 별도의 모션 버튼을 제공한다.
- [공식 소스](https://github.com/DavidHDev/react-bits): 셰이더는 원본을 사용하고, 사이트에 맞게 색·속도·배치를 설정했다. React 생명주기, GPU 포맷 타입, Galaxy 크기 초기화 및 포인터 이벤트 연결만 통합에 맞게 조정했다.

React Bits는 MIT + Commons Clause 라이선스다. 전체 고지는 `public/licenses/react-bits-LICENSE.md`에 포함한다. 웹사이트의 일부로 사용하며 독립 컴포넌트 라이브러리로 재판매하지 않는다. 두 효과는 지연 로딩되며 탐색 링크나 설명용 Workflow 데모를 가로막지 않는다.

## Hallmark 개편과 영어 문구

2026-09-14 사용자 요청으로 [Hallmark 스킬](https://github.com/Nutlope/hallmark/tree/13ac0ec7e148655948100b6396439e481361d690/skills/hallmark)을 적용했다. 기존 밤하늘·돌무더기·React Bits 효과는 유지하고, Narrative Workflow를 중심으로 첫 화면·실행 데모·기능 설명·설치 안내·푸터를 다시 배치했다. 세부 결정과 검토 범위는 `.hallmark/`에 기록한다.

[GeekNews 어휘 분석 글](https://news.hada.io/topic?id=32970)과 [원문](https://louisabraham.github.io/load-bearing/)은 반복되는 상투어와 과장된 서술을 줄이는 편집 참고 자료로 사용했다. 특정 단어의 유무로 작성 주체를 판정하거나 AI 문체 점수를 매기지는 않는다. “Replay forever” 대신 “Find a path. Run it again.”으로 바꾸고, 설명을 실제 동작과 입력·출력 중심으로 다시 썼다.

Space Grotesk와 Geist의 영문 가변 웹폰트를 Google Fonts에서 받아 직접 제공한다. 각 OFL 라이선스는 `public/fonts/`에 포함한다. 기존 프레임워크 전역 스타일과 패키지는 유지했다.
