import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { componentCatalog } from "../packages/ui/src/components/catalog.ts";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const uiDir = join(rootDir, "packages", "ui");
const packageJson = JSON.parse(await readFile(join(uiDir, "package.json"), "utf8"));
const failures = [];

async function mustExist(label, path) {
  try {
    await access(path);
  } catch {
    failures.push(`${label} 파일이 없습니다. / Missing ${label} file: ${path}`);
  }
}

await mustExist("root import", join(uiDir, packageJson.exports["."].import));
await mustExist("root types", join(uiDir, packageJson.exports["."].types));
await mustExist("catalog import", join(uiDir, packageJson.exports["./components/catalog"].import));
await mustExist("catalog types", join(uiDir, packageJson.exports["./components/catalog"].types));
await mustExist("styles", join(uiDir, packageJson.exports["./styles.css"]));

for (const component of componentCatalog) {
  const entryBase = join(uiDir, "dist", "components", component.category, component.slug);
  await mustExist(`${component.name} import`, join(entryBase, "index.js"));
  await mustExist(`${component.name} types`, join(entryBase, "index.d.ts"));
}

const ui = await import("../packages/ui/dist/index.js");
for (const component of componentCatalog) {
  if (!(component.name in ui)) {
    failures.push(`${component.name} root export가 없습니다. / Missing root export: ${component.name}`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`패키지 export 검증 완료: ${componentCatalog.length}개 component entry. / Package exports verified: ${componentCatalog.length} component entries.`);
