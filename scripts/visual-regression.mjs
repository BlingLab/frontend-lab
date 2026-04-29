import { mkdir, rm, stat } from "node:fs/promises";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const port = 4173;
const baseUrl = `http://127.0.0.1:${port}`;
const outputDir = join("artifacts", "visual-regression");
const pageTimeout = 10_000;
const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 960 }
];
const themes = ["normal", "dark"];
const targets = [
  { name: "home", hash: "", selector: ".intro" },
  { name: "theme-compare", hash: "#themes", selector: ".theme-compare" },
  { name: "data-grid", hash: "#component-data-grid", selector: "#component-data-grid" }
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

async function assertLayout(page, target) {
  const result = await page.evaluate((selector) => {
    const targetElement = document.querySelector(selector);
    const targetRect = targetElement?.getBoundingClientRect();
    const root = document.documentElement;
    return {
      hasTarget: Boolean(targetElement),
      targetWidth: targetRect?.width ?? 0,
      targetHeight: targetRect?.height ?? 0,
      pageOverflow: root.scrollWidth - window.innerWidth
    };
  }, target.selector);

  if (!result.hasTarget) failures.push(`${target.name}: 대상 selector를 찾지 못했습니다. / Target selector was not found.`);
  if (result.targetWidth <= 0 || result.targetHeight <= 0) failures.push(`${target.name}: screenshot 대상 크기가 비어 있습니다. / Screenshot target has an empty size.`);
  if (result.pageOverflow > 4) failures.push(`${target.name}: page horizontal overflow ${result.pageOverflow}px. / Page has horizontal overflow ${result.pageOverflow}px.`);
}

async function captureTarget(page, target, viewport, theme) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.goto(`${baseUrl}/${target.hash}`, { waitUntil: "domcontentloaded", timeout: pageTimeout });
  await page.waitForLoadState("networkidle", { timeout: 1_000 }).catch(() => undefined);
  await page.evaluate((themeId) => {
    document.documentElement.dataset.dsTheme = themeId;
    document.querySelector(".shell")?.setAttribute("data-ds-theme", themeId);
  }, theme);

  const locator = page.locator(target.selector).first();
  await locator.waitFor({ state: "visible" });
  await assertLayout(page, target);

  const screenshotPath = join(outputDir, `${target.name}-${viewport.name}-${theme}.png`);
  await locator.screenshot({ path: screenshotPath, animations: "disabled" });
  const screenshotStat = await stat(screenshotPath);
  if (screenshotStat.size < 5_000) {
    failures.push(`${target.name}/${viewport.name}/${theme}: screenshot 파일이 너무 작습니다. / Screenshot file is unexpectedly small.`);
  }
}

await rm(outputDir, { force: true, recursive: true });
await mkdir(outputDir, { recursive: true });

const server = startDocsServer();
let browser;

try {
  await waitForServer(server);
  browser = await chromium.launch();
  const page = await browser.newPage();
  page.setDefaultTimeout(pageTimeout);
  page.setDefaultNavigationTimeout(pageTimeout);

  for (const viewport of viewports) {
    for (const theme of themes) {
      for (const target of targets) {
        await captureTarget(page, target, viewport, theme);
      }
    }
  }
} finally {
  await browser?.close();
  await stopDocsServer(server);
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`시각 회귀 screenshot ${viewports.length * themes.length * targets.length}개를 생성했습니다. / Generated ${viewports.length * themes.length * targets.length} visual regression screenshots.`);
