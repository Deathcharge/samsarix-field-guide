import { access, readFile, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CATEGORIES, PROJECTS } from "../docs/catalog.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = resolve(ROOT, "docs");

const REQUIRED_FILES = [
  ".nojekyll",
  "index.html",
  "404.html",
  "app.js",
  "catalog.js",
  "catalog-core.js",
  "styles.css",
  "og.png",
  "robots.txt",
];

const REQUIRED_HTML_MARKERS = [
  'id="main-content"',
  'id="catalog-search"',
  'id="project-grid"',
  'role="status"',
  'aria-live="polite"',
  'http-equiv="Content-Security-Policy"',
  'name="description"',
  'rel="canonical"',
  'property="og:image"',
  '<noscript>',
];

const FORBIDDEN_CLAIMS = [
  "100% Production-Ready",
  "battle-tested components",
  "pip install routine-engine",
  "70K+",
  "13 production-ready",
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

export async function verifyRepository() {
  for (const file of REQUIRED_FILES) {
    await access(resolve(DOCS, file));
  }

  const html = await readFile(resolve(DOCS, "index.html"), "utf8");
  for (const marker of REQUIRED_HTML_MARKERS) {
    assert(html.includes(marker), `index.html is missing required marker: ${marker}`);
  }
  for (const claim of FORBIDDEN_CLAIMS) {
    assert(!html.toLocaleLowerCase("en-US").includes(claim.toLocaleLowerCase("en-US")), `index.html contains retired claim: ${claim}`);
  }

  const documentIds = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
  for (const match of html.matchAll(/href="#([^"]+)"/g)) {
    assert(documentIds.has(match[1]), `index.html links to a missing section: #${match[1]}`);
  }

  const socialImage = await stat(resolve(DOCS, "og.png"));
  assert(socialImage.isFile() && socialImage.size > 100_000, "og.png is missing or unexpectedly small.");

  assert(PROJECTS.length >= 8, "The catalog must contain a useful reviewed set of repositories.");
  const catalogIds = new Set();
  for (const project of PROJECTS) {
    assert(project && typeof project === "object", "Each catalog entry must be an object.");
    for (const key of ["id", "name", "repoUrl", "category", "language", "summary", "useCase", "lastActivity"]) {
      assert(typeof project[key] === "string" && project[key].trim(), `${project.id ?? "Catalog entry"} is missing ${key}.`);
    }
    assert(!catalogIds.has(project.id), `Duplicate catalog id: ${project.id}`);
    catalogIds.add(project.id);
    assert(Object.hasOwn(CATEGORIES, project.category), `${project.id} has an unsupported category.`);
    assert(
      /^https:\/\/github\.com\/Deathcharge\/[A-Za-z0-9._-]+$/.test(project.repoUrl),
      `${project.id} must link to a repository owned by Deathcharge.`,
    );
    assert(/^\d{4}-\d{2}-\d{2}$/.test(project.lastActivity), `${project.id} has an invalid activity date.`);
    assert(project.summary.length <= 180, `${project.id} summary is too long.`);
    assert(project.useCase.length <= 220, `${project.id} use case is too long.`);
  }

  return { projectCount: PROJECTS.length, fileCount: REQUIRED_FILES.length };
}

const isCli = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  try {
    const result = await verifyRepository();
    console.log(`Verified ${result.projectCount} catalog entries and ${result.fileCount} required site files.`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
