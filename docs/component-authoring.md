# 컴포넌트 작성 규약

## 폴더 구조

```text
packages/ui/src/components/{category}/{component-slug}/
├── {component-slug}.tsx
├── index.ts
├── README.md
└── spec.md
```

모든 컴포넌트는 자기 폴더 안에 React 구현 파일을 둡니다.

## 소스 구성

- `index.ts`: public export만 담당합니다.
- `{component-slug}.tsx`: React component 구현을 둡니다.
- `README.md`: 사용 목적과 API 요약을 둡니다.
- `spec.md`: anatomy, state, behavior, accessibility contract를 둡니다.
- 공통 타입과 유틸은 `src/shared`에만 둡니다.

중앙 `src/components.tsx` 같은 모놀리식 구현 파일은 만들지 않습니다.

## 컴포넌트 계약

모든 컴포넌트는 구현 전에 아래 항목을 문서화합니다.

- 목적: 해결하는 UI 문제
- Anatomy: root, trigger, content, label, message 등 구성 요소
- Public API: props, events, defaults
- States: visual state와 interaction state
- Accessibility: semantic element, ARIA pattern, keyboard, focus
- Tokens: 사용하는 semantic/component token
- 테스트 계획: 최소 검증 범위

## Prop 문서 자동화

- `catalog.ts`의 `props`는 README와 spec의 `Prop 축
- 상세 prop table은 `packages/ui/src/components/prop-docs.ts`에서 관리하고 scaffold가 `Prop 표
- 기존 README/spec의 다른 내용을 보존하면서 prop table만 동기화할 때는 `npm run components:props`를 사용합니다.
- `DataGrid`, `Combobox`, `CommandPalette`처럼 prop이 많은 컴포넌트는 source props와 prop table이 `npm run components:validate`에서 함께 검증됩니다.
- 기존 README/spec는 기본적으로 보존됩니다. 강제로 문서를 재생성해야 할 때는 먼저 `npm run components:scaffold -- --force-docs --dry-run`으로 변경될 파일과 이유를 확인한 뒤 `npm run components:scaffold -- --force-docs`를 사용합니다.
- 수동 작성 내용을 보존해야 하는 문서는 `<!-- ds-manual-start -->`와 `<!-- ds-manual-end -->` 사이에 둡니다. scaffold는 `--force-docs` 실행 시 이 구간을 유지합니다.
- prop table drift는 `npm run components:props-check`로 확인하고, drift가 의도된 변경이면 `npm run components:props`로 갱신합니다.

## 구현 규칙

- native element로 해결 가능한 경우 custom role을 만들지 않습니다.
- React component는 `PascalCase` named export로 제공합니다.
- Props interface는 `{ComponentName}Props` 형식을 사용합니다.
- controlled/uncontrolled 패턴이 필요한 컴포넌트는 `value`, `defaultValue`, `onValueChange` 이름을 사용합니다.
- open state가 필요한 컴포넌트는 `open`, `defaultOpen`, `onOpenChange` 이름을 사용합니다.
- 상태 스타일은 `data-state`, `data-disabled`, `data-invalid`, `data-orientation`, `data-size`, `data-variant`를 우선합니다.
- JS가 없어도 의미가 유지되어야 하는 컴포넌트는 HTML 구조가 먼저 올바르게 동작해야 합니다.
- component 내부에서 원시 색상, 간격, z-index를 직접 쓰지 않습니다.

## export 규칙

루트 export는 `packages/ui/src/index.ts`에서만 관리합니다.

```ts
export { Button, type ButtonProps } from "./components/actions/button";
```

컴포넌트 폴더의 `index.ts`는 자기 구현만 다시 export합니다.

```ts
export { Button, type ButtonProps } from "./button";
```
