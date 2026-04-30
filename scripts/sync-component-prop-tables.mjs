import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { componentCatalog } from "../packages/ui/src/components/catalog.ts";
import { renderComponentPropTable } from "../packages/ui/src/components/prop-docs.ts";

const rootDir = fileURLToPath(new URL("..", import.meta.url));

function renderBlock(component) {
  return `## Prop 표 / Prop Table\n\n${renderComponentPropTable(component)}\n`;
}

function upsertPropTable(content, component) {
  const block = renderBlock(component);
  const propTablePattern = /## Prop 표 \/ Prop Table\n\n[\s\S]*?(?=\n## |$)/;
  if (propTablePattern.test(content)) {
    return content.replace(propTablePattern, `${block.trimEnd()}\n`);
  }

  const propAxesPattern = /(## Prop 축 \/ Prop Axes\n\n[\s\S]*?)(?=\n## |$)/;
  if (propAxesPattern.test(content)) {
    return content.replace(propAxesPattern, (match) => `${match.trimEnd()}\n\n${block}`);
  }

  const apiSurfacePattern = /(## API 표면 \/ API Surface\n\n[\s\S]*?)(?=\n## |$)/;
  if (apiSurfacePattern.test(content)) {
    return content.replace(apiSurfacePattern, (match) => `${match.trimEnd()}\n\n${block}`);
  }

  return `${content.trimEnd()}\n\n${block}`;
}

let written = 0;

for (const component of componentCatalog.filter((item) => item.status === "ready")) {
  const componentDir = join(rootDir, "packages", "ui", "src", "components", component.category, component.slug);

  for (const fileName of ["README.md", "spec.md"]) {
    const filePath = join(componentDir, fileName);
    const currentContent = await readFile(filePath, "utf8");
    const nextContent = `${upsertPropTable(currentContent, component).trimEnd()}\n`;
    if (nextContent !== currentContent) {
      await writeFile(filePath, nextContent, "utf8");
      written += 1;
    }
  }
}

console.log(`${written}개 component prop table 문서를 동기화했습니다. / Synced ${written} component prop table document(s).`);
