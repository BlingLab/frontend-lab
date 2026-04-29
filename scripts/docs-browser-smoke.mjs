import { spawn } from "node:child_process";
import { chromium } from "playwright";

const port = Number(process.env.DOCS_SMOKE_PORT ?? 4174);
const baseUrl = `http://127.0.0.1:${port}`;
const pageTimeout = 10_000;
const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 960 }
];
const layoutContainers = [
  ".intro",
  ".intro-actions",
  ".metrics-grid",
  ".theme-control",
  ".theme-compare",
  ".theme-preview-grid",
  ".responsive-layout",
  ".responsive-matrix",
  ".docs-explorer",
  ".component-card",
  ".preview"
];
const requiredSelectors = [
  ".sidebar",
  ".content",
  ".intro",
  ".intro-panel",
  ".theme-control",
  ".theme-compare",
  ".responsive-layout",
  ".docs-explorer",
  ".preview"
];
const failures = [];

function startDocsServer() {
  return spawn("npm", ["--workspace", "@workspace/docs", "run", "dev", "--", "--host", "127.0.0.1", "--port", String(port)], {
    env: { ...process.env, BROWSER: "none" },
    detached: process.platform !== "win32",
    stdio: ["ignore", "pipe", "pipe"]
  });
}

async function stopDocsServer(server) {
  if (server.exitCode !== null) return;
  if (process.platform === "win32" || !server.pid) {
    server.kill("SIGTERM");
  } else {
    process.kill(-server.pid, "SIGTERM");
  }
  await Promise.race([
    new Promise((resolve) => server.once("exit", resolve)),
    new Promise((resolve) => setTimeout(resolve, 3_000))
  ]);
}

async function waitForServer(server) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < 30_000) {
    if (server.exitCode !== null) break;
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  throw new Error("문서 앱 서버가 30초 안에 시작되지 않았습니다. / Docs app server did not start within 30 seconds.");
}

async function assertResponsiveLayout(page, viewport) {
  const result = await page.evaluate(({ containers, required }) => {
    const viewportWidth = window.innerWidth;
    const documentWidth = document.documentElement.scrollWidth;
    const requiredRects = required.map((selector) => {
      const element = document.querySelector(selector);
      const rect = element?.getBoundingClientRect();
      return {
        rect: rect ? {
          bottom: rect.bottom,
          height: rect.height,
          left: rect.left,
          right: rect.right,
          top: rect.top,
          width: rect.width
        } : null,
        selector
      };
    });
    const overlapGroups = containers.flatMap((selector) => {
      const container = document.querySelector(selector);
      if (!container) return [];
      const children = [...container.children].filter((child) => {
        const rect = child.getBoundingClientRect();
        const style = window.getComputedStyle(child);
        return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
      });

      return children.flatMap((child, childIndex) => {
        const firstRect = child.getBoundingClientRect();
        return children.slice(childIndex + 1).flatMap((nextChild) => {
          const secondRect = nextChild.getBoundingClientRect();
          const horizontalOverlap = Math.min(firstRect.right, secondRect.right) - Math.max(firstRect.left, secondRect.left);
          const verticalOverlap = Math.min(firstRect.bottom, secondRect.bottom) - Math.max(firstRect.top, secondRect.top);
          if (horizontalOverlap <= 2 || verticalOverlap <= 2) return [];
          return [{
            first: child.textContent?.trim().replace(/\s+/g, " ").slice(0, 60) || child.className,
            second: nextChild.textContent?.trim().replace(/\s+/g, " ").slice(0, 60) || nextChild.className,
            selector,
            x: Math.round(horizontalOverlap),
            y: Math.round(verticalOverlap)
          }];
        });
      });
    });

    return {
      documentOverflow: documentWidth - viewportWidth,
      overlapGroups,
      requiredRects
    };
  }, { containers: layoutContainers, required: requiredSelectors });

  if (result.documentOverflow > 4) {
    failures.push(`${viewport.name}: page horizontal overflow ${result.documentOverflow}px. / Page has horizontal overflow ${result.documentOverflow}px.`);
  }

  for (const item of result.requiredRects) {
    if (!item.rect) {
      failures.push(`${viewport.name}: ${item.selector} selector를 찾지 못했습니다. / ${item.selector} selector was not found.`);
      continue;
    }
    if (item.rect.width <= 0 || item.rect.height <= 0) {
      failures.push(`${viewport.name}: ${item.selector} 영역이 비어 있습니다. / ${item.selector} has an empty layout box.`);
    }
    if (item.rect.left < -4 || item.rect.right > viewport.width + 4) {
      failures.push(`${viewport.name}: ${item.selector}가 viewport 밖으로 벗어났습니다. / ${item.selector} extends outside the viewport.`);
    }
  }

  for (const overlap of result.overlapGroups) {
    failures.push(`${viewport.name}: ${overlap.selector} child overlap ${overlap.x}x${overlap.y} (${overlap.first} / ${overlap.second}). / ${overlap.selector} children overlap.`);
  }
}

async function assertThemeSwitch(page) {
  await page.goto(`${baseUrl}/#themes`, { waitUntil: "domcontentloaded", timeout: pageTimeout });
  await page.waitForLoadState("networkidle", { timeout: 1_000 }).catch(() => undefined);

  const before = await page.locator(".shell").evaluate((element) => getComputedStyle(element).backgroundColor);
  await page.getByRole("button", { name: /DARK/ }).first().click();
  await page.waitForFunction(() => document.documentElement.dataset.dsTheme === "dark");
  const afterDark = await page.locator(".shell").evaluate((element) => getComputedStyle(element).backgroundColor);
  const shellTheme = await page.locator(".shell").evaluate((element) => element.getAttribute("data-ds-theme"));
  if (shellTheme !== "dark") {
    failures.push("theme switch: `.shell` data-ds-theme가 dark로 바뀌지 않았습니다. / `.shell` data-ds-theme did not switch to dark.");
  }
  if (before === afterDark) {
    failures.push("theme switch: DARK 적용 후 shell background가 바뀌지 않았습니다. / Shell background did not change after applying DARK.");
  }

  await page.getByRole("button", { name: /NORMAL/ }).first().click();
  await page.waitForFunction(() => document.documentElement.dataset.dsTheme === "normal");
}

async function getFocusedElementState(page) {
  return page.evaluate(() => {
    const element = document.activeElement;
    if (!(element instanceof HTMLElement)) return { label: "", tagName: "", visible: false, withinViewport: false };
    const rect = element.getBoundingClientRect();
    const style = window.getComputedStyle(element);
    return {
      label: element.textContent?.trim().replace(/\s+/g, " ").slice(0, 80) || element.getAttribute("aria-label") || "",
      rect: {
        bottom: Math.round(rect.bottom),
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        top: Math.round(rect.top)
      },
      tagName: element.tagName,
      visible: rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none",
      withinViewport: rect.top >= -4 && rect.left >= -4 && rect.bottom <= window.innerHeight + 4 && rect.right <= window.innerWidth + 4
    };
  });
}

async function assertNaturalTabEntry(browser) {
  const focusContext = await browser.newContext();

  try {
    for (const url of [`${baseUrl}/`, `${baseUrl}/#components`]) {
      const focusPage = await focusContext.newPage();
      focusPage.setDefaultTimeout(pageTimeout);
      focusPage.setDefaultNavigationTimeout(pageTimeout);
      await focusPage.setViewportSize({ width: 1440, height: 960 });
      await focusPage.goto(url, { waitUntil: "domcontentloaded", timeout: pageTimeout });
      await focusPage.waitForLoadState("networkidle", { timeout: 1_000 }).catch(() => undefined);

      if (url.includes("#components")) {
        await focusPage.waitForFunction(() => document.activeElement?.id === "components");
        await focusPage.waitForFunction(() => {
          const target = document.getElementById("components");
          const rect = target?.getBoundingClientRect();
          return rect && rect.top >= -4 && rect.top <= 120;
        });
        await focusPage.keyboard.press("Tab");
        await focusPage.waitForTimeout(120);
        const hashFocus = await getFocusedElementState(focusPage);
        if (!hashFocus.visible || !hashFocus.withinViewport) {
          failures.push(`natural tab: hash route 이후 Tab이 visible focus로 이동하지 않았습니다. / Tab after hash route did not move to visible focus: ${JSON.stringify({ hashFocus, url })}`);
        }
        await focusPage.close();
        continue;
      }

      await focusPage.keyboard.press("Tab");
      await focusPage.waitForTimeout(120);

      const firstFocus = await getFocusedElementState(focusPage);
      const isSkipLink = firstFocus.label.includes("본문으로 이동") || firstFocus.label.includes("Skip to content");
      if (!isSkipLink || !firstFocus.visible || !firstFocus.withinViewport) {
        failures.push(`natural tab: 첫 Tab이 visible skip link로 이동하지 않았습니다. / First Tab did not move to a visible skip link: ${JSON.stringify({ firstFocus, url })}`);
      }

      await focusPage.keyboard.press("Enter");
      await focusPage.waitForTimeout(100);
      const skippedFocus = await getFocusedElementState(focusPage);
      const mainTopVisible = skippedFocus.rect && skippedFocus.rect.top >= -4 && skippedFocus.rect.top <= 4;
      if (skippedFocus.tagName !== "MAIN" || !skippedFocus.visible || !mainTopVisible) {
        failures.push(`natural tab: skip link가 main content focus로 이동하지 않았습니다. / Skip link did not move focus to main content: ${JSON.stringify({ skippedFocus, url })}`);
      }
      await focusPage.close();
    }
  } finally {
    await focusContext.close();
  }
}

async function assertTabFocus(browser) {
  const focusContext = await browser.newContext();
  const focusPage = await focusContext.newPage();
  focusPage.setDefaultTimeout(pageTimeout);
  focusPage.setDefaultNavigationTimeout(pageTimeout);
  await focusPage.setViewportSize({ width: 1440, height: 960 });
  await focusPage.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded", timeout: pageTimeout });
  await focusPage.waitForLoadState("networkidle", { timeout: 1_000 }).catch(() => undefined);
  await focusPage.locator(".nav a").first().focus();

  const focusSteps = [];
  try {
    for (let index = 0; index < 9; index += 1) {
      if (index > 0) {
        await focusPage.keyboard.press("Tab");
        await focusPage.waitForTimeout(50);
      }
      focusSteps.push(await getFocusedElementState(focusPage));
    }
  } finally {
    await focusContext.close();
  }

  const navSteps = focusSteps.slice(0, 8);
  const invalidSteps = navSteps.filter((step) => step.tagName === "BODY" || !step.visible || !step.withinViewport);
  const reachedPrimaryAction = focusSteps.some((step) => step.label.includes("컴포넌트 보기") || step.label.includes("View components"));
  if (invalidSteps.length > 0) {
    failures.push(`tab focus: 보이지 않거나 viewport 밖인 focus step이 있습니다. / Some Tab focus steps are invisible or outside the viewport: ${JSON.stringify({ invalidSteps, focusSteps })}`);
  }
  if (!reachedPrimaryAction) {
    failures.push(`tab focus: 상단 navigation에서 primary action까지 도달하지 못했습니다. / Tab focus did not reach the primary action from the top navigation: ${JSON.stringify(focusSteps)}`);
  }
}

const server = startDocsServer();
let browser;

try {
  await waitForServer(server);
  browser = await chromium.launch();
  const page = await browser.newPage();
  page.setDefaultTimeout(pageTimeout);
  page.setDefaultNavigationTimeout(pageTimeout);

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: pageTimeout });
    await page.waitForLoadState("networkidle", { timeout: 1_000 }).catch(() => undefined);
    await assertResponsiveLayout(page, viewport);
  }

  await assertThemeSwitch(page);
  await assertNaturalTabEntry(browser);
  await assertTabFocus(browser);
} finally {
  await browser?.close();
  await stopDocsServer(server);
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`문서 앱 browser smoke 검증 완료: viewport ${viewports.length}개, theme switch, Tab focus. / Docs app browser smoke passed: ${viewports.length} viewports, theme switch, and Tab focus.`);
