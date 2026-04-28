# frontend-lab

Frontend experiments, reusable UI components, and interaction patterns.

이 레포지토리는 디자인 시스템을 개발하고, 로컬 문서 사이트에서 컴포넌트 구성과 사용 예시를 확인할 수 있도록 구성합니다.

컴포넌트 구현 전 단계에서 로드맵, 명명 규칙, 토큰 계약, 접근성 기준을 먼저 고정해 확장 가능한 구조로 관리합니다.

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
│   └── docs/                    # 디자인 시스템 문서 및 로컬 쇼케이스 앱
├── docs/                        # 제품 개요, 아키텍처, 로드맵, 작성 규약, 접근성 체크리스트
├── packages/
│   ├── ui/                      # 컴포넌트 카탈로그와 컴포넌트별 문서 골조
│   └── tokens/                  # color, spacing, typography 등 디자인 토큰
├── scripts/                     # 컴포넌트 문서 스캐폴드 및 검증 스크립트
├── package.json
└── README.md
```

## apps/docs 용도

`apps/docs`는 레포지토리를 받은 사람이 디자인 시스템을 바로 확인할 수 있는 로컬 문서 사이트입니다.

이 앱에서는 다음 내용을 확인할 수 있습니다.

- 디자인 토큰: 컬러, 타이포그래피, 간격, radius
- 개발 규약: 명명, 상태 속성, 토큰 사용, 접근성 기준
- 컴포넌트 로드맵: 우선순위와 카테고리별 개발 대상
- 컴포넌트 목록: Button, Badge, TextField, Card, Alert, Tabs
- 컴포넌트 설명과 사용 예시
- 실제 화면에서 보이는 컴포넌트 모양
- 복사해서 참고할 수 있는 코드 예시

초기에는 문서와 쇼케이스 역할을 담당하고, 나중에 `packages/ui`가 생기면 `apps/docs`에서 실제 컴포넌트를 import해서 보여주는 방식으로 확장하면 됩니다.

## 문서 시작점

- [제품 개요](./docs/product-brief.md)
- [시스템 아키텍처](./docs/system-architecture.md)
- [컴포넌트 로드맵](./docs/component-roadmap.md)
- [컴포넌트 작성 규약](./docs/component-authoring.md)
- [명명 규칙](./docs/naming-conventions.md)
- [토큰 계약](./docs/token-contract.md)
- [접근성 체크리스트](./docs/accessibility-checklist.md)
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
npm run components:scaffold
```

`packages/ui/src/components/catalog.js` 기준으로 컴포넌트별 `README.md`와 `spec.md` 골조를 생성합니다. 기존 파일은 덮어쓰지 않습니다.

```bash
npm run components:validate
```

카탈로그에 등록된 컴포넌트 폴더와 필수 문서가 존재하는지 확인합니다.
