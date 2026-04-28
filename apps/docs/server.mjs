import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { extname, join, normalize, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = normalize(__dirname);
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
      res.end("Bad request");
      return;
    }

    const filePath = resolvePath(req.url);

    if (!filePath) {
      res.writeHead(403);
      res.end("Forbidden");
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
      res.end("Not found");
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
    console.log(`Docs site is running at ${address}`);
  });
}

listen(preferredPort);
