import { access, readFile, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CATEGORIES, PROJECTS } from "../docs/catalog.js";
import { CONSTRAINTS, OUTCOMES, PROJECT_PROFILES } from "../docs/decision-model.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = resolve(ROOT, "docs");

const REQUIRED_FILES = [
  ".nojekyll",
  "index.html",
  "404.html",
  "app.js",
  "catalog.js",
  "catalog-core.js",
  "decision-model.js",
  "styles.css",
  "og.png",
  "portfolio-boundaries.html",
  "workbench-og.png",
  "workbench-core.js",
  "workbench.html",
  "workbench.js",
  "favicon.svg",
  "robots.txt",
];

const REQUIRED_ROOT_FILES = [
  ".github/dependabot.yml",
  ".github/ISSUE_TEMPLATE/catalog-correction.yml",
  ".github/ISSUE_TEMPLATE/config.yml",
  ".github/ISSUE_TEMPLATE/pilot-result.yml",
  ".github/workflows/ci.yml",
  ".github/workflows/pages.yml",
  "CHANGELOG.md",
  "CITATION.cff",
  "LICENSE",
  "NOTICE",
  "SECURITY.md",
  "TRADEMARKS.md",
];

const REQUIRED_HTML_MARKERS = [
  'id="main-content"',
  'tabindex="-1"',
  'id="catalog-search"',
  'id="project-grid"',
  'role="status"',
  'aria-live="polite"',
  'http-equiv="Content-Security-Policy"',
  'name="description"',
  'rel="canonical"',
  'property="og:image"',
  'mailto:contact@samsarix.com',
  'mailto:support@samsarix.com',
  '<noscript>',
];

const REQUIRED_WORKBENCH_MARKERS = [
  'id="main-content"',
  'tabindex="-1"',
  'id="decision-form"',
  'name="outcome"',
  'name="constraint"',
  'id="recommendation-grid"',
  'id="comparison-head"',
  'id="pilot-steps"',
  'Fit signals, not quality scores',
  'role="status"',
  'property="og:image"',
  'src="./workbench.js"',
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
  for (const file of REQUIRED_ROOT_FILES) {
    await access(resolve(ROOT, file));
  }

  const html = await readFile(resolve(DOCS, "index.html"), "utf8");
  for (const marker of REQUIRED_HTML_MARKERS) {
    assert(html.includes(marker), `index.html is missing required marker: ${marker}`);
  }

  const workbenchHtml = await readFile(resolve(DOCS, "workbench.html"), "utf8");
  for (const marker of REQUIRED_WORKBENCH_MARKERS) {
    assert(workbenchHtml.includes(marker), `workbench.html is missing required marker: ${marker}`);
  }

  const boundariesHtml = await readFile(resolve(DOCS, "portfolio-boundaries.html"), "utf8");
  assert(boundariesHtml.includes('id="main-content"'), "Portfolio boundaries is missing its main-content target.");
  assert(boundariesHtml.includes('tabindex="-1"'), "Portfolio boundaries must move focus after its skip link is used.");
  for (const claim of FORBIDDEN_CLAIMS) {
    assert(!html.toLocaleLowerCase("en-US").includes(claim.toLocaleLowerCase("en-US")), `index.html contains retired claim: ${claim}`);
  }

  const documentIds = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
  for (const match of html.matchAll(/href="#([^"]+)"/g)) {
    assert(documentIds.has(match[1]), `index.html links to a missing section: #${match[1]}`);
  }

  const socialImage = await stat(resolve(DOCS, "og.png"));
  assert(socialImage.isFile() && socialImage.size > 100_000, "og.png is missing or unexpectedly small.");
  const workbenchSocialImage = await stat(resolve(DOCS, "workbench-og.png"));
  assert(workbenchSocialImage.isFile() && workbenchSocialImage.size > 100_000, "workbench-og.png is missing or unexpectedly small.");
  const workbenchSocialImageData = await readFile(resolve(DOCS, "workbench-og.png"));
  assert(workbenchSocialImageData.subarray(1, 4).toString("ascii") === "PNG", "workbench-og.png must be a PNG image.");
  assert(
    workbenchSocialImageData.readUInt32BE(16) === 1731 && workbenchSocialImageData.readUInt32BE(20) === 909,
    "workbench-og.png must retain the declared 1731 by 909 dimensions.",
  );

  const workbenchScript = await readFile(resolve(DOCS, "workbench.js"), "utf8");
  assert(!workbenchScript.includes("fetch("), "The Decision Workbench must not make background requests.");

  const pilotIssueTemplate = await readFile(resolve(ROOT, ".github/ISSUE_TEMPLATE/pilot-result.yml"), "utf8");
  assert(pilotIssueTemplate.includes("id: workbench_url"), "Pilot reports must capture the shared Decision Workbench URL.");
  const routeAudit = await readFile(resolve(ROOT, "scripts/audit-routes.mjs"), "utf8");
  assert(!routeAudit.includes("Authorization") && !routeAudit.includes("GITHUB_TOKEN"), "Public route audits must not send credentials.");

  const license = await readFile(resolve(ROOT, "LICENSE"), "utf8");
  assert(license.startsWith("Mozilla Public License Version 2.0"), "LICENSE must contain the standard MPL-2.0 text.");
  const notice = await readFile(resolve(ROOT, "NOTICE"), "utf8");
  assert(notice.includes("Copyright © 2026 Samsarix LLC"), "NOTICE is missing the Samsarix LLC copyright.");
  assert(notice.includes("contact@samsarix.com") && notice.includes("support@samsarix.com"), "NOTICE is missing a working contact path.");

  const citation = await readFile(resolve(ROOT, "CITATION.cff"), "utf8");
  for (const marker of ["cff-version: 1.2.0", 'version: "1.0.0"', 'name: "Samsarix LLC"', "license: MPL-2.0"]) {
    assert(citation.includes(marker), `CITATION.cff is missing required metadata: ${marker}`);
  }

  const dependabot = await readFile(resolve(ROOT, ".github/dependabot.yml"), "utf8");
  assert(dependabot.includes('package-ecosystem: "github-actions"'), "Dependabot must monitor GitHub Actions.");
  assert(dependabot.includes('interval: "weekly"'), "Dependabot must check action revisions weekly.");

  for (const workflow of [".github/workflows/ci.yml", ".github/workflows/pages.yml"]) {
    const workflowSource = await readFile(resolve(ROOT, workflow), "utf8");
    const actionRefs = [...workflowSource.matchAll(/uses:\s+[^@\s]+@([^\s#]+)/g)].map((match) => match[1]);
    assert(actionRefs.length > 0, `${workflow} must use at least one action.`);
    assert(actionRefs.every((reference) => /^[0-9a-f]{40}$/.test(reference)), `${workflow} must pin every action to a full commit SHA.`);
  }

  assert(PROJECTS.length === 31, "The catalog must contain all 31 reviewed public repositories.");
  assert(OUTCOMES.length === 8, "The Decision Workbench must expose eight outcome-led use cases.");
  assert(CONSTRAINTS.length === 6, "The Decision Workbench must expose six explicit constraints.");
  assert(Object.keys(PROJECT_PROFILES).length === PROJECTS.length, "Every catalog project must have one decision profile.");
  const outcomeIds = new Set(OUTCOMES.map(({ id }) => id));
  const constraintIds = new Set(CONSTRAINTS.map(({ id }) => id));
  const catalogIds = new Set();
  const catalogUrls = new Set();
  for (const project of PROJECTS) {
    assert(project && typeof project === "object", "Each catalog entry must be an object.");
    for (const key of ["id", "name", "productName", "repoUrl", "category", "language", "summary", "useCase", "lastActivity"]) {
      assert(typeof project[key] === "string" && project[key].trim(), `${project.id ?? "Catalog entry"} is missing ${key}.`);
    }
    assert(!catalogIds.has(project.id), `Duplicate catalog id: ${project.id}`);
    catalogIds.add(project.id);
    assert(!catalogUrls.has(project.repoUrl), `Duplicate catalog URL: ${project.repoUrl}`);
    catalogUrls.add(project.repoUrl);
    assert(Object.hasOwn(CATEGORIES, project.category), `${project.id} has an unsupported category.`);
    assert(
      /^https:\/\/github\.com\/Deathcharge\/[A-Za-z0-9._-]+$/.test(project.repoUrl),
      `${project.id} must link to a repository owned by Deathcharge.`,
    );
    assert(/^\d{4}-\d{2}-\d{2}$/.test(project.lastActivity), `${project.id} has an invalid activity date.`);
    assert(project.summary.length <= 180, `${project.id} summary is too long.`);
    assert(project.useCase.length <= 220, `${project.id} use case is too long.`);
    const profile = PROJECT_PROFILES[project.id];
    assert(profile, `${project.id} is missing a decision profile.`);
    assert(profile.outcomes.length > 0 && profile.outcomes.every((id) => outcomeIds.has(id)), `${project.id} has an invalid workbench outcome.`);
    assert(profile.traits.every((id) => constraintIds.has(id)), `${project.id} has an invalid workbench constraint.`);
    assert(profile.firstCheck.length >= 40, `${project.id} needs a concrete first check.`);
    assert(profile.watchFor.length >= 40, `${project.id} needs a concrete adoption caveat.`);
  }
  for (const outcome of OUTCOMES) {
    assert(
      Object.values(PROJECT_PROFILES).filter((profile) => profile.outcomes.includes(outcome.id)).length >= 3,
      `${outcome.id} needs at least three comparison candidates.`,
    );
  }

  return { projectCount: PROJECTS.length, fileCount: REQUIRED_FILES.length + REQUIRED_ROOT_FILES.length };
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
