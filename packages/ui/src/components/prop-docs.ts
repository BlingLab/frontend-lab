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

const sharedPropDocs: Record<string, Omit<ComponentPropDoc, "name">> = {
  accept: { type: "string", defaultValue: "-", description: "허용할 파일 MIME type 또는 확장자입니다. / Accepted file MIME types or extensions." },
  actions: { type: "ReactNode | action[]", defaultValue: "-", description: "사용자가 실행할 수 있는 보조 action입니다. / Secondary actions the user can run." },
  actionsPlacement: { type: "\"inline\" | \"bottom\"", defaultValue: "\"inline\"", description: "action을 배치할 위치입니다. / Placement for actions." },
  align: { type: "alignment", defaultValue: "-", description: "자식 요소의 교차축 정렬입니다. / Cross-axis alignment for children." },
  checked: { type: "boolean", defaultValue: "-", description: "controlled 선택 상태입니다. / Controlled checked state." },
  children: { type: "ReactNode", defaultValue: "-", description: "컴포넌트 내부 content입니다. / Content rendered inside the component." },
  className: { type: "string", defaultValue: "-", description: "추가 CSS class 이름입니다. / Additional CSS class name." },
  closeLabel: { type: "string", defaultValue: "\"닫기 / Close\"", description: "닫기 control의 accessible label입니다. / Accessible label for the close control." },
  closeOnBackdropClick: { type: "boolean", defaultValue: "true", description: "backdrop click으로 닫을지 결정합니다. / Determines whether backdrop click closes the overlay." },
  columns: { type: "column[]", defaultValue: "[]", description: "table 또는 grid column 구조입니다. / Column structure for a table or grid." },
  commands: { type: "CommandPaletteCommand[]", defaultValue: "[]", description: "검색하고 실행할 command 목록입니다. / Commands available for search and execution." },
  content: { type: "ReactNode", defaultValue: "-", description: "표시할 floating content입니다. / Floating content to display." },
  current: { type: "boolean", defaultValue: "-", description: "현재 위치 또는 현재 item 상태입니다. / Current location or current item state." },
  defaultChecked: { type: "boolean", defaultValue: "-", description: "uncontrolled 초기 선택 상태입니다. / Initial uncontrolled checked state." },
  defaultOpen: { type: "boolean", defaultValue: "false", description: "uncontrolled 초기 open 상태입니다. / Initial uncontrolled open state." },
  defaultPage: { type: "number", defaultValue: "-", description: "uncontrolled 초기 page 값입니다. / Initial uncontrolled page value." },
  defaultSelectedKeys: { type: "string[]", defaultValue: "[]", description: "uncontrolled 초기 selected key 목록입니다. / Initial uncontrolled selected keys." },
  defaultValue: { type: "string", defaultValue: "-", description: "uncontrolled 초기 값입니다. / Initial uncontrolled value." },
  description: { type: "ReactNode", defaultValue: "-", description: "보조 설명 text입니다. / Helper description text." },
  disabled: { type: "boolean", defaultValue: "false", description: "사용자 interaction을 비활성화합니다. / Disables user interaction." },
  dismissible: { type: "boolean", defaultValue: "false", description: "사용자가 닫을 수 있는 상태입니다. / Allows the user to dismiss the component." },
  emptyMessage: { type: "ReactNode", defaultValue: "-", description: "결과 또는 data가 없을 때 표시합니다. / Shown when there are no results or data." },
  error: { type: "ReactNode", defaultValue: "-", description: "오류 메시지이며 invalid 상태를 만듭니다. / Error message that creates the invalid state." },
  fieldProps: { type: "FieldProps", defaultValue: "-", description: "Field wrapper에 전달할 추가 설정입니다. / Additional settings passed to the Field wrapper." },
  fullWidth: { type: "boolean", defaultValue: "false", description: "부모 폭을 채우도록 확장합니다. / Expands to fill the parent width." },
  gap: { type: "spacing", defaultValue: "-", description: "자식 요소 사이 간격입니다. / Gap between child elements." },
  height: { type: "CSSProperties[\"height\"]", defaultValue: "-", description: "렌더링 height 값입니다. / Rendered height value." },
  href: { type: "string", defaultValue: "-", description: "link destination입니다. / Link destination." },
  icon: { type: "ReactNode", defaultValue: "-", description: "시각적으로 함께 표시할 icon입니다. / Icon displayed with the content." },
  iconEnd: { type: "ReactNode", defaultValue: "-", description: "content 뒤에 표시할 icon입니다. / Icon displayed after the content." },
  iconStart: { type: "ReactNode", defaultValue: "-", description: "content 앞에 표시할 icon입니다. / Icon displayed before the content." },
  indeterminate: { type: "boolean", defaultValue: "false", description: "부분 선택 상태를 표시합니다. / Shows a partially selected state." },
  invalid: { type: "boolean", defaultValue: "false", description: "validation 실패 상태를 표시합니다. / Shows validation failure state." },
  items: { type: "item[]", defaultValue: "[]", description: "렌더링할 item 목록입니다. / Items to render." },
  justify: { type: "alignment", defaultValue: "-", description: "자식 요소의 주축 정렬입니다. / Main-axis alignment for children." },
  keepMounted: { type: "boolean", defaultValue: "false", description: "비활성 content를 DOM에 유지할지 결정합니다. / Determines whether inactive content remains mounted." },
  label: { type: "ReactNode", defaultValue: "-", description: "사용자에게 보이는 label 또는 accessible name입니다. / Visible label or accessible name." },
  loading: { type: "boolean", defaultValue: "false", description: "loading 상태를 표시합니다. / Shows loading state." },
  max: { type: "number", defaultValue: "100", description: "허용되는 최대 값입니다. / Maximum allowed value." },
  min: { type: "number", defaultValue: "0", description: "허용되는 최소 값입니다. / Minimum allowed value." },
  modal: { type: "boolean", defaultValue: "true", description: "modal interaction으로 열지 결정합니다. / Determines whether the overlay opens modally." },
  multiple: { type: "boolean", defaultValue: "false", description: "여러 값을 선택할 수 있게 합니다. / Allows multiple values to be selected." },
  name: { type: "string", defaultValue: "-", description: "form 제출 또는 group 식별에 쓰는 name입니다. / Name used for form submission or group identity." },
  onChange: { type: "function", defaultValue: "-", description: "native change event가 발생할 때 호출됩니다. / Called when a native change event fires." },
  onClick: { type: "function", defaultValue: "-", description: "click interaction이 발생할 때 호출됩니다. / Called when click interaction fires." },
  onClose: { type: "function", defaultValue: "-", description: "닫기 동작이 완료될 때 호출됩니다. / Called when close action completes." },
  onOpenChange: { type: "(open: boolean) => void", defaultValue: "-", description: "open 상태가 바뀔 때 호출됩니다. / Called when open state changes." },
  onPageChange: { type: "(page: number) => void", defaultValue: "-", description: "page 값이 바뀔 때 호출됩니다. / Called when page changes." },
  onSelect: { type: "function", defaultValue: "-", description: "item이 선택될 때 호출됩니다. / Called when an item is selected." },
  onSelectionChange: { type: "function", defaultValue: "-", description: "선택 목록이 바뀔 때 호출됩니다. / Called when selection changes." },
  onValueChange: { type: "function", defaultValue: "-", description: "value가 바뀔 때 호출됩니다. / Called when value changes." },
  open: { type: "boolean", defaultValue: "-", description: "controlled open 상태입니다. / Controlled open state." },
  orientation: { type: "\"horizontal\" | \"vertical\"", defaultValue: "-", description: "컴포넌트 방향입니다. / Component orientation." },
  page: { type: "number", defaultValue: "-", description: "현재 page 값입니다. / Current page value." },
  placeholder: { type: "string", defaultValue: "-", description: "입력 전 표시할 placeholder입니다. / Placeholder shown before input." },
  placement: { type: "string", defaultValue: "\"bottom-start\"", description: "floating surface 위치입니다. / Floating surface placement." },
  prefix: { type: "ReactNode", defaultValue: "-", description: "control 앞쪽 accessory입니다. / Accessory before the control." },
  readOnly: { type: "boolean", defaultValue: "false", description: "값을 읽기 전용으로 만듭니다. / Makes the value read-only." },
  removable: { type: "boolean", defaultValue: "false", description: "사용자가 제거할 수 있는 상태입니다. / Allows the user to remove the item." },
  required: { type: "boolean", defaultValue: "false", description: "필수 입력 상태를 표시합니다. / Marks the field as required." },
  rows: { type: "row[] | number", defaultValue: "-", description: "row data 또는 textarea row 수입니다. / Row data or textarea row count." },
  selected: { type: "boolean", defaultValue: "false", description: "선택된 시각 상태입니다. / Selected visual state." },
  selectedKeys: { type: "string[]", defaultValue: "-", description: "controlled selected key 목록입니다. / Controlled selected keys." },
  selectionMode: { type: "\"none\" | \"single\" | \"multiple\"", defaultValue: "-", description: "선택 interaction 방식입니다. / Selection interaction mode." },
  shape: { type: "string", defaultValue: "-", description: "컴포넌트 외형 형태입니다. / Visual shape of the component." },
  size: { type: "Size", defaultValue: "\"md\"", description: "control 크기와 밀도입니다. / Control size and density." },
  src: { type: "string", defaultValue: "-", description: "외부 resource source입니다. / External resource source." },
  status: { type: "string", defaultValue: "-", description: "현재 상태 값입니다. / Current status value." },
  step: { type: "number", defaultValue: "-", description: "값 변경 간격입니다. / Step interval for value changes." },
  suffix: { type: "ReactNode", defaultValue: "-", description: "control 뒤쪽 accessory입니다. / Accessory after the control." },
  title: { type: "ReactNode", defaultValue: "-", description: "표면 또는 content의 제목입니다. / Title of the surface or content." },
  tone: { type: "tone", defaultValue: "-", description: "semantic color tone입니다. / Semantic color tone." },
  totalPages: { type: "number", defaultValue: "-", description: "전체 page 수입니다. / Total number of pages." },
  trigger: { type: "ReactNode", defaultValue: "-", description: "floating surface를 여는 trigger입니다. / Trigger that opens the floating surface." },
  triggerLabel: { type: "ReactNode", defaultValue: "-", description: "trigger button label입니다. / Trigger button label." },
  type: { type: "string", defaultValue: "-", description: "native element type입니다. / Native element type." },
  value: { type: "string | number", defaultValue: "-", description: "controlled 값입니다. / Controlled value." },
  variant: { type: "variant", defaultValue: "-", description: "시각 variant입니다. / Visual variant." },
  width: { type: "FieldWidth | CSSProperties[\"width\"]", defaultValue: "-", description: "렌더링 width 값입니다. / Rendered width value." }
};

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
  return componentPropDocs[component.name] ?? component.props.map((prop) => {
    const sharedDoc = sharedPropDocs[prop] ?? {
      type: "component-specific",
      defaultValue: "-",
      description: "컴포넌트별 확장 prop입니다. / Component-specific extension prop."
    };
    return { name: prop, ...sharedDoc };
  });
}

export function renderComponentPropTable(component: ComponentPropDocSource) {
  const rows = getComponentPropDocs(component);
  return [
    "| Prop | Type | Default | 설명 / Description |",
    "| --- | --- | --- | --- |",
    ...rows.map((row) => `| \`${row.name}\` | \`${escapeTableCell(row.type)}\` | \`${escapeTableCell(row.defaultValue)}\` | ${escapeTableCell(row.description)} |`)
  ].join("\n");
}
