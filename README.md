# frontend-lab

프론트엔드 실험, 재사용 가능한 UI 컴포넌트, 인터랙션 패턴을 관리하는 작업 공간입니다.

이 레포지토리는 React + TypeScript 컴포넌트 시스템을 만들고, 어떤 React 프로젝트든 이 패키지를 베이스로 가져다 쓸 수 있게 구성합니다.

문서 앱은 실제 패키지 export를 import해 보여주는 쇼케이스이고, `packages/ui`는 외부 프로젝트가 소비할 수 있는 빌드 산출물을 만드는 패키지입니다.

## 언어 기준

모든 문서, 주석, TODO, 개발자-facing 메시지는 한글만 사용합니다.

세부 기준은 [언어 정책](./docs/language-policy.md)을 따릅니다.

## 요구 사항

- Node.js 18 이상
- npm

Node.js가 설치되어 있는지 확인하려면 아래 명령어를 실행합니다.

```bash
node -v
npm -v
```

## 실행 방법

레포지토리를 받은 뒤 루트 경로에서 아래 명령어를 실행합니다.

```bash
npm install
npm run dev
```

실행 후 브라우저에서 아래 주소를 엽니다.

```text
http://localhost:5173
```

포트가 이미 사용 중이면 서버가 자동으로 다음 포트를 찾아 실행합니다.

## 프로젝트 구조

```text
.
├── apps/
│   └── docs/                    # Vite React 문서와 로컬 쇼케이스 앱
├── docs/                        # 제품 개요, 아키텍처, 로드맵, 작성 규약, 접근성 체크리스트
├── packages/
│   ├── ui/                      # React + TypeScript 컴포넌트 패키지
│   └── tokens/                  # color, spacing, typography 등 디자인 토큰
├── scripts/                     # 컴포넌트 문서 스캐폴드 및 검증 스크립트
├── package.json
└── README.md
```

## `apps/docs` 용도

`apps/docs`는 레포지토리를 받은 사람이 디자인 시스템을 바로 확인할 수 있는 로컬 문서 사이트입니다.

이 앱에서는 다음 내용을 확인할 수 있습니다.

- 디자인 토큰: 컬러, 타이포그래피, 간격, radius
- 테마 시스템: normal 기본 theme와 theme set 전환
- 개발 규약: 명명, 상태 속성, 토큰 사용, 접근성 기준
- 컴포넌트 로드맵: 우선순위와 카테고리별 개발 대상
- 컴포넌트 목록: Button, Badge, TextField, Card, Alert, Tabs
- 컴포넌트 설명과 사용 예시
- 실제 화면에서 보이는 컴포넌트 모양
- 복사해서 참고할 수 있는 코드 예시

현재 `apps/docs`는 Vite 기반 React 앱이며 `packages/ui`의 실제 React + TypeScript 컴포넌트를 import해서 렌더링합니다.

## 패키지 목표

`packages/ui`는 앱 내부 폴더가 아니라 재사용 가능한 패키지입니다.

- React component는 각 컴포넌트 폴더의 `{component-slug}.tsx`에 구현합니다.
- 각 폴더의 `index.ts`는 public export만 담당합니다.
- `packages/ui/src/index.ts`는 전체 public API를 모으는 barrel입니다.
- 외부 프로젝트는 `@bling-lab/ui` 또는 개별 컴포넌트 entry에서 import합니다.
- 배포/복사 대상은 `packages/ui/dist` 산출물입니다.

## 문서 시작점

- [언어 정책](./docs/language-policy.md)
- [제품 개요](./docs/product-brief.md)
- [시스템 아키텍처](./docs/system-architecture.md)
- [컴포넌트 로드맵](./docs/component-roadmap.md)
- [컴포넌트 작성 규약](./docs/component-authoring.md)
- [변경 흐름](./docs/change-workflow.md)
- [Prop API 설계 가이드](./docs/prop-api-guidelines.md)
- [명명 규칙](./docs/naming-conventions.md)
- [토큰 계약](./docs/token-contract.md)
- [테마 시스템](./docs/theme-system.md)
- [패키지 사용 가이드](./docs/package-consumption.md)
- [릴리즈 체크리스트](./docs/release-checklist.md)
- [릴리즈 정책](./docs/release-policy.md)
- [시각 회귀 기준](./docs/visual-regression.md)
- [브랜치 보호 기준](./docs/branch-protection.md)
- [리뷰와 이슈 보드](./docs/review-and-issue-board.md)
- [접근성 체크리스트](./docs/accessibility-checklist.md)
- [반응형 검증 기준](./docs/responsive-qa.md)
- [반응형 레이아웃 방향](./docs/responsive-layout-system.md)

## 명령어

```bash
npm run dev
```

문서 사이트를 로컬 서버로 실행합니다.

```bash
npm run docs:dev
```

`npm run dev`와 동일하게 문서 사이트를 실행합니다.

```bash
npm run typecheck
```

UI 패키지와 문서 앱의 TypeScript 타입을 확인합니다.

```bash
npm run build
```

`packages/ui/dist`에 외부 프로젝트가 소비할 JS, declaration, CSS 산출물을 생성합니다.

```bash
npm run components:scaffold
```

`packages/ui/src/components/catalog.ts` 기준으로 컴포넌트별 `README.md`, `spec.md`, `index.ts` 골조를 생성합니다. 기존 파일은 덮어쓰지 않습니다.

```bash
npm run components:scaffold -- --force-docs
```

기존 컴포넌트 문서를 카탈로그 기준 한글 전용 형식으로 다시 생성합니다. 수동 수정이 있는지 먼저 확인합니다.

```bash
npm run components:validate
```

카탈로그 컴포넌트 폴더, 필수 문서, 필수 export, token 계약, CSS naming, event prop naming, UI CSS raw color 금지를 확인합니다.

```bash
npm run lint
```

TypeScript/TSX/MJS, CSS, Markdown, JSON/YAML의 기본 format 회귀를 확인합니다.

```bash
npm run test
```

컴포넌트 시스템 검증, UI 빌드, 접근성 스모크 테스트, 상호작용 접근성 테스트, package export 검증을 한 번에 실행합니다.

```bash
npm run test:consumer
```

빌드된 `@bling-lab/ui` package export를 소스 alias 없이 소비자 fixture 앱에서 import하고 build합니다.

```bash
npm run test:tokens
```

token contract의 필수 semantic token, NORMAL/DARK theme 차이, UI CSS raw value/theme selector 회귀를 확인합니다.

```bash
npm run test:types
```

소비자가 사용하는 public prop API의 허용/비허용 TypeScript 예제를 확인합니다.

```bash
npm run release:dry-run
```

릴리즈 전 전체 검증, release metadata 확인, `npm pack --dry-run`을 한 번에 실행합니다.

```bash
npm run test:visual
```

문서 앱 home, 테마 비교, DataGrid 예시를 NORMAL/DARK와 mobile/tablet/desktop viewport에서 스크린샷으로 확인합니다.

## 컴포넌트 사용

전체 API는 `@bling-lab/ui`에서 import합니다.

```tsx
import { Button, Container, Dialog, Stack, TextField } from "@bling-lab/ui";
import "@bling-lab/ui/styles.css";

export function Example() {
  return (
    <Container>
      <Stack gap="md">
        <TextField label="이름" />
        <Button>저장</Button>
        <Dialog title="확인" triggerLabel="열기" />
      </Stack>
    </Container>
  );
}
```

개별 컴포넌트 진입점도 제공합니다.

```tsx
import { Button } from "@bling-lab/ui/components/actions/button";
```

외부 프로젝트 적용 방법은 [패키지 사용 가이드](./docs/package-consumption.md)를 확인합니다.
