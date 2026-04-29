import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const failures = [];

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function mustExist(label, path) {
  try {
    await access(path);
  } catch {
    failures.push(`${label} 파일이 없습니다. / Missing ${label} file: ${path}`);
  }
}

const rootPackage = await readJson(join(rootDir, "package.json"));
const uiPackage = await readJson(join(rootDir, "packages", "ui", "package.json"));
const changelog = await readFile(join(rootDir, "CHANGELOG.md"), "utf8");

const requiredRootScripts = ["test", "typecheck", "test:consumer", "test:tokens", "test:types", "test:visual", "release:dry-run"];
for (const scriptName of requiredRootScripts) {
  if (!rootPackage.scripts?.[scriptName]) {
    failures.push(`${scriptName} script가 package.json에 없습니다. / ${scriptName} script is missing from package.json.`);
  }
}

if (!uiPackage.peerDependencies?.react || !uiPackage.peerDependencies?.["react-dom"]) {
  failures.push("React peer dependency가 누락되었습니다. / React peer dependencies are missing.");
}

if (!uiPackage.files?.includes("dist") || !uiPackage.files?.includes("README.md")) {
  failures.push("packages/ui files 목록에 dist와 README.md가 필요합니다. / packages/ui files must include dist and README.md.");
}

await mustExist("UI dist index", join(rootDir, "packages", "ui", "dist", "index.js"));
await mustExist("UI dist types", join(rootDir, "packages", "ui", "dist", "index.d.ts"));
await mustExist("UI dist styles", join(rootDir, "packages", "ui", "dist", "styles.css"));

const unreleasedMatch = changelog.match(/## Unreleased([\s\S]*?)(?:\n## |\n$)/);
if (!unreleasedMatch) {
  failures.push("CHANGELOG.md에 Unreleased 섹션이 없습니다. / CHANGELOG.md is missing the Unreleased section.");
} else if (!/- .+ \/ .+/.test(unreleasedMatch[1])) {
  failures.push("CHANGELOG.md Unreleased에 한글/영문 병기 항목이 필요합니다. / CHANGELOG.md Unreleased needs Korean/English paired entries.");
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("릴리즈 메타데이터 검증 완료. / Release metadata checks passed.");
