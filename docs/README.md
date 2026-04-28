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
- [명명 규칙 / Naming Conventions](./naming-conventions.md): 이름, prop, CSS class, data attribute 규칙 / Rules for names, props, CSS classes, and data attributes
- [토큰 계약 / Token Contract](./token-contract.md): 디자인 토큰 레이어와 CSS 변수 사용 방식 / Design token layers and CSS variable usage
- [접근성 체크리스트 / Accessibility Checklist](./accessibility-checklist.md): 구현 전후 접근성 확인 항목 / Accessibility checks before and after implementation
- [반응형 레이아웃 시스템 / Responsive Layout System](./responsive-layout-system.md): flex-first 반응형 레이아웃 방향 / Flex-first responsive layout direction
- [ADR 0001](./adr/0001-use-npm-workspace-packages.md): npm workspace 우선 결정 / Decision to use npm workspaces first

## 운영 원칙 / Operating Principles

- 구현보다 문서 계약을 먼저 작성합니다. / Write the documentation contract before implementation.
- 컴포넌트가 해결하는 UI 문제를 한 문장으로 설명할 수 없으면 추가하지 않습니다. / Do not add a component if its UI problem cannot be explained in one sentence.
- 모든 interactive 컴포넌트는 키보드, 포커스, 접근 가능한 이름, 상태 전달 방식을 스펙에 포함해야 합니다. / Every interactive component must specify keyboard behavior, focus, accessible naming, and state communication.
- 토큰을 거치지 않은 원시 색상, 간격, radius 값은 컴포넌트 코드에 직접 쓰지 않습니다. / Do not write raw color, spacing, or radius values directly in component code.
