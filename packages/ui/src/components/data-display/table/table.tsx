import type { HTMLAttributes, ReactNode } from "react";
import { Checkbox } from "../../forms/checkbox";
import { useControllableState } from "../../../shared/use-controllable-state";
import { classNames } from "../../../shared/utils";

export interface TableColumn<Row extends Record<string, unknown>> {
  key: keyof Row & string;
  label: ReactNode;
  sortable?: boolean;
  align?: "start" | "center" | "end";
  width?: string;
  renderCell?: (row: Row, rowIndex: number) => ReactNode;
}

export type TableSortDirection = "ascending" | "descending";

export interface TableSortState<Row extends Record<string, unknown>> {
  key: keyof Row & string;
  direction: TableSortDirection;
}

export interface TableProps<Row extends Record<string, unknown>> extends HTMLAttributes<HTMLDivElement> {
  caption?: ReactNode;
  columns?: Array<TableColumn<Row>>;
  rows?: Row[];
  density?: "compact" | "md";
  sortable?: boolean;
  selectionMode?: "none" | "multiple";
  striped?: boolean;
  hoverable?: boolean;
  stickyHeader?: boolean;
  emptyMessage?: ReactNode;
  rowKey?: (row: Row, rowIndex: number) => string;
  rowActions?: (row: Row, rowIndex: number) => ReactNode;
  sortState?: TableSortState<Row>;
  defaultSortState?: TableSortState<Row>;
  selectedRowKeys?: string[];
  defaultSelectedRowKeys?: string[];
  onSort?: (key: keyof Row & string) => void;
  onSortChange?: (sortState: TableSortState<Row> | undefined) => void;
  onSelectedRowKeysChange?: (keys: string[]) => void;
  onSelectionChange?: (rows: Row[]) => void;
}

export function Table<Row extends Record<string, unknown>>({
  caption,
  columns = [],
  rows = [],
  density = "md",
  sortable = false,
  selectionMode = "none",
  striped = false,
  hoverable = true,
  stickyHeader = false,
  emptyMessage = "데이터가 없습니다. / No data.",
  rowKey,
  rowActions,
  sortState,
  defaultSortState,
  selectedRowKeys,
  defaultSelectedRowKeys = [],
  onSort,
  onSortChange,
  onSelectedRowKeysChange,
  onSelectionChange,
  className,
  ...props
}: TableProps<Row>) {
  const [currentSortState, setSortState] = useControllableState<TableSortState<Row> | undefined>({
    value: sortState,
    defaultValue: defaultSortState,
    onChange: onSortChange
  });
  const [currentSelectedKeys, setSelectedKeys] = useControllableState<string[]>({
    value: selectedRowKeys,
    defaultValue: defaultSelectedRowKeys,
    onChange: onSelectedRowKeysChange
  });
  const getRowKey = (row: Row, rowIndex: number) => rowKey?.(row, rowIndex) ?? String(rowIndex);
  const selectedKeySet = new Set(currentSelectedKeys);
  const selectableRowKeys = rows.map(getRowKey);
  const allRowsSelected = selectableRowKeys.length > 0 && selectableRowKeys.every((key) => selectedKeySet.has(key));
  const someRowsSelected = selectableRowKeys.some((key) => selectedKeySet.has(key)) && !allRowsSelected;
  const applySelection = (nextKeys: string[]) => {
    setSelectedKeys(nextKeys);
    const nextKeySet = new Set(nextKeys);
    const nextRows = rows.filter((row, rowIndex) => nextKeySet.has(getRowKey(row, rowIndex)));
    onSelectionChange?.(nextRows);
  };
  const toggleRow = (row: Row, rowIndex: number, checked: boolean) => {
    const key = getRowKey(row, rowIndex);
    const nextKeys = checked
      ? Array.from(new Set([...currentSelectedKeys, key]))
      : currentSelectedKeys.filter((selectedKey) => selectedKey !== key);
    applySelection(nextKeys);
  };
  const toggleAllRows = (checked: boolean) => {
    applySelection(checked ? selectableRowKeys : []);
  };
  const toggleSort = (key: keyof Row & string) => {
    const nextState: TableSortState<Row> = {
      key,
      direction: currentSortState?.key === key && currentSortState.direction === "ascending" ? "descending" : "ascending"
    };
    setSortState(nextState);
    onSort?.(key);
  };

  return (
    <div className={classNames("ds-TableWrap", className)} {...props}>
      <table className="ds-Table" data-density={density} data-selection-mode={selectionMode} data-striped={striped ? "true" : undefined} data-hoverable={hoverable ? "true" : undefined} data-sticky-header={stickyHeader ? "true" : undefined}>
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          <tr>
            {selectionMode === "multiple" ? (
              <th scope="col">
                <Checkbox
                  checked={allRowsSelected}
                  indeterminate={someRowsSelected}
                  label="전체 행 선택 / Select all rows"
                  onChange={(event) => toggleAllRows(event.currentTarget.checked)}
                />
              </th>
            ) : null}
            {columns.map((column) => {
              const sorted = currentSortState?.key === column.key;
              const sortDirection = sorted ? currentSortState?.direction : undefined;
              const sortLabel = column.label?.toString() ?? column.key;
              return (
                <th key={column.key} scope="col" data-align={column.align} style={{ width: column.width }} aria-sort={sortDirection}>
                  {sortable || column.sortable ? (
                    <button className="ds-Table-sort" type="button" aria-label={`${sortLabel} 정렬 / Sort ${sortLabel}`} onClick={() => toggleSort(column.key)}>
                      {column.label} <span aria-hidden="true">{sortDirection ? (sortDirection === "ascending" ? "↑" : "↓") : "↕"}</span>
                    </button>
                  ) : column.label}
                </th>
              );
            })}
            {rowActions ? <th scope="col" /> : null}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="ds-Table-empty" colSpan={columns.length + (selectionMode === "multiple" ? 1 : 0) + (rowActions ? 1 : 0)}>
                {emptyMessage}
              </td>
            </tr>
          ) : null}
          {rows.map((row, rowIndex) => (
            <tr key={getRowKey(row, rowIndex)}>
              {selectionMode === "multiple" ? (
                <td>
                  <Checkbox checked={selectedKeySet.has(getRowKey(row, rowIndex))} label={`${rowIndex + 1}행 선택 / Select row ${rowIndex + 1}`} onChange={(event) => toggleRow(row, rowIndex, event.currentTarget.checked)} />
                </td>
              ) : null}
              {columns.map((column) => <td key={column.key} data-align={column.align}>{column.renderCell?.(row, rowIndex) ?? row[column.key] as ReactNode}</td>)}
              {rowActions ? <td className="ds-Table-actions">{rowActions(row, rowIndex)}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
