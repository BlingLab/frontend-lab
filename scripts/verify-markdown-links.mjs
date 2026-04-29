import { access, readdir, readFile } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const ignoredDirectories = new Set([".git", "node_modules", "dist", "artifacts", "coverage"]);
const failures = [];

async function collectMarkdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) continue;
      files.push(...await collectMarkdownFiles(join(directory, entry.name)));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(join(directory, entry.name));
    }
  }
  return files;
}

function isSkippedTarget(target) {
  return target === "" || target.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(target);
}

function normalizeTarget(rawTarget) {
  const trimmedTarget = rawTarget.trim();
  const targetWithoutTitle = trimmedTarget.startsWith("<")
    ? trimmedTarget.replace(/^<([^>]+)>.*$/, "$1")
    : trimmedTarget.split(/\s+/)[0];
  const targetWithoutHash = targetWithoutTitle.split("#")[0];
  try {
    return decodeURIComponent(targetWithoutHash);
  } catch {
    return targetWithoutHash;
  }
}

function extractMarkdownLinks(content) {
  const links = [];
  for (let index = 0; index < content.length; index += 1) {
    if (content[index] !== "[" || content[index - 1] === "!") continue;
    const labelEnd = content.indexOf("](", index);
    if (labelEnd === -1) continue;

    let cursor = labelEnd + 2;
    let depth = 1;
    let target = "";
    while (cursor < content.length && depth > 0) {
      const character = content[cursor];
      if (character === "(") depth += 1;
      if (character === ")") depth -= 1;
      if (depth > 0) target += character;
      cursor += 1;
    }

    if (depth === 0) {
      const line = content.slice(0, index).split("\n").length;
      links.push({ line, target: target.trim() });
      index = cursor - 1;
    }
  }
  return links;
}

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function isInsideRoot(path) {
  const relativePath = relative(rootDir, path);
  return relativePath === "" || (!relativePath.startsWith("..") && !isAbsolute(relativePath));
}

const markdownFiles = await collectMarkdownFiles(rootDir);

for (const filePath of markdownFiles) {
  const content = await readFile(filePath, "utf8");
  const links = extractMarkdownLinks(content);
  const relativeFilePath = relative(rootDir, filePath);

  for (const link of links) {
    if (isSkippedTarget(link.target)) continue;

    const normalizedTarget = normalizeTarget(link.target);
    if (isSkippedTarget(normalizedTarget)) continue;

    const absoluteTarget = resolve(dirname(filePath), normalizedTarget);
    if (!isInsideRoot(absoluteTarget)) {
      failures.push(`${relativeFilePath}:${link.line}: repo 밖 Markdown link는 허용하지 않습니다. / Markdown link target outside the repo is not allowed: ${link.target}`);
      continue;
    }

    if (!await pathExists(absoluteTarget)) {
      failures.push(`${relativeFilePath}:${link.line}: Markdown link 대상이 없습니다. / Markdown link target does not exist: ${link.target}`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Markdown 내부 링크 검증 완료: ${markdownFiles.length}개 파일. / Markdown internal links passed: ${markdownFiles.length} files.`);
