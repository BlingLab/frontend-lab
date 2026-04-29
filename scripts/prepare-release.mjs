import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const version = process.argv[2];

if (!version || !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)) {
  console.error("사용법: npm run release:prepare -- 0.2.0 / Usage: npm run release:prepare -- 0.2.0");
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const uiPackagePath = join(rootDir, "packages", "ui", "package.json");
const uiPackage = JSON.parse(await readFile(uiPackagePath, "utf8"));
uiPackage.version = version;
await writeFile(uiPackagePath, `${JSON.stringify(uiPackage, null, 2)}\n`);

const changelogPath = join(rootDir, "CHANGELOG.md");
const changelog = await readFile(changelogPath, "utf8");
if (!changelog.includes("## Unreleased")) {
  console.error("CHANGELOG.md에 Unreleased 섹션이 없습니다. / CHANGELOG.md is missing the Unreleased section.");
  process.exit(1);
}

const nextChangelog = changelog.replace(
  "## Unreleased",
  `## Unreleased\n\n### Added\n\n- 다음 릴리즈 변경 사항을 기록합니다. / Record changes for the next release.\n\n## ${version} - ${today}`
);
await writeFile(changelogPath, nextChangelog);

console.log(`릴리즈 ${version} 준비 완료. npm install --package-lock-only를 실행해 lockfile을 갱신하세요. / Release ${version} prepared. Run npm install --package-lock-only to update the lockfile.`);
