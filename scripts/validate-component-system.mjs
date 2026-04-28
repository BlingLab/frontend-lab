import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { componentCatalog, componentCategories, componentStatuses } from "../packages/ui/src/components/catalog.js";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const categoryIds = new Set(componentCategories.map((category) => category.id));
const statusIds = new Set(Object.keys(componentStatuses));
const failures = [];
const requiredTokenNames = [
  "--ds-color-bg-surface",
  "--ds-color-text-primary",
  "--ds-color-border-default",
  "--ds-color-action-primary-bg",
  "--ds-state-hover-bg",
  "--ds-state-active-bg",
  "--ds-state-disabled-opacity",
  "--ds-size-control-md",
  "--ds-breakpoint-md",
  "--ds-container-lg",
  "--ds-focus-ring"
];
const requiredExports = [
  "Button",
  "IconButton",
  "Field",
  "TextField",
  "Textarea",
  "Select",
  "Checkbox",
  "RadioGroup",
  "Switch",
  "Alert",
  "Toast",
  "Badge",
  "Progress",
  "Skeleton",
  "Dialog",
  "Popover",
  "Tooltip",
  "DropdownMenu",
  "Tabs",
  "Breadcrumb",
  "Pagination",
  "Container",
  "Row",
  "Col",
  "Stack",
  "Inline",
  "Card",
  "Divider",
  "Table",
  "EmptyState",
  "List"
];

async function mustExist(path) {
  try {
    await access(path);
  } catch {
    failures.push(`필수 파일이 없습니다. / Missing required file: ${path}`);
  }
}

for (const component of componentCatalog) {
  if (!/^[A-Z][A-Za-z0-9]*$/.test(component.name)) {
    failures.push(`${component.name} 이름은 PascalCase여야 합니다. / Component name must be PascalCase: ${component.name}`);
  }

  if (!categoryIds.has(component.category)) {
    failures.push(`${component.name}의 category를 알 수 없습니다. / ${component.name} has unknown category: ${component.category}`);
  }

  if (!statusIds.has(component.status)) {
    failures.push(`${component.name}의 status를 알 수 없습니다. / ${component.name} has unknown status: ${component.status}`);
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(component.slug)) {
    failures.push(`${component.name} slug는 kebab-case여야 합니다. / ${component.name} slug must be kebab-case: ${component.slug}`);
  }

  for (const prop of component.props) {
    if (prop.startsWith("on") && !/^on[A-Z][A-Za-z0-9]*$/.test(prop)) {
      failures.push(`${component.name}의 event prop은 onPascalCase 형식이어야 합니다. / ${component.name} event prop must use onPascalCase: ${prop}`);
    }
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
  await mustExist(join(componentDir, "index.js"));
}

const tokensPath = join(rootDir, "packages", "tokens", "src", "tokens.css");
const componentsPath = join(rootDir, "packages", "ui", "src", "components.js");
const stylesPath = join(rootDir, "packages", "ui", "src", "styles.css");

await mustExist(tokensPath);
await mustExist(componentsPath);
await mustExist(stylesPath);

const tokensCss = await readFile(tokensPath, "utf8");
const componentsJs = await readFile(componentsPath, "utf8");
const stylesCss = await readFile(stylesPath, "utf8");

for (const tokenName of requiredTokenNames) {
  if (!tokensCss.includes(tokenName)) {
    failures.push(`필수 토큰이 없습니다. / Missing required token: ${tokenName}`);
  }
}

for (const exportName of requiredExports) {
  if (!componentsJs.includes(`export function ${exportName}`)) {
    failures.push(`컴포넌트 export가 없습니다. / Missing component export: ${exportName}`);
  }
}

const rawUiValuePattern = /#[0-9a-fA-F]{3,8}\b|rgba?\(/g;
const rawUiValues = stylesCss.match(rawUiValuePattern) || [];
if (rawUiValues.length > 0) {
  failures.push(`UI CSS에는 raw color 값을 직접 쓰지 않습니다. tokens.css로 옮기세요. / UI CSS must not include raw color values: ${[...new Set(rawUiValues)].join(", ")}`);
}

const publicClassPattern = /\.ds-([A-Za-z0-9-]+)/g;
for (const match of stylesCss.matchAll(publicClassPattern)) {
  const className = match[1];
  if (!/^[A-Z][A-Za-z0-9]*(?:-[a-z][A-Za-z0-9]*)*$/.test(className)) {
    failures.push(`공개 CSS class는 ds-PascalCase 또는 ds-PascalCase-element 형식이어야 합니다. / Public CSS class must use ds-PascalCase or ds-PascalCase-element: ds-${className}`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`컴포넌트 시스템 검증 완료: ${componentCatalog.length}개 컴포넌트. / Component system validated: ${componentCatalog.length} components.`);
