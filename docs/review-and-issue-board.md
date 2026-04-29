# 리뷰와 이슈 보드 / Review And Issue Board

이 문서는 GitHub Issue와 Pull Request로 옮길 항목을 정리하는 lightweight backlog입니다.
This document is a lightweight backlog for items that should become GitHub Issues and Pull Requests.

## 코드 리뷰 기준 / Code Review Criteria

- public API는 `docs/prop-api-guidelines.md`의 prop 축과 controlled/uncontrolled 규칙을 따라야 합니다. / Public API must follow prop axes and controlled/uncontrolled rules in `docs/prop-api-guidelines.md`.
- 컴포넌트 구현은 각 폴더의 `{slug}.tsx`에 있고 root barrel은 export만 담당해야 합니다. / Component implementation must live in each folder's `{slug}.tsx`, and the root barrel should only export.
- keyboard, focus-visible, disabled, invalid, selected, open 상태는 DOM state와 ARIA state가 함께 맞아야 합니다. / Keyboard, focus-visible, disabled, invalid, selected, and open states must align DOM state with ARIA state.
- CSS는 semantic/component token을 사용하고 raw color, 임의 spacing, theme name 분기를 피해야 합니다. / CSS must use semantic/component tokens and avoid raw colors, arbitrary spacing, and theme-name branching.
- docs app 예시는 실제 `@workspace/ui` export를 렌더링해야 합니다. / Docs app examples must render real `@workspace/ui` exports.

## 현재 이슈 후보 / Current Issue Candidates

| 우선순위 / Priority | 제목 / Title | 유형 / Type | 기준 / Acceptance Criteria |
| --- | --- | --- | --- |
| P0 | CI workflow 추가 / Add CI workflow | infra | `npm run test`, `npm run typecheck`, docs build가 push와 PR에서 실행됩니다. / Runs `npm run test`, `npm run typecheck`, and docs build on push and PR. |
| P0 | 접근성 회귀 테스트 확장 / Expand accessibility regression tests | quality | `Dialog`, `CommandPalette`, `Combobox`, `DataGrid` keyboard 흐름을 자동화합니다. / Automates keyboard flows for `Dialog`, `CommandPalette`, `Combobox`, and `DataGrid`. |
| P1 | 시각 회귀 기준 추가 / Add visual regression criteria | quality | NORMAL/DARK, mobile/tablet/desktop screenshots 기준을 정의합니다. / Defines screenshot criteria for NORMAL/DARK and mobile/tablet/desktop. |
| P1 | 패키지 릴리즈 정책 확정 / Define package release policy | release | package scope, registry, versioning, changelog 방식을 결정합니다. / Defines package scope, registry, versioning, and changelog flow. |
| P1 | DataGrid 고급 상호작용 설계 / Design advanced DataGrid interactions | component | column resize, row keyboard navigation, virtual scroll 여부를 결정합니다. / Decides column resize, row keyboard navigation, and virtual scroll scope. |

## PR 후보 / Pull Request Candidates

### 1. CI와 검증 자동화 / CI And Validation Automation

- 범위 / Scope: GitHub Actions workflow, npm cache, test/typecheck/docs build job.
- 리뷰 포인트 / Review points: workflow runtime, cache key, failure output, branch protection readiness.
- 연결 이슈 / Linked issue: `CI workflow 추가 / Add CI workflow`.

### 2. 접근성 상호작용 테스트 / Accessibility Interaction Tests

- 범위 / Scope: keyboard simulation test runner 또는 Playwright 기반 docs app 검증.
- 리뷰 포인트 / Review points: focus order, Escape close, Arrow navigation, `aria-activedescendant`.
- 연결 이슈 / Linked issue: `접근성 회귀 테스트 확장 / Expand accessibility regression tests`.

### 3. 릴리즈 준비 / Release Readiness

- 범위 / Scope: package name/scope, changelog, version policy, publish target.
- 리뷰 포인트 / Review points: consumer import path, peer dependency, generated `dist` structure.
- 연결 이슈 / Linked issue: `패키지 릴리즈 정책 확정 / Define package release policy`.

### 4. DataGrid 성숙도 향상 / DataGrid Maturity

- 범위 / Scope: keyboard row navigation, resize handle API, optional virtualized body decision.
- 리뷰 포인트 / Review points: table semantics 유지, prop API 폭발 방지, responsive overflow.
- 연결 이슈 / Linked issue: `DataGrid 고급 상호작용 설계 / Design advanced DataGrid interactions`.

## 운영 방식 / Operating Flow

1. 이 문서의 후보를 GitHub Issue로 만들고 template의 완료 기준을 채웁니다. / Turn candidates in this document into GitHub Issues and fill the template definition of done.
2. PR은 하나의 이슈 또는 강하게 연결된 이슈 묶음만 닫도록 작게 유지합니다. / Keep each PR small enough to close one issue or a tightly related issue set.
3. PR description에는 `.github/pull_request_template.md` 체크리스트를 남깁니다. / Keep the `.github/pull_request_template.md` checklist in the PR description.
4. merge 전에는 `npm run test`, `npm run typecheck`, `npm --workspace @workspace/docs run build`를 확인합니다. / Before merge, verify `npm run test`, `npm run typecheck`, and `npm --workspace @workspace/docs run build`.
