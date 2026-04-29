import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const tokenContractPath = join(rootDir, "docs", "token-contract.md");
const tokensCssPath = join(rootDir, "packages", "tokens", "src", "tokens.css");
const uiCssPath = join(rootDir, "packages", "ui", "src", "styles.css");
const failures = [];

const tokenContract = await readFile(tokenContractPath, "utf8");
const tokensCss = await readFile(tokensCssPath, "utf8");
const uiCss = await readFile(uiCssPath, "utf8");

function getRequiredSemanticTokens() {
  const match = tokenContract.match(/## 필수 의미 토큰 \/ Required Semantic Tokens[\s\S]*?```text\n([\s\S]*?)```/);
  if (!match) {
    failures.push("필수 의미 토큰 목록을 token contract에서 찾지 못했습니다. / Required semantic token list was not found in the token contract.");
    return [];
  }
  return match[1].split("\n").map((line) => line.trim()).filter((line) => line.startsWith("--ds-"));
}

function parseBlocks(css) {
  const blocks = [];
  const blockPattern = /([^{}]+)\{([^{}]*)\}/g;
  let match;
  while ((match = blockPattern.exec(css))) {
    const declarations = {};
    for (const declaration of match[2].split(";")) {
      const declarationMatch = declaration.match(/(--ds-[\w-]+)\s*:\s*(.+)$/);
      if (declarationMatch) declarations[declarationMatch[1]] = declarationMatch[2].trim();
    }
    blocks.push({ selector: match[1].trim(), declarations });
  }
  return blocks;
}

function findBlock(blocks, selectorText) {
  return blocks.find((block) => block.selector.includes(selectorText))?.declarations ?? {};
}

function resolveTokenValue(tokenName, tokenMap, seen = new Set()) {
  const value = tokenMap[tokenName];
  if (!value || seen.has(tokenName)) return value;
  seen.add(tokenName);
  return value.replace(/var\((--ds-[\w-]+)\)/g, (_, nestedToken) => resolveTokenValue(nestedToken, tokenMap, seen) ?? `var(${nestedToken})`);
}

const requiredSemanticTokens = getRequiredSemanticTokens();
const tokenBlocks = parseBlocks(tokensCss);
const rootTokens = findBlock(tokenBlocks, ":root");
const normalTokens = findBlock(tokenBlocks, '[data-ds-theme="normal"]');
const darkTokens = findBlock(tokenBlocks, '[data-ds-theme="dark"]');
const normalTokenMap = { ...rootTokens, ...normalTokens };
const darkTokenMap = { ...rootTokens, ...darkTokens };

for (const tokenName of requiredSemanticTokens) {
  if (!rootTokens[tokenName]) failures.push(`${tokenName}가 :root에 없습니다. / ${tokenName} is missing from :root.`);
  if (!normalTokens[tokenName]) failures.push(`${tokenName}가 normal theme에 없습니다. / ${tokenName} is missing from the normal theme.`);
  if (!darkTokens[tokenName]) failures.push(`${tokenName}가 dark theme에 없습니다. / ${tokenName} is missing from the dark theme.`);
}

const mustDifferBetweenNormalAndDark = [
  "--ds-color-bg-surface",
  "--ds-color-text-primary",
  "--ds-color-border-default",
  "--ds-color-action-primary-bg",
  "--ds-state-selected-bg",
  "--ds-color-focus-ring"
];

for (const tokenName of mustDifferBetweenNormalAndDark) {
  const normalValue = resolveTokenValue(tokenName, normalTokenMap);
  const darkValue = resolveTokenValue(tokenName, darkTokenMap);
  if (normalValue === darkValue) {
    failures.push(`${tokenName}의 normal/dark 값이 같습니다. / ${tokenName} resolves to the same value in normal and dark themes.`);
  }
}

const componentTokenPrefixes = ["--ds-field-", "--ds-card-", "--ds-overlay-", "--ds-list-", "--ds-table-"];
const semanticComponentTokenPattern = /-(bg|border|fg|radius|shadow|color)(-|$)/;
for (const [tokenName, value] of Object.entries(rootTokens)) {
  if (!componentTokenPrefixes.some((prefix) => tokenName.startsWith(prefix))) continue;
  if (!semanticComponentTokenPattern.test(tokenName)) continue;
  if (!/var\(--ds-(color|state|radius|shadow)-/.test(value)) {
    failures.push(`${tokenName}는 semantic token을 바라봐야 합니다. / ${tokenName} should resolve through semantic tokens.`);
  }
}

if (/\[data-ds-theme=|\.ds-theme-/.test(uiCss)) {
  failures.push("UI CSS에서 theme name selector를 직접 사용했습니다. / UI CSS directly uses a theme-name selector.");
}

const rawColorPattern = /#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(/;
for (const [index, line] of uiCss.split("\n").entries()) {
  if (rawColorPattern.test(line)) {
    failures.push(`UI CSS ${index + 1}행에 raw color가 있습니다. / UI CSS line ${index + 1} contains a raw color.`);
  }
  if (!line.trim().startsWith("@") && /:\s*[^;]*\b\d*\.?\d+(px|rem|em)\b/.test(line)) {
    failures.push(`UI CSS ${index + 1}행에 raw size 값이 있습니다. / UI CSS line ${index + 1} contains a raw size value.`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`theme/token 회귀 검증 완료: ${requiredSemanticTokens.length}개 필수 semantic token. / Theme/token regression verified: ${requiredSemanticTokens.length} required semantic tokens.`);
