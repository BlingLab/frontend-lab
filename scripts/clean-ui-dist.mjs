import { rm } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const distPath = join(rootDir, "packages", "ui", "dist");
const buildInfoPath = join(rootDir, "packages", "ui", "tsconfig.tsbuildinfo");

await rm(distPath, { force: true, recursive: true });
await rm(buildInfoPath, { force: true });

console.log("UI dist 산출물을 정리했습니다. / UI dist output cleaned.");
