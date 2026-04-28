import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { extname, join, normalize, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = normalize(__dirname);
const workspaceRoot = normalize(join(root, "..", ".."));
const uiRoot = normalize(join(workspaceRoot, "packages", "ui", "src"));
const tokensRoot = normalize(join(workspaceRoot, "packages", "tokens", "src"));
const preferredPort = Number.parseInt(process.env.PORT || "5173", 10);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function resolvePath(requestUrl) {
  const url = new URL(requestUrl, "http://localhost");
  const pathname = decodeURIComponent(url.pathname);

  if (pathname.startsWith("/ui/")) {
    const filePath = normalize(join(uiRoot, pathname.replace(/^\/ui\//, "")));

    if (relative(uiRoot, filePath).startsWith("..")) {
      return null;
    }

    return filePath;
  }

  if (pathname.startsWith("/tokens/")) {
    const filePath = normalize(join(tokensRoot, pathname.replace(/^\/tokens\//, "")));

    if (relative(tokensRoot, filePath).startsWith("..")) {
      return null;
    }

    return filePath;
  }

  const cleanPath = pathname === "/" ? "/index.html" : pathname;
  const filePath = normalize(join(root, cleanPath));

  if (relative(root, filePath).startsWith("..")) {
    return null;
  }

  return filePath;
}

function createDocsServer() {
  return createServer(async (req, res) => {
    if (!req.url) {
      res.writeHead(400);
      res.end("잘못된 요청입니다. / Bad request");
      return;
    }

    const filePath = resolvePath(req.url);

    if (!filePath) {
      res.writeHead(403);
      res.end("접근할 수 없습니다. / Forbidden");
      return;
    }

    try {
      await readFile(filePath);
      res.writeHead(200, {
        "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream"
      });
      createReadStream(filePath).pipe(res);
    } catch {
      res.writeHead(404, {
        "Content-Type": "text/plain; charset=utf-8"
      });
      res.end("파일을 찾을 수 없습니다. / Not found");
    }
  });
}

function listen(port) {
  const server = createDocsServer();

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      listen(port + 1);
      return;
    }

    throw error;
  });

  server.listen(port, () => {
    const address = `http://localhost:${port}`;
    console.log(`문서 사이트가 실행 중입니다: ${address} / Docs site is running at ${address}`);
  });
}

listen(preferredPort);
