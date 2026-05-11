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

await check("카탈로그 상호작용 검증 대상 목록", async () => {
  const catalogNames = new Set(componentCatalog.map((item) => item.name));
  const missingNames = interactionCoverageNames.filter((name) => !catalogNames.has(name));
  if (missingNames.length > 0) {
    throw new Error(`카탈로그에 상호작용 검증 대상 컴포넌트가 필요합니다. 누락: ${missingNames.join(", ")}`);
  }
});

await check("Select 포커스와 키보드 값 변경", async () => {
  render(React.createElement(Select, {
    label: "상태",
    defaultValue: "draft",
    options: [
      { label: "초안", value: "draft" },
      { label: "준비", value: "ready" }
    ]
  }));

  const select = screen.getByRole("combobox", { name: "상태" });
  select.focus();
  fireEvent.keyDown(select, { key: "ArrowDown" });
  fireEvent.change(select, { target: { value: "ready" } });

  await waitFor(() => {
    if (document.activeElement !== select) throw new Error("키보드 선택 중 Select 포커스가 유지되어야 합니다.");
    if (select.value !== "ready") throw new Error(`선택 값은 ready여야 합니다. 실제 값: ${select.value}`);
  });
});

await check("DatePicker 포커스와 Enter 확정", async () => {
  render(React.createElement(DatePicker, {
    label: "시작일",
    minDate: "2026-01-01",
    maxDate: "2026-12-31"
  }));

  const input = screen.getByLabelText("시작일");
  input.focus();
  fireEvent.change(input, { target: { value: "2026-04-29" } });
  fireEvent.keyDown(input, { key: "Enter" });

  await waitFor(() => {
    if (document.activeElement !== input) throw new Error("Enter 입력 뒤 날짜 입력 포커스가 유지되어야 합니다.");
    if (input.value !== "2026-04-29") throw new Error(`날짜 값이 확정되어야 합니다. 실제 값: ${input.value}`);
  });
});

await check("Button 로딩과 선택 접근성 상태", async () => {
  let clicked = 0;
  render(React.createElement(Button, {
    loading: true,
    selected: true,
    onClick: () => {
      clicked += 1;
    }
  }, "저장"));

  const button = screen.getByRole("button", { name: "저장" });
  fireEvent.click(button);

  await waitFor(() => {
    if (!button.disabled) throw new Error("로딩 버튼은 비활성 상태여야 합니다.");
    if (button.getAttribute("aria-busy") !== "true") throw new Error("로딩 버튼은 aria-busy를 노출해야 합니다.");
    if (button.getAttribute("aria-pressed") !== "true") throw new Error("선택된 버튼은 aria-pressed를 노출해야 합니다.");
    if (clicked !== 0) throw new Error("비활성 로딩 버튼은 클릭 콜백을 실행하지 않아야 합니다.");
  });
});

await check("IconButton 필수 접근성 이름", async () => {
  let clicked = 0;
  render(React.createElement(IconButton, {
    label: "검색",
    onClick: () => {
      clicked += 1;
    }
  }));

  const button = screen.getByRole("button", { name: "검색" });
  fireEvent.click(button);

  await waitFor(() => {
    if (clicked !== 1) throw new Error(`아이콘 버튼 클릭 콜백은 한 번 실행되어야 합니다. 실제 횟수: ${clicked}`);
  });
});

await check("Combobox 키보드 선택", async () => {
  render(React.createElement(Combobox, {
    label: "담당자",
    options: [
      { label: "디자인", value: "design" },
      { label: "프론트엔드", value: "frontend" }
    ]
  }));

  const input = screen.getByRole("combobox");
  fireEvent.focus(input);
  await waitFor(() => {
    if (!input.getAttribute("aria-activedescendant")) {
      throw new Error("Combobox는 포커스 시 첫 옵션을 강조해야 합니다.");
    }
  });
  fireEvent.keyDown(input, { key: "ArrowDown" });
  fireEvent.keyDown(input, { key: "Enter" });

  await waitFor(() => {
    if (input.value !== "프론트엔드") {
      throw new Error(`두 번째 옵션이 선택되어야 합니다. 실제 값: ${input.value}`);
    }
  });
});

await check("Checkbox 중간 상태와 토글", async () => {
  let checked = false;
  render(React.createElement(Checkbox, {
    label: "전체 선택",
    indeterminate: true,
    onChange: (event) => {
      checked = event.currentTarget.checked;
    }
  }));

  const checkbox = screen.getByRole("checkbox", { name: "전체 선택" });
  await waitFor(() => {
    if (!checkbox.indeterminate) throw new Error("Checkbox DOM indeterminate 속성이 필요합니다.");
    if (checkbox.getAttribute("aria-checked") !== "mixed") throw new Error("혼합 상태 Checkbox는 aria-checked를 노출해야 합니다.");
  });

  fireEvent.click(checkbox);
  await waitFor(() => {
    if (!checked) throw new Error("Checkbox 변경 콜백은 checked=true를 받아야 합니다.");
  });
});

await check("RadioGroup 선택 콜백", async () => {
  let selected = "";
  render(React.createElement(RadioGroup, {
    label: "배포 채널",
    options: [
      { label: "안정", value: "stable" },
      { label: "다음", value: "next" }
    ],
    onValueChange: (value) => {
      selected = value;
    }
  }));

  fireEvent.click(screen.getByRole("radio", { name: "다음" }));

  await waitFor(() => {
    if (selected !== "next") throw new Error(`Radio 값은 next여야 합니다. 실제 값: ${selected}`);
  });
});

await check("Switch 토글 접근성 상태", async () => {
  let checked = false;
  render(React.createElement(Switch, {
    label: "알림",
    onCheckedChange: (value) => {
      checked = value;
    }
  }));

  const switchControl = screen.getByRole("switch", { name: "알림" });
  fireEvent.click(switchControl);

  await waitFor(() => {
    if (!checked) throw new Error("Switch 변경 콜백은 checked=true를 받아야 합니다.");
    if (switchControl.getAttribute("aria-checked") !== "true") throw new Error("Switch는 선택 상태를 노출해야 합니다.");
  });
});

await check("FileUploader 파일 선택", async () => {
  const file = new File(["component"], "component-spec.md", { type: "text/markdown" });
  let selectedFiles = [];
  render(React.createElement(FileUploader, {
    label: "첨부",
    onFilesChange: (files) => {
      selectedFiles = files;
    }
  }));

  const input = screen.getByLabelText("첨부");
  input.focus();
  fireEvent.change(input, { target: { files: [file] } });

  await waitFor(() => {
    if (document.activeElement !== input) throw new Error("파일 선택 뒤 입력 포커스가 유지되어야 합니다.");
    if (selectedFiles[0]?.name !== "component-spec.md") throw new Error("선택한 파일이 콜백으로 전달되어야 합니다.");
    if (!screen.getByText("component-spec.md")) throw new Error("선택한 파일명이 렌더링되어야 합니다.");
  });
});

await check("Table 정렬과 다중 행 선택", async () => {
  let sortState;
  let selectedKeys = [];
  render(React.createElement(Table, {
    caption: "컴포넌트 목록",
    sortable: true,
    selectionMode: "multiple",
    columns: [
      { key: "name", label: "이름" },
      { key: "status", label: "상태" }
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

  fireEvent.click(screen.getByRole("button", { name: "이름 정렬" }));
  await waitFor(() => {
    if (sortState?.key !== "name" || sortState?.direction !== "ascending") {
      throw new Error(`이름 오름차순 정렬 상태여야 합니다. 실제 값: ${JSON.stringify(sortState)}`);
    }
  });

  fireEvent.click(screen.getByRole("checkbox", { name: "전체 행 선택" }));
  await waitFor(() => {
    if (selectedKeys.join(",") !== "button,dialog") throw new Error(`두 행 키가 모두 선택되어야 합니다. 실제 값: ${selectedKeys.join(",")}`);
  });
});

await check("CommandPalette 키보드 선택", async () => {
  let selected = "";
  const user = userEvent.setup();
  render(React.createElement(CommandPalette, {
    commands: [
      { label: "프로젝트 열기", value: "open" },
      { label: "새 컴포넌트", value: "new" }
    ],
    onCommandSelect: (command) => {
      selected = command.value;
    }
  }));

  await user.click(screen.getByRole("button", { name: "명령 열기" }));
  const input = screen.getByRole("combobox");
  fireEvent.keyDown(input, { key: "ArrowDown" });
  fireEvent.keyDown(input, { key: "Enter" });

  await waitFor(() => {
    if (selected !== "new") throw new Error(`명령 값은 new여야 합니다. 실제 값: ${selected}`);
  });
});

await check("Pagination 페이지 변경과 aria-current", async () => {
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
    if (selectedPage !== 2) throw new Error(`페이지는 2여야 합니다. 실제 값: ${selectedPage}`);
    if (screen.getByRole("button", { name: "2" }).getAttribute("aria-current") !== "page") {
      throw new Error("선택된 페이지 버튼은 aria-current를 노출해야 합니다.");
    }
  });
});

await check("상호작용 Card 키보드 활성화", async () => {
  let clicked = 0;
  render(React.createElement(Card, {
    title: "릴리즈",
    interactive: true,
    onClick: () => {
      clicked += 1;
    }
  }));

  const card = screen.getByRole("button", { name: "릴리즈" });
  card.focus();
  fireEvent.keyDown(card, { key: "Enter" });

  await waitFor(() => {
    if (document.activeElement !== card) throw new Error("상호작용 Card는 Enter 뒤 포커스를 유지해야 합니다.");
    if (clicked !== 1) throw new Error(`상호작용 Card 클릭 콜백은 한 번 실행되어야 합니다. 실제 횟수: ${clicked}`);
  });
});

await check("Tabs 방향키 이동과 Space 활성화", async () => {
  let selected = "overview";
  render(React.createElement(Tabs, {
    activationMode: "manual",
    defaultValue: "overview",
    onValueChange: (value) => {
      selected = value;
    },
    items: [
      { label: "개요", value: "overview", content: "개요" },
      { label: "API", value: "api", content: "API" },
      { label: "예시", value: "examples", content: "예시" }
    ]
  }));

  const overviewTab = screen.getByRole("tab", { name: "개요" });
  overviewTab.focus();
  fireEvent.keyDown(overviewTab, { key: "ArrowRight" });

  const apiTab = screen.getByRole("tab", { name: "API" });
  await waitFor(() => {
    if (document.activeElement !== apiTab) throw new Error("ArrowRight는 다음 탭으로 포커스를 이동해야 합니다.");
    if (selected !== "overview") throw new Error("수동 Tabs는 Space 또는 Enter 전까지 활성화를 미뤄야 합니다.");
  });

  fireEvent.keyDown(apiTab, { key: " " });
  await waitFor(() => {
    if (selected !== "api") throw new Error(`Space는 API 탭을 활성화해야 합니다. 실제 값: ${selected}`);
    if (apiTab.getAttribute("aria-selected") !== "true") throw new Error("활성화된 탭은 aria-selected를 노출해야 합니다.");
  });
});

await check("Stepper 방향키 이동과 Enter 활성화", async () => {
  let selected = "requirements";
  render(React.createElement(Stepper, {
    defaultValue: "requirements",
    onValueChange: (value) => {
      selected = value;
    },
    steps: [
      { label: "요구사항", value: "requirements" },
      { label: "API", value: "api" },
      { label: "검증", value: "verify" }
    ]
  }));

  const requirementsStep = screen.getByRole("button", { name: /요구사항/ });
  requirementsStep.focus();
  fireEvent.keyDown(requirementsStep, { key: "ArrowRight" });

  const apiStep = screen.getByRole("button", { name: /API/ });
  await waitFor(() => {
    if (document.activeElement !== apiStep) throw new Error("ArrowRight는 다음 단계로 포커스를 이동해야 합니다.");
    if (selected !== "api") throw new Error(`방향키 이동은 API 단계를 활성화해야 합니다. 실제 값: ${selected}`);
  });

  fireEvent.keyDown(apiStep, { key: "Enter" });
  await waitFor(() => {
    if (apiStep.getAttribute("aria-current") !== "step") throw new Error("활성 단계는 aria-current를 노출해야 합니다.");
  });
});

await check("NavigationRail 방향키 이동과 Space 활성화", async () => {
  let selected = "home";
  render(React.createElement(NavigationRail, {
    defaultValue: "home",
    onValueChange: (value) => {
      selected = value;
    },
    items: [
      { label: "홈", value: "home", icon: "H" },
      { label: "컴포넌트", value: "components", icon: "C" },
      { label: "문서", value: "docs", icon: "D" }
    ]
  }));

  const homeItem = screen.getByRole("button", { name: "홈" });
  homeItem.focus();
  fireEvent.keyDown(homeItem, { key: "ArrowDown" });

  const componentItem = screen.getByRole("button", { name: "컴포넌트" });
  await waitFor(() => {
    if (document.activeElement !== componentItem) throw new Error("ArrowDown은 다음 레일 항목으로 포커스를 이동해야 합니다.");
  });

  fireEvent.keyDown(componentItem, { key: " " });
  await waitFor(() => {
    if (selected !== "components") throw new Error(`Space는 컴포넌트 항목을 활성화해야 합니다. 실제 값: ${selected}`);
    if (componentItem.getAttribute("data-selected") !== "true") throw new Error("선택된 레일 항목은 data-selected를 노출해야 합니다.");
  });
});

await check("SideNav 방향키 이동과 Enter 활성화", async () => {
  let selected = "overview";
  render(React.createElement(SideNav, {
    defaultValue: "overview",
    onValueChange: (value) => {
      selected = value;
    },
    sections: [
      {
        title: "문서",
        items: [
          { label: "개요", value: "overview" },
          { label: "Prop API", value: "props" },
          { label: "릴리즈", value: "release" }
        ]
      }
    ]
  }));

  const overviewItem = screen.getByRole("button", { name: "개요" });
  overviewItem.focus();
  fireEvent.keyDown(overviewItem, { key: "ArrowDown" });

  const propsItem = screen.getByRole("button", { name: "Prop API" });
  await waitFor(() => {
    if (document.activeElement !== propsItem) throw new Error("ArrowDown은 다음 사이드 내비게이션 항목으로 포커스를 이동해야 합니다.");
  });

  fireEvent.keyDown(propsItem, { key: "Enter" });
  await waitFor(() => {
    if (selected !== "props") throw new Error(`Enter는 props 항목을 활성화해야 합니다. 실제 값: ${selected}`);
    if (propsItem.getAttribute("data-selected") !== "true") throw new Error("선택된 사이드 내비게이션 항목은 data-selected를 노출해야 합니다.");
  });
});

await check("DropdownMenu 키보드 포커스 복귀", async () => {
  const user = userEvent.setup();
  render(React.createElement(DropdownMenu, {
    triggerLabel: "작업",
    items: [
      { label: "편집" },
      { label: "삭제" }
    ]
  }));

  const trigger = screen.getByRole("button", { name: "작업" });
  await user.click(trigger);
  await waitFor(() => {
    if (document.activeElement?.textContent !== "편집") {
      throw new Error("첫 메뉴 항목이 포커스를 받아야 합니다.");
    }
  });
  fireEvent.keyDown(document.activeElement, { key: "Escape" });

  await waitFor(() => {
    if (document.activeElement !== trigger) throw new Error("포커스가 DropdownMenu 트리거로 돌아와야 합니다.");
  });
});

await check("DropdownMenu 외부 포인터 닫기", async () => {
  const user = userEvent.setup();
  render(React.createElement(DropdownMenu, {
    triggerLabel: "작업",
    items: [
      { label: "편집" },
      { label: "삭제" }
    ]
  }));

  const trigger = screen.getByRole("button", { name: "작업" });
  await user.click(trigger);
  fireEvent.pointerDown(document.body);

  await waitFor(() => {
    if (trigger.getAttribute("aria-expanded") !== "false") throw new Error("외부 포인터 입력은 DropdownMenu를 닫아야 합니다.");
  });
});

await check("Popover Escape 포커스 복귀", async () => {
  const user = userEvent.setup();
  render(React.createElement(Popover, {
    triggerLabel: "필터",
    title: "필터 옵션"
  }));

  const trigger = screen.getByRole("button", { name: "필터" });
  await user.click(trigger);
  fireEvent.keyDown(document, { key: "Escape" });

  await waitFor(() => {
    if (document.activeElement !== trigger) throw new Error("포커스가 Popover 트리거로 돌아와야 합니다.");
  });
});

await check("Popover 외부 포인터 닫기", async () => {
  const user = userEvent.setup();
  render(React.createElement(Popover, {
    triggerLabel: "필터",
    title: "필터 옵션"
  }));

  const trigger = screen.getByRole("button", { name: "필터" });
  await user.click(trigger);
  fireEvent.pointerDown(document.body);

  await waitFor(() => {
    if (trigger.getAttribute("aria-expanded") !== "false") throw new Error("외부 포인터 입력은 Popover를 닫아야 합니다.");
  });
});

await check("Dialog 닫기 포커스 복귀", async () => {
  const user = userEvent.setup();
  render(React.createElement(Dialog, {
    triggerLabel: "열기",
    title: "확인",
    closeLabel: "닫기"
  }));

  const trigger = screen.getByRole("button", { name: "열기" });
  await user.click(trigger);
  await user.click(screen.getAllByRole("button", { name: "닫기" })[0]);

  await waitFor(() => {
    if (document.activeElement !== trigger) throw new Error("포커스가 Dialog 트리거로 돌아와야 합니다.");
  });
});

await check("DataGrid 행 키보드 이동", async () => {
  let activeKey = "";
  render(React.createElement(DataGrid, {
    columns: [
      { key: "name", label: "이름" },
      { key: "status", label: "상태" }
    ],
    rows: [
      { id: "draft", name: "초안", status: "대기" },
      { id: "ready", name: "준비", status: "완료" }
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
    if (document.activeElement !== gridRows[1]) throw new Error("포커스가 두 번째 Grid 행으로 이동해야 합니다.");
    if (activeKey !== "ready") throw new Error(`활성 행 키는 ready여야 합니다. 실제 값: ${activeKey}`);
  });
});

await check("DataGrid 열 너비 키보드 조절", async () => {
  const resizedWidths = [];
  render(React.createElement(DataGrid, {
    columns: [
      { key: "name", label: "이름", width: "160px", minWidth: 120, maxWidth: 220 },
      { key: "status", label: "상태", width: "160px" }
    ],
    rows: [
      { id: "ready", name: "준비", status: "완료" }
    ],
    rowKey: (row) => row.id,
    onColumnResize: (key, width) => {
      resizedWidths.push(`${key}:${width}`);
    }
  }));

  const resizeHandle = screen.getByRole("separator", { name: "이름 열 너비 조절" });
  resizeHandle.focus();
  fireEvent.keyDown(resizeHandle, { key: "ArrowRight" });

  await waitFor(() => {
    if (document.activeElement !== resizeHandle) throw new Error("열 너비 조절 핸들은 포커스를 유지해야 합니다.");
    if (resizeHandle.getAttribute("aria-valuenow") !== "176") throw new Error(`너비는 176이어야 합니다. 실제 값: ${resizeHandle.getAttribute("aria-valuenow")}`);
    if (!resizedWidths.includes("name:176")) throw new Error("ArrowRight 너비 조절 콜백이 실행되어야 합니다.");
  });

  fireEvent.keyDown(resizeHandle, { key: "ArrowLeft", shiftKey: true });
  await waitFor(() => {
    if (resizeHandle.getAttribute("aria-valuenow") !== "128") throw new Error(`너비는 128이어야 합니다. 실제 값: ${resizeHandle.getAttribute("aria-valuenow")}`);
  });

  fireEvent.keyDown(resizeHandle, { key: "Home" });
  await waitFor(() => {
    if (resizeHandle.getAttribute("aria-valuenow") !== "120") throw new Error(`최소 너비는 120이어야 합니다. 실제 값: ${resizeHandle.getAttribute("aria-valuenow")}`);
  });

  fireEvent.keyDown(resizeHandle, { key: "End" });
  await waitFor(() => {
    if (resizeHandle.getAttribute("aria-valuenow") !== "220") throw new Error(`최대 너비는 220이어야 합니다. 실제 값: ${resizeHandle.getAttribute("aria-valuenow")}`);
  });
});

if (failures.length > 0) {
  console.error(failures.join("\n\n"));
  process.exit(1);
}

console.log("상호작용 접근성 검증 완료.");
