import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const uiPackage = JSON.parse(await readFile(join(rootDir, "packages", "ui", "package.json"), "utf8"));
const failures = [];
const expectedPackageName = process.env.NPM_PUBLISH_PACKAGE_NAME;

if (uiPackage.name === "@workspace/ui") {
  failures.push("실제 publish 전에 packages/ui package name을 조직 scope로 바꿔야 합니다. / Change packages/ui package name to the organization scope before real publish.");
}

if (!/^@[a-z0-9][a-z0-9-]*\/[a-z0-9][a-z0-9-]*$/.test(uiPackage.name)) {
  failures.push("npm publish package name은 조직 scope 형식이어야 합니다. 예: @bling-lab/ui / npm publish package name must use an organization scope, for example @bling-lab/ui.");
}

if (expectedPackageName && uiPackage.name !== expectedPackageName) {
  failures.push(`package name이 NPM_PUBLISH_PACKAGE_NAME과 다릅니다. / Package name does not match NPM_PUBLISH_PACKAGE_NAME: ${uiPackage.name} !== ${expectedPackageName}`);
}

if (uiPackage.private !== false) {
  failures.push("실제 publish 전에 packages/ui private flag를 false로 명시해야 합니다. / Set packages/ui private flag explicitly to false before real publish.");
}

if (uiPackage.publishConfig?.registry !== "https://registry.npmjs.org/") {
  failures.push("publishConfig.registry는 npm public registry여야 합니다. / publishConfig.registry must target the npm public registry.");
}

if (uiPackage.publishConfig?.access !== "public") {
  failures.push("publishConfig.access는 public이어야 합니다. / publishConfig.access must be public.");
}

if (uiPackage.publishConfig?.provenance !== true) {
  failures.push("publishConfig.provenance는 true여야 합니다. / publishConfig.provenance must be true.");
}

if (!process.env.NODE_AUTH_TOKEN) {
  failures.push("publish에는 NODE_AUTH_TOKEN이 필요합니다. / Publish requires NODE_AUTH_TOKEN.");
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("publish 준비 조건 검증 완료. / Publish readiness checks passed.");
