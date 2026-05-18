import React from "react";
import * as ReactDOMServer from "react-dom/server";
import {
  Alert,
  Combobox,
  CommandPalette,
  DataGrid,
  Dialog,
  DropdownMenu,
  Icon,
  IconButton,
  InlineLoading,
  Popover,
  Spinner,
  TextField
} from "../packages/ui/dist/index.js";

const failures = [];

function assertMarkup(name, element, checks) {
  const markup = ReactDOMServer.renderToStaticMarkup(element);
  for (const [description, predicate] of checks) {
    if (!predicate(markup)) {
      failures.push(`${name}: ${description}\n${markup}`);
    }
  }
}

assertMarkup(
  "Icon",
  React.createElement("div", null, [
    React.createElement(Icon, { key: "decorative", name: "search" }),
    React.createElement(Icon, { key: "informative", name: "check", label: "완료" })
  ]),
  [
    ["장식 아이콘은 보조기술에서 숨겨야 합니다.", (markup) => markup.includes("aria-hidden=\"true\"")],
    ["정보 아이콘은 접근 가능한 이름을 가져야 합니다.", (markup) => markup.includes("role=\"img\"") && markup.includes("aria-label=\"완료\"")]
  ]
);

assertMarkup(
  "IconButton",
  React.createElement(IconButton, { label: "검색", icon: React.createElement(Icon, { name: "search" }) }),
  [
    ["아이콘 버튼은 accessible name을 가져야 합니다.", (markup) => markup.includes("aria-label=\"검색\"")],
    ["시각 아이콘 wrapper는 숨겨야 합니다.", (markup) => markup.includes("aria-hidden=\"true\"")]
  ]
);

assertMarkup(
  "Spinner",
  React.createElement("div", null, [
    React.createElement(Spinner, { key: "status", label: "목록을 불러오는 중" }),
    React.createElement(Spinner, { key: "decorative", status: "decorative" })
  ]),
  [
    ["상태 전달용 스피너는 role=status를 가져야 합니다.", (markup) => markup.includes("role=\"status\"")],
    ["상태 전달용 스피너는 접근성 문구를 포함해야 합니다.", (markup) => markup.includes("목록을 불러오는 중")],
    ["장식용 스피너는 보조기술에서 숨겨야 합니다.", (markup) => markup.includes("aria-hidden=\"true\"")]
  ]
);

assertMarkup(
  "InlineLoading",
  React.createElement(InlineLoading, { label: "저장 중", description: "잠시만 기다려 주세요.", tone: "brand" }),
  [
    ["인라인 로딩은 status region이어야 합니다.", (markup) => markup.includes("role=\"status\"")],
    ["상태 문구를 visible text로 렌더링해야 합니다.", (markup) => markup.includes("저장 중")],
    ["내부 스피너는 중복 안내를 피하도록 숨겨야 합니다.", (markup) => markup.includes("aria-hidden=\"true\"")]
  ]
);

assertMarkup(
  "TextField",
  React.createElement(TextField, { label: "이름", description: "설명", error: "오류", required: true }),
  [
    ["label은 input id와 연결되어야 합니다.", (markup) => /<label[^>]+for="textfield-/.test(markup) && /<input[^>]+id="textfield-/.test(markup)],
    ["오류 상태는 aria-invalid로 노출해야 합니다.", (markup) => markup.includes("aria-invalid=\"true\"")]
  ]
);

assertMarkup(
  "Alert",
  React.createElement(Alert, { tone: "danger", title: "오류", description: "확인 필요" }),
  [
    ["danger alert는 role=alert를 사용해야 합니다.", (markup) => markup.includes("role=\"alert\"")]
  ]
);

assertMarkup(
  "Dialog",
  React.createElement(Dialog, { triggerLabel: "열기", title: "확인" }),
  [
    ["trigger는 dialog popup 관계를 알려야 합니다.", (markup) => markup.includes("aria-haspopup=\"dialog\"")],
    ["dialog는 제목 id와 연결되어야 합니다.", (markup) => markup.includes("aria-labelledby=")]
  ]
);

assertMarkup(
  "Popover",
  React.createElement(Popover, { triggerLabel: "필터", title: "옵션" }),
  [
    ["trigger는 panel id를 제어해야 합니다.", (markup) => markup.includes("aria-controls=")],
    ["trigger는 expanded state를 노출해야 합니다.", (markup) => markup.includes("aria-expanded=\"false\"")]
  ]
);

assertMarkup(
  "DropdownMenu",
  React.createElement(DropdownMenu, { triggerLabel: "작업", items: [{ label: "편집" }] }),
  [
    ["trigger는 menu popup 관계를 알려야 합니다.", (markup) => markup.includes("aria-haspopup=\"menu\"")],
    ["menu container는 role=menu를 가져야 합니다.", (markup) => markup.includes("role=\"menu\"")]
  ]
);

assertMarkup(
  "CommandPalette",
  React.createElement(CommandPalette, { commands: [{ label: "열기", value: "open" }] }),
  [
    ["trigger는 dialog popup 관계를 알려야 합니다.", (markup) => markup.includes("aria-haspopup=\"dialog\"")],
    ["검색 입력은 combobox role을 가져야 합니다.", (markup) => markup.includes("role=\"combobox\"")]
  ]
);

assertMarkup(
  "Combobox",
  React.createElement(Combobox, { label: "담당자", options: [{ label: "디자인", value: "design" }] }),
  [
    ["입력은 combobox role을 가져야 합니다.", (markup) => markup.includes("role=\"combobox\"")],
    ["입력은 listbox와 연결되어야 합니다.", (markup) => markup.includes("aria-controls=") && markup.includes("role=\"listbox\"")]
  ]
);

assertMarkup(
  "DataGrid",
  React.createElement(DataGrid, {
    caption: "작업 목록",
    columns: [{ key: "name", label: "이름" }],
    rows: [{ name: "초안" }]
  }),
  [
    ["grid role을 노출해야 합니다.", (markup) => markup.includes("role=\"grid\"")],
    ["keyboard row는 focus target이어야 합니다.", (markup) => markup.includes("tabindex=\"0\"")]
  ]
);

if (failures.length > 0) {
  console.error(failures.join("\n\n"));
  process.exit(1);
}

console.log("접근성 스모크 검증 완료.");
