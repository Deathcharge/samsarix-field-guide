import { readdir, readFile } from "node:fs/promises";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { SourceTextModule } from "node:vm";
import { verifyRepository } from "./verify.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SKIP_DIRECTORIES = new Set([".git", "dist", "node_modules"]);
const TEXT_EXTENSIONS = new Set([".css", ".html", ".js", ".json", ".md", ".mjs", ".txt", ".yml", ".yaml"]);
const JAVASCRIPT_EXTENSIONS = new Set([".js", ".mjs"]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory() && SKIP_DIRECTORIES.has(entry.name)) continue;
    const absolute = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(absolute)));
    if (entry.isFile() && TEXT_EXTENSIONS.has(extname(entry.name))) files.push(absolute);
  }
  return files;
}

function syntaxCheck(file, content) {
  try {
    new SourceTextModule(content, { identifier: file });
  } catch (error) {
    throw new Error(`JavaScript syntax check failed for ${file}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

const files = await walk(ROOT);
const failures = [];

for (const file of files) {
  const label = relative(ROOT, file);
  const content = await readFile(file, "utf8");
  if (!content.endsWith("\n")) failures.push(`${label}: missing final newline`);
  if (/\r/.test(content)) failures.push(`${label}: CRLF line endings are not allowed`);
  content.split("\n").forEach((line, index) => {
    if (/[ \t]+$/.test(line)) failures.push(`${label}:${index + 1}: trailing whitespace`);
  });
  if (JAVASCRIPT_EXTENSIONS.has(extname(file))) syntaxCheck(file, content);
}

try {
  await verifyRepository();
} catch (error) {
  failures.push(error instanceof Error ? error.message : String(error));
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Linted ${files.length} text files and validated the site contract.`);
}
