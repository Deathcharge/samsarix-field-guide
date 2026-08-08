import { CONSTRAINTS, OUTCOMES, PROJECT_PROFILES } from "./decision-model.js";

const outcomeIds = new Set(OUTCOMES.map(({ id }) => id));
const constraintIds = new Set(CONSTRAINTS.map(({ id }) => id));

function uniqueKnown(values, known, limit = Number.POSITIVE_INFINITY) {
  return [...new Set(values)].filter((value) => known.has(value)).slice(0, limit);
}

export function normalizeWorkbenchState({ outcome, constraints = [], compare = [] } = {}) {
  return {
    outcome: outcomeIds.has(outcome) ? outcome : OUTCOMES[0].id,
    constraints: uniqueKnown(constraints, constraintIds),
    compare: [...new Set(compare)].filter((value) => Object.hasOwn(PROJECT_PROFILES, value)).slice(0, 3),
  };
}

export function parseWorkbenchState(search = "") {
  const params = new URLSearchParams(search);
  return normalizeWorkbenchState({
    outcome: params.get("outcome") ?? undefined,
    constraints: (params.get("constraints") ?? "").split(",").filter(Boolean),
    compare: (params.get("compare") ?? "").split(",").filter(Boolean),
  });
}

export function serializeWorkbenchState(state) {
  const normalized = normalizeWorkbenchState(state);
  const params = new URLSearchParams({ outcome: normalized.outcome });
  if (normalized.constraints.length) params.set("constraints", normalized.constraints.join(","));
  if (normalized.compare.length) params.set("compare", normalized.compare.join(","));
  return params.toString();
}

export function recommendProjects(projects, requestedState = {}) {
  const state = normalizeWorkbenchState(requestedState);

  return projects
    .map((project) => {
      const profile = PROJECT_PROFILES[project.id];
      if (!profile || !profile.outcomes.includes(state.outcome)) return null;

      const matchedConstraints = state.constraints.filter((constraint) => profile.traits.includes(constraint));
      const missingConstraints = state.constraints.filter((constraint) => !profile.traits.includes(constraint));

      return {
        project,
        profile,
        outcomeRank: profile.outcomes.indexOf(state.outcome),
        matchedConstraints,
        missingConstraints,
      };
    })
    .filter(Boolean)
    .sort((left, right) => {
      const matchOrder = right.matchedConstraints.length - left.matchedConstraints.length;
      if (matchOrder !== 0) return matchOrder;
      const missingOrder = left.missingConstraints.length - right.missingConstraints.length;
      if (missingOrder !== 0) return missingOrder;
      const outcomeOrder = left.outcomeRank - right.outcomeRank;
      if (outcomeOrder !== 0) return outcomeOrder;
      if (left.project.featured !== right.project.featured) return left.project.featured ? -1 : 1;
      return left.project.productName.localeCompare(right.project.productName, "en-US", { sensitivity: "base" });
    });
}

export function comparisonSelection(recommendations, ids) {
  const recommendationById = new Map(recommendations.map((recommendation) => [recommendation.project.id, recommendation]));
  return [...new Set(ids)].slice(0, 3).map((id) => recommendationById.get(id)).filter(Boolean);
}

export function buildEvaluationPlan(recommendation) {
  if (!recommendation) return null;
  const { project, profile } = recommendation;
  return Object.freeze({
    title: `${project.productName} — smallest credible pilot`,
    repository: project.repoUrl,
    steps: Object.freeze([
      `Confirm the boundary: read the README, LICENSE, and SECURITY guidance, then verify that the repository still supports this job: ${project.useCase}`,
      `Prove the smallest path: ${profile.firstCheck}`,
      `Record the decision: capture the exact commit, commands, result, time spent, and this known limitation: ${profile.watchFor}`,
    ]),
  });
}

export function formatEvaluationPlan(plan) {
  if (!plan) return "";
  return [
    plan.title,
    plan.repository,
    "",
    ...plan.steps.map((step, index) => `${index + 1}. ${step}`),
  ].join("\n");
}
