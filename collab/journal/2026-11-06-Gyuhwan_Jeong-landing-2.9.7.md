# codex/landing-2.9.7 · Gyuhwan_Jeong · 2026-11-06
- claim: collab/active/codex--landing-2.9.7/claim.md

## 이벤트
- changed lib/i18n.ts Critic EN/KO에 중간 화면 증거와 항목 키 비교를 추가 → 선택적 기능이며 항목 비교는 지원되는 목록 재실행 범위임을 유지할 것
- changed components/landing/GetStarted.tsx Critic에서 중간 증거와 항목 동일성 문서로 연결 → 기능의 실제 조건은 2.9.7 공식 문서를 따를 것
- changed lib/testing-guide.ts 안내 페이지를 2.9.7 문서에 맞춰 갱신 → 캡처는 성공 판정이 아니고 스크린샷은 자동 마스킹되지 않음
- changed public/llms.txt 증거 및 키 비교 범위 반영 → 같은 문서의 명시적 data-* 키를 쓰는 목록 클릭 재실행에 한정할 것
- changed public/sitemap.xml 랜딩과 안내의 수정일 갱신 → 이후 콘텐츠가 수정된 경우에만 날짜를 변경할 것

## 남은 것
- PR 검토 및 머지. 로컬 브라우저가 설정에서 비활성화되어 화면 배치를 직접 확인하지 못했다.
- 기존 중첩 cairn-landing/ 클론은 보존했다.
