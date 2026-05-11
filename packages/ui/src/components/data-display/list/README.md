# List 컴포넌트

동일한 형태의 항목을 세로로 보여주는 collection입니다.

## 역할

활동, 옵션, compact record, 내비게이션에 가까운 목록을 표시할 때 사용합니다.

## 사용 기준

- 우선순위는 `P1`, 상태는 `ready`입니다.
- 카테고리는 `data-display` (Data Display)입니다.
- 기본 primitive는 `ul or ol`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`items`, `density`, `dividers`, `selectionMode`, `variant`, `renderItem`, `leading`, `trailing`, `disabled`, `selected`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `items` | `item[]` | `[]` | 렌더링할 item 목록입니다. |
| `density` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `dividers` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `selectionMode` | `"none" \| "single" \| "multiple"` | `-` | 선택 interaction 방식입니다. |
| `variant` | `variant` | `-` | 시각 variant입니다. |
| `renderItem` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `leading` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `trailing` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `disabled` | `boolean` | `false` | 사용자 interaction을 비활성화합니다. |
| `selected` | `boolean` | `false` | 선택된 시각 상태입니다. |

## 상태

- `default`
- `hover`
- `selected`
- `disabled`
- `empty`
- `loading`

## 접근성

- 기본 기준
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다.
- focus-visible은 `--ds-focus-ring`을 사용하고 키보드 이동에서 사라지지 않아야 합니다.

## 토큰

- `--ds-color-border-default`
- `--ds-color-bg-surface`
- `--ds-space-4`

## 예시

```tsx
import { List } from "@bling-lab/ui/components/data-display/list";

export function Example() {
  return <List items={items} selectionMode="single" />;
}
```

## 구현 메모

- 구현 파일은 `list.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
