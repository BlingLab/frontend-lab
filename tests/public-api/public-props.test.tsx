import { createRef, type ReactNode } from "react";
import {
  Alert,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Col,
  Combobox,
  CommandPalette,
  Container,
  DataGrid,
  DatePicker,
  Dialog,
  Divider,
  DropdownMenu,
  EmptyState,
  Field,
  FileUploader,
  Icon,
  IconButton,
  Inline,
  List,
  NavigationRail,
  Pagination,
  Popover,
  Progress,
  RadioGroup,
  Row,
  Select,
  SideNav,
  Skeleton,
  Stack,
  Stepper,
  Switch,
  Table,
  Tabs,
  Textarea,
  TextField,
  Toast,
  Tooltip,
  type ButtonProps,
  type ComboboxOption,
  type DataGridColumn,
  type DataGridProps,
  type DialogProps,
  type FieldProps
} from "@workspace/ui";
import { Button as ButtonEntry, type ButtonProps as ButtonEntryProps } from "@workspace/ui/components/actions/button";
import { DataGrid as DataGridEntry, type DataGridProps as DataGridEntryProps } from "@workspace/ui/components/data-display/data-grid";

type TaskRow = {
  id: string;
  task: string;
  state: "ready" | "blocked";
  count: number;
};

const taskRows: TaskRow[] = [
  { id: "api", task: "API", state: "ready", count: 2 }
];

const taskColumns: Array<DataGridColumn<TaskRow>> = [
  { key: "task", label: "작업 / Task", sortable: true, resizable: true, minWidth: 120 },
  { key: "state", label: "상태 / State", align: "center", renderCell: (row) => row.state },
  { key: "count", label: "개수 / Count", align: "end", renderCell: (row) => row.count }
];

const buttonProps: ButtonProps = {
  variant: "outline",
  tone: "danger",
  size: "lg",
  fullWidth: true,
  selected: true,
  justify: "between",
  iconStart: "!",
  onClick: (event) => {
    event.currentTarget.focus();
  },
  children: "삭제 / Delete"
};

const buttonElement = <Button {...buttonProps} />;
const buttonEntryProps: ButtonEntryProps = { tone: "neutral", variant: "ghost", children: "취소 / Cancel" };
const buttonEntryElement = <ButtonEntry {...buttonEntryProps} />;

const fieldProps: FieldProps = {
  label: "이름 / Name",
  controlId: "name",
  description: "설명 / Description",
  error: null,
  required: true,
  orientation: "horizontal",
  width: "full",
  hideLabel: false,
  children: <input id="name" />
};

const fieldElement = <Field {...fieldProps} />;

const comboboxOptions: ComboboxOption[] = [
  { label: "디자인 / Design", value: "design", keywords: ["product"] },
  { label: "개발 / Engineering", value: "engineering", disabled: true }
];

const comboboxElement = (
  <Combobox
    label="팀 / Team"
    value="design"
    options={comboboxOptions}
    width="full"
    onValueChange={(value) => {
      value.toUpperCase();
    }}
  />
);

const dialogInitialFocus = createRef<HTMLButtonElement>();
const dialogProps: DialogProps = {
  triggerLabel: "열기 / Open",
  title: "확인 / Confirm",
  description: "변경합니다. / Applies changes.",
  defaultOpen: false,
  modal: true,
  closeOnBackdropClick: false,
  initialFocus: dialogInitialFocus,
  actions: [{ label: "저장 / Save", tone: "brand" }],
  children: <button ref={dialogInitialFocus}>첫 항목 / First item</button>
};

const dialogElement = <Dialog {...dialogProps} />;

const dataGridProps: DataGridProps<TaskRow> = {
  caption: "작업 / Tasks",
  columns: taskColumns,
  rows: taskRows,
  rowKey: (row) => row.id,
  sortState: { key: "task", direction: "ascending" },
  selectedRowKeys: ["api"],
  activeRowKey: "api",
  keyboardNavigation: "row",
  resizableColumns: true,
  rowActions: (row): ReactNode => <button>{row.task}</button>,
  onSortChange: (sortState) => {
    sortState?.key.toUpperCase();
  },
  onSelectedRowKeysChange: (keys) => {
    keys.join(",");
  },
  onActiveRowKeyChange: (key, row) => {
    key?.toUpperCase();
    row?.task.toUpperCase();
  },
  onColumnResize: (key, width) => {
    key.toUpperCase();
    width.toFixed();
  }
};

const dataGridElement = <DataGrid {...dataGridProps} />;
const dataGridEntryProps: DataGridEntryProps<TaskRow> = dataGridProps;
const dataGridEntryElement = <DataGridEntry {...dataGridEntryProps} />;

const rootExportElements = [
  <Alert title="상태 / Status" />,
  <Badge label="준비 / Ready" />,
  <Breadcrumb items={[{ label: "홈 / Home", href: "#" }, { label: "현재 / Current", current: true }]} />,
  <Card title="카드 / Card" />,
  <Checkbox label="선택 / Select" />,
  <Combobox label="팀 / Team" options={comboboxOptions} />,
  <CommandPalette commands={[{ label: "열기 / Open", value: "open" }]} />,
  <Container size="md">컨테이너 / Container</Container>,
  <DatePicker label="날짜 / Date" />,
  <Dialog title="확인 / Confirm" />,
  <Divider />,
  <DropdownMenu items={[{ label: "편집 / Edit" }]} />,
  <EmptyState title="없음 / Empty" />,
  <Field label="필드 / Field"><input /></Field>,
  <FileUploader label="첨부 / Attachment" />,
  <Icon name="check" label="완료 / Complete" />,
  <IconButton label="추가 / Add" />,
  <Inline gap="sm">인라인 / Inline</Inline>,
  <List items={[{ title: "항목 / Item" }]} />,
  <NavigationRail items={[{ label: "홈 / Home", value: "home" }]} />,
  <Pagination totalPages={3} />,
  <Popover title="필터 / Filter" />,
  <Progress label="진행 / Progress" value={50} />,
  <RadioGroup label="선택 / Choice" options={[{ label: "A", value: "a" }]} />,
  <Row gap="sm"><Col span={12}>열 / Column</Col></Row>,
  <Select label="상태 / Status" options={[{ label: "준비 / Ready", value: "ready" }]} />,
  <SideNav sections={[{ title: "문서 / Docs", items: [{ label: "개요 / Overview", value: "overview" }] }]} />,
  <Skeleton />,
  <Stack gap="sm">스택 / Stack</Stack>,
  <Stepper steps={[{ label: "API", value: "api" }]} />,
  <Switch label="켜기 / Enable" />,
  <Table columns={taskColumns} rows={taskRows} />,
  <Tabs items={[{ label: "탭 / Tab", value: "tab", content: "패널 / Panel" }]} />,
  <Textarea label="메모 / Note" />,
  <TextField label="이름 / Name" />,
  <Toast title="알림 / Notice" />,
  <Tooltip label="도움말 / Help" />
];

// @ts-expect-error Button tone은 정해진 tone만 허용합니다. / Button tone only allows defined tones.
const invalidButtonTone = <Button tone="critical">삭제 / Delete</Button>;

// @ts-expect-error Field children은 필수입니다. / Field children are required.
const invalidFieldMissingChildren = <Field label="이름 / Name" />;

// @ts-expect-error Combobox value는 string이어야 합니다. / Combobox value must be a string.
const invalidComboboxValue = <Combobox value={1} options={comboboxOptions} />;

// @ts-expect-error Dialog size는 sm, md, lg만 허용합니다. / Dialog size only allows sm, md, or lg.
const invalidDialogSize = <Dialog size="xl" />;

// @ts-expect-error DataGrid column key는 row key에 포함되어야 합니다. / DataGrid column key must be part of the row keys.
const invalidDataGridColumn: DataGridColumn<TaskRow> = { key: "missing", label: "누락 / Missing" };

// @ts-expect-error DataGrid sort key는 row key에 포함되어야 합니다. / DataGrid sort key must be part of the row keys.
const invalidDataGridSort = <DataGrid<TaskRow> columns={taskColumns} rows={taskRows} sortState={{ key: "missing", direction: "ascending" }} />;

void [
  buttonElement,
  buttonEntryElement,
  fieldElement,
  comboboxElement,
  dialogElement,
  dataGridElement,
  dataGridEntryElement,
  rootExportElements,
  invalidButtonTone,
  invalidFieldMissingChildren,
  invalidComboboxValue,
  invalidDialogSize,
  invalidDataGridColumn,
  invalidDataGridSort
];
