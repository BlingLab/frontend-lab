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
} from "@bling-lab/ui";
import { Button as ButtonEntry, type ButtonProps as ButtonEntryProps } from "@bling-lab/ui/components/actions/button";
import { DataGrid as DataGridEntry, type DataGridProps as DataGridEntryProps } from "@bling-lab/ui/components/data-display/data-grid";

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
  { key: "task", label: "작업", sortable: true, resizable: true, minWidth: 120 },
  { key: "state", label: "상태", align: "center", renderCell: (row) => row.state },
  { key: "count", label: "개수", align: "end", renderCell: (row) => row.count }
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
  children: "삭제"
};

const buttonElement = <Button {...buttonProps} />;
const buttonEntryProps: ButtonEntryProps = { tone: "neutral", variant: "ghost", children: "취소" };
const buttonEntryElement = <ButtonEntry {...buttonEntryProps} />;

const fieldProps: FieldProps = {
  label: "이름",
  controlId: "name",
  description: "설명",
  error: null,
  required: true,
  orientation: "horizontal",
  width: "full",
  hideLabel: false,
  children: <input id="name" />
};

const fieldElement = <Field {...fieldProps} />;

const comboboxOptions: ComboboxOption[] = [
  { label: "디자인", value: "design", keywords: ["product"] },
  { label: "개발", value: "engineering", disabled: true }
];

const comboboxElement = (
  <Combobox
    label="팀"
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
  triggerLabel: "열기",
  title: "확인",
  description: "변경합니다.",
  defaultOpen: false,
  modal: true,
  closeOnBackdropClick: false,
  initialFocus: dialogInitialFocus,
  actions: [{ label: "저장", tone: "brand" }],
  children: <button ref={dialogInitialFocus}>첫 항목</button>
};

const dialogElement = <Dialog {...dialogProps} />;

const dataGridProps: DataGridProps<TaskRow> = {
  caption: "작업",
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
  <Alert title="상태" />,
  <Badge label="준비" />,
  <Breadcrumb items={[{ label: "홈", href: "#" }, { label: "현재", current: true }]} />,
  <Card title="카드" />,
  <Checkbox label="선택" />,
  <Combobox label="팀" options={comboboxOptions} />,
  <CommandPalette commands={[{ label: "열기", value: "open" }]} />,
  <Container size="md">컨테이너</Container>,
  <DatePicker label="날짜" />,
  <Dialog title="확인" />,
  <Divider />,
  <DropdownMenu items={[{ label: "편집" }]} />,
  <EmptyState title="없음" />,
  <Field label="필드"><input /></Field>,
  <FileUploader label="첨부" />,
  <Icon name="check" label="완료" />,
  <IconButton label="추가" />,
  <Inline gap="sm">인라인</Inline>,
  <List items={[{ title: "항목" }]} />,
  <NavigationRail items={[{ label: "홈", value: "home" }]} />,
  <Pagination totalPages={3} />,
  <Popover title="필터" />,
  <Progress label="진행" value={50} />,
  <RadioGroup label="선택" options={[{ label: "A", value: "a" }]} />,
  <Row gap="sm"><Col span={12}>열</Col></Row>,
  <Select label="상태" options={[{ label: "준비", value: "ready" }]} />,
  <SideNav sections={[{ title: "문서", items: [{ label: "개요", value: "overview" }] }]} />,
  <Skeleton />,
  <Stack gap="sm">스택</Stack>,
  <Stepper steps={[{ label: "API", value: "api" }]} />,
  <Switch label="켜기" />,
  <Table columns={taskColumns} rows={taskRows} />,
  <Tabs items={[{ label: "탭", value: "tab", content: "패널" }]} />,
  <Textarea label="메모" />,
  <TextField label="이름" />,
  <Toast title="알림" />,
  <Tooltip label="도움말" />
];

// @ts-expect-error Button tone은 정해진 tone만 허용합니다.
const invalidButtonTone = <Button tone="critical">삭제</Button>;

// @ts-expect-error Field children은 필수입니다.
const invalidFieldMissingChildren = <Field label="이름" />;

// @ts-expect-error Combobox value는 string이어야 합니다.
const invalidComboboxValue = <Combobox value={1} options={comboboxOptions} />;

// @ts-expect-error Dialog size는 sm, md, lg만 허용합니다.
const invalidDialogSize = <Dialog size="xl" />;

// @ts-expect-error DataGrid column key는 row key에 포함되어야 합니다.
const invalidDataGridColumn: DataGridColumn<TaskRow> = { key: "missing", label: "누락" };

// @ts-expect-error DataGrid sort key는 row key에 포함되어야 합니다.
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
