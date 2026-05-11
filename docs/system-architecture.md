# 시스템 아키텍처

## workspace 모델

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

## 책임

### `apps/docs`

Vite 기반 React 문서와 쇼케이스 앱입니다.

책임

- 디자인 시스템의 원칙과 토큰을 시각화합니다.
- 컴포넌트 카탈로그와 로드맵을 보여줍니다.
- `packages/ui`의 실제 React 컴포넌트를 import해 preview로 검증합니다.
- workspace 개발 중에는 Vite alias로 `packages/ui/src`를 직접 참조합니다.

### `docs`

설계 문서와 운영 기준입니다.

책임

- 컴포넌트 로드맵과 우선순위를 기록합니다.
- 명명 규칙, 토큰 계약, 접근성 체크리스트를 유지합니다.
- 새 컴포넌트를 추가할 때 필요한 문서 템플릿을 제공합니다.

### `packages/tokens`

디자인 토큰 패키지입니다.

책임

- primitive, semantic, component token 레이어를 관리합니다.
- CSS 변수 기반 토큰을 `src/tokens.css`에 제공합니다.
- 컴포넌트가 원시 색상이나 임의 spacing에 의존하지 않도록 기준을 제공합니다.

### `packages/ui`

React + TypeScript 컴포넌트 패키지입니다.

책임

- 컴포넌트 카테고리, 우선순위, 상태, 접근성 참조를 `catalog.ts`에 기록합니다.
- 각 컴포넌트 폴더에 `{slug}.tsx`, `index.ts`, `README.md`, `spec.md`를 둡니다.
- `src/index.ts`는 public API barrel만 담당합니다.
- `dist`에 외부 프로젝트가 소비할 JS, declaration, CSS를 생성합니다.

### `scripts`

반복 가능한 유지보수 스크립트입니다.

책임

- `components:scaffold`로 카탈로그 기반 문서 골조를 생성합니다.
- `components:validate`로 필수 폴더, `.tsx` 구현, entry export, token/CSS 규칙을 확인합니다.
- `copy-ui-assets.mjs`로 UI CSS를 build 산출물에 복사합니다.

## 패키지 전략

현재 기준은 npm workspace입니다.

- 패키지 매니저
- lockfile: `package-lock.json`
- workspace: `apps/*`, `packages/*`
- 배포 방식: 현재는 workspace package와 `dist` 산출물을 기준으로 하며, npm/GitHub Packages 배포 여부는 별도 ADR로 결정합니다.

## 성장 경로

1. React + TypeScript 컴포넌트 구조 유지
2. 패키지 소비 문서와 릴리즈 체크리스트 유지
3. 접근성/키보드 테스트 추가
4. 빌드 산출물 검증 자동화
5. 패키지 배포 또는 registry 전략 결정
