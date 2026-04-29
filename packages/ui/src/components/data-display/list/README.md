# List 컴포넌트 / List Component

동일한 형태의 항목을 세로로 보여주는 collection입니다. / Vertical collection of homogeneous items.

## 역할 / Role

활동, 옵션, compact record, 내비게이션에 가까운 목록을 표시할 때 사용합니다. / Use for activity, options, navigation-adjacent records, or compact summaries.

## 사용 기준 / Usage Criteria

- 우선순위는 `P1`, 상태는 `ready`입니다. / Priority is `P1`, and status is `ready`.
- 카테고리는 `data-display` (Data Display)입니다. / Category is `data-display` (Data Display).
- 기본 primitive는 `ul or ol`입니다. / Base primitive is `ul or ol`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`items`, `density`, `dividers`, `selectionMode`, `variant`, `renderItem`, `leading`, `trailing`, `disabled`, `selected`

## 상태 / States

- `default`
- `hover`
- `selected`
- `disabled`
- `empty`
- `loading`

## 접근성 / Accessibility

- 기본 기준 / Base reference: 해당 없음 또는 네이티브 HTML 기준을 따릅니다. / Not applicable or follows native HTML behavior.
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-color-border-default`
- `--ds-color-bg-surface`
- `--ds-space-4`

## 예시 / Example

```tsx
import { List } from "@workspace/ui/components/data-display/list";

export function Example() {
  return <List items={items} selectionMode="single" />;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `list.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `list.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
