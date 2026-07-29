import { cp, mkdir, rm, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { verifyRepository } from "./verify.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = resolve(ROOT, "docs");
const OUTPUT = resolve(ROOT, "dist");

await verifyRepository();
await rm(OUTPUT, { recursive: true, force: true });
await mkdir(OUTPUT, { recursive: true });
await cp(SOURCE, OUTPUT, { recursive: true });

const index = await stat(resolve(OUTPUT, "index.html"));
if (!index.isFile() || index.size < 1000) {
  throw new Error("The built index is missing or unexpectedly small.");
}

console.log(`Built the static site in ${OUTPUT}.`);
