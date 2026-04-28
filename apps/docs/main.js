import {
  Alert,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Col,
  Container,
  Dialog,
  Divider,
  DropdownMenu,
  EmptyState,
  Field,
  IconButton,
  Inline,
  List,
  Pagination,
  Popover,
  Progress,
  RadioGroup,
  Row,
  Select,
  Skeleton,
  Stack,
  Switch,
  Table,
  Tabs,
  Textarea,
  TextField,
  Toast,
  Tooltip,
  componentCatalog
} from "/ui/index.js";

const navItems = [
  { id: "overview", label: "구성 원칙 / Principles" },
  { id: "tokens", label: "디자인 토큰 / Tokens" },
  { id: "rules", label: "개발 규약 / Rules" },
  { id: "roadmap", label: "로드맵 / Roadmap" },
  { id: "components", label: "컴포넌트 / Components" },
  { id: "example", label: "조합 예시 / Example" }
];

const roadmapGroups = [
  {
    category: "액션 / Actions",
    priority: "P0",
    components: ["Button", "IconButton"],
    note: "명령 실행과 툴바 액션의 기준 / Baseline for commands and toolbar actions"
  },
  {
    category: "폼 / Forms",
    priority: "P0",
    components: ["Field", "TextField", "Select", "Checkbox", "RadioGroup", "Switch"],
    note: "라벨, 검증, 선택 입력의 공통 계약 / Shared contract for labels, validation, and choice inputs"
  },
  {
    category: "피드백 / Feedback",
    priority: "P0/P1",
    components: ["Alert", "Badge", "Toast", "Progress", "Skeleton"],
    note: "상태, 결과, 로딩, 알림 표현 / Status, outcomes, loading, and notifications"
  },
  {
    category: "오버레이 / Overlays",
    priority: "P1",
    components: ["Dialog", "Popover", "Tooltip", "DropdownMenu"],
    note: "포커스 관리와 레이어 규칙이 필요한 컴포넌트 / Components that need focus management and layering rules"
  },
  {
    category: "내비게이션 / Navigation",
    priority: "P0/P1",
    components: ["Tabs", "Breadcrumb", "Pagination"],
    note: "위치 이동과 패널 전환 / Location movement and panel switching"
  },
  {
    category: "레이아웃 / 데이터 / Layout / Data",
    priority: "P0/P1",
    components: ["Card", "Divider", "Table", "EmptyState", "List"],
    note: "반복 콘텐츠, 구획, 데이터 표시 / Repeated content, sections, and data display"
  }
];

const componentSummaries = new Map(
  componentCatalog.map((component) => [
    component.name,
    {
      meta: `${component.priority} · ${component.category} · ${component.status}`,
      description: `${component.summary} / ${component.purpose}`
    }
  ])
);

const showcase = {
  Button: {
    preview: () => stackRow([
      Button({ label: "저장 / Save" }),
      Button({ label: "취소 / Cancel", variant: "outline", tone: "neutral" }),
      Button({ label: "삭제 / Delete", tone: "danger" })
    ]),
    code: `import { Button } from "@workspace/ui";

Button({ label: "저장 / Save" });
Button({ label: "취소 / Cancel", variant: "outline", tone: "neutral" });`
  },
  IconButton: {
    preview: () => stackRow([
      IconButton({ label: "추가 / Add", icon: "+" }),
      IconButton({ label: "검색 / Search", icon: "⌕", variant: "outline" }),
      IconButton({ label: "삭제 / Delete", icon: "×", tone: "danger", variant: "outline" })
    ]),
    code: `import { IconButton } from "@workspace/ui";

IconButton({ label: "검색 / Search", icon: "⌕", variant: "outline" });`
  },
  Field: {
    preview: () => Field({
      label: "프로젝트 / Project",
      description: "표시 이름을 입력합니다. / Enter the display name.",
      control: inputElement("frontend-lab")
    }),
    code: `import { Field } from "@workspace/ui";

Field({
  label: "프로젝트 / Project",
  description: "표시 이름을 입력합니다. / Enter the display name.",
  control: input
});`
  },
  TextField: {
    preview: () => TextField({
      label: "이름 / Name",
      description: "한 줄 입력입니다. / Single-line input.",
      defaultValue: "Design System"
    }),
    code: `import { TextField } from "@workspace/ui";

TextField({ label: "이름 / Name", defaultValue: "Design System" });`
  },
  Textarea: {
    preview: () => Textarea({
      label: "메모 / Note",
      defaultValue: "긴 설명을 입력합니다. / Write a longer description.",
      rows: 4
    }),
    code: `import { Textarea } from "@workspace/ui";

Textarea({ label: "메모 / Note", rows: 4 });`
  },
  Select: {
    preview: () => Select({
      label: "상태 / Status",
      defaultValue: "ready",
      options: [
        { label: "준비 / Ready", value: "ready" },
        { label: "초안 / Draft", value: "draft" },
        { label: "보류 / Paused", value: "paused" }
      ]
    }),
    code: `import { Select } from "@workspace/ui";

Select({
  label: "상태 / Status",
  options: [{ label: "준비 / Ready", value: "ready" }]
});`
  },
  Checkbox: {
    preview: () => Checkbox({
      label: "알림 받기 / Receive notifications",
      description: "중요 변경 사항을 알려줍니다. / Sends important updates.",
      defaultChecked: true
    }),
    code: `import { Checkbox } from "@workspace/ui";

Checkbox({ label: "알림 받기 / Receive notifications", defaultChecked: true });`
  },
  RadioGroup: {
    preview: () => RadioGroup({
      label: "밀도 / Density",
      defaultValue: "comfortable",
      orientation: "horizontal",
      options: [
        { label: "촘촘함 / Compact", value: "compact" },
        { label: "기본 / Comfortable", value: "comfortable" }
      ]
    }),
    code: `import { RadioGroup } from "@workspace/ui";

RadioGroup({
  label: "밀도 / Density",
  options: [{ label: "기본 / Comfortable", value: "comfortable" }]
});`
  },
  Switch: {
    preview: () => Switch({ label: "자동 저장 / Autosave", defaultChecked: true }),
    code: `import { Switch } from "@workspace/ui";

Switch({ label: "자동 저장 / Autosave", defaultChecked: true });`
  },
  Alert: {
    preview: () => Alert({
      tone: "success",
      title: "저장 완료 / Saved",
      description: "변경 사항이 반영되었습니다. / Your changes have been applied."
    }),
    code: `import { Alert } from "@workspace/ui";

Alert({ tone: "success", title: "저장 완료 / Saved" });`
  },
  Toast: {
    preview: () => Toast({
      tone: "info",
      title: "동기화됨 / Synced",
      description: "컴포넌트 카탈로그가 최신 상태입니다. / Component catalog is up to date."
    }),
    code: `import { Toast } from "@workspace/ui";

Toast({ title: "동기화됨 / Synced", dismissible: true });`
  },
  Badge: {
    preview: () => stackRow([
      Badge({ label: "준비 / Ready", tone: "brand" }),
      Badge({ label: "활성 / Active", tone: "success" }),
      Badge({ label: "경고 / Warning", tone: "warning" }),
      Badge({ label: "오류 / Error", tone: "danger" })
    ]),
    code: `import { Badge } from "@workspace/ui";

Badge({ label: "활성 / Active", tone: "success" });`
  },
  Progress: {
    preview: () => Progress({ label: "완료율 / Completion", value: 64 }),
    code: `import { Progress } from "@workspace/ui";

Progress({ label: "완료율 / Completion", value: 64 });`
  },
  Skeleton: {
    preview: () => stackColumn([
      Skeleton({ width: "14rem", height: "1.25rem" }),
      Skeleton({ width: "20rem", height: "0.85rem" }),
      Skeleton({ width: "16rem", height: "0.85rem" })
    ]),
    code: `import { Skeleton } from "@workspace/ui";

Skeleton({ width: "14rem", height: "1.25rem" });`
  },
  Dialog: {
    preview: () => Dialog({
      triggerLabel: "다이얼로그 열기 / Open dialog",
      title: "변경 확인 / Confirm changes",
      description: "이 작업은 현재 설정에 반영됩니다. / This action applies to current settings.",
      children: "계속 진행할까요? / Do you want to continue?",
      actions: [{ label: "확인 / Confirm" }]
    }),
    code: `import { Dialog } from "@workspace/ui";

Dialog({ title: "변경 확인 / Confirm changes", triggerLabel: "열기 / Open" });`
  },
  Popover: {
    preview: () => Popover({
      triggerLabel: "필터 / Filter",
      title: "필터 옵션 / Filter options",
      children: stackColumn([
        Checkbox({ label: "활성만 보기 / Active only" }),
        Checkbox({ label: "초안 포함 / Include drafts", defaultChecked: true })
      ])
    }),
    code: `import { Popover } from "@workspace/ui";

Popover({ triggerLabel: "필터 / Filter", children: "필터 옵션 / Filter options" });`
  },
  Tooltip: {
    preview: () => Tooltip({
      label: "도움말 / Help",
      content: "아이콘 버튼에는 accessible label이 필요합니다. / Icon buttons need accessible labels."
    }),
    code: `import { Tooltip } from "@workspace/ui";

Tooltip({ label: "도움말 / Help", content: "설명 / Help text" });`
  },
  DropdownMenu: {
    preview: () => DropdownMenu({
      triggerLabel: "작업 / Actions",
      items: [
        { label: "편집 / Edit" },
        { label: "복제 / Duplicate" },
        { label: "삭제 / Delete" }
      ]
    }),
    code: `import { DropdownMenu } from "@workspace/ui";

DropdownMenu({ triggerLabel: "작업 / Actions", items: [{ label: "편집 / Edit" }] });`
  },
  Tabs: {
    preview: () => Tabs({
      items: [
        { label: "미리보기 / Preview", value: "preview", content: "컴포넌트 화면입니다. / Component preview." },
        { label: "코드 / Code", value: "code", content: "사용 예시입니다. / Usage example." },
        { label: "상태 / States", value: "states", content: "상태별 동작입니다. / State behavior." }
      ]
    }),
    code: `import { Tabs } from "@workspace/ui";

Tabs({ items: [{ label: "미리보기 / Preview", content: "..." }] });`
  },
  Breadcrumb: {
    preview: () => Breadcrumb({
      items: [
        { label: "홈 / Home", href: "#" },
        { label: "컴포넌트 / Components", href: "#" },
        { label: "Button", current: true }
      ]
    }),
    code: `import { Breadcrumb } from "@workspace/ui";

Breadcrumb({ items: [{ label: "홈 / Home", href: "#" }, { label: "Button", current: true }] });`
  },
  Pagination: {
    preview: () => Pagination({ page: 2, totalPages: 5 }),
    code: `import { Pagination } from "@workspace/ui";

Pagination({ page: 2, totalPages: 5, onPageChange: console.log });`
  },
  Card: {
    preview: () => Card({
      title: "컴포넌트 가이드 / Component guide",
      description: "상태와 사용 기준을 함께 보여줍니다. / Shows states and usage rules together.",
      children: Badge({ label: "게시됨 / Published", tone: "success" }),
      actions: [{ label: "보기 / View", variant: "outline", tone: "neutral" }]
    }),
    code: `import { Card } from "@workspace/ui";

Card({ title: "컴포넌트 가이드 / Component guide", actions: [{ label: "보기 / View" }] });`
  },
  Divider: {
    preview: () => stackColumn([
      Badge({ label: "위 영역 / Above" }),
      Divider({ label: "구분 / Section" }),
      Badge({ label: "아래 영역 / Below", tone: "brand" })
    ]),
    code: `import { Divider } from "@workspace/ui";

Divider({ label: "구분 / Section" });`
  },
  Table: {
    preview: () => Table({
      caption: "컴포넌트 상태 / Component status",
      columns: [
        { key: "name", label: "이름 / Name" },
        { key: "status", label: "상태 / Status" },
        { key: "priority", label: "우선순위 / Priority" }
      ],
      rows: [
        { name: "Button", status: "ready", priority: "P0" },
        { name: "Dialog", status: "draft", priority: "P1" }
      ]
    }),
    code: `import { Table } from "@workspace/ui";

Table({ columns: [{ key: "name", label: "이름 / Name" }], rows: [{ name: "Button" }] });`
  },
  EmptyState: {
    preview: () => EmptyState({
      title: "결과 없음 / No results",
      description: "필터를 조정해 다시 시도하세요. / Adjust filters and try again.",
      actions: [{ label: "필터 초기화 / Reset filters" }]
    }),
    code: `import { EmptyState } from "@workspace/ui";

EmptyState({ title: "결과 없음 / No results", actions: [{ label: "초기화 / Reset" }] });`
  },
  List: {
    preview: () => List({
      items: [
        { title: "Button", description: "명령 실행 / Command action", meta: "P0" },
        { title: "TextField", description: "텍스트 입력 / Text input", meta: "P0" },
        { title: "Dialog", description: "모달 작업 / Modal task", meta: "P1" }
      ]
    }),
    code: `import { List } from "@workspace/ui";

List({ items: [{ title: "Button", description: "명령 실행 / Command action" }] });`
  }
};

function inputElement(value) {
  const input = document.createElement("input");
  input.className = "ds-TextField";
  input.type = "text";
  input.value = value;
  return input;
}

function stackRow(children) {
  return Inline({
    gap: "sm",
    justify: "center",
    children
  });
}

function stackColumn(children) {
  return Stack({
    gap: "sm",
    children
  });
}

function createElement(tagName, className, text) {
  const node = document.createElement(tagName);
  if (className) {
    node.className = className;
  }
  if (text !== undefined) {
    node.textContent = text;
  }
  return node;
}

function renderNav() {
  const nav = document.querySelector("#nav");

  nav.replaceChildren(
    ...navItems.map((item) => {
      const link = createElement("a", "", item.label);
      link.href = `#${item.id}`;
      link.dataset.section = item.id;
      return link;
    })
  );
}

function renderRoadmap() {
  const list = document.querySelector("#roadmap-list");

  list.replaceChildren(
    ...roadmapGroups.map((group) => {
      const card = createElement("article", "roadmap-card");
      const header = createElement("div", "roadmap-card-header");
      header.append(
        createElement("h3", "", group.category),
        createElement("span", "status-pill", group.priority)
      );

      const tags = createElement("div", "roadmap-tags");
      tags.append(...group.components.map((component) => createElement("span", "", component)));
      card.append(header, createElement("p", "", group.note), tags);
      return card;
    })
  );
}

function renderComponents() {
  const list = document.querySelector("#component-list");

  list.replaceChildren(
    ...componentCatalog.map((component) => {
      const example = showcase[component.name];
      const summary = componentSummaries.get(component.name);
      const article = createElement("article", "component-card");
      const info = createElement("div", "component-info");
      const title = createElement("h3", "", component.name);
      const meta = createElement("p", "component-meta", summary.meta);
      const description = createElement("p", "component-copy", summary.description);
      const codeBlock = createElement("div", "code-block");
      const pre = document.createElement("pre");
      const code = document.createElement("code");
      code.textContent = example?.code || `import { ${component.name} } from "@workspace/ui";`;
      pre.append(code);
      codeBlock.append(pre);
      info.append(title, meta, description, codeBlock);

      const preview = createElement("div", "preview");
      preview.setAttribute("aria-label", `${component.name} 미리보기 / ${component.name} preview`);
      preview.append(example?.preview() || EmptyState({ title: `${component.name} 예시 없음 / No example` }));

      article.append(info, preview);
      return article;
    })
  );
}

function renderWorkflowExample() {
  const root = document.querySelector("#workflow-example");
  const form = createElement("form", "sample-form");
  form.append(
    TextField({ label: "프로젝트 이름 / Project name", defaultValue: "Design System Docs" }),
    Select({
      label: "상태 / Status",
      defaultValue: "ready",
      options: [
        { label: "준비 / Ready", value: "ready" },
        { label: "초안 / Draft", value: "draft" }
      ]
    }),
    stackRow([
      Button({ label: "취소 / Cancel", variant: "outline", tone: "neutral" }),
      Button({ label: "저장 / Save" })
    ])
  );

  const note = Card({
    title: "문서 앱의 역할 / Docs App Role",
    description:
      "이 영역도 실제 TextField, Select, Button, Card export를 조합해 렌더링합니다. / This area is also rendered by composing real TextField, Select, Button, and Card exports.",
    children: Alert({
      tone: "info",
      title: "실제 컴포넌트 사용 중 / Using real components",
      description: "카탈로그 예시는 @workspace/ui에서 import한 결과입니다. / Catalog examples are imported from @workspace/ui."
    })
  });

  root.replaceChildren(Container({
    size: "xl",
    children: Row({
      gap: "lg",
      children: [
        Col({ span: 12, md: 6, children: form }),
        Col({ span: 12, md: 6, children: note })
      ]
    })
  }));
}

function updateActiveNav() {
  const sections = navItems
    .map((item) => document.querySelector(`#${item.id}`))
    .filter(Boolean);
  let current = sections[0];

  for (const section of sections) {
    if (section.offsetTop - 120 <= window.scrollY) {
      current = section;
    }
  }

  document.querySelectorAll(".nav a").forEach((link) => {
    link.classList.toggle("active", link.dataset.section === current?.id);
  });
}

renderNav();
renderRoadmap();
renderComponents();
renderWorkflowExample();
updateActiveNav();

window.addEventListener("scroll", updateActiveNav, { passive: true });
