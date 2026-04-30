import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const uiPackage = JSON.parse(await readFile(join(rootDir, "packages", "ui", "package.json"), "utf8"));
const failures = [];

if (uiPackage.name === "@workspace/ui") {
  failures.push("실제 publish 전에 packages/ui package name을 조직 scope로 바꿔야 합니다. / Change packages/ui package name to the organization scope before real publish.");
}

if (uiPackage.private !== false) {
  failures.push("실제 publish 전에 packages/ui private flag를 false로 명시해야 합니다. / Set packages/ui private flag explicitly to false before real publish.");
}

if (!process.env.NODE_AUTH_TOKEN) {
  failures.push("publish에는 NODE_AUTH_TOKEN이 필요합니다. / Publish requires NODE_AUTH_TOKEN.");
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("publish 준비 조건 검증 완료. / Publish readiness checks passed.");
