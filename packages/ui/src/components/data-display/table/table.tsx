import { useState, type HTMLAttributes, type ReactNode } from "react";
import { Checkbox } from "../../forms/checkbox";
import { classNames } from "../../../shared/utils";

export interface TableColumn<Row extends Record<string, unknown>> {
  key: keyof Row & string;
  label: ReactNode;
  sortable?: boolean;
  align?: "start" | "center" | "end";
  width?: string;
  renderCell?: (row: Row, rowIndex: number) => ReactNode;
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
  rowKey?: (row: Row, rowIndex: number) => string;
  rowActions?: (row: Row, rowIndex: number) => ReactNode;
  onSort?: (key: keyof Row & string) => void;
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
  rowKey,
  rowActions,
  onSort,
  onSelectionChange,
  className,
  ...props
}: TableProps<Row>) {
  const [selectedRows, setSelectedRows] = useState<Row[]>([]);
  const toggleRow = (row: Row, checked: boolean) => {
    const nextRows = checked ? [...selectedRows, row] : selectedRows.filter((selectedRow) => selectedRow !== row);
    setSelectedRows(nextRows);
    onSelectionChange?.(nextRows);
  };

  return (
    <div className={classNames("ds-TableWrap", className)} {...props}>
      <table className="ds-Table" data-density={density} data-selection-mode={selectionMode} data-striped={striped ? "true" : undefined} data-hoverable={hoverable ? "true" : undefined} data-sticky-header={stickyHeader ? "true" : undefined}>
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          <tr>
            {selectionMode === "multiple" ? <th scope="col" /> : null}
            {columns.map((column) => (
              <th key={column.key} scope="col" data-align={column.align} style={{ width: column.width }}>
                {sortable || column.sortable ? (
                  <button className="ds-Table-sort" type="button" onClick={() => onSort?.(column.key)}>
                    {column.label} <span aria-hidden="true">Sort</span>
                  </button>
                ) : column.label}
              </th>
            ))}
            {rowActions ? <th scope="col" /> : null}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="ds-Table-empty" colSpan={columns.length + (selectionMode === "multiple" ? 1 : 0) + (rowActions ? 1 : 0)}>
                데이터가 없습니다. / No data.
              </td>
            </tr>
          ) : null}
          {rows.map((row, rowIndex) => (
            <tr key={rowKey?.(row, rowIndex) ?? rowIndex}>
              {selectionMode === "multiple" ? (
                <td>
                  <Checkbox label={`${rowIndex + 1}행 선택 / Select row ${rowIndex + 1}`} onChange={(event) => toggleRow(row, event.currentTarget.checked)} />
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
