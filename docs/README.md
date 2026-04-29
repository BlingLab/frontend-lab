# 디자인 시스템 문서 / Design System Docs

이 디렉터리는 컴포넌트 구현 전에 합의해야 하는 설계 기준을 보관합니다.
This directory stores design standards that should be agreed on before component implementation.

## 문서 맵 / Document Map

- [언어 정책 / Language Policy](./language-policy.md): 한글 우선, 영문 병기 기준 / Korean-first bilingual writing standard
- [컴포넌트 로드맵 / Component Roadmap](./component-roadmap.md): 개발할 컴포넌트 범위, 우선순위, 상태 기준 / Component scope, priorities, and status rules
- [제품 개요 / Product Brief](./product-brief.md): 프로젝트 비전, 사용자, 성공 기준 / Project vision, users, and success criteria
- [시스템 아키텍처 / System Architecture](./system-architecture.md): workspace 구조와 각 패키지 책임 / Workspace structure and package responsibilities
- [컴포넌트 분류 / Component Taxonomy](./component-taxonomy.md): 컴포넌트 분류와 성숙도 모델 / Component categories and maturity model
- [컴포넌트 작성 규약 / Component Authoring](./component-authoring.md): 컴포넌트 폴더, 코드 구성, 문서 작성 방식 / Component folders, source composition, and documentation rules
- [변경 흐름 / Change Workflow](./change-workflow.md): 바로 push, PR 셀프 리뷰, 위험 체크리스트 기준 / Direct push, PR self-review, and risk checklist criteria
- [Prop API 설계 가이드 / Prop API Guidelines](./prop-api-guidelines.md): 재사용 가능한 prop 축, slot, render prop 기준 / Reusable prop axes, slots, and render prop rules
- [명명 규칙 / Naming Conventions](./naming-conventions.md): 이름, prop, CSS class, data attribute 규칙 / Rules for names, props, CSS classes, and data attributes
- [토큰 계약 / Token Contract](./token-contract.md): 디자인 토큰 레이어와 CSS 변수 사용 방식 / Design token layers and CSS variable usage
- [테마 시스템 / Theme System](./theme-system.md): normal 기본 theme와 theme set 확장 방식 / Normal base theme and theme set extension model
- [패키지 사용 가이드 / Package Consumption Guide](./package-consumption.md): 외부 React 프로젝트에서 패키지를 사용하는 방식 / How external React projects consume the package
- [릴리즈 체크리스트 / Release Checklist](./release-checklist.md): 배포 전 검증과 산출물 확인 / Pre-release validation and output checks
- [릴리즈 정책 / Release Policy](./release-policy.md): package scope, registry, versioning, changelog 기준 / Package scope, registry, versioning, and changelog criteria
- [시각 회귀 기준 / Visual Regression Criteria](./visual-regression.md): theme와 viewport별 screenshot 기준 / Theme and viewport screenshot criteria
- [브랜치 보호 기준 / Branch Protection Criteria](./branch-protection.md): main protection 적용 전 결정 기준 / Decision criteria before enabling main protection
- [리뷰와 이슈 보드 / Review And Issue Board](./review-and-issue-board.md): 코드 리뷰, 이슈, PR 후보 정리 / Code review, issue, and PR candidate tracking
- [접근성 체크리스트 / Accessibility Checklist](./accessibility-checklist.md): 구현 전후 접근성 확인 항목 / Accessibility checks before and after implementation
- [반응형 레이아웃 시스템 / Responsive Layout System](./responsive-layout-system.md): flex-first 반응형 레이아웃 방향 / Flex-first responsive layout direction
- [ADR 0001](./adr/0001-use-npm-workspace-packages.md): npm workspace 우선 결정 / Decision to use npm workspaces first

## 운영 원칙 / Operating Principles

- 구현보다 문서 계약을 먼저 작성합니다. / Write the documentation contract before implementation.
- 컴포넌트가 해결하는 UI 문제를 한 문장으로 설명할 수 없으면 추가하지 않습니다. / Do not add a component if its UI problem cannot be explained in one sentence.
- 모든 interactive 컴포넌트는 키보드, 포커스, 접근 가능한 이름, 상태 전달 방식을 스펙에 포함해야 합니다. / Every interactive component must specify keyboard behavior, focus, accessible naming, and state communication.
- 토큰을 거치지 않은 원시 색상, 간격, radius 값은 컴포넌트 코드에 직접 쓰지 않습니다. / Do not write raw color, spacing, or radius values directly in component code.
- 테마는 component CSS가 아니라 semantic token override로 확장합니다. / Themes are extended through semantic token overrides, not component CSS.
