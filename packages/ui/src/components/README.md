# 컴포넌트 카탈로그

이 디렉터리는 `@bling-lab/ui`의 컴포넌트 카탈로그, 문서, 개별 import 진입점을 보관합니다.

## 문서 구성

각 컴포넌트 폴더는 구현과 문서를 같은 위치에 둡니다.

- `README.md`: 역할, 사용 기준, prop 축, prop 표, 상태, 접근성, 토큰, 예시를 설명합니다.
- `spec.md`: API 표면, prop 표, 상태 동작, 상호작용, 접근성 계약, 검증 체크리스트를 정의합니다.
- `{component-slug}.tsx`: 실제 React + TypeScript 구현입니다.
- `index.ts`: 해당 컴포넌트의 public entry입니다.

## 카테고리

- `actions`: `Button`, `IconButton` 같은 command control
- `forms`: 입력, validation wrapper, choice control
- `feedback`: alert, notification, progress, status indicator
- `overlays`: floating 또는 modal surface
- `navigation`: page, section, panel 사이를 이동하는 control
- `layout`: page, grid, spacing, content surface, separator 구조
- `data-display`: list, table, empty state, record presentation

## 폴더 계약

```text
{category}/{component-slug}/
├── index.ts
├── {component-slug}.tsx
├── README.md
└── spec.md
```

각 컴포넌트 구현은 자기 폴더의 `{component-slug}.tsx`에 있습니다. 각 컴포넌트 폴더의 `index.ts`는 해당 React component를 다시 export합니다.

`catalog.ts`의 컴포넌트 카탈로그가 초기 scaffolding과 validation의 기준입니다.

## 작성 기준

- 문서는 한글로 작성합니다.
- 코드 식별자, prop, class, token 이름은 원문을 유지합니다.
- 컴포넌트 색상은 theme name이 아니라 semantic token을 통해 설명합니다.
- 접근성 항목은 native HTML 기준과 WAI-ARIA APG 링크 중 해당하는 기준을 명시합니다.
- README와 spec은 `catalog.ts`의 props, states, tokens와 어긋나지 않아야 합니다.
- prop table metadata는 `prop-docs.ts`에 두고, prop-heavy 컴포넌트는 source props와 table 항목이 검증에서 일치해야 합니다.

## 검증

컴포넌트 문서를 수정한 뒤 아래 명령어를 실행합니다.

```bash
npm run components:validate
```

문서만 수정했더라도 public export, 폴더 구조, 토큰 계약이 함께 깨지지 않았는지 확인합니다.

기존 수동 문서를 덮어쓰지 않기 위해 scaffold는 README/spec를 기본적으로 보존합니다. 문서를 재생성해야 할 때는 `npm run components:scaffold -- --force-docs --dry-run`으로 변경분을 먼저 확인하고 `npm run components:scaffold -- --force-docs`를 실행합니다.

수동으로 보존해야 하는 내용은 `<!-- ds-manual-start -->`와 `<!-- ds-manual-end -->` 사이에 둡니다. scaffold는 강제 재생성 중에도 이 marker 구간을 유지합니다.

prop table만 갱신할 때는 기존 문서 본문을 유지하는 `npm run components:props`를 사용합니다.
