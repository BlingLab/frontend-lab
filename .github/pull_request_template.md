# PR 요약 / PR Summary

## 변경 목적 / Purpose

- 이 PR이 해결하는 문제를 한 문장으로 적습니다. / Describe the problem this PR solves in one sentence.

## 변경 범위 / Scope

- [ ] 컴포넌트 구현 / Component implementation
- [ ] 디자인 토큰 또는 테마 / Design tokens or themes
- [ ] 문서 또는 docs app / Documentation or docs app
- [ ] 테스트, 검증, 빌드 설정 / Tests, validation, or build configuration

## 리뷰 포인트 / Review Points

- [ ] public API와 prop 이름이 기존 규칙과 맞습니다. / Public API and prop names follow existing conventions.
- [ ] controlled/uncontrolled 상태와 `on*Change` callback이 일관됩니다. / Controlled/uncontrolled state and `on*Change` callbacks are consistent.
- [ ] keyboard, focus-visible, disabled, invalid 상태가 동작합니다. / Keyboard, focus-visible, disabled, and invalid states work.
- [ ] CSS는 `--ds-*` token을 사용하고 raw color를 쓰지 않습니다. / CSS uses `--ds-*` tokens and avoids raw colors.
- [ ] 문서와 예시가 실제 구현과 맞습니다. / Documentation and examples match the implementation.

## 검증 / Verification

- [ ] `npm run test`
- [ ] `npm run typecheck`
- [ ] `npm --workspace @workspace/docs run build`

## 후속 이슈 / Follow-Up Issues

- 관련 이슈를 연결합니다. 예: `Closes #123` / Link related issues, for example `Closes #123`.
