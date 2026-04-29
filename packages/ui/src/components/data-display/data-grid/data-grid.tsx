import type { HTMLAttributes, ReactNode } from "react";
import { Table, type TableColumn, type TableSortState } from "../table";
import { classNames } from "../../../shared/utils";

export type DataGridColumn<Row extends Record<string, unknown>> = TableColumn<Row> & {
  resizable?: boolean;
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
  onSort?: (key: keyof Row & string) => void;
  onSortChange?: (sortState: TableSortState<Row> | undefined) => void;
  onSelectedRowKeysChange?: (keys: string[]) => void;
  onSelectionChange?: (rows: Row[]) => void;
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
  className,
  ...props
}: DataGridProps<Row>) {
  return (
    <div className={classNames("ds-DataGrid", className)} data-loading={loading ? "true" : undefined}>
      {loading ? <div className="ds-DataGrid-loading">불러오는 중 / Loading</div> : null}
      <Table
        caption={caption}
        columns={columns}
        rows={rows}
        density={density}
        sortable={sortable}
        selectionMode={selectionMode}
        striped={striped}
        stickyHeader={stickyHeader}
        emptyMessage={emptyMessage}
        {...props}
      />
    </div>
  );
}
