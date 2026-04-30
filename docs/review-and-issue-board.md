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

이 표는 생성 당시의 후보와 완료 기준을 남기는 기록입니다. 새 실행 순서는 아래 `우선순위와 SLA`, `마일스톤 운영`, `다음 작업 묶음 기준`을 기준으로 정합니다.
This table preserves candidates and acceptance criteria from the time they were created. Use `Priority And SLA`, `Milestone Operations`, and `Next Work Batch Criteria` below to decide the current execution order.

| Issue | 우선순위 / Priority | 제목 / Title | 유형 / Type | 기준 / Acceptance Criteria |
| --- | --- | --- | --- | --- |
| [#1](https://github.com/BlingLab/frontend-lab/issues/1) | P0 | CI workflow 추가 / Add CI workflow | infra | `npm run test`, `npm run typecheck`, docs build가 push와 PR에서 실행됩니다. / Runs `npm run test`, `npm run typecheck`, and docs build on push and PR. |
| [#2](https://github.com/BlingLab/frontend-lab/issues/2) | Done | 접근성 회귀 테스트 확장 / Expand accessibility regression tests | quality | `Dialog`, `CommandPalette`, `Combobox`, `DataGrid` keyboard 흐름과 주요 interactive component 흐름을 자동화했습니다. / Automated `Dialog`, `CommandPalette`, `Combobox`, `DataGrid`, and core interactive component flows. |
| [#3](https://github.com/BlingLab/frontend-lab/issues/3) | P0 | 브랜치 보호와 PR 리뷰 규칙 설정 / Configure branch protection and PR review rules | review | `docs/branch-protection.md`에 direct push 정책 충돌과 적용 체크리스트를 기록했습니다. / `docs/branch-protection.md` records the direct-push policy conflict and application checklist. |
| [#4](https://github.com/BlingLab/frontend-lab/issues/4) | P1 | 시각 회귀 기준 추가 / Add visual regression criteria | quality | NORMAL/DARK, mobile/tablet/desktop 기준은 `docs/visual-regression.md`로 정의합니다. / NORMAL/DARK and mobile/tablet/desktop criteria are defined in `docs/visual-regression.md`. |
| [#5](https://github.com/BlingLab/frontend-lab/issues/5) | P1 | 패키지 릴리즈 정책 확정 / Define package release policy | release | package scope, registry, versioning, changelog 기준은 `docs/release-policy.md`로 관리합니다. / Package scope, registry, versioning, and changelog criteria are managed in `docs/release-policy.md`. |
| [#6](https://github.com/BlingLab/frontend-lab/issues/6) | Done | DataGrid 고급 상호작용 설계 / Design advanced DataGrid interactions | component | row keyboard navigation과 column resize를 구현했고 virtual scroll은 별도 이슈 후보로 분리했습니다. / Implemented row keyboard navigation and column resize, while splitting virtual scroll into a separate issue candidate. |
| [#7](https://github.com/BlingLab/frontend-lab/issues/7) | Done | React 컴포넌트 시스템 하드닝 완료 기록 / Track completed hardening work | tracking | 완료된 component hardening 작업을 closed issue로 기록했습니다. / Completed component hardening work is recorded as a closed issue. |
| [#8](https://github.com/BlingLab/frontend-lab/issues/8) | Done | Button ref 전달 구조 개선 / Improve Button ref forwarding | component | overlay focus return이 explicit trigger ref 기반으로 동작합니다. / Overlay focus return works through explicit trigger refs. |
| [#9](https://github.com/BlingLab/frontend-lab/issues/9) | Done | Listbox highlight hook 공통화 / Extract shared listbox highlight hook | component | Combobox와 CommandPalette가 disabled option guard를 포함한 shared highlight hook을 사용합니다. / Combobox and CommandPalette use a shared highlight hook with disabled option guards. |
| [#10](https://github.com/BlingLab/frontend-lab/issues/10) | Done | Overlay dismiss와 focus hook 공통화 / Extract overlay dismiss and focus hooks | component | Escape, outside pointer, focus return 로직이 shared hook으로 정리되었습니다. / Escape, outside pointer, and focus return logic are consolidated into shared hooks. |
| [#12](https://github.com/BlingLab/frontend-lab/issues/12) | Done | DataGrid virtual scroll 범위 결정 / Decide DataGrid virtual scroll scope | component | large dataset 기준과 ARIA 영향을 별도 후속으로 분리했습니다. / Large dataset criteria and ARIA impact were split into a separate follow-up. |
| [#46](https://github.com/BlingLab/frontend-lab/issues/46) | P2 | DataGrid virtual scroll ARIA 검증 프로토타입 / Prototype virtual scroll with ARIA validation | component | large dataset, keyboard navigation, selection, screen reader row count/index 전략을 함께 검증합니다. / Validates large dataset behavior, keyboard navigation, selection, and screen reader row count/index strategy together. |
| [#47](https://github.com/BlingLab/frontend-lab/issues/47) | P2 | 컴포넌트 문서 재생성 전 수동 변경 감지 / Detect manual changes before regenerating component docs | documentation | docs regeneration dry-run, manual protected section, drift 검증 기준을 추가합니다. / Adds docs regeneration dry-run, manual protected sections, and drift validation criteria. |
| [#48](https://github.com/BlingLab/frontend-lab/issues/48) | P2 | pixel baseline comparison 도입 / Add pixel baseline comparison | quality | screenshot artifact 검증을 baseline comparison까지 확장합니다. / Extends screenshot artifact checks to baseline comparison. |
| [#49](https://github.com/BlingLab/frontend-lab/issues/49) | P1 | 실제 npm publish scope와 권한 확정 / Finalize npm publish scope and permissions | release | 실제 package scope, `private` flag, npm token, organization permission을 확정합니다. / Finalizes the real package scope, `private` flag, npm token, and organization permissions. |

## 우선순위와 SLA / Priority And SLA

| 우선순위 / Priority | 기준 / Criteria | 기대 처리 / Expected Handling |
| --- | --- | --- |
| P0 | `main`, release, 보안, package install, 핵심 접근성 회귀를 막는 항목입니다. / Items that block `main`, release, security, package install, or core accessibility regression. | 가장 먼저 처리하고 낮은 우선순위 뒤로 묶지 않습니다. 가능한 당일 또는 다음 영업일 안에 PR을 열고 검증합니다. / Handle first and do not batch behind lower priorities. Open and validate a PR on the same day or next business day when possible. |
| P1 | release readiness, public API, 반복 사용 컴포넌트 품질, CI 신뢰도처럼 제품화 기준에 직접 영향을 주는 항목입니다. / Items that directly affect productization quality, such as release readiness, public API, reusable component quality, or CI confidence. | 새 P2 작업보다 먼저 처리합니다. 같은 작업 묶음 안에서 끝낼 수 있도록 PR 범위를 좁힙니다. / Handle before new P2 work. Keep the PR scope small enough to finish within the current work batch. |
| P2 | 사용성, 문서, 후속 설계, 장기 확장성처럼 즉시 차단하지 않는 개선 항목입니다. / Improvements that do not immediately block work, such as usability, documentation, follow-up design, or long-term scalability. | 관련 영역을 만질 때 함께 처리하거나 P0/P1이 비어 있을 때 순차 처리합니다. / Handle when touching the related area or sequentially when no P0/P1 work remains. |

## 마일스톤 운영 / Milestone Operations

- 현재는 GitHub Milestone을 기본 계획 단위로 사용합니다. Project board는 동시에 여러 owner가 병렬로 운영하거나 issue 수가 20개를 넘을 때 도입합니다. / Use GitHub Milestones as the default planning unit for now. Introduce a Project board when multiple owners run parallel streams or the open issue count exceeds 20.
- `M0 Foundation Hardening`은 CI, branch protection, core component refactor처럼 기반 안정화 항목을 담습니다. / `M0 Foundation Hardening` holds foundation stability items such as CI, branch protection, and core component refactors.
- `M1 Release Readiness`는 package publish, changelog, public API contract, consumer fixture처럼 배포 가능성을 증명하는 항목을 담습니다. / `M1 Release Readiness` holds items that prove publish readiness, such as package publishing, changelog, public API contracts, and consumer fixtures.
- `M2 Docs And Scale Follow-up`은 docs app smoke, prop table automation, virtual scroll decision처럼 문서화와 확장성 후속 항목을 담습니다. / `M2 Docs And Scale Follow-up` holds documentation and scalability follow-ups such as docs app smoke, prop table automation, and virtual scroll decisions.
- milestone은 완료 목표가 아니라 다음 작업 묶음의 경계입니다. 범위가 커지면 새 issue로 분리하고 milestone 안에서 우선순위를 다시 정렬합니다. / A milestone is a boundary for the next work batch, not a promise to finish everything at once. Split growing scope into new issues and reorder priorities inside the milestone.

## 다음 작업 묶음 기준 / Next Work Batch Criteria

- P0와 P1이 남아 있으면 새 P2를 시작하지 않습니다. 단, P2가 현재 PR의 문서 보강이나 검증 누락을 직접 해결하는 경우에는 같은 PR에 포함할 수 있습니다. / Do not start a new P2 while P0 or P1 remains. A P2 may stay in the same PR only when it directly completes documentation or validation for that PR.
- 같은 label 묶음인 `ci`, `release`, `accessibility`, `component`, `documentation`을 우선 함께 검토합니다. 구현 파일이 겹치지 않으면 PR은 분리합니다. / Review related labels such as `ci`, `release`, `accessibility`, `component`, and `documentation` together first. Split PRs when implementation files do not overlap.
- 하나의 PR은 기본적으로 하나의 issue를 닫습니다. 같은 root cause, 같은 검증 명령, 같은 reviewer 관점이면 연결 issue를 함께 닫을 수 있습니다. / A PR should close one issue by default. It may close linked issues only when they share the same root cause, validation commands, and reviewer perspective.
- 즉시 처리는 `fast-track` 또는 `flow:direct`로 짧은 PR을 열고 merge합니다. `main` 보호가 켜져 있으므로 direct push 대신 PR 기록을 남깁니다. / For Fast Track work, open and merge a short PR labeled `fast-track` or `flow:direct`. Because `main` protection is enabled, leave a PR record instead of pushing directly.
- 기능/구조 변경은 `flow:pr`로 Changes 탭 셀프 리뷰를 전제로 합니다. review point와 검증 결과가 PR 본문에 남아야 합니다. / Feature or structural changes use `flow:pr` and assume self-review in the Changes tab. Review points and validation results must remain in the PR body.
- 위험한 변경은 `flow:risk`로 표시하고 merge 전 체크리스트, rollback 기준, 추가 검증을 PR 본문에 적습니다. / Risky changes use `flow:risk` and must list the pre-merge checklist, rollback criteria, and extra validation in the PR body.

## 닫힌 이슈와 후속 연결 / Closed Issue And Follow-up Linking

- PR 본문에는 닫을 issue를 `Closes #번호`로 명시합니다. / The PR body must identify the issue being closed with `Closes #number`.
- 작업 중 새 범위가 발견되면 기존 issue 범위를 늘리지 말고 새 issue를 만들고 원본 issue 또는 PR에 `Follow-up: #번호`로 연결합니다. / When new scope appears during work, create a new issue instead of expanding the existing issue and link it from the source issue or PR with `Follow-up: #number`.
- 닫힌 issue는 완료 기준이 실패한 경우에만 다시 엽니다. 새 요구사항이나 개선은 follow-up issue로 분리합니다. / Reopen a closed issue only when its acceptance criteria failed. Split new requirements or improvements into follow-up issues.
- follow-up issue는 출처 PR/issue, priority label, flow label, 최소 완료 기준을 포함해야 합니다. / A follow-up issue must include the source PR/issue, priority label, flow label, and minimum acceptance criteria.
- merge 후 issue comment에는 실제 검증 명령과 남은 위험을 짧게 남깁니다. / After merge, leave a short issue comment with the actual validation commands and remaining risk.

## PR 후보 / Pull Request Candidates

### 1. CI와 검증 자동화 / CI And Validation Automation

- 범위 / Scope: GitHub Actions workflow, npm cache, test/typecheck/docs build job.
- 리뷰 포인트 / Review points: workflow runtime, cache key, failure output, branch protection readiness.
- 연결 이슈 / Linked issue: [#1](https://github.com/BlingLab/frontend-lab/issues/1)

### 2. 접근성 상호작용 테스트 / Accessibility Interaction Tests

- 상태 / Status: 완료. `scripts/interaction-a11y.mjs`와 docs browser smoke로 검증합니다. / Done. Verified through `scripts/interaction-a11y.mjs` and docs browser smoke.
- 리뷰 포인트 / Review points: focus order, Escape close, Arrow navigation, `aria-activedescendant`.
- 연결 이슈 / Linked issue: [#2](https://github.com/BlingLab/frontend-lab/issues/2)

### 3. PR 보호와 리뷰 규칙 / PR Protection And Review Rules

- 범위 / Scope: branch protection, required checks, PR review requirement.
- 리뷰 포인트 / Review points: main direct push 제한, required CI, reviewer rule.
- 연결 이슈 / Linked issue: [#3](https://github.com/BlingLab/frontend-lab/issues/3)

### 4. 릴리즈 준비 / Release Readiness

- 범위 / Scope: package name/scope, changelog, version policy, publish target.
- 리뷰 포인트 / Review points: consumer import path, peer dependency, generated `dist` structure.
- 연결 이슈 / Linked issues: [#5](https://github.com/BlingLab/frontend-lab/issues/5), [#49](https://github.com/BlingLab/frontend-lab/issues/49)

### 5. DataGrid 성숙도 향상 / DataGrid Maturity

- 상태 / Status: keyboard row navigation과 resize handle API는 완료했고 virtualized body는 별도 후속입니다. / Keyboard row navigation and resize handle API are done; virtualized body remains a separate follow-up.
- 리뷰 포인트 / Review points: table semantics 유지, prop API 폭발 방지, responsive overflow.
- 연결 이슈 / Linked issues: [#6](https://github.com/BlingLab/frontend-lab/issues/6), [#46](https://github.com/BlingLab/frontend-lab/issues/46)

### 6. 상호작용 리팩토링 / Interaction Refactor

- 상태 / Status: Button ref forwarding, listbox highlight hook, overlay dismiss/focus hook은 완료했습니다. / Button ref forwarding, listbox highlight hook, and overlay dismiss/focus hook are done.
- 리뷰 포인트 / Review points: focus return regression, keyboard behavior, hook API scope.
- 연결 이슈 / Linked issues: [#8](https://github.com/BlingLab/frontend-lab/issues/8), [#9](https://github.com/BlingLab/frontend-lab/issues/9), [#10](https://github.com/BlingLab/frontend-lab/issues/10)

### 7. 문서 자동화 후속 / Documentation Automation Follow-up

- 범위 / Scope: component docs regeneration dry-run, manual section protection, generated prop table drift check.
- 리뷰 포인트 / Review points: 수동 작성 문서 보존, scaffold 범위 명확성, 대량 문서 diff 최소화. / Manual document preservation, clear scaffold scope, and reduced large documentation diffs.
- 연결 이슈 / Linked issue: [#47](https://github.com/BlingLab/frontend-lab/issues/47)

### 8. 시각 회귀 기준 후속 / Visual Regression Follow-up

- 범위 / Scope: screenshot artifact 검증에서 pixel baseline comparison으로 확장합니다. / Extend screenshot artifact checks to pixel baseline comparison.
- 리뷰 포인트 / Review points: threshold, flake 처리, baseline 갱신 절차, theme/viewport coverage. / Thresholds, flake handling, baseline update workflow, and theme/viewport coverage.
- 연결 이슈 / Linked issue: [#48](https://github.com/BlingLab/frontend-lab/issues/48)

## 운영 방식 / Operating Flow

1. 이 문서의 후보를 GitHub Issue로 만들고 template의 완료 기준을 채웁니다. / Turn candidates in this document into GitHub Issues and fill the template definition of done.
2. PR은 하나의 이슈 또는 강하게 연결된 이슈 묶음만 닫도록 작게 유지합니다. / Keep each PR small enough to close one issue or a tightly related issue set.
3. PR description에는 `.github/pull_request_template.md` 체크리스트를 남깁니다. / Keep the `.github/pull_request_template.md` checklist in the PR description.
4. merge 전에는 `npm run test`, `npm run typecheck`, `npm --workspace @workspace/docs run build`를 확인합니다. / Before merge, verify `npm run test`, `npm run typecheck`, and `npm --workspace @workspace/docs run build`.
