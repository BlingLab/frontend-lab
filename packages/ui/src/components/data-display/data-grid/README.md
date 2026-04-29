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

`caption`, `columns`, `rows`, `density`, `sortable`, `selectionMode`, `striped`, `stickyHeader`, `loading`, `emptyMessage`, `rowKey`, `rowActions`, `sortState`, `defaultSortState`, `selectedRowKeys`, `defaultSelectedRowKeys`, `activeRowKey`, `defaultActiveRowKey`, `keyboardNavigation`, `resizableColumns`, `onSort`, `onSortChange`, `onSelectedRowKeysChange`, `onSelectionChange`, `onActiveRowKeyChange`, `onColumnResize`

## Prop 표 / Prop Table

| Prop | Type | Default | 설명 / Description |
| --- | --- | --- | --- |
| `caption` | `ReactNode` | `-` | table caption입니다. / Table caption. |
| `columns` | `Array<DataGridColumn<Row>>` | `[]` | column 구조와 render 설정입니다. / Column structure and render settings. |
| `rows` | `Row[]` | `[]` | 렌더링할 row 데이터입니다. / Row data to render. |
| `density` | `"compact" \| "md"` | `"md"` | row와 cell 밀도입니다. / Row and cell density. |
| `sortable` | `boolean` | `true` | 전체 column sort control 기본값입니다. / Default sort control behavior for columns. |
| `selectionMode` | `"none" \| "multiple"` | `"none"` | row selection 모드입니다. / Row selection mode. |
| `striped` | `boolean` | `true` | 교차 row 배경을 표시합니다. / Shows alternating row backgrounds. |
| `stickyHeader` | `boolean` | `false` | header를 sticky로 유지합니다. / Keeps the header sticky. |
| `loading` | `boolean` | `false` | loading 상태와 `aria-busy`를 표시합니다. / Shows loading state and `aria-busy`. |
| `emptyMessage` | `ReactNode` | `"데이터가 없습니다. / No data."` | row가 없을 때 표시합니다. / Shown when there are no rows. |
| `rowKey` | `(row: Row, rowIndex: number) => string` | `rowIndex` | row identity를 계산합니다. / Computes row identity. |
| `rowActions` | `(row: Row, rowIndex: number) => ReactNode` | `-` | row action cell을 렌더링합니다. / Renders the row action cell. |
| `sortState` | `TableSortState<Row>` | `-` | controlled sort 상태입니다. / Controlled sort state. |
| `defaultSortState` | `TableSortState<Row>` | `-` | uncontrolled 초기 sort 상태입니다. / Initial uncontrolled sort state. |
| `selectedRowKeys` | `string[]` | `-` | controlled selected row key 목록입니다. / Controlled selected row keys. |
| `defaultSelectedRowKeys` | `string[]` | `[]` | uncontrolled 초기 selected row key 목록입니다. / Initial uncontrolled selected row keys. |
| `activeRowKey` | `string` | `-` | controlled active row key입니다. / Controlled active row key. |
| `defaultActiveRowKey` | `string` | `첫 row key / First row key` | uncontrolled 초기 active row key입니다. / Initial uncontrolled active row key. |
| `keyboardNavigation` | `"row" \| "none"` | `"row"` | roving row keyboard navigation 사용 여부입니다. / Enables roving row keyboard navigation. |
| `resizableColumns` | `boolean` | `true` | column resize handle을 활성화합니다. / Enables column resize handles. |
| `onSort` | `(key: keyof Row & string) => void` | `-` | legacy sort callback입니다. / Legacy sort callback. |
| `onSortChange` | `(sortState: TableSortState<Row> \| undefined) => void` | `-` | sort 상태가 바뀔 때 호출됩니다. / Called when sort state changes. |
| `onSelectedRowKeysChange` | `(keys: string[]) => void` | `-` | selected key 목록이 바뀔 때 호출됩니다. / Called when selected keys change. |
| `onSelectionChange` | `(rows: Row[]) => void` | `-` | 선택된 row 목록이 바뀔 때 호출됩니다. / Called when selected rows change. |
| `onActiveRowKeyChange` | `(key: string \| undefined, row: Row \| undefined) => void` | `-` | active row가 바뀔 때 호출됩니다. / Called when the active row changes. |
| `onColumnResize` | `(key: keyof Row & string, width: number) => void` | `-` | column width가 바뀔 때 호출됩니다. / Called when a column width changes. |
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
- `resizableColumns`와 column의 `resizable` 설정으로 pointer와 keyboard 기반 열 너비 조절을 제어합니다. / `resizableColumns` and each column's `resizable` setting control pointer-based and keyboard-based column resizing.
- resize handle은 `role="separator"`와 `aria-valuemin`, `aria-valuemax`, `aria-valuenow`를 제공하고 `ArrowLeft`/`ArrowRight`는 16px, `Shift+ArrowLeft`/`Shift+ArrowRight`는 48px 단위로 조절합니다. / Resize handles expose `role="separator"`, `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`; `ArrowLeft`/`ArrowRight` adjust by 16px, while `Shift+ArrowLeft`/`Shift+ArrowRight` adjust by 48px.
- resize handle에서 `Home`은 최소 너비, `End`는 최대 너비로 이동합니다. / On a resize handle, `Home` moves to the minimum width and `End` moves to the maximum width.
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

## 가상 스크롤 범위 / Virtual Scroll Scope

- v0.1에서는 virtual scroll을 구현하지 않고 500 row 이하의 조작형 grid를 기준으로 유지합니다. / v0.1 does not implement virtual scroll and keeps the target at interactive grids with up to 500 rows.
- 501-2,000 row는 pagination, server filtering, column pruning을 우선합니다. / For 501-2,000 rows, prefer pagination, server filtering, and column pruning first.
- `virtualized`, `rowHeight`, `overscan`, `estimatedRowHeight` prop은 아직 public API가 아닙니다. / `virtualized`, `rowHeight`, `overscan`, and `estimatedRowHeight` are not public APIs yet.
- 자세한 기준은 [DataGrid 가상 스크롤 결정](../../../../../../docs/datagrid-virtual-scroll.md)을 따릅니다. / Follow [DataGrid Virtual Scroll Decision](../../../../../../docs/datagrid-virtual-scroll.md) for detailed criteria.
