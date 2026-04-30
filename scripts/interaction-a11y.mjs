import { JSDOM } from "jsdom";
import React from "react";

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  pretendToBeVisual: true,
  url: "http://localhost/"
});

globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.HTMLButtonElement = dom.window.HTMLButtonElement;
globalThis.HTMLDialogElement = dom.window.HTMLDialogElement;
globalThis.File = dom.window.File;
globalThis.KeyboardEvent = dom.window.KeyboardEvent;
globalThis.MouseEvent = dom.window.MouseEvent;
globalThis.PointerEvent = dom.window.PointerEvent ?? dom.window.MouseEvent;
globalThis.Node = dom.window.Node;
Object.defineProperty(globalThis, "navigator", {
  configurable: true,
  value: dom.window.navigator
});
globalThis.requestAnimationFrame = dom.window.requestAnimationFrame.bind(dom.window);
globalThis.cancelAnimationFrame = dom.window.cancelAnimationFrame.bind(dom.window);

if (!globalThis.HTMLDialogElement.prototype.showModal) {
  globalThis.HTMLDialogElement.prototype.showModal = function showModal() {
    this.open = true;
  };
}

if (!globalThis.HTMLDialogElement.prototype.show) {
  globalThis.HTMLDialogElement.prototype.show = function show() {
    this.open = true;
  };
}

if (!globalThis.HTMLDialogElement.prototype.close) {
  globalThis.HTMLDialogElement.prototype.close = function close() {
    this.open = false;
    this.dispatchEvent(new dom.window.Event("close"));
  };
}

const { cleanup, fireEvent, render, screen, waitFor } = await import("@testing-library/react");
const userEvent = (await import("@testing-library/user-event")).default;
const {
  Button,
  Card,
  Checkbox,
  Combobox,
  CommandPalette,
  DataGrid,
  DatePicker,
  Dialog,
  DropdownMenu,
  FileUploader,
  IconButton,
  NavigationRail,
  Pagination,
  Popover,
  RadioGroup,
  Select,
  SideNav,
  Stepper,
  Switch,
  Table,
  Tabs,
  componentCatalog
} = await import("../packages/ui/dist/index.js");

const failures = [];
const interactionCoverageNames = [
  "Button",
  "IconButton",
  "Select",
  "DatePicker",
  "Combobox",
  "Checkbox",
  "RadioGroup",
  "Switch",
  "FileUploader",
  "CommandPalette",
  "DropdownMenu",
  "Popover",
  "Dialog",
  "Tabs",
  "Stepper",
  "NavigationRail",
  "SideNav",
  "Pagination",
  "Card",
  "Table",
  "DataGrid"
];

async function check(name, fn) {
  try {
    cleanup();
    await fn();
  } catch (error) {
    failures.push(`${name}: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    cleanup();
  }
}

await check("Catalog interaction coverage list", async () => {
  const catalogNames = new Set(componentCatalog.map((item) => item.name));
  const missingNames = interactionCoverageNames.filter((name) => !catalogNames.has(name));
  if (missingNames.length > 0) {
    throw new Error(`Expected interactive components in catalog, missing: ${missingNames.join(", ")}`);
  }
});

await check("Select focus and keyboard value change", async () => {
  render(React.createElement(Select, {
    label: "상태 / Status",
    defaultValue: "draft",
    options: [
      { label: "초안 / Draft", value: "draft" },
      { label: "준비 / Ready", value: "ready" }
    ]
  }));

  const select = screen.getByRole("combobox", { name: "상태 / Status" });
  select.focus();
  fireEvent.keyDown(select, { key: "ArrowDown" });
  fireEvent.change(select, { target: { value: "ready" } });

  await waitFor(() => {
    if (document.activeElement !== select) throw new Error("Expected select to keep focus during keyboard selection.");
    if (select.value !== "ready") throw new Error(`Expected selected value "ready", received: ${select.value}`);
  });
});

await check("DatePicker focus and Enter commit", async () => {
  render(React.createElement(DatePicker, {
    label: "시작일 / Start date",
    minDate: "2026-01-01",
    maxDate: "2026-12-31"
  }));

  const input = screen.getByLabelText("시작일 / Start date");
  input.focus();
  fireEvent.change(input, { target: { value: "2026-04-29" } });
  fireEvent.keyDown(input, { key: "Enter" });

  await waitFor(() => {
    if (document.activeElement !== input) throw new Error("Expected date input to keep focus after Enter.");
    if (input.value !== "2026-04-29") throw new Error(`Expected date value to be committed, received: ${input.value}`);
  });
});

await check("Button loading and selected accessibility state", async () => {
  let clicked = 0;
  render(React.createElement(Button, {
    loading: true,
    selected: true,
    onClick: () => {
      clicked += 1;
    }
  }, "저장 / Save"));

  const button = screen.getByRole("button", { name: "저장 / Save" });
  fireEvent.click(button);

  await waitFor(() => {
    if (!button.disabled) throw new Error("Expected loading button to be disabled.");
    if (button.getAttribute("aria-busy") !== "true") throw new Error("Expected loading button to expose aria-busy.");
    if (button.getAttribute("aria-pressed") !== "true") throw new Error("Expected selected button to expose aria-pressed.");
    if (clicked !== 0) throw new Error("Expected disabled loading button not to fire click.");
  });
});

await check("IconButton required accessible name", async () => {
  let clicked = 0;
  render(React.createElement(IconButton, {
    label: "검색 / Search",
    onClick: () => {
      clicked += 1;
    }
  }));

  const button = screen.getByRole("button", { name: "검색 / Search" });
  fireEvent.click(button);

  await waitFor(() => {
    if (clicked !== 1) throw new Error(`Expected icon button click callback once, received: ${clicked}`);
  });
});

await check("Combobox keyboard selection", async () => {
  render(React.createElement(Combobox, {
    label: "담당자 / Owner",
    options: [
      { label: "디자인 / Design", value: "design" },
      { label: "프론트엔드 / Frontend", value: "frontend" }
    ]
  }));

  const input = screen.getByRole("combobox");
  fireEvent.focus(input);
  await waitFor(() => {
    if (!input.getAttribute("aria-activedescendant")) {
      throw new Error("Expected combobox to highlight the first option on focus.");
    }
  });
  fireEvent.keyDown(input, { key: "ArrowDown" });
  fireEvent.keyDown(input, { key: "Enter" });

  await waitFor(() => {
    if (input.value !== "프론트엔드 / Frontend") {
      throw new Error(`Expected second option to be selected, received: ${input.value}`);
    }
  });
});

await check("Checkbox indeterminate and toggle", async () => {
  let checked = false;
  render(React.createElement(Checkbox, {
    label: "전체 선택 / Select all",
    indeterminate: true,
    onChange: (event) => {
      checked = event.currentTarget.checked;
    }
  }));

  const checkbox = screen.getByRole("checkbox", { name: "전체 선택 / Select all" });
  await waitFor(() => {
    if (!checkbox.indeterminate) throw new Error("Expected checkbox DOM indeterminate property.");
    if (checkbox.getAttribute("aria-checked") !== "mixed") throw new Error("Expected mixed checkbox to expose aria-checked.");
  });

  fireEvent.click(checkbox);
  await waitFor(() => {
    if (!checked) throw new Error("Expected checkbox change callback to receive checked=true.");
  });
});

await check("RadioGroup selection callback", async () => {
  let selected = "";
  render(React.createElement(RadioGroup, {
    label: "배포 채널 / Release channel",
    options: [
      { label: "안정 / Stable", value: "stable" },
      { label: "다음 / Next", value: "next" }
    ],
    onValueChange: (value) => {
      selected = value;
    }
  }));

  fireEvent.click(screen.getByRole("radio", { name: "다음 / Next" }));

  await waitFor(() => {
    if (selected !== "next") throw new Error(`Expected radio value "next", received: ${selected}`);
  });
});

await check("Switch toggle accessibility state", async () => {
  let checked = false;
  render(React.createElement(Switch, {
    label: "알림 / Notifications",
    onCheckedChange: (value) => {
      checked = value;
    }
  }));

  const switchControl = screen.getByRole("switch", { name: "알림 / Notifications" });
  fireEvent.click(switchControl);

  await waitFor(() => {
    if (!checked) throw new Error("Expected switch change callback to receive checked=true.");
    if (switchControl.getAttribute("aria-checked") !== "true") throw new Error("Expected switch to expose checked state.");
  });
});

await check("FileUploader file selection", async () => {
  const file = new File(["component"], "component-spec.md", { type: "text/markdown" });
  let selectedFiles = [];
  render(React.createElement(FileUploader, {
    label: "첨부 / Attachment",
    onFilesChange: (files) => {
      selectedFiles = files;
    }
  }));

  const input = screen.getByLabelText("첨부 / Attachment");
  input.focus();
  fireEvent.change(input, { target: { files: [file] } });

  await waitFor(() => {
    if (document.activeElement !== input) throw new Error("Expected file input to keep focus after file selection.");
    if (selectedFiles[0]?.name !== "component-spec.md") throw new Error("Expected selected file to be reported.");
    if (!screen.getByText("component-spec.md")) throw new Error("Expected selected file name to be rendered.");
  });
});

await check("Table sort and multi-row selection", async () => {
  let sortState;
  let selectedKeys = [];
  render(React.createElement(Table, {
    caption: "컴포넌트 목록 / Component list",
    sortable: true,
    selectionMode: "multiple",
    columns: [
      { key: "name", label: "이름 / Name" },
      { key: "status", label: "상태 / Status" }
    ],
    rows: [
      { id: "button", name: "Button", status: "ready" },
      { id: "dialog", name: "Dialog", status: "ready" }
    ],
    rowKey: (row) => row.id,
    onSortChange: (nextSortState) => {
      sortState = nextSortState;
    },
    onSelectedRowKeysChange: (keys) => {
      selectedKeys = keys;
    }
  }));

  fireEvent.click(screen.getByRole("button", { name: "이름 / Name 정렬 / Sort 이름 / Name" }));
  await waitFor(() => {
    if (sortState?.key !== "name" || sortState?.direction !== "ascending") {
      throw new Error(`Expected ascending name sort, received: ${JSON.stringify(sortState)}`);
    }
  });

  fireEvent.click(screen.getByRole("checkbox", { name: "전체 행 선택 / Select all rows" }));
  await waitFor(() => {
    if (selectedKeys.join(",") !== "button,dialog") throw new Error(`Expected both row keys selected, received: ${selectedKeys.join(",")}`);
  });
});

await check("CommandPalette keyboard selection", async () => {
  let selected = "";
  const user = userEvent.setup();
  render(React.createElement(CommandPalette, {
    commands: [
      { label: "프로젝트 열기 / Open project", value: "open" },
      { label: "새 컴포넌트 / New component", value: "new" }
    ],
    onCommandSelect: (command) => {
      selected = command.value;
    }
  }));

  await user.click(screen.getByRole("button", { name: "명령 열기 / Open commands" }));
  const input = screen.getByRole("combobox");
  fireEvent.keyDown(input, { key: "ArrowDown" });
  fireEvent.keyDown(input, { key: "Enter" });

  await waitFor(() => {
    if (selected !== "new") throw new Error(`Expected command "new", received: ${selected}`);
  });
});

await check("Pagination page change and aria-current", async () => {
  let selectedPage = 1;
  render(React.createElement(Pagination, {
    defaultPage: 1,
    totalPages: 3,
    onPageChange: (page) => {
      selectedPage = page;
    }
  }));

  fireEvent.click(screen.getByRole("button", { name: "2" }));

  await waitFor(() => {
    if (selectedPage !== 2) throw new Error(`Expected page 2, received: ${selectedPage}`);
    if (screen.getByRole("button", { name: "2" }).getAttribute("aria-current") !== "page") {
      throw new Error("Expected selected page button to expose aria-current.");
    }
  });
});

await check("Interactive Card keyboard activation", async () => {
  let clicked = 0;
  render(React.createElement(Card, {
    title: "릴리즈 / Release",
    interactive: true,
    onClick: () => {
      clicked += 1;
    }
  }));

  const card = screen.getByRole("button", { name: "릴리즈 / Release" });
  card.focus();
  fireEvent.keyDown(card, { key: "Enter" });

  await waitFor(() => {
    if (document.activeElement !== card) throw new Error("Expected interactive card to keep focus after Enter.");
    if (clicked !== 1) throw new Error(`Expected interactive card click callback once, received: ${clicked}`);
  });
});

await check("Tabs arrow navigation and Space activation", async () => {
  let selected = "overview";
  render(React.createElement(Tabs, {
    activationMode: "manual",
    defaultValue: "overview",
    onValueChange: (value) => {
      selected = value;
    },
    items: [
      { label: "개요 / Overview", value: "overview", content: "Overview" },
      { label: "API", value: "api", content: "API" },
      { label: "예시 / Examples", value: "examples", content: "Examples" }
    ]
  }));

  const overviewTab = screen.getByRole("tab", { name: "개요 / Overview" });
  overviewTab.focus();
  fireEvent.keyDown(overviewTab, { key: "ArrowRight" });

  const apiTab = screen.getByRole("tab", { name: "API" });
  await waitFor(() => {
    if (document.activeElement !== apiTab) throw new Error("Expected ArrowRight to move focus to the next tab.");
    if (selected !== "overview") throw new Error("Expected manual tabs to defer activation until Space or Enter.");
  });

  fireEvent.keyDown(apiTab, { key: " " });
  await waitFor(() => {
    if (selected !== "api") throw new Error(`Expected Space to activate API tab, received: ${selected}`);
    if (apiTab.getAttribute("aria-selected") !== "true") throw new Error("Expected activated tab to expose aria-selected.");
  });
});

await check("Stepper arrow navigation and Enter activation", async () => {
  let selected = "requirements";
  render(React.createElement(Stepper, {
    defaultValue: "requirements",
    onValueChange: (value) => {
      selected = value;
    },
    steps: [
      { label: "요구사항 / Requirements", value: "requirements" },
      { label: "API", value: "api" },
      { label: "검증 / Verify", value: "verify" }
    ]
  }));

  const requirementsStep = screen.getByRole("button", { name: /요구사항 \/ Requirements/ });
  requirementsStep.focus();
  fireEvent.keyDown(requirementsStep, { key: "ArrowRight" });

  const apiStep = screen.getByRole("button", { name: /API/ });
  await waitFor(() => {
    if (document.activeElement !== apiStep) throw new Error("Expected ArrowRight to move focus to the next step.");
    if (selected !== "api") throw new Error(`Expected arrow navigation to activate API step, received: ${selected}`);
  });

  fireEvent.keyDown(apiStep, { key: "Enter" });
  await waitFor(() => {
    if (apiStep.getAttribute("aria-current") !== "step") throw new Error("Expected active step to expose aria-current.");
  });
});

await check("NavigationRail arrow navigation and Space activation", async () => {
  let selected = "home";
  render(React.createElement(NavigationRail, {
    defaultValue: "home",
    onValueChange: (value) => {
      selected = value;
    },
    items: [
      { label: "홈 / Home", value: "home", icon: "H" },
      { label: "컴포넌트 / Components", value: "components", icon: "C" },
      { label: "문서 / Docs", value: "docs", icon: "D" }
    ]
  }));

  const homeItem = screen.getByRole("button", { name: "홈 / Home" });
  homeItem.focus();
  fireEvent.keyDown(homeItem, { key: "ArrowDown" });

  const componentItem = screen.getByRole("button", { name: "컴포넌트 / Components" });
  await waitFor(() => {
    if (document.activeElement !== componentItem) throw new Error("Expected ArrowDown to move focus to the next rail item.");
  });

  fireEvent.keyDown(componentItem, { key: " " });
  await waitFor(() => {
    if (selected !== "components") throw new Error(`Expected Space to activate components item, received: ${selected}`);
    if (componentItem.getAttribute("data-selected") !== "true") throw new Error("Expected selected rail item to expose data-selected.");
  });
});

await check("SideNav arrow navigation and Enter activation", async () => {
  let selected = "overview";
  render(React.createElement(SideNav, {
    defaultValue: "overview",
    onValueChange: (value) => {
      selected = value;
    },
    sections: [
      {
        title: "문서 / Docs",
        items: [
          { label: "개요 / Overview", value: "overview" },
          { label: "Prop API", value: "props" },
          { label: "릴리즈 / Release", value: "release" }
        ]
      }
    ]
  }));

  const overviewItem = screen.getByRole("button", { name: "개요 / Overview" });
  overviewItem.focus();
  fireEvent.keyDown(overviewItem, { key: "ArrowDown" });

  const propsItem = screen.getByRole("button", { name: "Prop API" });
  await waitFor(() => {
    if (document.activeElement !== propsItem) throw new Error("Expected ArrowDown to move focus to the next side nav item.");
  });

  fireEvent.keyDown(propsItem, { key: "Enter" });
  await waitFor(() => {
    if (selected !== "props") throw new Error(`Expected Enter to activate props item, received: ${selected}`);
    if (propsItem.getAttribute("data-selected") !== "true") throw new Error("Expected selected side nav item to expose data-selected.");
  });
});

await check("DropdownMenu keyboard focus return", async () => {
  const user = userEvent.setup();
  render(React.createElement(DropdownMenu, {
    triggerLabel: "작업 / Actions",
    items: [
      { label: "편집 / Edit" },
      { label: "삭제 / Delete" }
    ]
  }));

  const trigger = screen.getByRole("button", { name: "작업 / Actions" });
  await user.click(trigger);
  await waitFor(() => {
    if (document.activeElement?.textContent !== "편집 / Edit") {
      throw new Error("Expected first menu item to receive focus.");
    }
  });
  fireEvent.keyDown(document.activeElement, { key: "Escape" });

  await waitFor(() => {
    if (document.activeElement !== trigger) throw new Error("Expected focus to return to dropdown trigger.");
  });
});

await check("DropdownMenu outside pointer dismiss", async () => {
  const user = userEvent.setup();
  render(React.createElement(DropdownMenu, {
    triggerLabel: "작업 / Actions",
    items: [
      { label: "편집 / Edit" },
      { label: "삭제 / Delete" }
    ]
  }));

  const trigger = screen.getByRole("button", { name: "작업 / Actions" });
  await user.click(trigger);
  fireEvent.pointerDown(document.body);

  await waitFor(() => {
    if (trigger.getAttribute("aria-expanded") !== "false") throw new Error("Expected outside pointer to close dropdown menu.");
  });
});

await check("Popover Escape focus return", async () => {
  const user = userEvent.setup();
  render(React.createElement(Popover, {
    triggerLabel: "필터 / Filter",
    title: "필터 옵션 / Filter options"
  }));

  const trigger = screen.getByRole("button", { name: "필터 / Filter" });
  await user.click(trigger);
  fireEvent.keyDown(document, { key: "Escape" });

  await waitFor(() => {
    if (document.activeElement !== trigger) throw new Error("Expected focus to return to popover trigger.");
  });
});

await check("Popover outside pointer dismiss", async () => {
  const user = userEvent.setup();
  render(React.createElement(Popover, {
    triggerLabel: "필터 / Filter",
    title: "필터 옵션 / Filter options"
  }));

  const trigger = screen.getByRole("button", { name: "필터 / Filter" });
  await user.click(trigger);
  fireEvent.pointerDown(document.body);

  await waitFor(() => {
    if (trigger.getAttribute("aria-expanded") !== "false") throw new Error("Expected outside pointer to close popover.");
  });
});

await check("Dialog close focus return", async () => {
  const user = userEvent.setup();
  render(React.createElement(Dialog, {
    triggerLabel: "열기 / Open",
    title: "확인 / Confirm",
    closeLabel: "닫기 / Close"
  }));

  const trigger = screen.getByRole("button", { name: "열기 / Open" });
  await user.click(trigger);
  await user.click(screen.getAllByRole("button", { name: "닫기 / Close" })[0]);

  await waitFor(() => {
    if (document.activeElement !== trigger) throw new Error("Expected focus to return to dialog trigger.");
  });
});

await check("DataGrid row keyboard navigation", async () => {
  let activeKey = "";
  render(React.createElement(DataGrid, {
    columns: [
      { key: "name", label: "이름 / Name" },
      { key: "status", label: "상태 / Status" }
    ],
    rows: [
      { id: "draft", name: "초안 / Draft", status: "대기 / Waiting" },
      { id: "ready", name: "준비 / Ready", status: "완료 / Done" }
    ],
    rowKey: (row) => row.id,
    onActiveRowKeyChange: (key) => {
      activeKey = key ?? "";
    }
  }));

  const gridRows = screen.getAllByRole("row").slice(1);
  gridRows[0].focus();
  fireEvent.keyDown(gridRows[0], { key: "ArrowDown" });

  await waitFor(() => {
    if (document.activeElement !== gridRows[1]) throw new Error("Expected focus to move to the second grid row.");
    if (activeKey !== "ready") throw new Error(`Expected active row key "ready", received: ${activeKey}`);
  });
});

await check("DataGrid column resize keyboard controls", async () => {
  const resizedWidths = [];
  render(React.createElement(DataGrid, {
    columns: [
      { key: "name", label: "이름 / Name", width: "160px", minWidth: 120, maxWidth: 220 },
      { key: "status", label: "상태 / Status", width: "160px" }
    ],
    rows: [
      { id: "ready", name: "준비 / Ready", status: "완료 / Done" }
    ],
    rowKey: (row) => row.id,
    onColumnResize: (key, width) => {
      resizedWidths.push(`${key}:${width}`);
    }
  }));

  const resizeHandle = screen.getByRole("separator", { name: "이름 / Name 열 너비 조절 / Resize 이름 / Name column" });
  resizeHandle.focus();
  fireEvent.keyDown(resizeHandle, { key: "ArrowRight" });

  await waitFor(() => {
    if (document.activeElement !== resizeHandle) throw new Error("Expected resize handle to remain focused.");
    if (resizeHandle.getAttribute("aria-valuenow") !== "176") throw new Error(`Expected width 176, received: ${resizeHandle.getAttribute("aria-valuenow")}`);
    if (!resizedWidths.includes("name:176")) throw new Error("Expected ArrowRight resize callback.");
  });

  fireEvent.keyDown(resizeHandle, { key: "ArrowLeft", shiftKey: true });
  await waitFor(() => {
    if (resizeHandle.getAttribute("aria-valuenow") !== "128") throw new Error(`Expected width 128, received: ${resizeHandle.getAttribute("aria-valuenow")}`);
  });

  fireEvent.keyDown(resizeHandle, { key: "Home" });
  await waitFor(() => {
    if (resizeHandle.getAttribute("aria-valuenow") !== "120") throw new Error(`Expected minimum width 120, received: ${resizeHandle.getAttribute("aria-valuenow")}`);
  });

  fireEvent.keyDown(resizeHandle, { key: "End" });
  await waitFor(() => {
    if (resizeHandle.getAttribute("aria-valuenow") !== "220") throw new Error(`Expected maximum width 220, received: ${resizeHandle.getAttribute("aria-valuenow")}`);
  });
});

if (failures.length > 0) {
  console.error(failures.join("\n\n"));
  process.exit(1);
}

console.log("상호작용 접근성 검증 완료. / Interaction accessibility checks passed.");
