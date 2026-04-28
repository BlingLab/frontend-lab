import { access } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { componentCatalog, componentCategories, componentStatuses } from "../packages/ui/src/components/catalog.js";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const categoryIds = new Set(componentCategories.map((category) => category.id));
const statusIds = new Set(Object.keys(componentStatuses));
const failures = [];

async function mustExist(path) {
  try {
    await access(path);
  } catch {
    failures.push(`Missing required file: ${path}`);
  }
}

for (const component of componentCatalog) {
  if (!categoryIds.has(component.category)) {
    failures.push(`${component.name} has unknown category: ${component.category}`);
  }

  if (!statusIds.has(component.status)) {
    failures.push(`${component.name} has unknown status: ${component.status}`);
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(component.slug)) {
    failures.push(`${component.name} slug must be kebab-case: ${component.slug}`);
  }

  const componentDir = join(
    rootDir,
    "packages",
    "ui",
    "src",
    "components",
    component.category,
    component.slug
  );

  await mustExist(join(componentDir, "README.md"));
  await mustExist(join(componentDir, "spec.md"));
}

await mustExist(join(rootDir, "packages", "tokens", "src", "tokens.css"));

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Component system validated: ${componentCatalog.length} components.`);
