# Design System Workspace

이 레포지토리는 디자인 시스템을 개발하고, 로컬 문서 사이트에서 컴포넌트 구성과 사용 예시를 확인할 수 있도록 구성합니다.

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
├── packages/                    # 추후 공통 패키지 추가 위치
│   ├── ui/                      # Button, Input 등 실제 UI 컴포넌트
│   └── tokens/                  # color, spacing, typography 등 디자인 토큰
├── package.json
└── README.md
```

## apps/docs 용도

`apps/docs`는 레포지토리를 받은 사람이 디자인 시스템을 바로 확인할 수 있는 로컬 문서 사이트입니다.

이 앱에서는 다음 내용을 확인할 수 있습니다.

- 디자인 토큰: 컬러, 타이포그래피, 간격, radius
- 컴포넌트 목록: Button, Badge, Input, Card, Alert, Tabs
- 컴포넌트 설명과 사용 예시
- 실제 화면에서 보이는 컴포넌트 모양
- 복사해서 참고할 수 있는 코드 예시

초기에는 문서와 쇼케이스 역할을 담당하고, 나중에 `packages/ui`가 생기면 `apps/docs`에서 실제 컴포넌트를 import해서 보여주는 방식으로 확장하면 됩니다.

## 명령어

```bash
npm run dev
```

문서 사이트를 로컬 서버로 실행합니다.

```bash
npm run docs:dev
```

`npm run dev`와 동일하게 문서 사이트를 실행합니다.
