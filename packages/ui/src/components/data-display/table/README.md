# Table 컴포넌트 / Table Component

비교 가능한 record를 행과 열로 정렬해 보여주는 표입니다. / Structured rows and columns for comparable records.

## 역할 / Role

스캔, 정렬, 열 맞춤이 중요한 dense data를 표시할 때 사용합니다. / Use for dense data that benefits from scanning, sorting, and column alignment.

## 사용 기준 / Usage Criteria

- 우선순위는 `P1`, 상태는 `ready`입니다. / Priority is `P1`, and status is `ready`.
- 카테고리는 `data-display` (Data Display)입니다. / Category is `data-display` (Data Display).
- 기본 primitive는 `table`입니다. / Base primitive is `table`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`columns`, `rows`, `density`, `sortable`, `selectionMode`, `striped`, `hoverable`, `stickyHeader`, `rowKey`, `rowActions`, `renderCell`

## 상태 / States

- `default`
- `hover`
- `sorted`
- `selected`
- `empty`
- `loading`

## 접근성 / Accessibility

- 기본 기준 / Base reference: [https://www.w3.org/WAI/ARIA/apg/patterns/table/](https://www.w3.org/WAI/ARIA/apg/patterns/table/)
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-color-border-default`
- `--ds-color-bg-surface`
- `--ds-color-bg-muted`

## 예시 / Example

```tsx
import { Table } from "@workspace/ui/components/data-display/table";

export function Example() {
  return <Table columns={columns} rows={rows} caption="목록 / List" />;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `table.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `table.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
