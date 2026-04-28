# 컴포넌트 카탈로그 / Component Catalog

이 디렉터리는 `@workspace/ui`의 컴포넌트 카탈로그, 문서, 개별 import 진입점을 보관합니다.
This directory contains the component catalog, documentation, and individual import entry points for `@workspace/ui`.

## 카테고리 / Categories

- `actions`: `Button`, `IconButton` 같은 command control / Command controls such as `Button` and `IconButton`
- `forms`: 입력, validation wrapper, choice control / Inputs, validation wrappers, and choice controls
- `feedback`: alert, notification, progress, status indicator / Alerts, notifications, progress, and status indicators
- `overlays`: floating 또는 modal surface / Floating or modal surfaces
- `navigation`: page, section, panel 사이를 이동하는 control / Controls that move across pages, sections, or panels
- `layout`: 구조적 content surface와 separator / Structural content surfaces and separators
- `data-display`: list, table, empty state, record presentation / Lists, tables, empty states, and record presentation

## 폴더 계약 / Folder Contract

```text
{category}/{component-slug}/
├── index.js
├── README.md
└── spec.md
```

현재 공통 구현은 `src/components.js`, 공통 스타일은 `src/styles.css`에 있습니다. 각 컴포넌트 폴더의 `index.js`는 해당 component factory를 다시 export합니다.
The shared implementation currently lives in `src/components.js`, and shared styles live in `src/styles.css`. Each component folder `index.js` re-exports its component factory.

`catalog.js`의 컴포넌트 카탈로그가 초기 scaffolding과 validation의 기준입니다.
The component catalog in `catalog.js` is the source for initial scaffolding and validation.
