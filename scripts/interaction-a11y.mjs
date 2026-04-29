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
  Combobox,
  CommandPalette,
  DataGrid,
  DatePicker,
  Dialog,
  DropdownMenu,
  FileUploader,
  NavigationRail,
  Popover,
  Select,
  SideNav,
  Stepper,
  Tabs,
  componentCatalog
} = await import("../packages/ui/dist/index.js");

const failures = [];
const interactionCoverageNames = [
  "Select",
  "DatePicker",
  "Combobox",
  "FileUploader",
  "CommandPalette",
  "DropdownMenu",
  "Popover",
  "Dialog",
  "Tabs",
  "Stepper",
  "NavigationRail",
  "SideNav",
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

if (failures.length > 0) {
  console.error(failures.join("\n\n"));
  process.exit(1);
}

console.log("상호작용 접근성 검증 완료. / Interaction accessibility checks passed.");
