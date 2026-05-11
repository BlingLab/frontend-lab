import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { componentCatalog } from "../packages/ui/src/components/catalog.ts";
import { renderComponentPropTable } from "../packages/ui/src/components/prop-docs.ts";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const checkOnly = process.argv.includes("--check") || process.argv.includes("--dry-run");

function renderBlock(component) {
  return `## Prop 표\n\n${renderComponentPropTable(component)}\n`;
}

function upsertPropTable(content, component) {
  const block = renderBlock(component);
  const propTablePattern = /## Prop 표(?: \/ Prop Table)?\n\n[\s\S]*?(?=\n## |$)/;
  if (propTablePattern.test(content)) {
    return content.replace(propTablePattern, `${block.trimEnd()}\n`);
  }

  const propAxesPattern = /(## Prop 축(?: \/ Prop Axes)?\n\n[\s\S]*?)(?=\n## |$)/;
  if (propAxesPattern.test(content)) {
    return content.replace(propAxesPattern, (match) => `${match.trimEnd()}\n\n${block}`);
  }

  const apiSurfacePattern = /(## API 표면(?: \/ API Surface)?\n\n[\s\S]*?)(?=\n## |$)/;
  if (apiSurfacePattern.test(content)) {
    return content.replace(apiSurfacePattern, (match) => `${match.trimEnd()}\n\n${block}`);
  }

  return `${content.trimEnd()}\n\n${block}`;
}

let written = 0;
const changedFiles = [];

for (const component of componentCatalog.filter((item) => item.status === "ready")) {
  const componentDir = join(rootDir, "packages", "ui", "src", "components", component.category, component.slug);

  for (const fileName of ["README.md", "spec.md"]) {
    const filePath = join(componentDir, fileName);
    const currentContent = await readFile(filePath, "utf8");
    const nextContent = `${upsertPropTable(currentContent, component).trimEnd()}\n`;
    if (nextContent !== currentContent) {
      changedFiles.push(filePath);
      if (!checkOnly) {
        await writeFile(filePath, nextContent, "utf8");
      }
      written += 1;
    }
  }
}

if (checkOnly && changedFiles.length > 0) {
  console.error("컴포넌트 prop 표 차이가 있습니다.");
  for (const changedFile of changedFiles) {
    console.error(`- ${changedFile}`);
  }
  process.exit(1);
}

if (checkOnly) {
  console.log("컴포넌트 prop 표 차이가 없습니다.");
} else {
  console.log(`${written}개 컴포넌트 prop 표 문서를 동기화했습니다.`);
}
