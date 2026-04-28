# Design System Docs

이 디렉터리는 컴포넌트 구현 전에 합의해야 하는 설계 기준을 보관합니다.

## 문서 맵

- [Component Roadmap](./component-roadmap.md): 개발할 컴포넌트 범위, 우선순위, 상태 기준
- [Product Brief](./product-brief.md): 프로젝트 비전, 사용자, 성공 기준
- [System Architecture](./system-architecture.md): workspace 구조와 각 패키지 책임
- [Component Taxonomy](./component-taxonomy.md): 컴포넌트 분류와 성숙도 모델
- [Component Authoring](./component-authoring.md): 컴포넌트 폴더, 코드 구성, 문서 작성 방식
- [Naming Conventions](./naming-conventions.md): 이름, prop, CSS class, data attribute 규칙
- [Token Contract](./token-contract.md): 디자인 토큰 레이어와 CSS 변수 사용 방식
- [Accessibility Checklist](./accessibility-checklist.md): 구현 전후 접근성 확인 항목
- [Responsive Layout System](./responsive-layout-system.md): flex-first 반응형 레이아웃 방향
- [ADR 0001](./adr/0001-use-npm-workspace-packages.md): npm workspace 우선 결정

## 운영 원칙

- 구현보다 문서 계약을 먼저 작성합니다.
- 컴포넌트가 해결하는 UI 문제를 한 문장으로 설명할 수 없으면 추가하지 않습니다.
- 모든 interactive 컴포넌트는 키보드, 포커스, 접근 가능한 이름, 상태 전달 방식을 스펙에 포함해야 합니다.
- 토큰을 거치지 않은 원시 색상, 간격, radius 값은 컴포넌트 코드에 직접 쓰지 않습니다.
