# System Architecture

## Workspace Model

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

## Responsibilities

### `apps/docs`

로컬 문서와 쇼케이스 앱입니다. 현재는 별도 프레임워크 없이 정적 HTML/CSS/JS와 Node 서버로 실행합니다.

책임:

- 디자인 시스템의 원칙과 토큰을 시각화합니다.
- 컴포넌트 카탈로그와 로드맵을 보여줍니다.
- 구현이 시작되면 `packages/ui`의 실제 컴포넌트를 import해 preview로 검증합니다.

### `docs`

설계 문서와 운영 기준입니다.

책임:

- 컴포넌트 로드맵과 우선순위를 기록합니다.
- 명명 규칙, 토큰 계약, 접근성 체크리스트를 유지합니다.
- 새 컴포넌트를 추가할 때 필요한 문서 템플릿을 제공합니다.

### `packages/tokens`

디자인 토큰 패키지입니다.

책임:

- primitive, semantic, component token 레이어를 관리합니다.
- CSS 변수 기반 토큰을 `src/tokens.css`에 제공합니다.
- 컴포넌트가 원시 색상이나 임의 spacing에 의존하지 않도록 기준을 제공합니다.

### `packages/ui`

컴포넌트 카탈로그와 구현 소스가 들어갈 패키지입니다.

책임:

- 컴포넌트 카테고리, 우선순위, 상태, 접근성 참조를 `catalog.js`에 기록합니다.
- 컴포넌트별 `README.md`와 `spec.md`를 유지합니다.
- 구현이 시작되면 컴포넌트 소스, 스타일, 테스트, 예시를 같은 폴더에 둡니다.

### `scripts`

반복 가능한 유지보수 스크립트입니다.

책임:

- `components:scaffold`로 카탈로그 기반 문서 골조를 생성합니다.
- `components:validate`로 필수 폴더와 문서가 있는지 확인합니다.

## Package Strategy

현재 기준은 npm workspace입니다.

- 패키지 매니저: npm
- lockfile: `package-lock.json`
- workspace: `apps/*`, `packages/*`
- 배포 방식: 초기에는 로컬 문서와 소스 관리 중심, 이후 필요할 때 npm package 또는 copy-owned registry 방식을 별도 ADR로 결정합니다.

## Growth Path

1. 문서와 컴포넌트 스펙 정리
2. P0 컴포넌트 구현
3. 문서 앱 preview를 실제 컴포넌트 import 방식으로 전환
4. 접근성/키보드 테스트 추가
5. 패키지 배포 또는 registry 전략 결정
