# PR 요약

## 변경 목적

- 이 PR이 해결하는 문제를 한 문장으로 적습니다.

## 변경 흐름

- [ ] 즉시 처리: 영향 범위가 작고 되돌리기 쉬운 변경입니다.
- [ ] 가벼운 점검: 관련 검증을 선택했고 Changes 탭에서 셀프 리뷰했습니다.
- [ ] 정식 이슈급: 아래 위험 체크리스트와 이슈 연결을 작성했습니다.

## 변경 범위

- [ ] 컴포넌트 구현
- [ ] 디자인 토큰 또는 테마
- [ ] 문서 또는 문서 앱
- [ ] 테스트, 검증, 빌드 설정

## 리뷰 포인트

- [ ] public API와 prop 이름이 기존 규칙과 맞습니다.
- [ ] controlled/uncontrolled 상태와 `on*Change` callback이 일관됩니다.
- [ ] keyboard, focus-visible, disabled, invalid 상태가 동작합니다.
- [ ] CSS는 `--ds-*` token을 사용하고 raw color를 쓰지 않습니다.
- [ ] 문서와 예시가 실제 구현과 맞습니다.

## 검증

- [ ] `npm run test`
- [ ] `npm run typecheck`
- [ ] `npm --workspace @workspace/docs run build`

## 위험 체크리스트

- [ ] public API, token, package export, dependency, CI required check 중 영향받는 항목을 적었습니다.
- [ ] migration 또는 rollback 방법을 적었습니다.
- [ ] 접근성, focus, keyboard regression 가능성을 확인했습니다.
- [ ] 관련 문서, README, component spec를 함께 업데이트했습니다.

## 후속 이슈

- 관련 이슈를 연결합니다. 예: `Closes #123`
