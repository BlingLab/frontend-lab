# DataGrid 컴포넌트

정렬, 선택, 행 action, keyboard row navigation, column resize를 포함한 interactive tabular grid입니다.

## 역할

정적 table보다 많은 조작이 필요한 dense record 화면에 사용합니다.

## 사용 기준

- 우선순위는 `P1`, 상태는 `ready`입니다.
- 카테고리는 `data-display` (Data Display)입니다.
- 기본 primitive는 `table with grid-like interactions`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`caption`, `columns`, `rows`, `density`, `sortable`, `selectionMode`, `striped`, `stickyHeader`, `loading`, `emptyMessage`, `rowKey`, `rowActions`, `sortState`, `defaultSortState`, `selectedRowKeys`, `defaultSelectedRowKeys`, `activeRowKey`, `defaultActiveRowKey`, `keyboardNavigation`, `resizableColumns`, `onSort`, `onSortChange`, `onSelectedRowKeysChange`, `onSelectionChange`, `onActiveRowKeyChange`, `onColumnResize`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `caption` | `ReactNode` | `-` | table caption입니다. |
| `columns` | `Array<DataGridColumn<Row>>` | `[]` | column 구조와 render 설정입니다. |
| `rows` | `Row[]` | `[]` | 렌더링할 row 데이터입니다. |
| `density` | `"compact" \| "md"` | `"md"` | row와 cell 밀도입니다. |
| `sortable` | `boolean` | `true` | 전체 column sort control 기본값입니다. |
| `selectionMode` | `"none" \| "multiple"` | `"none"` | row selection 모드입니다. |
| `striped` | `boolean` | `true` | 교차 row 배경을 표시합니다. |
| `stickyHeader` | `boolean` | `false` | header를 sticky로 유지합니다. |
| `loading` | `boolean` | `false` | loading 상태와 `aria-busy`를 표시합니다. |
| `emptyMessage` | `ReactNode` | `"데이터가 없습니다."` | row가 없을 때 표시합니다. |
| `rowKey` | `(row: Row, rowIndex: number) => string` | `rowIndex` | row identity를 계산합니다. |
| `rowActions` | `(row: Row, rowIndex: number) => ReactNode` | `-` | row action cell을 렌더링합니다. |
| `sortState` | `TableSortState<Row>` | `-` | controlled sort 상태입니다. |
| `defaultSortState` | `TableSortState<Row>` | `-` | uncontrolled 초기 sort 상태입니다. |
| `selectedRowKeys` | `string[]` | `-` | controlled selected row key 목록입니다. |
| `defaultSelectedRowKeys` | `string[]` | `[]` | uncontrolled 초기 selected row key 목록입니다. |
| `activeRowKey` | `string` | `-` | controlled active row key입니다. |
| `defaultActiveRowKey` | `string` | `첫 row key` | uncontrolled 초기 active row key입니다. |
| `keyboardNavigation` | `"row" \| "none"` | `"row"` | roving row 키보드 이동 사용 여부입니다. |
| `resizableColumns` | `boolean` | `true` | column resize handle을 활성화합니다. |
| `onSort` | `(key: keyof Row & string) => void` | `-` | legacy sort callback입니다. |
| `onSortChange` | `(sortState: TableSortState<Row> \| undefined) => void` | `-` | sort 상태가 바뀔 때 호출됩니다. |
| `onSelectedRowKeysChange` | `(keys: string[]) => void` | `-` | selected key 목록이 바뀔 때 호출됩니다. |
| `onSelectionChange` | `(rows: Row[]) => void` | `-` | 선택된 row 목록이 바뀔 때 호출됩니다. |
| `onActiveRowKeyChange` | `(key: string \| undefined, row: Row \| undefined) => void` | `-` | active row가 바뀔 때 호출됩니다. |
| `onColumnResize` | `(key: keyof Row & string, width: number) => void` | `-` | column width가 바뀔 때 호출됩니다. |

## 상태

- `default`
- `hover`
- `sorted`
- `selected`
- `active`
- `empty`
- `loading`
- `resizing`

## 접근성

- 기본 기준
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다.
- 행 focus는 roving `tabIndex`로 한 행만 tab stop이 되며 `ArrowUp`, `ArrowDown`, `Home`, `End`로 이동합니다.
- `selectionMode="multiple"`일 때 행 focus 상태에서 Space로 선택을 토글할 수 있습니다.
- `resizableColumns`와 column의 `resizable` 설정으로 pointer와 keyboard 기반 열 너비 조절을 제어합니다.
- resize handle은 `role="separator"`와 `aria-valuemin`, `aria-valuemax`, `aria-valuenow`를 제공하고 `ArrowLeft`/`ArrowRight`는 16px, `Shift+ArrowLeft`/`Shift+ArrowRight`는 48px 단위로 조절합니다.
- resize handle에서 `Home`은 최소 너비, `End`는 최대 너비로 이동합니다.
- focus-visible은 `--ds-focus-ring`을 사용하고 키보드 이동에서 사라지지 않아야 합니다.

## 토큰

- `--ds-color-border-default`
- `--ds-color-bg-surface`
- `--ds-color-bg-muted`

## 예시

```tsx
import { DataGrid } from "@bling-lab/ui/components/data-display/data-grid";

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

## 구현 메모

- 구현 파일은 `data-grid.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
- virtual scroll은 이번 범위에서 제외하고, large data가 실제 요구될 때 별도 이슈로 설계합니다.

## 가상 스크롤 범위

- v0.1에서는 virtual scroll을 구현하지 않고 500 row 이하의 조작형 grid를 기준으로 유지합니다.
- 501-2,000 row는 pagination, server filtering, column pruning을 우선합니다.
- `virtualized`, `rowHeight`, `overscan`, `estimatedRowHeight` prop은 아직 public API가 아닙니다.
- 자세한 기준은 [DataGrid 가상 스크롤 결정](../../../../../../docs/datagrid-virtual-scroll.md)을 따릅니다.
