# 시스템 아키텍처 / System Architecture

## workspace 모델 / Workspace Model

```text
frontend-lab
  apps/
    docs/
  docs/
  packages/
    tokens/
    ui/
  scripts/
```

## 책임 / Responsibilities

### `apps/docs`

로컬 문서와 쇼케이스 앱입니다. 현재는 별도 프레임워크 없이 정적 HTML/CSS/JS와 Node 서버로 실행합니다.
Local documentation and showcase app. It currently runs with static HTML/CSS/JS and a Node server without an additional framework.

책임 / Responsibilities:

- 디자인 시스템의 원칙과 토큰을 시각화합니다. / Visualizes design system principles and tokens.
- 컴포넌트 카탈로그와 로드맵을 보여줍니다. / Shows the component catalog and roadmap.
- 구현이 시작되면 `packages/ui`의 실제 컴포넌트를 import해 preview로 검증합니다. / When implementation starts, imports real components from `packages/ui` and verifies them in previews.

### `docs`

설계 문서와 운영 기준입니다.
Design documentation and operating standards.

책임 / Responsibilities:

- 컴포넌트 로드맵과 우선순위를 기록합니다. / Records the component roadmap and priorities.
- 명명 규칙, 토큰 계약, 접근성 체크리스트를 유지합니다. / Maintains naming rules, token contracts, and accessibility checklists.
- 새 컴포넌트를 추가할 때 필요한 문서 템플릿을 제공합니다. / Provides documentation templates for adding new components.

### `packages/tokens`

디자인 토큰 패키지입니다.
Design token package.

책임 / Responsibilities:

- primitive, semantic, component token 레이어를 관리합니다. / Manages primitive, semantic, and component token layers.
- CSS 변수 기반 토큰을 `src/tokens.css`에 제공합니다. / Provides CSS variable tokens in `src/tokens.css`.
- 컴포넌트가 원시 색상이나 임의 spacing에 의존하지 않도록 기준을 제공합니다. / Provides standards that keep components from relying on raw colors or arbitrary spacing.

### `packages/ui`

컴포넌트 카탈로그와 구현 소스가 들어갈 패키지입니다.
Package for the component catalog and implementation source.

책임 / Responsibilities:

- 컴포넌트 카테고리, 우선순위, 상태, 접근성 참조를 `catalog.js`에 기록합니다. / Records component categories, priorities, statuses, and accessibility references in `catalog.js`.
- 컴포넌트별 `README.md`와 `spec.md`를 유지합니다. / Maintains per-component `README.md` and `spec.md` files.
- 구현이 시작되면 컴포넌트 소스, 스타일, 테스트, 예시를 같은 폴더에 둡니다. / When implementation starts, colocates source, styles, tests, and examples in the same folder.

### `scripts`

반복 가능한 유지보수 스크립트입니다.
Repeatable maintenance scripts.

책임 / Responsibilities:

- `components:scaffold`로 카탈로그 기반 문서 골조를 생성합니다. / Generates catalog-based documentation skeletons with `components:scaffold`.
- `components:validate`로 필수 폴더와 문서가 있는지 확인합니다. / Checks required folders and docs with `components:validate`.

## 패키지 전략 / Package Strategy

현재 기준은 npm workspace입니다.
The current standard is npm workspaces.

- 패키지 매니저 / Package manager: npm
- lockfile / Lockfile: `package-lock.json`
- workspace / Workspaces: `apps/*`, `packages/*`
- 배포 방식: 초기에는 로컬 문서와 소스 관리 중심, 이후 필요할 때 npm package 또는 copy-owned registry 방식을 별도 ADR로 결정합니다. / Distribution: Start with local docs and source management, then decide npm package or copy-owned registry strategy in a separate ADR when needed.

## 성장 경로 / Growth Path

1. 문서와 컴포넌트 스펙 정리 / Organize docs and component specs
2. P0 컴포넌트 구현 / Implement P0 components
3. 문서 앱 preview를 실제 컴포넌트 import 방식으로 전환 / Convert docs app previews to real component imports
4. 접근성/키보드 테스트 추가 / Add accessibility and keyboard tests
5. 패키지 배포 또는 registry 전략 결정 / Decide package distribution or registry strategy
