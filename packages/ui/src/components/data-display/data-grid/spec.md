# DataGrid 명세

## 목적

정적 table보다 많은 조작이 필요한 dense record 화면에 사용합니다.

## API 표면

- public component: `DataGrid`
- folder slug: `data-grid`
- category: `data-display`
- 우선순위/상태: `P1`, `ready`
- props: `caption`, `columns`, `rows`, `density`, `sortable`, `selectionMode`, `striped`, `stickyHeader`, `loading`, `emptyMessage`, `rowKey`, `rowActions`, `sortState`, `defaultSortState`, `selectedRowKeys`, `defaultSelectedRowKeys`, `activeRowKey`, `defaultActiveRowKey`, `keyboardNavigation`, `resizableColumns`, `onSort`, `onSortChange`, `onSelectedRowKeysChange`, `onSelectionChange`, `onActiveRowKeyChange`, `onColumnResize`

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

## 변형

- 시각 변형은 이미 정의된 `variant`, `tone`, `size`, `density`, `orientation` prop이 있을 때만 사용합니다.
- 새로운 변형은 product use case와 접근성 영향이 명확할 때만 추가합니다.
- 색상 차이는 theme token으로 처리하고 component CSS에서 theme name을 직접 분기하지 않습니다.

## 상태 동작

- `default`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다.
- `hover`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다.
- `sorted`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다.
- `selected`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다.
- `active`: keyboard row navigation의 현재 행은 `data-active`와 roving `tabIndex`를 함께 갱신해야 합니다.
- `empty`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다.
- `loading`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다.
- `resizing`: resize handle은 pointer drag 중 column width state를 갱신하고 token 기반 focus ring을 유지해야 합니다.

## 상호작용

- pointer hover는 `--ds-state-hover-bg` 또는 component semantic token으로 표현합니다.
- `Table`의 sort/selection controlled API를 그대로 노출해 grid 수준에서 상태를 관리할 수 있어야 합니다.
- 행 focus는 `keyboardNavigation="row"`일 때 `ArrowUp`, `ArrowDown`, `Home`, `End`를 지원하고 한 행만 `tabIndex=0`이 됩니다.
- 여러 행 선택에서는 focused row에서 Space로 선택을 토글합니다.
- column resize는 `resizableColumns`와 column의 `resizable`로 켜고 끄며 `onColumnResize`로 최종 width를 외부에 알립니다.
- active/pressed/selected 상태는 `data-*` attribute와 ARIA state가 필요한 경우 함께 갱신합니다.
- disabled 상태는 native `disabled` 또는 `aria-disabled`를 사용하고 opacity만으로 의미를 전달하지 않습니다.

## 접근성 계약

- 기준 문서
- keyboard focus는 항상 보이고 DOM 순서와 화면 순서가 어긋나지 않아야 합니다.
- `role="grid"`를 table에 적용하되 row와 gridcell의 DOM 순서를 native table 구조와 맞춥니다.
- interactive child가 있는 경우 role 중첩과 tab stop 수를 검토합니다.
- 상태 변화가 사용자에게 중요하면 visible text 또는 live region으로 전달합니다.

## 토큰 계약

- `--ds-color-border-default`
- `--ds-color-bg-surface`
- `--ds-color-bg-muted`

- component CSS에서는 raw hex, raw rgba, 임의 spacing 값을 쓰지 않습니다.
- theme override는 semantic token을 통해 상속되어야 합니다.

## 검증 체크리스트

- 문서 앱에서 기본 예시가 렌더링됩니다.
- `npm run components:validate`가 통과합니다.
- keyboard focus, hover, disabled, selected 또는 open 상태가 시각적으로 구분됩니다.
- `npm run test:interaction`에서 DataGrid row 키보드 이동이 검증됩니다.
- narrow viewport에서 text overflow와 horizontal scroll이 의도한 영역에만 생깁니다.

## 결정 기록

- 이 컴포넌트는 `table with grid-like interactions` primitive를 기준으로 구현합니다.
- public API는 catalog의 props 목록을 기준으로 유지하고 breaking change는 release note에 기록합니다.
- virtual scroll은 v0.1 non-goal입니다. 500 row 이하를 현재 기준으로 두고, 2,000 row 초과 또는 continuous scroll workflow가 실제 요구될 때 별도 proposal을 엽니다.
- virtual scroll proposal은 `aria-rowcount`, `aria-rowindex`, focus proxy, 스크린 리더 알림, 스크롤 성능 스모크를 함께 포함해야 합니다.
