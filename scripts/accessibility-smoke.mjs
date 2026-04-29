import React from "react";
import * as ReactDOMServer from "react-dom/server";
import {
  Alert,
  Combobox,
  CommandPalette,
  Dialog,
  DropdownMenu,
  Icon,
  IconButton,
  Popover,
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
    React.createElement(Icon, { key: "informative", name: "check", label: "완료 / Complete" })
  ]),
  [
    ["장식 아이콘은 보조기술에서 숨겨야 합니다. / Decorative icons must be hidden from assistive technology.", (markup) => markup.includes("aria-hidden=\"true\"")],
    ["정보 아이콘은 접근 가능한 이름을 가져야 합니다. / Informative icons must expose an accessible name.", (markup) => markup.includes("role=\"img\"") && markup.includes("aria-label=\"완료 / Complete\"")]
  ]
);

assertMarkup(
  "IconButton",
  React.createElement(IconButton, { label: "검색 / Search", icon: React.createElement(Icon, { name: "search" }) }),
  [
    ["아이콘 버튼은 accessible name을 가져야 합니다. / Icon buttons must expose an accessible name.", (markup) => markup.includes("aria-label=\"검색 / Search\"")],
    ["시각 아이콘 wrapper는 숨겨야 합니다. / Visual icon wrappers must be hidden.", (markup) => markup.includes("aria-hidden=\"true\"")]
  ]
);

assertMarkup(
  "TextField",
  React.createElement(TextField, { label: "이름 / Name", description: "설명 / Description", error: "오류 / Error", required: true }),
  [
    ["label은 input id와 연결되어야 합니다. / Labels must be associated with the input id.", (markup) => /<label[^>]+for="textfield-/.test(markup) && /<input[^>]+id="textfield-/.test(markup)],
    ["오류 상태는 aria-invalid로 노출해야 합니다. / Error state must be exposed with aria-invalid.", (markup) => markup.includes("aria-invalid=\"true\"")]
  ]
);

assertMarkup(
  "Alert",
  React.createElement(Alert, { tone: "danger", title: "오류 / Error", description: "확인 필요 / Needs attention" }),
  [
    ["danger alert는 role=alert를 사용해야 합니다. / Danger alerts must use role=alert.", (markup) => markup.includes("role=\"alert\"")]
  ]
);

assertMarkup(
  "Dialog",
  React.createElement(Dialog, { triggerLabel: "열기 / Open", title: "확인 / Confirm" }),
  [
    ["trigger는 dialog popup 관계를 알려야 합니다. / Trigger must expose the dialog popup relationship.", (markup) => markup.includes("aria-haspopup=\"dialog\"")],
    ["dialog는 제목 id와 연결되어야 합니다. / Dialog must be labelled by the title id.", (markup) => markup.includes("aria-labelledby=")]
  ]
);

assertMarkup(
  "Popover",
  React.createElement(Popover, { triggerLabel: "필터 / Filter", title: "옵션 / Options" }),
  [
    ["trigger는 panel id를 제어해야 합니다. / Trigger must control the panel id.", (markup) => markup.includes("aria-controls=")],
    ["trigger는 expanded state를 노출해야 합니다. / Trigger must expose expanded state.", (markup) => markup.includes("aria-expanded=\"false\"")]
  ]
);

assertMarkup(
  "DropdownMenu",
  React.createElement(DropdownMenu, { triggerLabel: "작업 / Actions", items: [{ label: "편집 / Edit" }] }),
  [
    ["trigger는 menu popup 관계를 알려야 합니다. / Trigger must expose the menu popup relationship.", (markup) => markup.includes("aria-haspopup=\"menu\"")],
    ["menu container는 role=menu를 가져야 합니다. / Menu container must use role=menu.", (markup) => markup.includes("role=\"menu\"")]
  ]
);

assertMarkup(
  "CommandPalette",
  React.createElement(CommandPalette, { commands: [{ label: "열기 / Open", value: "open" }] }),
  [
    ["trigger는 dialog popup 관계를 알려야 합니다. / Trigger must expose the dialog popup relationship.", (markup) => markup.includes("aria-haspopup=\"dialog\"")],
    ["검색 입력은 combobox role을 가져야 합니다. / Search input must use role=combobox.", (markup) => markup.includes("role=\"combobox\"")]
  ]
);

assertMarkup(
  "Combobox",
  React.createElement(Combobox, { label: "담당자 / Owner", options: [{ label: "디자인 / Design", value: "design" }] }),
  [
    ["입력은 combobox role을 가져야 합니다. / Input must use role=combobox.", (markup) => markup.includes("role=\"combobox\"")],
    ["입력은 listbox와 연결되어야 합니다. / Input must be connected to the listbox.", (markup) => markup.includes("aria-controls=") && markup.includes("role=\"listbox\"")]
  ]
);

if (failures.length > 0) {
  console.error(failures.join("\n\n"));
  process.exit(1);
}

console.log("접근성 스모크 검증 완료. / Accessibility smoke checks passed.");
