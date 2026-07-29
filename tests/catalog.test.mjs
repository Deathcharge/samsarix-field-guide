import assert from "node:assert/strict";
import { once } from "node:events";
import { test } from "node:test";
import { CATEGORIES, PROJECTS } from "../docs/catalog.js";
import { filterProjects, normalizeText, sortProjects } from "../docs/catalog-core.js";
import { createStaticServer } from "../scripts/serve.mjs";

const EXPECTED_PUBLIC_REPOSITORIES = [
  "agent-consensus",
  "Helix",
  "samsarix-agent-engine",
  "Helix-Unified-Hub",
  "neural-mesh",
  "policy-engine",
  "routine-engine",
  "samsarix-agent-ethics",
  "samsarix-agent-orchestration",
  "samsarix-agent-swarm",
  "samsarix-analytics",
  "samsarix-chat-engine",
  "samsarix-cli",
  "samsarix-codegen",
  "samsarix-core",
  "samsarix-creative-spirals",
  "samsarix-discord-bot",
  "samsarix-field-atlas",
  "samsarix-field-guide",
  "samsarix-integration-guard",
  "samsarix-narrative-engine",
  "samsarix-notifications",
  "samsarix-page-lens",
  "samsarix-spirals",
  "samsarix-story-studio",
  "samsarix-token-cost-manager",
  "samsarix-vscode",
  "samsarix-workspace",
  "ucf-protocol",
  "unified-llm",
].sort((left, right) => left.localeCompare(right, "en-US", { sensitivity: "base" }));

test("catalog entries have unique IDs and supported categories", () => {
  assert.equal(new Set(PROJECTS.map(({ id }) => id)).size, PROJECTS.length);
  assert.equal(PROJECTS.length, 30);
  for (const project of PROJECTS) {
    assert.ok(Object.hasOwn(CATEGORIES, project.category));
    assert.match(project.repoUrl, /^https:\/\/github\.com\/Deathcharge\//);
    assert.equal(new URL(project.repoUrl).pathname, `/Deathcharge/${project.name}`);
  }
  assert.deepEqual(
    PROJECTS.map(({ name }) => name).sort((left, right) =>
      left.localeCompare(right, "en-US", { sensitivity: "base" }),
    ),
    EXPECTED_PUBLIC_REPOSITORIES,
  );
});

test("search is case-insensitive and matches use-case text", () => {
  const matches = filterProjects(PROJECTS, { query: "AUDITABLE spend" });
  assert.deepEqual(matches.map(({ id }) => id), ["samsarix-token-cost-manager"]);
  assert.equal(normalizeText("  HéLIX  "), "helix");
});

test("category and query filters compose", () => {
  const matches = filterProjects(PROJECTS, { query: "python", category: "library" });
  assert.ok(matches.some(({ id }) => id === "samsarix-chat-engine"));
  assert.ok(matches.some(({ id }) => id === "samsarix-core"));
  assert.ok(matches.some(({ id }) => id === "unified-llm"));
  assert.equal(filterProjects(PROJECTS, { query: "extension", category: "research" }).length, 0);
});

test("sorting puts featured routes first without mutating input", () => {
  const source = [...PROJECTS].reverse();
  const snapshot = source.map(({ id }) => id);
  const sorted = sortProjects(source);
  assert.deepEqual(source.map(({ id }) => id), snapshot);
  assert.ok(sorted.slice(0, 3).every(({ featured }) => featured));
});

test("development server serves the main page, handles HEAD, and contains traversal", async (context) => {
  const server = createStaticServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  context.after(() => server.close());

  const address = server.address();
  assert.ok(address && typeof address === "object");
  const base = `http://127.0.0.1:${address.port}`;

  const home = await fetch(`${base}/`);
  assert.equal(home.status, 200);
  assert.match(home.headers.get("content-security-policy") ?? "", /default-src 'self'/);
  assert.match(await home.text(), /Samsarix Field Guide/);

  const boundaries = await fetch(`${base}/portfolio-boundaries.html`);
  assert.equal(boundaries.status, 200);
  assert.match(await boundaries.text(), /Know what each layer is allowed to own/);

  const head = await fetch(`${base}/styles.css`, { method: "HEAD" });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), "");

  const missing = await fetch(`${base}/missing-route`);
  assert.equal(missing.status, 404);
  assert.match(await missing.text(), /Route not found/);

  const traversal = await fetch(`${base}/..%2FREADME.md`);
  assert.equal(traversal.status, 404);
  assert.doesNotMatch(await traversal.text(), /Ecosystem website/);
});
