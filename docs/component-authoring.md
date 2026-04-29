# 컴포넌트 작성 규약 / Component Authoring

## 폴더 구조 / Folder Structure

```text
packages/ui/src/components/{category}/{component-slug}/
├── {component-slug}.tsx
├── index.ts
├── README.md
└── spec.md
```

모든 컴포넌트는 자기 폴더 안에 React 구현 파일을 둡니다.
Every component keeps its React implementation file inside its own folder.

## 소스 구성 / Source Composition

- `index.ts`: public export만 담당합니다. / Handles public exports only.
- `{component-slug}.tsx`: React component 구현을 둡니다. / Contains the React component implementation.
- `README.md`: 사용 목적과 API 요약을 둡니다. / Stores purpose and API summary.
- `spec.md`: anatomy, state, behavior, accessibility contract를 둡니다. / Stores anatomy, state, behavior, and accessibility contracts.
- 공통 타입과 유틸은 `src/shared`에만 둡니다. / Shared types and utilities live only in `src/shared`.

중앙 `src/components.tsx` 같은 모놀리식 구현 파일은 만들지 않습니다.
Do not create monolithic implementation files such as `src/components.tsx`.

## 컴포넌트 계약 / Component Contract

모든 컴포넌트는 구현 전에 아래 항목을 문서화합니다.
Every component documents the items below before implementation.

- Purpose: 해결하는 UI 문제 / The UI problem being solved
- Anatomy: root, trigger, content, label, message 등 구성 요소 / Structural parts such as root, trigger, content, label, and message
- Public API: props, events, defaults / Props, events, and defaults
- States: visual state와 interaction state / Visual states and interaction states
- Accessibility: semantic element, ARIA pattern, keyboard, focus / Semantic element, ARIA pattern, keyboard behavior, and focus behavior
- Tokens: 사용하는 semantic/component token / Semantic and component tokens used
- Test Plan: 최소 검증 범위 / Minimum verification scope

## Prop 문서 자동화 / Prop Documentation Automation

- `catalog.ts`의 `props`는 README와 spec의 `Prop 축 / Prop Axes` 기준입니다. / `props` in `catalog.ts` are the source for `Prop Axes` in README and spec files.
- 상세 prop table은 `packages/ui/src/components/prop-docs.ts`에서 관리하고 scaffold가 `Prop 표 / Prop Table`로 렌더링합니다. / Detailed prop tables are managed in `packages/ui/src/components/prop-docs.ts` and rendered by the scaffold as `Prop Table`.
- `DataGrid`, `Combobox`, `CommandPalette`처럼 prop이 많은 컴포넌트는 source props와 prop table이 `npm run components:validate`에서 함께 검증됩니다. / Prop-heavy components such as `DataGrid`, `Combobox`, and `CommandPalette` validate source props and prop tables together through `npm run components:validate`.
- 기존 README/spec는 기본적으로 보존됩니다. 강제로 문서를 재생성해야 할 때만 사용자 수동 변경 여부를 확인한 뒤 `npm run components:scaffold -- --force-docs`를 사용합니다. / Existing README/spec files are preserved by default. Use `npm run components:scaffold -- --force-docs` only after checking for user-authored manual changes.

## 구현 규칙 / Implementation Rules

- native element로 해결 가능한 경우 custom role을 만들지 않습니다. / Do not create a custom role when a native element can solve the problem.
- React component는 `PascalCase` named export로 제공합니다. / React components are provided as `PascalCase` named exports.
- Props interface는 `{ComponentName}Props` 형식을 사용합니다. / Props interfaces use the `{ComponentName}Props` shape.
- controlled/uncontrolled 패턴이 필요한 컴포넌트는 `value`, `defaultValue`, `onValueChange` 이름을 사용합니다. / Components that need controlled/uncontrolled patterns use `value`, `defaultValue`, and `onValueChange`.
- open state가 필요한 컴포넌트는 `open`, `defaultOpen`, `onOpenChange` 이름을 사용합니다. / Components with open state use `open`, `defaultOpen`, and `onOpenChange`.
- 상태 스타일은 `data-state`, `data-disabled`, `data-invalid`, `data-orientation`, `data-size`, `data-variant`를 우선합니다. / Prefer `data-state`, `data-disabled`, `data-invalid`, `data-orientation`, `data-size`, and `data-variant` for state styling.
- JS가 없어도 의미가 유지되어야 하는 컴포넌트는 HTML 구조가 먼저 올바르게 동작해야 합니다. / Components whose meaning should survive without JS must have a correct HTML structure first.
- component 내부에서 원시 색상, 간격, z-index를 직접 쓰지 않습니다. / Do not write raw color, spacing, or z-index values inside components.

## export 규칙 / Export Rules

루트 export는 `packages/ui/src/index.ts`에서만 관리합니다.
Root exports are managed only in `packages/ui/src/index.ts`.

```ts
export { Button, type ButtonProps } from "./components/actions/button";
```

컴포넌트 폴더의 `index.ts`는 자기 구현만 다시 export합니다.
Each component folder's `index.ts` re-exports only its own implementation.

```ts
export { Button, type ButtonProps } from "./button";
```
