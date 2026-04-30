# 컴포넌트 카탈로그 / Component Catalog

이 디렉터리는 `@workspace/ui`의 컴포넌트 카탈로그, 문서, 개별 import 진입점을 보관합니다.
This directory contains the component catalog, documentation, and individual import entry points for `@workspace/ui`.

## 문서 구성 / Documentation Shape

각 컴포넌트 폴더는 구현과 문서를 같은 위치에 둡니다.
Each component folder keeps implementation and documentation in the same location.

- `README.md`: 역할, 사용 기준, prop 축, prop 표, 상태, 접근성, 토큰, 예시를 설명합니다. / Explains role, usage criteria, prop axes, prop tables, states, accessibility, tokens, and examples.
- `spec.md`: API 표면, prop 표, 상태 동작, 상호작용, 접근성 계약, 검증 체크리스트를 정의합니다. / Defines API surface, prop tables, state behavior, interaction, accessibility contract, and validation checklist.
- `{component-slug}.tsx`: 실제 React + TypeScript 구현입니다. / The actual React + TypeScript implementation.
- `index.ts`: 해당 컴포넌트의 public entry입니다. / The public entry for the component.

## 카테고리 / Categories

- `actions`: `Button`, `IconButton` 같은 command control / Command controls such as `Button` and `IconButton`
- `forms`: 입력, validation wrapper, choice control / Inputs, validation wrappers, and choice controls
- `feedback`: alert, notification, progress, status indicator / Alerts, notifications, progress, and status indicators
- `overlays`: floating 또는 modal surface / Floating or modal surfaces
- `navigation`: page, section, panel 사이를 이동하는 control / Controls that move across pages, sections, or panels
- `layout`: page, grid, spacing, content surface, separator 구조 / Page, grid, spacing, content surface, and separator structure
- `data-display`: list, table, empty state, record presentation / Lists, tables, empty states, and record presentation

## 폴더 계약 / Folder Contract

```text
{category}/{component-slug}/
├── index.ts
├── {component-slug}.tsx
├── README.md
└── spec.md
```

각 컴포넌트 구현은 자기 폴더의 `{component-slug}.tsx`에 있습니다. 각 컴포넌트 폴더의 `index.ts`는 해당 React component를 다시 export합니다.
Each component implementation lives in its own `{component-slug}.tsx` file. Each component folder `index.ts` re-exports its React component.

`catalog.ts`의 컴포넌트 카탈로그가 초기 scaffolding과 validation의 기준입니다.
The component catalog in `catalog.ts` is the source for initial scaffolding and validation.

## 작성 기준 / Authoring Standard

- 문서는 한글을 먼저 쓰고 바로 뒤에 영문을 병기합니다. / Documentation writes Korean first and English immediately after.
- 코드 식별자, prop, class, token 이름은 원문을 유지합니다. / Code identifiers, props, classes, and token names stay in their original form.
- 컴포넌트 색상은 theme name이 아니라 semantic token을 통해 설명합니다. / Component color is described through semantic tokens, not theme names.
- 접근성 항목은 native HTML 기준과 WAI-ARIA APG 링크 중 해당하는 기준을 명시합니다. / Accessibility items state the relevant native HTML baseline or WAI-ARIA APG link.
- README와 spec은 `catalog.ts`의 props, states, tokens와 어긋나지 않아야 합니다. / README and spec must stay aligned with props, states, and tokens in `catalog.ts`.
- prop table metadata는 `prop-docs.ts`에 두고, prop-heavy 컴포넌트는 source props와 table 항목이 검증에서 일치해야 합니다. / Prop table metadata lives in `prop-docs.ts`, and prop-heavy components must keep source props aligned with table entries during validation.

## 검증 / Validation

컴포넌트 문서를 수정한 뒤 아래 명령어를 실행합니다.
Run the command below after changing component documentation.

```bash
npm run components:validate
```

문서만 수정했더라도 public export, 폴더 구조, 토큰 계약이 함께 깨지지 않았는지 확인합니다.
Even documentation-only changes should confirm that public exports, folder structure, and token contracts still hold.

기존 수동 문서를 덮어쓰지 않기 위해 scaffold는 README/spec를 기본적으로 보존합니다. 문서를 재생성해야 할 때만 변경분을 먼저 확인하고 `npm run components:scaffold -- --force-docs`를 실행합니다.
The scaffold preserves existing README/spec files by default. Regenerate docs only after checking local changes, then run `npm run components:scaffold -- --force-docs`.

prop table만 갱신할 때는 기존 문서 본문을 유지하는 `npm run components:props`를 사용합니다.
Use `npm run components:props` to update only prop tables while preserving existing document prose.
