import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { componentCatalog, componentCategories, componentStatuses } from "../packages/ui/src/components/catalog.ts";
import { componentPropDocs, getComponentPropDocs } from "../packages/ui/src/components/prop-docs.ts";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const categoryIds = new Set(componentCategories.map((category) => category.id));
const statusIds = new Set(Object.keys(componentStatuses));
const failures = [];
const requiredTokenNames = [
  "--ds-theme-id",
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
  "--ds-focus-ring",
  "--ds-field-bg",
  "--ds-card-bg",
  "--ds-overlay-bg",
  "--ds-table-header-bg"
];
const requiredExports = [
  "Button",
  "Icon",
  "IconButton",
  "Field",
  "TextField",
  "Textarea",
  "Select",
  "DatePicker",
  "Combobox",
  "Checkbox",
  "RadioGroup",
  "Switch",
  "FileUploader",
  "Alert",
  "Toast",
  "Badge",
  "Progress",
  "Skeleton",
  "Dialog",
  "Popover",
  "Tooltip",
  "DropdownMenu",
  "CommandPalette",
  "Tabs",
  "Breadcrumb",
  "Pagination",
  "Stepper",
  "NavigationRail",
  "SideNav",
  "Container",
  "Row",
  "Col",
  "Stack",
  "Inline",
  "Card",
  "Divider",
  "Table",
  "DataGrid",
  "EmptyState",
  "List"
];
const implementationPaths = new Map([
  ["Container", ["layout", "container"]],
  ["Row", ["layout", "row"]],
  ["Col", ["layout", "col"]],
  ["Stack", ["layout", "stack"]],
  ["Inline", ["layout", "inline"]]
]);
const propTableHeader = "| Prop | Type | Default | 설명 / Description |";

function extractInterfacePropNames(source, interfaceName) {
  const interfaceIndex = source.indexOf(`interface ${interfaceName}`);
  if (interfaceIndex === -1) return [];

  const bodyStart = source.indexOf("{", interfaceIndex);
  if (bodyStart === -1) return [];

  let depth = 0;
  let bodyEnd = bodyStart;
  for (let index = bodyStart; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") depth -= 1;
    if (depth === 0) {
      bodyEnd = index;
      break;
    }
  }

  const body = source.slice(bodyStart + 1, bodyEnd);
  return [...body.matchAll(/^\s{2}([A-Za-z][A-Za-z0-9]*)\??:/gm)].map((match) => match[1]);
}

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

  const propDocNames = new Set(getComponentPropDocs(component).map((propDoc) => propDoc.name));
  for (const prop of component.props) {
    if (!propDocNames.has(prop)) {
      failures.push(`${component.name} prop 문서에 catalog prop이 없습니다. / ${component.name} prop docs are missing catalog prop: ${prop}`);
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
  implementationPaths.set(component.name, [component.category, component.slug]);

  await mustExist(join(componentDir, "README.md"));
  await mustExist(join(componentDir, "spec.md"));
  await mustExist(join(componentDir, "index.ts"));
}

for (const [componentName, propDocs] of Object.entries(componentPropDocs)) {
  for (const propDoc of propDocs) {
    if (!propDoc.description.includes(" / ")) {
      failures.push(`${componentName}.${propDoc.name} prop 설명은 한글 우선/영문 병기를 유지해야 합니다. / ${componentName}.${propDoc.name} prop description must keep Korean-first English-paired writing.`);
    }
  }
}

const tokensPath = join(rootDir, "packages", "tokens", "src", "tokens.css");
const indexPath = join(rootDir, "packages", "ui", "src", "index.ts");
const stylesPath = join(rootDir, "packages", "ui", "src", "styles.css");

await mustExist(tokensPath);
await mustExist(indexPath);
await mustExist(stylesPath);

const tokensCss = await readFile(tokensPath, "utf8");
const indexTs = await readFile(indexPath, "utf8");
const stylesCss = await readFile(stylesPath, "utf8");

for (const tokenName of requiredTokenNames) {
  if (!tokensCss.includes(tokenName)) {
    failures.push(`필수 토큰이 없습니다. / Missing required token: ${tokenName}`);
  }
}

for (const exportName of requiredExports) {
  const implementationPath = implementationPaths.get(exportName);
  if (!implementationPath) {
    failures.push(`구현 경로를 알 수 없습니다. / Missing implementation path mapping: ${exportName}`);
    continue;
  }

  const [category, slug] = implementationPath;
  const componentFile = join(rootDir, "packages", "ui", "src", "components", category, slug, `${slug}.tsx`);
  const entryFile = join(rootDir, "packages", "ui", "src", "components", category, slug, "index.ts");

  await mustExist(componentFile);
  await mustExist(entryFile);

  const componentSource = await readFile(componentFile, "utf8").catch(() => "");
  const entrySource = await readFile(entryFile, "utf8").catch(() => "");
  const readmeSource = await readFile(join(rootDir, "packages", "ui", "src", "components", category, slug, "README.md"), "utf8").catch(() => "");
  const specSource = await readFile(join(rootDir, "packages", "ui", "src", "components", category, slug, "spec.md"), "utf8").catch(() => "");

  if (!componentSource.includes(`export function ${exportName}`) && !componentSource.includes(`export const ${exportName}`)) {
    failures.push(`${exportName} 구현은 자기 폴더의 ${slug}.tsx에서 named export여야 합니다. / ${exportName} implementation must be a named export in its own ${slug}.tsx file.`);
  }
  if (!entrySource.includes(`./${slug}`)) {
    failures.push(`${exportName} index.ts는 같은 폴더의 ${slug}.tsx를 export해야 합니다. / ${exportName} index.ts must export from ./${slug}.`);
  }
  if (!indexTs.includes(exportName)) {
    failures.push(`index.ts에서 컴포넌트를 export해야 합니다. / index.ts must export component: ${exportName}`);
  }

  if (componentCatalog.some((component) => component.name === exportName && component.status === "ready")) {
    const component = componentCatalog.find((catalogItem) => catalogItem.name === exportName);
    const propDocs = component ? getComponentPropDocs(component) : [];
    const readmeHasPropTable = readmeSource.includes("## Prop 표 / Prop Table") && readmeSource.includes(propTableHeader);
    if (!readmeHasPropTable) {
      failures.push(`${exportName} README에 Prop 표가 없습니다. / ${exportName} README is missing a prop table.`);
    }
    if (!specSource.includes("## Prop 표 / Prop Table") || !specSource.includes(propTableHeader)) {
      failures.push(`${exportName} spec에 Prop 표가 없습니다. / ${exportName} spec is missing a prop table.`);
    }
    for (const propDoc of propDocs) {
      if (!readmeSource.includes(`| \`${propDoc.name}\``)) {
        failures.push(`${exportName} README Prop 표에 prop이 없습니다. / ${exportName} README prop table is missing prop: ${propDoc.name}`);
      }
      if (!specSource.includes(`| \`${propDoc.name}\``)) {
        failures.push(`${exportName} spec Prop 표에 prop이 없습니다. / ${exportName} spec prop table is missing prop: ${propDoc.name}`);
      }
    }
  }

  if (componentPropDocs[exportName]) {
    const documentedProps = new Set(componentPropDocs[exportName].map((propDoc) => propDoc.name));
    const sourceProps = extractInterfacePropNames(componentSource, `${exportName}Props`);
    for (const sourceProp of sourceProps) {
      if (!documentedProps.has(sourceProp)) {
        failures.push(`${exportName} prop table에 source prop이 없습니다. / ${exportName} prop table is missing source prop: ${sourceProp}`);
      }
    }
    if (!readmeSource.includes("## Prop 표 / Prop Table") || !readmeSource.includes(propTableHeader)) {
      failures.push(`${exportName} README에 Prop 표가 없습니다. / ${exportName} README is missing a prop table.`);
    }
  }
}

const forbiddenMonolithPath = join(rootDir, "packages", "ui", "src", "components.tsx");
try {
  await access(forbiddenMonolithPath);
  failures.push("컴포넌트 구현을 src/components.tsx 한 파일에 모으지 않습니다. / Do not centralize component implementations in src/components.tsx.");
} catch {
  // 파일이 없으면 정상입니다. / Missing file is expected.
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
