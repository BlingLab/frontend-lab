export interface ComponentPropDoc {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

export interface ComponentPropDocSource {
  name: string;
  props: string[];
}

export const componentPropDocs: Record<string, ComponentPropDoc[]> = {
  Combobox: [
    { name: "label", type: "ReactNode", defaultValue: "-", description: "필드 label입니다. / Field label." },
    { name: "description", type: "ReactNode", defaultValue: "-", description: "보조 설명입니다. / Helper description." },
    { name: "error", type: "ReactNode", defaultValue: "-", description: "오류 메시지이며 invalid 상태를 만듭니다. / Error message that creates the invalid state." },
    { name: "value", type: "string", defaultValue: "-", description: "controlled 선택 값입니다. / Controlled selected value." },
    { name: "defaultValue", type: "string", defaultValue: "\"\"", description: "uncontrolled 초기 선택 값입니다. / Initial uncontrolled selected value." },
    { name: "options", type: "ComboboxOption[]", defaultValue: "[]", description: "검색하고 선택할 option 목록입니다. / Options available for filtering and selection." },
    { name: "placeholder", type: "string", defaultValue: "\"검색 또는 선택 / Search or select\"", description: "입력 placeholder입니다. / Input placeholder." },
    { name: "emptyMessage", type: "ReactNode", defaultValue: "\"결과가 없습니다. / No results.\"", description: "필터 결과가 없을 때 표시합니다. / Shown when filtering returns no options." },
    { name: "size", type: "Size", defaultValue: "\"md\"", description: "control 높이와 밀도입니다. / Control height and density." },
    { name: "width", type: "FieldWidth", defaultValue: "\"auto\"", description: "Field wrapper 폭입니다. / Field wrapper width." },
    { name: "disabled", type: "boolean", defaultValue: "false", description: "입력과 toggle을 비활성화합니다. / Disables the input and toggle." },
    { name: "required", type: "boolean", defaultValue: "false", description: "필수 입력 상태를 표시합니다. / Marks the field as required." },
    { name: "fieldProps", type: "Omit<FieldProps, ...>", defaultValue: "-", description: "Field wrapper에 전달할 추가 설정입니다. / Additional settings passed to the Field wrapper." },
    { name: "onValueChange", type: "(value: string) => void", defaultValue: "-", description: "선택 값이 바뀔 때 호출됩니다. / Called when the selected value changes." }
  ],
  CommandPalette: [
    { name: "title", type: "ReactNode", defaultValue: "\"명령 팔레트 / Command palette\"", description: "dialog 제목입니다. / Dialog title." },
    { name: "triggerLabel", type: "ReactNode", defaultValue: "\"명령 열기 / Open commands\"", description: "palette를 여는 trigger button label입니다. / Trigger button label that opens the palette." },
    { name: "commands", type: "CommandPaletteCommand[]", defaultValue: "[]", description: "검색하고 실행할 command 목록입니다. / Commands available for search and execution." },
    { name: "open", type: "boolean", defaultValue: "-", description: "controlled open 상태입니다. / Controlled open state." },
    { name: "defaultOpen", type: "boolean", defaultValue: "false", description: "uncontrolled 초기 open 상태입니다. / Initial uncontrolled open state." },
    { name: "placeholder", type: "string", defaultValue: "\"명령 검색 / Search commands\"", description: "검색 input placeholder입니다. / Search input placeholder." },
    { name: "emptyMessage", type: "ReactNode", defaultValue: "\"명령이 없습니다. / No commands.\"", description: "검색 결과가 없을 때 표시합니다. / Shown when no commands match." },
    { name: "onOpenChange", type: "(open: boolean) => void", defaultValue: "-", description: "open 상태가 바뀔 때 호출됩니다. / Called when open state changes." },
    { name: "onCommandSelect", type: "(command: CommandPaletteCommand) => void", defaultValue: "-", description: "command가 선택될 때 호출됩니다. / Called when a command is selected." }
  ],
  DataGrid: [
    { name: "caption", type: "ReactNode", defaultValue: "-", description: "table caption입니다. / Table caption." },
    { name: "columns", type: "Array<DataGridColumn<Row>>", defaultValue: "[]", description: "column 구조와 render 설정입니다. / Column structure and render settings." },
    { name: "rows", type: "Row[]", defaultValue: "[]", description: "렌더링할 row 데이터입니다. / Row data to render." },
    { name: "density", type: "\"compact\" | \"md\"", defaultValue: "\"md\"", description: "row와 cell 밀도입니다. / Row and cell density." },
    { name: "sortable", type: "boolean", defaultValue: "true", description: "전체 column sort control 기본값입니다. / Default sort control behavior for columns." },
    { name: "selectionMode", type: "\"none\" | \"multiple\"", defaultValue: "\"none\"", description: "row selection 모드입니다. / Row selection mode." },
    { name: "striped", type: "boolean", defaultValue: "true", description: "교차 row 배경을 표시합니다. / Shows alternating row backgrounds." },
    { name: "stickyHeader", type: "boolean", defaultValue: "false", description: "header를 sticky로 유지합니다. / Keeps the header sticky." },
    { name: "loading", type: "boolean", defaultValue: "false", description: "loading 상태와 `aria-busy`를 표시합니다. / Shows loading state and `aria-busy`." },
    { name: "emptyMessage", type: "ReactNode", defaultValue: "\"데이터가 없습니다. / No data.\"", description: "row가 없을 때 표시합니다. / Shown when there are no rows." },
    { name: "rowKey", type: "(row: Row, rowIndex: number) => string", defaultValue: "rowIndex", description: "row identity를 계산합니다. / Computes row identity." },
    { name: "rowActions", type: "(row: Row, rowIndex: number) => ReactNode", defaultValue: "-", description: "row action cell을 렌더링합니다. / Renders the row action cell." },
    { name: "sortState", type: "TableSortState<Row>", defaultValue: "-", description: "controlled sort 상태입니다. / Controlled sort state." },
    { name: "defaultSortState", type: "TableSortState<Row>", defaultValue: "-", description: "uncontrolled 초기 sort 상태입니다. / Initial uncontrolled sort state." },
    { name: "selectedRowKeys", type: "string[]", defaultValue: "-", description: "controlled selected row key 목록입니다. / Controlled selected row keys." },
    { name: "defaultSelectedRowKeys", type: "string[]", defaultValue: "[]", description: "uncontrolled 초기 selected row key 목록입니다. / Initial uncontrolled selected row keys." },
    { name: "activeRowKey", type: "string", defaultValue: "-", description: "controlled active row key입니다. / Controlled active row key." },
    { name: "defaultActiveRowKey", type: "string", defaultValue: "첫 row key / First row key", description: "uncontrolled 초기 active row key입니다. / Initial uncontrolled active row key." },
    { name: "keyboardNavigation", type: "\"row\" | \"none\"", defaultValue: "\"row\"", description: "roving row keyboard navigation 사용 여부입니다. / Enables roving row keyboard navigation." },
    { name: "resizableColumns", type: "boolean", defaultValue: "true", description: "column resize handle을 활성화합니다. / Enables column resize handles." },
    { name: "onSort", type: "(key: keyof Row & string) => void", defaultValue: "-", description: "legacy sort callback입니다. / Legacy sort callback." },
    { name: "onSortChange", type: "(sortState: TableSortState<Row> | undefined) => void", defaultValue: "-", description: "sort 상태가 바뀔 때 호출됩니다. / Called when sort state changes." },
    { name: "onSelectedRowKeysChange", type: "(keys: string[]) => void", defaultValue: "-", description: "selected key 목록이 바뀔 때 호출됩니다. / Called when selected keys change." },
    { name: "onSelectionChange", type: "(rows: Row[]) => void", defaultValue: "-", description: "선택된 row 목록이 바뀔 때 호출됩니다. / Called when selected rows change." },
    { name: "onActiveRowKeyChange", type: "(key: string | undefined, row: Row | undefined) => void", defaultValue: "-", description: "active row가 바뀔 때 호출됩니다. / Called when the active row changes." },
    { name: "onColumnResize", type: "(key: keyof Row & string, width: number) => void", defaultValue: "-", description: "column width가 바뀔 때 호출됩니다. / Called when a column width changes." }
  ]
};

function escapeTableCell(value: string) {
  return value.replaceAll("|", "\\|");
}

export function getComponentPropDocs(component: ComponentPropDocSource) {
  return componentPropDocs[component.name] ?? component.props.map((prop) => ({
    name: prop,
    type: "catalog",
    defaultValue: "-",
    description: "catalog prop 축에서 생성된 항목입니다. / Generated from the catalog prop axis."
  }));
}

export function renderComponentPropTable(component: ComponentPropDocSource) {
  const rows = getComponentPropDocs(component);
  return [
    "| Prop | Type | Default | 설명 / Description |",
    "| --- | --- | --- | --- |",
    ...rows.map((row) => `| \`${row.name}\` | \`${escapeTableCell(row.type)}\` | \`${escapeTableCell(row.defaultValue)}\` | ${escapeTableCell(row.description)} |`)
  ].join("\n");
}
