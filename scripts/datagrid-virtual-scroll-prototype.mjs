import { JSDOM } from "jsdom";
import React, { useMemo, useState } from "react";
import { performance } from "node:perf_hooks";

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  pretendToBeVisual: true,
  url: "http://localhost/"
});

globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.KeyboardEvent = dom.window.KeyboardEvent;
globalThis.Node = dom.window.Node;
Object.defineProperty(globalThis, "navigator", {
  configurable: true,
  value: dom.window.navigator
});
globalThis.requestAnimationFrame = dom.window.requestAnimationFrame.bind(dom.window);
globalThis.cancelAnimationFrame = dom.window.cancelAnimationFrame.bind(dom.window);

const { cleanup, fireEvent, render, screen, waitFor } = await import("@testing-library/react");
const { DataGrid } = await import("../packages/ui/dist/index.js");

const failures = [];
const totalRows = 1_000;
const windowSize = 40;
const overscan = 4;
const virtualNavigationIterations = 120;
const localVirtualNavigationBudgetMs = 300;
const ciVirtualNavigationBudgetMs = 600;
const virtualNavigationBudgetMs = process.env.CI ? ciVirtualNavigationBudgetMs : localVirtualNavigationBudgetMs;
const columns = [
  { key: "name", label: "이름 / Name" },
  { key: "status", label: "상태 / Status" },
  { key: "owner", label: "담당 / Owner" }
];
const largeRows = Array.from({ length: totalRows }, (_, index) => ({
  id: `row-${index + 1}`,
  name: `항목 ${index + 1} / Item ${index + 1}`,
  status: index % 2 === 0 ? "준비 / Ready" : "대기 / Waiting",
  owner: index % 3 === 0 ? "디자인 / Design" : "프론트엔드 / Frontend"
}));

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

function getWindowRange(activeIndex, scrollStart) {
  let nextStart = scrollStart;
  const visibleEnd = scrollStart + windowSize - 1;
  if (activeIndex < scrollStart) nextStart = Math.max(0, activeIndex - overscan);
  if (activeIndex > visibleEnd) nextStart = Math.min(totalRows - windowSize, activeIndex - windowSize + 1 + overscan);
  return {
    start: nextStart,
    end: Math.min(totalRows, nextStart + windowSize)
  };
}

function VirtualGridPrototype() {
  const [activeIndex, setActiveIndex] = useState(100);
  const [scrollStart, setScrollStart] = useState(100);
  const [selectedKeys, setSelectedKeys] = useState(["row-101"]);
  const range = getWindowRange(activeIndex, scrollStart);
  const visibleRows = useMemo(() => largeRows.slice(range.start, range.end), [range.start, range.end]);
  const activeKey = largeRows[activeIndex]?.id;

  const moveActive = (nextIndex) => {
    const clampedIndex = Math.min(Math.max(nextIndex, 0), totalRows - 1);
    const nextRange = getWindowRange(clampedIndex, scrollStart);
    setActiveIndex(clampedIndex);
    setScrollStart(nextRange.start);
  };

  const toggleActiveSelection = () => {
    setSelectedKeys((currentKeys) => {
      if (currentKeys.includes(activeKey)) return currentKeys.filter((key) => key !== activeKey);
      return [...currentKeys, activeKey];
    });
  };

  return React.createElement(
    "section",
    null,
    React.createElement("p", { role: "status" }, `${range.start + 1}-${range.end}행 / 전체 ${totalRows}행`),
    React.createElement(
      "div",
      {
        role: "grid",
        tabIndex: 0,
        "aria-label": "가상 DataGrid 프로토타입 / Virtual DataGrid prototype",
        "aria-rowcount": totalRows + 1,
        "aria-colcount": columns.length,
        "aria-activedescendant": activeKey,
        onKeyDown: (event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            moveActive(activeIndex + 1);
          }
          if (event.key === "ArrowUp") {
            event.preventDefault();
            moveActive(activeIndex - 1);
          }
          if (event.key === "Home") {
            event.preventDefault();
            moveActive(0);
          }
          if (event.key === "End") {
            event.preventDefault();
            moveActive(totalRows - 1);
          }
          if (event.key === " ") {
            event.preventDefault();
            toggleActiveSelection();
          }
        }
      },
      React.createElement(
        "div",
        { role: "row", "aria-rowindex": 1 },
        columns.map((column, index) => React.createElement("span", { key: column.key, role: "columnheader", "aria-colindex": index + 1 }, column.label))
      ),
      visibleRows.map((row, visibleIndex) => {
        const absoluteIndex = range.start + visibleIndex;
        const selected = selectedKeys.includes(row.id);
        return React.createElement(
          "div",
          {
            id: row.id,
            key: row.id,
            role: "row",
            "aria-rowindex": absoluteIndex + 2,
            "aria-selected": selected ? "true" : "false",
            "data-active": absoluteIndex === activeIndex ? "true" : undefined
          },
          columns.map((column, index) => React.createElement("span", { key: column.key, role: "gridcell", "aria-colindex": index + 1 }, row[column.key]))
        );
      })
    )
  );
}

await check("DataGrid large dataset baseline smoke", async () => {
  const startedAt = performance.now();
  render(React.createElement(DataGrid, {
    caption: "대량 데이터 기준 / Large dataset baseline",
    columns,
    rows: largeRows.slice(0, 500),
    rowKey: (row) => row.id,
    selectionMode: "multiple",
    defaultSelectedRowKeys: ["row-1"],
    defaultActiveRowKey: "row-1"
  }));
  const elapsed = performance.now() - startedAt;
  const grid = screen.getByRole("grid", { name: "대량 데이터 기준 / Large dataset baseline" });
  if (grid.getAttribute("aria-rowcount") !== "500") throw new Error("Expected current DataGrid to expose the rendered row count.");
  if (grid.getAttribute("aria-colcount") !== "4") throw new Error("Expected selection column to be included in aria-colcount.");
  if (elapsed > 1_500) throw new Error(`Expected 500 row render smoke under 1500ms, received ${elapsed.toFixed(1)}ms.`);
});

await check("Virtual scroll ARIA window strategy", async () => {
  render(React.createElement(VirtualGridPrototype));
  const grid = screen.getByRole("grid", { name: "가상 DataGrid 프로토타입 / Virtual DataGrid prototype" });
  if (grid.getAttribute("aria-rowcount") !== "1001") throw new Error("Expected aria-rowcount to include the header row and all data rows.");
  if (grid.getAttribute("aria-activedescendant") !== "row-101") throw new Error("Expected active descendant to point at the active row key.");
  if (!screen.getByText("101-140행 / 전체 1000행")) throw new Error("Expected visible status text to describe the current virtual window.");

  const activeRow = document.getElementById("row-101");
  if (activeRow?.getAttribute("aria-rowindex") !== "102") throw new Error("Expected virtual row aria-rowindex to reflect the absolute row position.");
  if (activeRow?.getAttribute("aria-selected") !== "true") throw new Error("Expected selected state to survive virtual row rendering.");
});

await check("Virtual scroll keyboard and selection persistence", async () => {
  render(React.createElement(VirtualGridPrototype));
  const grid = screen.getByRole("grid", { name: "가상 DataGrid 프로토타입 / Virtual DataGrid prototype" });
  grid.focus();
  for (let index = 0; index < 45; index += 1) {
    fireEvent.keyDown(grid, { key: "ArrowDown" });
  }

  await waitFor(() => {
    if (grid.getAttribute("aria-activedescendant") !== "row-146") throw new Error(`Expected active row row-146, received ${grid.getAttribute("aria-activedescendant")}.`);
    if (!document.getElementById("row-146")) throw new Error("Expected active row to remain mounted after window shift.");
    if (!screen.getByRole("status").textContent?.includes("111-150행")) throw new Error(`Expected window status to shift around active row, received ${screen.getByRole("status").textContent}.`);
  });

  fireEvent.keyDown(grid, { key: " " });
  await waitFor(() => {
    const selectedRow = document.getElementById("row-146");
    if (selectedRow?.getAttribute("aria-selected") !== "true") throw new Error("Expected Space to persist selection by row key.");
  });
});

await check("Virtual scroll window update performance", async () => {
  render(React.createElement(VirtualGridPrototype));
  const grid = screen.getByRole("grid", { name: "가상 DataGrid 프로토타입 / Virtual DataGrid prototype" });
  const startedAt = performance.now();
  for (let index = 0; index < virtualNavigationIterations; index += 1) {
    fireEvent.keyDown(grid, { key: "ArrowDown" });
  }
  await waitFor(() => {
    if (grid.getAttribute("aria-activedescendant") !== "row-221") throw new Error("Expected repeated keyboard navigation to finish at row-221.");
  });
  const elapsed = performance.now() - startedAt;
  if (elapsed > virtualNavigationBudgetMs) {
    throw new Error(`${virtualNavigationIterations}회 가상 navigation update가 ${virtualNavigationBudgetMs}ms 안에 끝나야 합니다. / Expected ${virtualNavigationIterations} virtual navigation updates under ${virtualNavigationBudgetMs}ms, received ${elapsed.toFixed(1)}ms.`);
  }
});

if (failures.length > 0) {
  console.error(failures.join("\n\n"));
  process.exit(1);
}

console.log("DataGrid 가상 스크롤 ARIA/성능 프로토타입 검증 완료. / DataGrid virtual scroll ARIA/performance prototype checks passed.");
