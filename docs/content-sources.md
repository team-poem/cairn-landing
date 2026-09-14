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
