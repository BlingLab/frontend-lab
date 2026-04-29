import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const ignoredDirectories = new Set([".git", "node_modules", "dist", "artifacts", "coverage"]);
const scopeRules = [
  { name: "TypeScript/JavaScript", extensions: [".ts", ".tsx", ".mjs", ".js"] },
  { name: "CSS", extensions: [".css"] },
  { name: "Markdown", extensions: [".md"] },
  { name: "JSON/YAML", extensions: [".json", ".yml", ".yaml"] }
];
const failures = [];

function getScope(filePath) {
  return scopeRules.find((scope) => scope.extensions.some((extension) => filePath.endsWith(extension)));
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) continue;
      files.push(...await collectFiles(join(directory, entry.name)));
      continue;
    }
    if (entry.isFile()) files.push(join(directory, entry.name));
  }
  return files;
}

const files = (await collectFiles(rootDir)).filter((filePath) => getScope(filePath));
const scopeCounts = new Map(scopeRules.map((scope) => [scope.name, 0]));

for (const filePath of files) {
  const scope = getScope(filePath);
  scopeCounts.set(scope.name, (scopeCounts.get(scope.name) ?? 0) + 1);
  const relativePath = relative(rootDir, filePath);
  const content = await readFile(filePath, "utf8");
  const lines = content.split("\n");

  if (content.includes("\r\n")) {
    failures.push(`${relativePath}: CRLF 줄바꿈을 사용합니다. / Uses CRLF line endings.`);
  }
  if (/^(<<<<<<< |=======|>>>>>>> )/m.test(content)) {
    failures.push(`${relativePath}: merge conflict marker가 남아 있습니다. / Contains merge conflict markers.`);
  }
  if (!content.endsWith("\n")) {
    failures.push(`${relativePath}: 파일 끝 newline이 없습니다. / Missing trailing newline.`);
  }

  lines.forEach((line, index) => {
    if (/[ \t]+$/.test(line)) {
      failures.push(`${relativePath}:${index + 1}: trailing whitespace가 있습니다. / Contains trailing whitespace.`);
    }
    if (scope.name !== "Markdown" && /^\t+/.test(line)) {
      failures.push(`${relativePath}:${index + 1}: tab indentation을 사용합니다. / Uses tab indentation.`);
    }
  });
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

const summary = Array.from(scopeCounts.entries())
  .map(([scopeName, count]) => `${scopeName} ${count}`)
  .join(", ");
console.log(`품질 게이트 검증 완료: ${summary}. / Quality gates passed: ${summary}.`);
