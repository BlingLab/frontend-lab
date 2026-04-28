# frontend-lab

프론트엔드 실험, 재사용 가능한 UI 컴포넌트, 인터랙션 패턴을 관리하는 작업 공간입니다.
This workspace manages frontend experiments, reusable UI components, and interaction patterns.

이 레포지토리는 디자인 시스템을 개발하고, 로컬 문서 사이트에서 컴포넌트 구성과 사용 예시를 확인할 수 있도록 구성합니다.
This repository is structured to develop a design system and review component structure and usage examples in a local docs site.

컴포넌트 구현 전 단계에서 로드맵, 명명 규칙, 토큰 계약, 접근성 기준을 먼저 고정해 확장 가능한 구조로 관리합니다.
Before implementation, it locks down the roadmap, naming rules, token contract, and accessibility baseline so the system can grow consistently.

## 언어 기준 / Language Standard

모든 문서, 주석, TODO, 개발자-facing 메시지는 한글을 먼저 쓰고 바로 뒤에 영문을 병기합니다.
All documentation, comments, TODOs, and developer-facing messages should be written in Korean first, followed by English.

세부 기준은 [언어 정책](./docs/language-policy.md)을 따릅니다.
Follow the detailed rules in the [Language Policy](./docs/language-policy.md).

## 요구 사항 / Requirements

- Node.js 18 이상 / Node.js 18 or later
- npm

Node.js가 설치되어 있는지 확인하려면 아래 명령어를 실행합니다.
Run the commands below to confirm that Node.js is installed.

```bash
node -v
npm -v
```

## 실행 방법 / How to Run

레포지토리를 받은 뒤 루트 경로에서 아래 명령어를 실행합니다.
After cloning the repository, run the commands below from the root directory.

```bash
npm install
npm run dev
```

실행 후 브라우저에서 아래 주소를 엽니다.
After the server starts, open the address below in your browser.

```text
http://localhost:5173
```

포트가 이미 사용 중이면 서버가 자동으로 다음 포트를 찾아 실행합니다.
If the port is already in use, the server automatically tries the next available port.

## 프로젝트 구조 / Project Structure

```text
.
├── apps/
│   └── docs/                    # 디자인 시스템 문서 및 로컬 쇼케이스 앱 / Design system docs and local showcase app
├── docs/                        # 제품 개요, 아키텍처, 로드맵, 작성 규약, 접근성 체크리스트 / Product brief, architecture, roadmap, authoring rules, accessibility checklist
├── packages/
│   ├── ui/                      # 컴포넌트 카탈로그와 컴포넌트별 문서 골조 / Component catalog and per-component documentation skeletons
│   └── tokens/                  # color, spacing, typography 등 디자인 토큰 / Design tokens for color, spacing, typography, and more
├── scripts/                     # 컴포넌트 문서 스캐폴드 및 검증 스크립트 / Component documentation scaffold and validation scripts
├── package.json
└── README.md
```

## `apps/docs` 용도 / Purpose of `apps/docs`

`apps/docs`는 레포지토리를 받은 사람이 디자인 시스템을 바로 확인할 수 있는 로컬 문서 사이트입니다.
`apps/docs` is a local docs site that lets contributors review the design system immediately after receiving the repository.

이 앱에서는 다음 내용을 확인할 수 있습니다.
The app shows the following:

- 디자인 토큰: 컬러, 타이포그래피, 간격, radius / Design tokens: color, typography, spacing, and radius
- 개발 규약: 명명, 상태 속성, 토큰 사용, 접근성 기준 / Development conventions: naming, state attributes, token usage, and accessibility rules
- 컴포넌트 로드맵: 우선순위와 카테고리별 개발 대상 / Component roadmap: priorities and targets by category
- 컴포넌트 목록: Button, Badge, TextField, Card, Alert, Tabs / Component list: Button, Badge, TextField, Card, Alert, Tabs
- 컴포넌트 설명과 사용 예시 / Component descriptions and usage examples
- 실제 화면에서 보이는 컴포넌트 모양 / The component appearance as rendered on screen
- 복사해서 참고할 수 있는 코드 예시 / Copyable code examples for reference

현재 `apps/docs`는 `packages/ui`의 실제 vanilla JS 컴포넌트를 import해서 렌더링합니다.
`apps/docs` now imports and renders the real vanilla JS components from `packages/ui`.

## 문서 시작점 / Documentation Entry Points

- [언어 정책 / Language Policy](./docs/language-policy.md)
- [제품 개요 / Product Brief](./docs/product-brief.md)
- [시스템 아키텍처 / System Architecture](./docs/system-architecture.md)
- [컴포넌트 로드맵 / Component Roadmap](./docs/component-roadmap.md)
- [컴포넌트 작성 규약 / Component Authoring](./docs/component-authoring.md)
- [명명 규칙 / Naming Conventions](./docs/naming-conventions.md)
- [토큰 계약 / Token Contract](./docs/token-contract.md)
- [접근성 체크리스트 / Accessibility Checklist](./docs/accessibility-checklist.md)
- [반응형 레이아웃 방향 / Responsive Layout System](./docs/responsive-layout-system.md)

## 명령어 / Commands

```bash
npm run dev
```

문서 사이트를 로컬 서버로 실행합니다.
Runs the docs site on a local server.

```bash
npm run docs:dev
```

`npm run dev`와 동일하게 문서 사이트를 실행합니다.
Runs the same docs site as `npm run dev`.

```bash
npm run components:scaffold
```

`packages/ui/src/components/catalog.js` 기준으로 컴포넌트별 `README.md`, `spec.md`, `index.js` 골조를 생성합니다. 기존 파일은 덮어쓰지 않습니다.
Generates component `README.md`, `spec.md`, and `index.js` skeletons from `packages/ui/src/components/catalog.js`. Existing files are not overwritten.

```bash
npm run components:scaffold -- --force
```

기존 컴포넌트 문서를 카탈로그 기준 병기 형식으로 다시 생성합니다. 수동 수정이 있는지 먼저 확인합니다.
Regenerates existing component docs in the catalog-based bilingual format. Check for manual edits first.

```bash
npm run components:validate
```

카탈로그 컴포넌트 폴더, 필수 문서, 필수 export, token 계약, CSS naming, event prop naming, UI CSS raw color 금지를 확인합니다.
Validates catalog component folders, required documents, required exports, token contracts, CSS naming, event prop naming, and the no-raw-color rule for UI CSS.

## 컴포넌트 사용 / Component Usage

전체 API는 `@workspace/ui`에서 import합니다.
Import the full API from `@workspace/ui`.

```js
import { Button, Container, Dialog, Stack, TextField } from "@workspace/ui";
import "@workspace/ui/styles.css";
```

개별 컴포넌트 진입점도 제공합니다.
Individual component entry points are also available.

```js
import { Button } from "@workspace/ui/components/actions/button";
```
