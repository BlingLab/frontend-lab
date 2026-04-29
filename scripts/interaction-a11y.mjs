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
  Dialog,
  DropdownMenu,
  Popover
} = await import("../packages/ui/dist/index.js");

const failures = [];

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
