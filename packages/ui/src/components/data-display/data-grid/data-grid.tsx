import { useRef, useState, type CSSProperties, type HTMLAttributes, type KeyboardEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { Checkbox } from "../../forms/checkbox";
import { useControllableState } from "../../../shared/use-controllable-state";
import { classNames } from "../../../shared/utils";
import type { TableColumn, TableSortDirection, TableSortState } from "../table";

export type DataGridColumn<Row extends Record<string, unknown>> = TableColumn<Row> & {
  resizable?: boolean;
  minWidth?: number;
  maxWidth?: number;
};

export interface DataGridProps<Row extends Record<string, unknown>> extends HTMLAttributes<HTMLDivElement> {
  caption?: ReactNode;
  columns?: Array<DataGridColumn<Row>>;
  rows?: Row[];
  density?: "compact" | "md";
  sortable?: boolean;
  selectionMode?: "none" | "multiple";
  striped?: boolean;
  stickyHeader?: boolean;
  loading?: boolean;
  emptyMessage?: ReactNode;
  rowKey?: (row: Row, rowIndex: number) => string;
  rowActions?: (row: Row, rowIndex: number) => ReactNode;
  sortState?: TableSortState<Row>;
  defaultSortState?: TableSortState<Row>;
  selectedRowKeys?: string[];
  defaultSelectedRowKeys?: string[];
  activeRowKey?: string;
  defaultActiveRowKey?: string;
  keyboardNavigation?: "row" | "none";
  resizableColumns?: boolean;
  onSort?: (key: keyof Row & string) => void;
  onSortChange?: (sortState: TableSortState<Row> | undefined) => void;
  onSelectedRowKeysChange?: (keys: string[]) => void;
  onSelectionChange?: (rows: Row[]) => void;
  onActiveRowKeyChange?: (key: string | undefined, row: Row | undefined) => void;
  onColumnResize?: (key: keyof Row & string, width: number) => void;
}

const DEFAULT_COLUMN_WIDTH = 160;
const MIN_COLUMN_WIDTH = 96;
const MAX_COLUMN_WIDTH = 640;

function toColumnWidth(width: string | undefined) {
  if (!width) return undefined;
  const parsedWidth = Number.parseInt(width, 10);
  return Number.isFinite(parsedWidth) ? parsedWidth : undefined;
}

function clampColumnWidth<Row extends Record<string, unknown>>(column: DataGridColumn<Row>, width: number) {
  const minWidth = column.minWidth ?? MIN_COLUMN_WIDTH;
  const maxWidth = column.maxWidth ?? MAX_COLUMN_WIDTH;
  return Math.min(Math.max(width, minWidth), maxWidth);
}

export function DataGrid<Row extends Record<string, unknown>>({
  caption,
  columns = [],
  rows = [],
  density = "md",
  sortable = true,
  selectionMode = "none",
  striped = true,
  stickyHeader = false,
  loading = false,
  emptyMessage = "데이터가 없습니다. / No data.",
  rowKey,
  rowActions,
  sortState,
  defaultSortState,
  selectedRowKeys,
  defaultSelectedRowKeys = [],
  activeRowKey,
  defaultActiveRowKey,
  keyboardNavigation = "row",
  resizableColumns = true,
  onSort,
  onSortChange,
  onSelectedRowKeysChange,
  onSelectionChange,
  onActiveRowKeyChange,
  onColumnResize,
  className,
  ...props
}: DataGridProps<Row>) {
  const rowRefs = useRef(new Map<string, HTMLTableRowElement>());
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
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
  const rowKeys = rows.map(getRowKey);
  const initialActiveRowKey = defaultActiveRowKey ?? rowKeys[0];
  const [currentActiveRowKey, setActiveRowKey] = useControllableState<string | undefined>({
    value: activeRowKey,
    defaultValue: initialActiveRowKey,
    onChange: (key) => {
      const activeIndex = key ? rowKeys.indexOf(key) : -1;
      onActiveRowKeyChange?.(key, activeIndex >= 0 ? rows[activeIndex] : undefined);
    }
  });
  const effectiveActiveRowKey = currentActiveRowKey && rowKeys.includes(currentActiveRowKey) ? currentActiveRowKey : rowKeys[0];
  const selectedKeySet = new Set(currentSelectedKeys);
  const allRowsSelected = rowKeys.length > 0 && rowKeys.every((key) => selectedKeySet.has(key));
  const someRowsSelected = rowKeys.some((key) => selectedKeySet.has(key)) && !allRowsSelected;
  const totalColumnCount = columns.length + (selectionMode === "multiple" ? 1 : 0) + (rowActions ? 1 : 0);

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
    applySelection(checked ? rowKeys : []);
  };
  const toggleSort = (key: keyof Row & string) => {
    const nextDirection: TableSortDirection = currentSortState?.key === key && currentSortState.direction === "ascending" ? "descending" : "ascending";
    const nextState: TableSortState<Row> = { key, direction: nextDirection };
    setSortState(nextState);
    onSort?.(key);
  };
  const focusRow = (nextIndex: number) => {
    const nextKey = rowKeys[nextIndex];
    if (!nextKey) return;
    setActiveRowKey(nextKey);
    window.requestAnimationFrame(() => rowRefs.current.get(nextKey)?.focus());
  };
  const onRowKeyDown = (event: KeyboardEvent<HTMLTableRowElement>, rowIndex: number) => {
    if (keyboardNavigation === "none" || event.target !== event.currentTarget) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusRow(Math.min(rowIndex + 1, rows.length - 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      focusRow(Math.max(rowIndex - 1, 0));
    }
    if (event.key === "Home") {
      event.preventDefault();
      focusRow(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      focusRow(rows.length - 1);
    }
    if (selectionMode === "multiple" && event.key === " ") {
      event.preventDefault();
      const row = rows[rowIndex];
      toggleRow(row, rowIndex, !selectedKeySet.has(getRowKey(row, rowIndex)));
    }
  };
  const getColumnStyle = (column: DataGridColumn<Row>): CSSProperties => {
    const width = columnWidths[column.key] ?? toColumnWidth(column.width);
    return width ? { width, minWidth: column.minWidth, maxWidth: column.maxWidth } : { width: column.width, minWidth: column.minWidth, maxWidth: column.maxWidth };
  };
  const startColumnResize = (event: ReactPointerEvent<HTMLButtonElement>, column: DataGridColumn<Row>) => {
    if (!resizableColumns || column.resizable === false) return;

    event.preventDefault();
    const headerCell = event.currentTarget.closest("th");
    const startX = event.clientX;
    const startWidth = headerCell?.getBoundingClientRect().width ?? columnWidths[column.key] ?? toColumnWidth(column.width) ?? DEFAULT_COLUMN_WIDTH;
    const onPointerMove = (pointerEvent: PointerEvent) => {
      const nextWidth = clampColumnWidth(column, startWidth + pointerEvent.clientX - startX);
      setColumnWidths((currentWidths) => ({ ...currentWidths, [column.key]: nextWidth }));
      onColumnResize?.(column.key, nextWidth);
    };
    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  return (
    <div className={classNames("ds-DataGrid", className)} data-loading={loading ? "true" : undefined} aria-busy={loading ? "true" : undefined} {...props}>
      {loading ? <div className="ds-DataGrid-loading">불러오는 중 / Loading</div> : null}
      <div className="ds-TableWrap ds-DataGrid-wrap">
        <table className="ds-Table ds-DataGrid-table" role="grid" data-density={density} data-selection-mode={selectionMode} data-striped={striped ? "true" : undefined} data-hoverable="true" data-sticky-header={stickyHeader ? "true" : undefined} aria-rowcount={rows.length} aria-colcount={totalColumnCount}>
          {caption ? <caption>{caption}</caption> : null}
          <thead>
            <tr role="row">
              {selectionMode === "multiple" ? (
                <th scope="col" role="columnheader">
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
                const canResize = resizableColumns && column.resizable !== false;
                return (
                  <th key={column.key} scope="col" role="columnheader" data-align={column.align} data-resizable={canResize ? "true" : undefined} style={getColumnStyle(column)} aria-sort={sortDirection}>
                    <span className="ds-DataGrid-columnHeader">
                      {sortable || column.sortable ? (
                        <button className="ds-Table-sort" type="button" aria-label={`${sortLabel} 정렬 / Sort ${sortLabel}`} onClick={() => toggleSort(column.key)}>
                          {column.label} <span aria-hidden="true">{sortDirection ? (sortDirection === "ascending" ? "↑" : "↓") : "↕"}</span>
                        </button>
                      ) : <span className="ds-DataGrid-columnLabel">{column.label}</span>}
                      {canResize ? (
                        <button
                          className="ds-DataGrid-resizeHandle"
                          type="button"
                          aria-label={`${sortLabel} 열 너비 조절 / Resize ${sortLabel} column`}
                          onPointerDown={(event) => startColumnResize(event, column)}
                        />
                      ) : null}
                    </span>
                  </th>
                );
              })}
              {rowActions ? <th scope="col" role="columnheader" aria-label="행 작업 / Row actions" /> : null}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr role="row">
                <td className="ds-Table-empty" role="gridcell" colSpan={totalColumnCount}>
                  {emptyMessage}
                </td>
              </tr>
            ) : null}
            {rows.map((row, rowIndex) => {
              const key = getRowKey(row, rowIndex);
              const selected = selectedKeySet.has(key);
              const active = key === effectiveActiveRowKey;
              return (
                <tr
                  className="ds-DataGrid-row"
                  data-active={active ? "true" : undefined}
                  data-selected={selected ? "true" : undefined}
                  key={key}
                  ref={(node) => {
                    if (node) rowRefs.current.set(key, node);
                    else rowRefs.current.delete(key);
                  }}
                  role="row"
                  tabIndex={keyboardNavigation === "row" ? (active ? 0 : -1) : undefined}
                  aria-selected={selectionMode === "multiple" ? selected : undefined}
                  onClick={() => setActiveRowKey(key)}
                  onFocus={() => setActiveRowKey(key)}
                  onKeyDown={(event) => onRowKeyDown(event, rowIndex)}
                >
                  {selectionMode === "multiple" ? (
                    <td role="gridcell">
                      <Checkbox checked={selected} label={`${rowIndex + 1}행 선택 / Select row ${rowIndex + 1}`} onChange={(event) => toggleRow(row, rowIndex, event.currentTarget.checked)} />
                    </td>
                  ) : null}
                  {columns.map((column) => <td key={column.key} role="gridcell" data-align={column.align} style={getColumnStyle(column)}>{column.renderCell?.(row, rowIndex) ?? row[column.key] as ReactNode}</td>)}
                  {rowActions ? <td className="ds-Table-actions" role="gridcell">{rowActions(row, rowIndex)}</td> : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
