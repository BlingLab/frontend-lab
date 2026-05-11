# 디자인 시스템 문서

이 디렉터리는 컴포넌트 구현 전에 합의해야 하는 설계 기준을 보관합니다.

## 문서 맵

- [언어 정책](./language-policy.md)
- [컴포넌트 로드맵](./component-roadmap.md)
- [제품 개요](./product-brief.md)
- [시스템 아키텍처](./system-architecture.md)
- [컴포넌트 분류](./component-taxonomy.md)
- [컴포넌트 작성 규약](./component-authoring.md)
- [변경 흐름](./change-workflow.md)
- [Prop API 설계 가이드](./prop-api-guidelines.md)
- [명명 규칙](./naming-conventions.md)
- [토큰 계약](./token-contract.md)
- [테마 시스템](./theme-system.md)
- [패키지 사용 가이드](./package-consumption.md)
- [릴리즈 체크리스트](./release-checklist.md)
- [릴리즈 정책](./release-policy.md)
- [시각 회귀 기준](./visual-regression.md)
- [브랜치 운영 기준](./branch-protection.md)
- [리뷰와 이슈 보드](./review-and-issue-board.md)
- [접근성 체크리스트](./accessibility-checklist.md)
- [반응형 레이아웃 시스템](./responsive-layout-system.md)
- [ADR 0001](./adr/0001-use-npm-workspace-packages.md): npm workspace 우선 결정

## 운영 원칙

- 구현보다 문서 계약을 먼저 작성합니다.
- 컴포넌트가 해결하는 UI 문제를 한 문장으로 설명할 수 없으면 추가하지 않습니다.
- 모든 interactive 컴포넌트는 키보드, 포커스, 접근 가능한 이름, 상태 전달 방식을 스펙에 포함해야 합니다.
- 토큰을 거치지 않은 원시 색상, 간격, radius 값은 컴포넌트 코드에 직접 쓰지 않습니다.
- 테마는 component CSS가 아니라 semantic token override로 확장합니다.
