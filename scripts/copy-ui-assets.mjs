import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const tokensSource = join(rootDir, "packages", "tokens", "src", "tokens.css");
const source = join(rootDir, "packages", "ui", "src", "styles.css");
const target = join(rootDir, "packages", "ui", "dist", "styles.css");

await mkdir(dirname(target), { recursive: true });
const tokensCss = await readFile(tokensSource, "utf8");
const uiCss = await readFile(source, "utf8");
await writeFile(target, `${tokensCss.trimEnd()}\n\n${uiCss.trimEnd()}\n`, "utf8");

console.log("UI CSS asset copied with tokens. / UI CSS asset copied with tokens.");
