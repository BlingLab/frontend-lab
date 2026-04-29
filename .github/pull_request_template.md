# PR 요약 / PR Summary

## 변경 목적 / Purpose

- 이 PR이 해결하는 문제를 한 문장으로 적습니다. / Describe the problem this PR solves in one sentence.

## 변경 흐름 / Change Flow

- [ ] 기능 또는 구조 변경: Changes 탭에서 셀프 리뷰했습니다. / Feature or structure change: self-reviewed the Changes tab.
- [ ] 위험한 변경: 아래 위험 체크리스트를 작성했습니다. / Risky change: completed the risk checklist below.
- [ ] 작은 수정이면 PR 대신 `main` 바로 push 대상입니다. / Small changes should usually be pushed directly to `main` instead of using a PR.

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

## 위험 체크리스트 / Risk Checklist

- [ ] public API, token, package export, dependency, CI required check 중 영향받는 항목을 적었습니다. / Listed affected public API, token, package export, dependency, or CI required check.
- [ ] migration 또는 rollback 방법을 적었습니다. / Documented migration or rollback path.
- [ ] 접근성, focus, keyboard regression 가능성을 확인했습니다. / Checked accessibility, focus, and keyboard regression risk.
- [ ] 관련 문서, README, component spec를 함께 업데이트했습니다. / Updated related docs, README, and component specs.

## 후속 이슈 / Follow-Up Issues

- 관련 이슈를 연결합니다. 예: `Closes #123` / Link related issues, for example `Closes #123`.
