# DataGrid 컴포넌트 / DataGrid Component

정렬, 선택, 행 action, keyboard row navigation, column resize를 포함한 interactive tabular grid입니다. / Interactive tabular grid with sorting, selection, row actions, keyboard row navigation, and column resize.

## 역할 / Role

정적 table보다 많은 조작이 필요한 dense record 화면에 사용합니다. / Use when dense records need structured scanning with richer controls than a static table.

## 사용 기준 / Usage Criteria

- 우선순위는 `P0`, 상태는 `ready`입니다. / Priority is `P0`, and status is `ready`.
- 카테고리는 `data-display` (Data Display)입니다. / Category is `data-display` (Data Display).
- 기본 primitive는 `table with grid-like interactions`입니다. / Base primitive is `table with grid-like interactions`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`columns`, `rows`, `density`, `sortable`, `selectionMode`, `striped`, `stickyHeader`, `emptyMessage`, `rowKey`, `rowActions`, `sortState`, `defaultSortState`, `selectedRowKeys`, `defaultSelectedRowKeys`, `activeRowKey`, `defaultActiveRowKey`, `keyboardNavigation`, `resizableColumns`, `onSortChange`, `onSelectedRowKeysChange`, `onSelectionChange`, `onActiveRowKeyChange`, `onColumnResize`

## 상태 / States

- `default`
- `hover`
- `sorted`
- `selected`
- `active`
- `empty`
- `loading`
- `resizing`

## 접근성 / Accessibility

- 기본 기준 / Base reference: [https://www.w3.org/WAI/ARIA/apg/patterns/grid/](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- 행 focus는 roving `tabIndex`로 한 행만 tab stop이 되며 `ArrowUp`, `ArrowDown`, `Home`, `End`로 이동합니다. / Row focus uses roving `tabIndex` so only one row is a tab stop, and `ArrowUp`, `ArrowDown`, `Home`, and `End` move focus.
- `selectionMode="multiple"`일 때 행 focus 상태에서 Space로 선택을 토글할 수 있습니다. / When `selectionMode="multiple"`, Space toggles selection from the focused row.
- `resizableColumns`와 column의 `resizable` 설정으로 pointer 기반 열 너비 조절을 제어합니다. / `resizableColumns` and each column's `resizable` setting control pointer-based column resizing.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-color-border-default`
- `--ds-color-bg-surface`
- `--ds-color-bg-muted`

## 예시 / Example

```tsx
import { DataGrid } from "@workspace/ui/components/data-display/data-grid";

export function Example() {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
      rowKey={(row) => row.id}
      selectionMode="multiple"
      keyboardNavigation="row"
      resizableColumns
    />
  );
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `data-grid.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `data-grid.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
- virtual scroll은 이번 범위에서 제외하고, large data가 실제 요구될 때 별도 이슈로 설계합니다. / Virtual scroll is excluded from this scope and should be designed in a separate issue when large data is a real requirement.
