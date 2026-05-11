# Table 컴포넌트

비교 가능한 record를 행과 열로 정렬해 보여주는 표입니다.

## 역할

스캔, 정렬, 열 맞춤이 중요한 dense data를 표시할 때 사용합니다.

## 사용 기준

- 우선순위는 `P1`, 상태는 `ready`입니다.
- 카테고리는 `data-display` (Data Display)입니다.
- 기본 primitive는 `table`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`columns`, `rows`, `density`, `sortable`, `selectionMode`, `striped`, `hoverable`, `stickyHeader`, `emptyMessage`, `rowKey`, `rowActions`, `sortState`, `defaultSortState`, `selectedRowKeys`, `defaultSelectedRowKeys`, `renderCell`, `onSortChange`, `onSelectedRowKeysChange`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `columns` | `column[]` | `[]` | table 또는 grid column 구조입니다. |
| `rows` | `row[] \| number` | `-` | row data 또는 textarea row 수입니다. |
| `density` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `sortable` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `selectionMode` | `"none" \| "single" \| "multiple"` | `-` | 선택 interaction 방식입니다. |
| `striped` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `hoverable` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `stickyHeader` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `emptyMessage` | `ReactNode` | `-` | 결과 또는 data가 없을 때 표시합니다. |
| `rowKey` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `rowActions` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `sortState` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `defaultSortState` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `selectedRowKeys` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `defaultSelectedRowKeys` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `renderCell` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `onSortChange` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `onSelectedRowKeysChange` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |

## 상태

- `default`
- `hover`
- `sorted`
- `selected`
- `empty`
- `loading`

## 접근성

- 기본 기준
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다.
- 정렬 상태는 `aria-sort`, 선택 상태는 checkbox와 key 기반 selection prop으로 노출합니다.
- focus-visible은 `--ds-focus-ring`을 사용하고 키보드 이동에서 사라지지 않아야 합니다.

## 토큰

- `--ds-color-border-default`
- `--ds-color-bg-surface`
- `--ds-color-bg-muted`

## 예시

```tsx
import { Table } from "@bling-lab/ui/components/data-display/table";

export function Example() {
  return <Table columns={columns} rows={rows} caption="목록" />;
}
```

## 구현 메모

- 구현 파일은 `table.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
