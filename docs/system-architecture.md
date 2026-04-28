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

Vite 기반 React 문서와 쇼케이스 앱입니다.
Vite-based React documentation and showcase app.

책임 / Responsibilities:

- 디자인 시스템의 원칙과 토큰을 시각화합니다. / Visualizes design system principles and tokens.
- 컴포넌트 카탈로그와 로드맵을 보여줍니다. / Shows the component catalog and roadmap.
- `packages/ui`의 실제 React 컴포넌트를 import해 preview로 검증합니다. / Imports real React components from `packages/ui` and verifies them in previews.
- workspace 개발 중에는 Vite alias로 `packages/ui/src`를 직접 참조합니다. / During workspace development, Vite aliases directly to `packages/ui/src`.

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

React + TypeScript 컴포넌트 패키지입니다.
React + TypeScript component package.

책임 / Responsibilities:

- 컴포넌트 카테고리, 우선순위, 상태, 접근성 참조를 `catalog.ts`에 기록합니다. / Records component categories, priorities, statuses, and accessibility references in `catalog.ts`.
- 각 컴포넌트 폴더에 `{slug}.tsx`, `index.ts`, `README.md`, `spec.md`를 둡니다. / Keeps `{slug}.tsx`, `index.ts`, `README.md`, and `spec.md` in each component folder.
- `src/index.ts`는 public API barrel만 담당합니다. / `src/index.ts` only manages the public API barrel.
- `dist`에 외부 프로젝트가 소비할 JS, declaration, CSS를 생성합니다. / Generates JS, declarations, and CSS in `dist` for external projects.

### `scripts`

반복 가능한 유지보수 스크립트입니다.
Repeatable maintenance scripts.

책임 / Responsibilities:

- `components:scaffold`로 카탈로그 기반 문서 골조를 생성합니다. / Generates catalog-based documentation skeletons with `components:scaffold`.
- `components:validate`로 필수 폴더, `.tsx` 구현, entry export, token/CSS 규칙을 확인합니다. / Checks required folders, `.tsx` implementations, entry exports, and token/CSS rules with `components:validate`.
- `copy-ui-assets.mjs`로 UI CSS를 build 산출물에 복사합니다. / Copies UI CSS to build output with `copy-ui-assets.mjs`.

## 패키지 전략 / Package Strategy

현재 기준은 npm workspace입니다.
The current standard is npm workspaces.

- 패키지 매니저 / Package manager: npm
- lockfile / Lockfile: `package-lock.json`
- workspace / Workspaces: `apps/*`, `packages/*`
- 배포 방식: 현재는 workspace package와 `dist` 산출물을 기준으로 하며, npm/GitHub Packages 배포 여부는 별도 ADR로 결정합니다. / Distribution: Currently based on workspace packages and `dist` output; npm or GitHub Packages publishing should be decided in a separate ADR.

## 성장 경로 / Growth Path

1. React + TypeScript 컴포넌트 구조 유지 / Maintain React + TypeScript component structure
2. 패키지 소비 문서와 릴리즈 체크리스트 유지 / Maintain package consumption docs and release checklist
3. 접근성/키보드 테스트 추가 / Add accessibility and keyboard tests
4. 빌드 산출물 검증 자동화 / Automate build output validation
5. 패키지 배포 또는 registry 전략 결정 / Decide package distribution or registry strategy
