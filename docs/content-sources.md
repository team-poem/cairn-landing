# 랜딩 문구 근거

2026-09-14에 `team-poem/cairn` main의 공식 README를 확인했습니다.

- [README](https://github.com/team-poem/cairn): discover → freeze → replay → heal, CLI 명령, Node 20 이상과 Chrome 요구사항.
- [가이드](https://github.com/team-poem/cairn/blob/main/docs/guide.md): 시작하기 및 엔진 임베드 링크.
- [quickstart](https://github.com/team-poem/cairn/tree/main/examples/quickstart): 실행 예제.

터미널 영역은 사용 예제이며 실제 실행 로그가 아닙니다. 인증된 성공률, 고객 수, 보편적인 비용 절감률은 주장하지 않습니다.
LLM 호출이 없는 재생은 결정론적 기본 재생을 가리킵니다. 탐색, 복구, AI 기반 판정은 모델 호출이 필요할 수 있습니다.
벤치마크를 추가할 때는 해당 fixture와 모델, 실행 횟수, 측정 범위를 함께 적습니다.

## 손글씨 개편 (2026-09-14)

- [Hand Writing Text / Kokonut](https://21st.dev/@kokonutd/components/hand-writing-text)를 방향 참고로 사용했다. 원본 컴포넌트 코드를 복사하지 않고 글자별 등장과 SVG 밑줄을 직접 구현했다.
- [Nanum Brush Script / Google Fonts](https://github.com/google/fonts/tree/main/ofl/nanumbrushscript)의 Google Fonts API 제공 부분 글꼴을 자체 호스팅한다. 라이선스는 public/fonts/OFL-NanumBrushScript.txt에 포함한다. 손글씨 문구 변경 시 해당 글자가 부분 글꼴에 있는지 확인하고 필요하면 Google Fonts의 text 요청을 다시 생성할 것.
- Workflow 인터랙션은 실제 Cairn 엔진에 연결하지 않은 설명용 데모다. 실행 시간은 애니메이션 진행 간격이고 성능 측정이 아니다. Freeze 화면은 단계를 요약한 표현이며 실제 JSON 스키마를 제시하지 않는다.
- 손글씨 제목은 글자별 마스크 등장이다. 한글 필순을 분석하는 캘리그래피 엔진은 아니다. 모션 감소 환경에서는 등장·경로 전환 애니메이션을 생략한다.
