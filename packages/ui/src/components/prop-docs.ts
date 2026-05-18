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
  accept: { type: "string", defaultValue: "-", description: "허용할 파일 MIME type 또는 확장자입니다." },
  actions: { type: "ReactNode | action[]", defaultValue: "-", description: "사용자가 실행할 수 있는 보조 action입니다." },
  actionsPlacement: { type: "\"inline\" | \"bottom\"", defaultValue: "\"inline\"", description: "action을 배치할 위치입니다." },
  align: { type: "alignment", defaultValue: "-", description: "자식 요소의 교차축 정렬입니다." },
  checked: { type: "boolean", defaultValue: "-", description: "controlled 선택 상태입니다." },
  children: { type: "ReactNode", defaultValue: "-", description: "컴포넌트 내부 content입니다." },
  className: { type: "string", defaultValue: "-", description: "추가 CSS class 이름입니다." },
  closeLabel: { type: "string", defaultValue: "\"닫기\"", description: "닫기 control의 accessible label입니다." },
  closeOnBackdropClick: { type: "boolean", defaultValue: "true", description: "backdrop click으로 닫을지 결정합니다." },
  columns: { type: "column[]", defaultValue: "[]", description: "table 또는 grid column 구조입니다." },
  commands: { type: "CommandPaletteCommand[]", defaultValue: "[]", description: "검색하고 실행할 command 목록입니다." },
  content: { type: "ReactNode", defaultValue: "-", description: "표시할 floating content입니다." },
  current: { type: "boolean", defaultValue: "-", description: "현재 위치 또는 현재 item 상태입니다." },
  defaultChecked: { type: "boolean", defaultValue: "-", description: "uncontrolled 초기 선택 상태입니다." },
  defaultOpen: { type: "boolean", defaultValue: "false", description: "uncontrolled 초기 open 상태입니다." },
  defaultPage: { type: "number", defaultValue: "-", description: "uncontrolled 초기 page 값입니다." },
  defaultSelectedKeys: { type: "string[]", defaultValue: "[]", description: "uncontrolled 초기 selected key 목록입니다." },
  defaultValue: { type: "string", defaultValue: "-", description: "uncontrolled 초기 값입니다." },
  description: { type: "ReactNode", defaultValue: "-", description: "보조 설명 text입니다." },
  disabled: { type: "boolean", defaultValue: "false", description: "사용자 interaction을 비활성화합니다." },
  dismissible: { type: "boolean", defaultValue: "false", description: "사용자가 닫을 수 있는 상태입니다." },
  emptyMessage: { type: "ReactNode", defaultValue: "-", description: "결과 또는 data가 없을 때 표시합니다." },
  error: { type: "ReactNode", defaultValue: "-", description: "오류 메시지이며 invalid 상태를 만듭니다." },
  fieldProps: { type: "FieldProps", defaultValue: "-", description: "Field wrapper에 전달할 추가 설정입니다." },
  fullWidth: { type: "boolean", defaultValue: "false", description: "부모 폭을 채우도록 확장합니다." },
  gap: { type: "spacing", defaultValue: "-", description: "자식 요소 사이 간격입니다." },
  height: { type: "CSSProperties[\"height\"]", defaultValue: "-", description: "렌더링 height 값입니다." },
  href: { type: "string", defaultValue: "-", description: "link destination입니다." },
  icon: { type: "ReactNode", defaultValue: "-", description: "시각적으로 함께 표시할 icon입니다." },
  iconEnd: { type: "ReactNode", defaultValue: "-", description: "content 뒤에 표시할 icon입니다." },
  iconStart: { type: "ReactNode", defaultValue: "-", description: "content 앞에 표시할 icon입니다." },
  indeterminate: { type: "boolean", defaultValue: "false", description: "부분 선택 상태를 표시합니다." },
  invalid: { type: "boolean", defaultValue: "false", description: "validation 실패 상태를 표시합니다." },
  items: { type: "item[]", defaultValue: "[]", description: "렌더링할 item 목록입니다." },
  justify: { type: "alignment", defaultValue: "-", description: "자식 요소의 주축 정렬입니다." },
  keepMounted: { type: "boolean", defaultValue: "false", description: "비활성 content를 DOM에 유지할지 결정합니다." },
  label: { type: "ReactNode", defaultValue: "-", description: "사용자에게 보이는 label 또는 accessible name입니다." },
  loading: { type: "boolean", defaultValue: "false", description: "loading 상태를 표시합니다." },
  max: { type: "number", defaultValue: "100", description: "허용되는 최대 값입니다." },
  min: { type: "number", defaultValue: "0", description: "허용되는 최소 값입니다." },
  modal: { type: "boolean", defaultValue: "true", description: "modal interaction으로 열지 결정합니다." },
  multiple: { type: "boolean", defaultValue: "false", description: "여러 값을 선택할 수 있게 합니다." },
  name: { type: "string", defaultValue: "-", description: "form 제출 또는 group 식별에 쓰는 name입니다." },
  onChange: { type: "function", defaultValue: "-", description: "native change event가 발생할 때 호출됩니다." },
  onClick: { type: "function", defaultValue: "-", description: "click interaction이 발생할 때 호출됩니다." },
  onClose: { type: "function", defaultValue: "-", description: "닫기 동작이 완료될 때 호출됩니다." },
  onOpenChange: { type: "(open: boolean) => void", defaultValue: "-", description: "open 상태가 바뀔 때 호출됩니다." },
  onPageChange: { type: "(page: number) => void", defaultValue: "-", description: "page 값이 바뀔 때 호출됩니다." },
  onSelect: { type: "function", defaultValue: "-", description: "item이 선택될 때 호출됩니다." },
  onSelectionChange: { type: "function", defaultValue: "-", description: "선택 목록이 바뀔 때 호출됩니다." },
  onValueChange: { type: "function", defaultValue: "-", description: "value가 바뀔 때 호출됩니다." },
  open: { type: "boolean", defaultValue: "-", description: "controlled open 상태입니다." },
  orientation: { type: "\"horizontal\" | \"vertical\"", defaultValue: "-", description: "컴포넌트 방향입니다." },
  page: { type: "number", defaultValue: "-", description: "현재 page 값입니다." },
  placeholder: { type: "string", defaultValue: "-", description: "입력 전 표시할 placeholder입니다." },
  placement: { type: "string", defaultValue: "\"bottom-start\"", description: "floating surface 위치입니다." },
  prefix: { type: "ReactNode", defaultValue: "-", description: "control 앞쪽 accessory입니다." },
  readOnly: { type: "boolean", defaultValue: "false", description: "값을 읽기 전용으로 만듭니다." },
  removable: { type: "boolean", defaultValue: "false", description: "사용자가 제거할 수 있는 상태입니다." },
  required: { type: "boolean", defaultValue: "false", description: "필수 입력 상태를 표시합니다." },
  rows: { type: "row[] | number", defaultValue: "-", description: "row data 또는 textarea row 수입니다." },
  selected: { type: "boolean", defaultValue: "false", description: "선택된 시각 상태입니다." },
  selectedKeys: { type: "string[]", defaultValue: "-", description: "controlled selected key 목록입니다." },
  selectionMode: { type: "\"none\" | \"single\" | \"multiple\"", defaultValue: "-", description: "선택 interaction 방식입니다." },
  shape: { type: "string", defaultValue: "-", description: "컴포넌트 외형 형태입니다." },
  size: { type: "Size", defaultValue: "\"md\"", description: "control 크기와 밀도입니다." },
  sm: { type: "number", defaultValue: "-", description: "small breakpoint 이상에서 적용할 12-column span입니다." },
  src: { type: "string", defaultValue: "-", description: "외부 resource source입니다." },
  span: { type: "number", defaultValue: "12", description: "기본 12-column span입니다." },
  status: { type: "string", defaultValue: "-", description: "현재 상태 값입니다." },
  step: { type: "number", defaultValue: "-", description: "값 변경 간격입니다." },
  suffix: { type: "ReactNode", defaultValue: "-", description: "control 뒤쪽 accessory입니다." },
  title: { type: "ReactNode", defaultValue: "-", description: "표면 또는 content의 제목입니다." },
  tone: { type: "tone", defaultValue: "-", description: "semantic color tone입니다." },
  totalPages: { type: "number", defaultValue: "-", description: "전체 page 수입니다." },
  trigger: { type: "ReactNode", defaultValue: "-", description: "floating surface를 여는 trigger입니다." },
  triggerLabel: { type: "ReactNode", defaultValue: "-", description: "trigger button label입니다." },
  type: { type: "string", defaultValue: "-", description: "native element type입니다." },
  value: { type: "string | number", defaultValue: "-", description: "controlled 값입니다." },
  variant: { type: "variant", defaultValue: "-", description: "시각 variant입니다." },
  width: { type: "FieldWidth | CSSProperties[\"width\"]", defaultValue: "-", description: "렌더링 width 값입니다." }
};

export const componentPropDocs: Record<string, ComponentPropDoc[]> = {
  Container: [
    { name: "size", type: "\"sm\" | \"md\" | \"lg\" | \"xl\" | \"2xl\"", defaultValue: "\"lg\"", description: "적용할 container 최대 폭입니다." }
  ],
  Row: [
    { name: "gap", type: "\"sm\" | \"md\" | \"lg\"", defaultValue: "\"md\"", description: "자식 요소 사이 간격입니다." },
    { name: "align", type: "\"start\" | \"center\" | \"end\" | \"stretch\"", defaultValue: "\"stretch\"", description: "교차축 정렬입니다." },
    { name: "justify", type: "\"start\" | \"center\" | \"end\" | \"between\"", defaultValue: "\"start\"", description: "주축 정렬입니다." }
  ],
  Col: [
    { name: "span", type: "number", defaultValue: "12", description: "기본 12-column span입니다." },
    { name: "sm", type: "number", defaultValue: "-", description: "small breakpoint 이상에서 적용할 span입니다." },
    { name: "md", type: "number", defaultValue: "-", description: "medium breakpoint 이상에서 적용할 span입니다." },
    { name: "lg", type: "number", defaultValue: "-", description: "large breakpoint 이상에서 적용할 span입니다." }
  ],
  Stack: [
    { name: "gap", type: "\"sm\" | \"md\" | \"lg\"", defaultValue: "\"md\"", description: "자식 요소 사이 간격입니다." },
    { name: "align", type: "\"start\" | \"center\" | \"end\" | \"stretch\"", defaultValue: "\"stretch\"", description: "교차축 정렬입니다." }
  ],
  Inline: [
    { name: "gap", type: "\"sm\" | \"md\" | \"lg\"", defaultValue: "\"md\"", description: "자식 요소 사이 간격입니다." },
    { name: "align", type: "\"start\" | \"center\" | \"end\" | \"stretch\"", defaultValue: "\"center\"", description: "교차축 정렬입니다." },
    { name: "justify", type: "\"start\" | \"center\" | \"end\" | \"between\"", defaultValue: "\"start\"", description: "주축 정렬입니다." }
  ],
  Combobox: [
    { name: "label", type: "ReactNode", defaultValue: "-", description: "필드 label입니다." },
    { name: "description", type: "ReactNode", defaultValue: "-", description: "보조 설명입니다." },
    { name: "error", type: "ReactNode", defaultValue: "-", description: "오류 메시지이며 invalid 상태를 만듭니다." },
    { name: "value", type: "string", defaultValue: "-", description: "controlled 선택 값입니다." },
    { name: "defaultValue", type: "string", defaultValue: "\"\"", description: "uncontrolled 초기 선택 값입니다." },
    { name: "options", type: "ComboboxOption[]", defaultValue: "[]", description: "검색하고 선택할 option 목록입니다." },
    { name: "placeholder", type: "string", defaultValue: "\"검색 또는 선택\"", description: "입력 placeholder입니다." },
    { name: "emptyMessage", type: "ReactNode", defaultValue: "\"결과가 없습니다.\"", description: "필터 결과가 없을 때 표시합니다." },
    { name: "size", type: "Size", defaultValue: "\"md\"", description: "control 높이와 밀도입니다." },
    { name: "width", type: "FieldWidth", defaultValue: "\"auto\"", description: "Field wrapper 폭입니다." },
    { name: "disabled", type: "boolean", defaultValue: "false", description: "입력과 toggle을 비활성화합니다." },
    { name: "required", type: "boolean", defaultValue: "false", description: "필수 입력 상태를 표시합니다." },
    { name: "fieldProps", type: "Omit<FieldProps, ...>", defaultValue: "-", description: "Field wrapper에 전달할 추가 설정입니다." },
    { name: "onValueChange", type: "(value: string) => void", defaultValue: "-", description: "선택 값이 바뀔 때 호출됩니다." }
  ],
  CommandPalette: [
    { name: "title", type: "ReactNode", defaultValue: "\"명령 팔레트\"", description: "dialog 제목입니다." },
    { name: "triggerLabel", type: "ReactNode", defaultValue: "\"명령 열기\"", description: "palette를 여는 trigger button label입니다." },
    { name: "commands", type: "CommandPaletteCommand[]", defaultValue: "[]", description: "검색하고 실행할 command 목록입니다." },
    { name: "open", type: "boolean", defaultValue: "-", description: "controlled open 상태입니다." },
    { name: "defaultOpen", type: "boolean", defaultValue: "false", description: "uncontrolled 초기 open 상태입니다." },
    { name: "placeholder", type: "string", defaultValue: "\"명령 검색\"", description: "검색 input placeholder입니다." },
    { name: "emptyMessage", type: "ReactNode", defaultValue: "\"명령이 없습니다.\"", description: "검색 결과가 없을 때 표시합니다." },
    { name: "onOpenChange", type: "(open: boolean) => void", defaultValue: "-", description: "open 상태가 바뀔 때 호출됩니다." },
    { name: "onCommandSelect", type: "(command: CommandPaletteCommand) => void", defaultValue: "-", description: "command가 선택될 때 호출됩니다." }
  ],
  Spinner: [
    { name: "size", type: "Size", defaultValue: "\"md\"", description: "스피너 크기입니다." },
    { name: "tone", type: "Tone", defaultValue: "\"neutral\"", description: "상태 색상 tone입니다." },
    { name: "label", type: "string", defaultValue: "\"불러오는 중\"", description: "상태 전달용 접근성 문구입니다." },
    { name: "status", type: "\"status\" | \"decorative\"", defaultValue: "\"status\"", description: "보조기술에 상태를 전달할지 장식으로 숨길지 결정합니다." }
  ],
  InlineLoading: [
    { name: "label", type: "ReactNode", defaultValue: "\"불러오는 중\"", description: "사용자에게 표시하고 전달할 상태 문구입니다." },
    { name: "description", type: "ReactNode", defaultValue: "-", description: "상태를 보강하는 짧은 설명입니다." },
    { name: "size", type: "Size", defaultValue: "\"md\"", description: "표시 밀도와 아이콘 크기입니다." },
    { name: "tone", type: "Tone", defaultValue: "\"neutral\"", description: "loading 상태의 색상 tone입니다." },
    { name: "status", type: "\"loading\" | \"success\" | \"error\"", defaultValue: "\"loading\"", description: "현재 인라인 상태입니다." }
  ],
  DataGrid: [
    { name: "caption", type: "ReactNode", defaultValue: "-", description: "table caption입니다." },
    { name: "columns", type: "Array<DataGridColumn<Row>>", defaultValue: "[]", description: "column 구조와 render 설정입니다." },
    { name: "rows", type: "Row[]", defaultValue: "[]", description: "렌더링할 row 데이터입니다." },
    { name: "density", type: "\"compact\" | \"md\"", defaultValue: "\"md\"", description: "row와 cell 밀도입니다." },
    { name: "sortable", type: "boolean", defaultValue: "true", description: "전체 column sort control 기본값입니다." },
    { name: "selectionMode", type: "\"none\" | \"multiple\"", defaultValue: "\"none\"", description: "row selection 모드입니다." },
    { name: "striped", type: "boolean", defaultValue: "true", description: "교차 row 배경을 표시합니다." },
    { name: "stickyHeader", type: "boolean", defaultValue: "false", description: "header를 sticky로 유지합니다." },
    { name: "loading", type: "boolean", defaultValue: "false", description: "loading 상태와 `aria-busy`를 표시합니다." },
    { name: "emptyMessage", type: "ReactNode", defaultValue: "\"데이터가 없습니다.\"", description: "row가 없을 때 표시합니다." },
    { name: "rowKey", type: "(row: Row, rowIndex: number) => string", defaultValue: "rowIndex", description: "row identity를 계산합니다." },
    { name: "rowActions", type: "(row: Row, rowIndex: number) => ReactNode", defaultValue: "-", description: "row action cell을 렌더링합니다." },
    { name: "sortState", type: "TableSortState<Row>", defaultValue: "-", description: "controlled sort 상태입니다." },
    { name: "defaultSortState", type: "TableSortState<Row>", defaultValue: "-", description: "uncontrolled 초기 sort 상태입니다." },
    { name: "selectedRowKeys", type: "string[]", defaultValue: "-", description: "controlled selected row key 목록입니다." },
    { name: "defaultSelectedRowKeys", type: "string[]", defaultValue: "[]", description: "uncontrolled 초기 selected row key 목록입니다." },
    { name: "activeRowKey", type: "string", defaultValue: "-", description: "controlled active row key입니다." },
    { name: "defaultActiveRowKey", type: "string", defaultValue: "첫 row key", description: "uncontrolled 초기 active row key입니다." },
    { name: "keyboardNavigation", type: "\"row\" | \"none\"", defaultValue: "\"row\"", description: "roving row 키보드 이동 사용 여부입니다." },
    { name: "resizableColumns", type: "boolean", defaultValue: "true", description: "column resize handle을 활성화합니다." },
    { name: "onSort", type: "(key: keyof Row & string) => void", defaultValue: "-", description: "legacy sort callback입니다." },
    { name: "onSortChange", type: "(sortState: TableSortState<Row> | undefined) => void", defaultValue: "-", description: "sort 상태가 바뀔 때 호출됩니다." },
    { name: "onSelectedRowKeysChange", type: "(keys: string[]) => void", defaultValue: "-", description: "selected key 목록이 바뀔 때 호출됩니다." },
    { name: "onSelectionChange", type: "(rows: Row[]) => void", defaultValue: "-", description: "선택된 row 목록이 바뀔 때 호출됩니다." },
    { name: "onActiveRowKeyChange", type: "(key: string | undefined, row: Row | undefined) => void", defaultValue: "-", description: "active row가 바뀔 때 호출됩니다." },
    { name: "onColumnResize", type: "(key: keyof Row & string, width: number) => void", defaultValue: "-", description: "column width가 바뀔 때 호출됩니다." }
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
      description: "컴포넌트별 확장 prop입니다."
    };
    return { name: prop, ...sharedDoc };
  });
}

export function renderComponentPropTable(component: ComponentPropDocSource) {
  const rows = getComponentPropDocs(component);
  return [
    "| Prop | Type | Default | 설명 |",
    "| --- | --- | --- | --- |",
    ...rows.map((row) => `| \`${row.name}\` | \`${escapeTableCell(row.type)}\` | \`${escapeTableCell(row.defaultValue)}\` | ${escapeTableCell(row.description)} |`)
  ].join("\n");
}
