import { createReadStream } from "node:fs";
import { realpath, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_SITE_ROOT = resolve(ROOT, "docs");

const MIME_TYPES = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".png", "image/png"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
]);

const SECURITY_HEADERS = {
  "Cache-Control": "no-store",
  "Content-Security-Policy": "default-src 'self'; base-uri 'none'; form-action 'none'; img-src 'self' data:; script-src 'self'; style-src 'self'; connect-src 'none'; object-src 'none'; frame-ancestors 'none'",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};

function writeError(response, statusCode, message) {
  response.writeHead(statusCode, { ...SECURITY_HEADERS, "Content-Type": "text/plain; charset=utf-8" });
  response.end(message);
}

export function createStaticServer(siteRoot = DEFAULT_SITE_ROOT) {
  const absoluteRoot = resolve(siteRoot);
  const rootPrefix = `${absoluteRoot}${sep}`;

  return createServer(async (request, response) => {
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.setHeader("Allow", "GET, HEAD");
      writeError(response, 405, "Method not allowed");
      return;
    }

    let pathname;
    try {
      pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname);
    } catch {
      writeError(response, 400, "Bad request");
      return;
    }

    const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
    let target = resolve(absoluteRoot, relativePath);
    if (target !== absoluteRoot && !target.startsWith(rootPrefix)) {
      writeError(response, 404, "Not found");
      return;
    }

    try {
      const details = await stat(target);
      if (details.isDirectory()) target = resolve(target, "index.html");
      const fileDetails = await stat(target);
      if (!fileDetails.isFile()) throw new Error("Not a file");
      const realTarget = await realpath(target);
      if (realTarget !== absoluteRoot && !realTarget.startsWith(rootPrefix)) {
        throw new Error("Resolved path is outside the site root");
      }
      target = realTarget;

      response.writeHead(200, {
        ...SECURITY_HEADERS,
        "Content-Length": fileDetails.size,
        "Content-Type": MIME_TYPES.get(extname(target)) ?? "application/octet-stream",
      });
      if (request.method === "HEAD") {
        response.end();
      } else {
        createReadStream(target).pipe(response);
      }
    } catch {
      const notFoundPage = resolve(absoluteRoot, "404.html");
      try {
        const details = await stat(notFoundPage);
        response.writeHead(404, {
          ...SECURITY_HEADERS,
          "Content-Length": details.size,
          "Content-Type": "text/html; charset=utf-8",
        });
        if (request.method === "HEAD") response.end();
        else createReadStream(notFoundPage).pipe(response);
      } catch {
        writeError(response, 404, "Not found");
      }
    }
  });
}

function parsePort(value) {
  const port = Number(value ?? 4173);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535.");
  }
  return port;
}

const isCli = process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (isCli) {
  const port = parsePort(process.env.PORT);
  const server = createStaticServer();
  server.listen(port, "127.0.0.1", () => {
    console.log(`Helix Field Guide is available at http://127.0.0.1:${port}`);
  });

  const shutdown = () => server.close(() => process.exit(0));
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}
