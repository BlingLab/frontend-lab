import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const source = join(rootDir, "packages", "ui", "src", "styles.css");
const target = join(rootDir, "packages", "ui", "dist", "styles.css");

await mkdir(dirname(target), { recursive: true });
await copyFile(source, target);

console.log("UI CSS asset copied. / UI CSS asset copied.");
