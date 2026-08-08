import assert from "node:assert/strict";
import { once } from "node:events";
import { test } from "node:test";
import { CATEGORIES, PROJECTS } from "../docs/catalog.js";
import { filterProjects, normalizeText, sortProjects } from "../docs/catalog-core.js";
import { CONSTRAINTS, OUTCOMES, PROJECT_PROFILES } from "../docs/decision-model.js";
import {
  buildEvaluationPlan,
  comparisonSelection,
  formatEvaluationPlan,
  normalizeWorkbenchState,
  parseWorkbenchState,
  recommendProjects,
  serializeWorkbenchState,
} from "../docs/workbench-core.js";
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

test("decision profiles cover the full catalog with known outcomes and traits", () => {
  const outcomeIds = new Set(OUTCOMES.map(({ id }) => id));
  const constraintIds = new Set(CONSTRAINTS.map(({ id }) => id));
  assert.equal(outcomeIds.size, 8);
  assert.equal(constraintIds.size, 6);
  assert.deepEqual(Object.keys(PROJECT_PROFILES).sort(), PROJECTS.map(({ id }) => id).sort());

  for (const project of PROJECTS) {
    const profile = PROJECT_PROFILES[project.id];
    assert.ok(profile.outcomes.length >= 1);
    assert.ok(profile.outcomes.every((outcome) => outcomeIds.has(outcome)));
    assert.ok(profile.traits.every((trait) => constraintIds.has(trait)));
    assert.ok(profile.firstCheck.length >= 40);
    assert.ok(profile.watchFor.length >= 40);
  }

  for (const outcome of OUTCOMES) {
    assert.ok(
      Object.values(PROJECT_PROFILES).filter((profile) => profile.outcomes.includes(outcome.id)).length >= 3,
      `${outcome.id} needs at least three comparison candidates`,
    );
  }
});

test("recommendations prioritize selected fit signals without inventing a quality score", () => {
  const recommendations = recommendProjects(PROJECTS, {
    outcome: "control-ai-costs",
    constraints: ["no-key", "local-first", "deterministic"],
  });
  assert.equal(recommendations[0].project.id, "samsarix-token-cost-manager");
  assert.deepEqual(recommendations[0].matchedConstraints, ["no-key", "local-first", "deterministic"]);
  assert.ok(recommendations.some(({ project }) => project.id === "samsarix-analytics"));
  assert.ok(recommendations.every(({ profile }) => profile.outcomes.includes("control-ai-costs")));
  assert.ok(recommendations.every((recommendation) => !Object.hasOwn(recommendation, "qualityScore")));
});

test("workbench state is bounded, shareable, and resilient to unknown values", () => {
  const state = normalizeWorkbenchState({
    outcome: "not-real",
    constraints: ["local-first", "unknown", "local-first"],
    compare: ["samsarix-core", "bad-id", "samsarix-cli", "policy-engine", "routine-engine"],
  });
  assert.equal(state.outcome, OUTCOMES[0].id);
  assert.deepEqual(state.constraints, ["local-first"]);
  assert.deepEqual(state.compare, ["samsarix-core", "samsarix-cli", "policy-engine"]);

  const serialized = serializeWorkbenchState(state);
  assert.deepEqual(parseWorkbenchState(`?${serialized}`), state);
});

test("comparison and pilot helpers remain bounded and actionable", () => {
  const recommendations = recommendProjects(PROJECTS, { outcome: "build-agent-workflows" });
  const selected = comparisonSelection(recommendations, [
    "samsarix-core",
    "samsarix-agent-orchestration",
    "unified-llm",
    "routine-engine",
  ]);
  assert.equal(selected.length, 3);
  const plan = buildEvaluationPlan(selected[0]);
  assert.equal(plan.steps.length, 3);
  assert.match(formatEvaluationPlan(plan), /Confirm the boundary:/);
  assert.match(formatEvaluationPlan(plan), /Prove the smallest path:/);
  assert.match(formatEvaluationPlan(plan), /Record the decision:/);
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

  const workbench = await fetch(`${base}/workbench.html?outcome=govern-agent-actions`);
  assert.equal(workbench.status, 200);
  assert.match(await workbench.text(), /From a vague AI job to a defensible pilot/);

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
