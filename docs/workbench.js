import { CATEGORIES, PROJECTS } from "./catalog.js";
import { CONSTRAINTS, OUTCOMES } from "./decision-model.js";
import {
  buildEvaluationPlan,
  comparisonSelection,
  formatEvaluationPlan,
  normalizeWorkbenchState,
  parseWorkbenchState,
  recommendProjects,
  serializeWorkbenchState,
} from "./workbench-core.js";

const elements = {
  form: document.querySelector("#decision-form"),
  reset: document.querySelector("#reset-brief"),
  copyBrief: document.querySelector("#copy-brief-link"),
  briefFeedback: document.querySelector("#brief-copy-feedback"),
  recommendationGrid: document.querySelector("#recommendation-grid"),
  recommendationSummary: document.querySelector("#recommendation-summary"),
  recommendationStatus: document.querySelector("#recommendation-status"),
  comparisonShell: document.querySelector("#comparison-shell"),
  comparisonHead: document.querySelector("#comparison-head"),
  comparisonBody: document.querySelector("#comparison-body"),
  comparisonEmpty: document.querySelector("#comparison-empty"),
  pilotName: document.querySelector("#pilot-name"),
  pilotSteps: document.querySelector("#pilot-steps"),
  pilotRepository: document.querySelector("#pilot-repository"),
  copyPlan: document.querySelector("#copy-plan"),
  planFeedback: document.querySelector("#plan-copy-feedback"),
};

const outcomeById = new Map(OUTCOMES.map((outcome) => [outcome.id, outcome]));
const constraintById = new Map(CONSTRAINTS.map((constraint) => [constraint.id, constraint]));
let state = parseWorkbenchState(window.location.search);
let recommendations = [];
let currentPlan = null;

function element(tagName, className, text) {
  const node = document.createElement(tagName);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function readFormState() {
  const data = new FormData(elements.form);
  return normalizeWorkbenchState({
    outcome: data.get("outcome"),
    constraints: data.getAll("constraint"),
    compare: state.compare,
  });
}

function syncForm() {
  const outcome = elements.form.querySelector(`input[name="outcome"][value="${state.outcome}"]`);
  if (outcome) outcome.checked = true;
  for (const checkbox of elements.form.querySelectorAll('input[name="constraint"]')) {
    checkbox.checked = state.constraints.includes(checkbox.value);
  }
}

function updateUrl() {
  if (!window.history?.replaceState || !/^https?:$/.test(window.location.protocol)) return;
  const url = new URL(window.location.href);
  url.search = serializeWorkbenchState(state);
  window.history.replaceState(null, "", url);
}

function signalChip(constraintId, matched) {
  const label = constraintById.get(constraintId)?.label ?? constraintId;
  const chip = element("span", matched ? "fit-chip fit-chip-match" : "fit-chip fit-chip-gap");
  chip.textContent = `${matched ? "+" : "−"} ${label}`;
  return chip;
}

function recommendationCard(recommendation, index) {
  const { project, profile, matchedConstraints, missingConstraints } = recommendation;
  const article = element("article", "recommendation-card");
  const top = element("div", "recommendation-card-top");
  const rank = element("span", "recommendation-rank", String(index + 1).padStart(2, "0"));
  const category = element("span", "project-category", CATEGORIES[project.category]);
  const title = element("h3", "recommendation-name", project.productName);
  const repository = element("p", "project-repository", project.name);
  const summary = element("p", "recommendation-copy", project.summary);
  const reason = element(
    "p",
    "recommendation-reason",
    profile.outcomes[0] === state.outcome ? "Primary fit for this outcome." : "Relevant secondary fit for this outcome.",
  );
  const fit = element("div", "fit-signals");
  const pilot = element("p", "recommendation-pilot");
  const pilotLabel = element("strong", "", "Smallest check: ");
  const actions = element("div", "recommendation-actions");
  const repoLink = element("a", "button button-secondary", "Open repository ↗");
  const compareButton = element("button", "button compare-button");
  const selected = state.compare.includes(project.id);

  repoLink.href = project.repoUrl;
  repoLink.setAttribute("aria-label", `Open ${project.productName} on GitHub`);
  compareButton.type = "button";
  compareButton.dataset.projectId = project.id;
  compareButton.setAttribute("aria-pressed", String(selected));
  compareButton.textContent = selected ? "Remove from comparison" : "Add to comparison";

  top.append(rank, category);
  if (state.constraints.length) {
    fit.append(
      ...matchedConstraints.map((constraint) => signalChip(constraint, true)),
      ...missingConstraints.map((constraint) => signalChip(constraint, false)),
    );
  } else {
    fit.append(element("span", "fit-chip", "No constraints selected"));
  }
  pilot.append(pilotLabel, profile.firstCheck);
  actions.append(repoLink, compareButton);
  article.append(top, title, repository, summary, reason, fit, pilot, actions);
  return article;
}

function tableCell(text) {
  return element("td", "", text);
}

function renderComparison() {
  const selected = comparisonSelection(recommendations, state.compare);
  elements.comparisonHead.replaceChildren();
  elements.comparisonBody.replaceChildren();
  elements.comparisonEmpty.hidden = selected.length !== 0;
  elements.comparisonShell.hidden = selected.length === 0;

  if (!selected.length) {
    currentPlan = null;
    renderPilot();
    return;
  }

  const headingRow = document.createElement("tr");
  headingRow.append(element("th", "comparison-label", "Signal"));
  for (const { project } of selected) {
    const heading = element("th", "", project.productName);
    heading.scope = "col";
    headingRow.append(heading);
  }
  elements.comparisonHead.append(headingRow);

  const rows = [
    ["Repository", ({ project }) => project.name],
    ["Shape", ({ project }) => CATEGORIES[project.category]],
    ["Language", ({ project }) => project.language],
    ["Constraints matched", ({ matchedConstraints }) =>
      state.constraints.length ? `${matchedConstraints.length} of ${state.constraints.length}` : "No constraints selected"],
    ["Smallest check", ({ profile }) => profile.firstCheck],
    ["Verify before adoption", ({ profile }) => profile.watchFor],
  ];

  for (const [label, value] of rows) {
    const row = document.createElement("tr");
    const heading = element("th", "comparison-label", label);
    heading.scope = "row";
    row.append(heading, ...selected.map((recommendation) => tableCell(value(recommendation))));
    elements.comparisonBody.append(row);
  }

  currentPlan = buildEvaluationPlan(selected[0]);
  renderPilot();
}

function renderPilot() {
  elements.pilotSteps.replaceChildren();
  if (!currentPlan) {
    elements.pilotName.textContent = "Select a project to create a pilot.";
    elements.pilotRepository.hidden = true;
    elements.copyPlan.disabled = true;
    return;
  }

  elements.pilotName.textContent = currentPlan.title;
  elements.pilotSteps.append(...currentPlan.steps.map((step) => element("li", "", step)));
  elements.pilotRepository.href = currentPlan.repository;
  elements.pilotRepository.hidden = false;
  elements.copyPlan.disabled = false;
}

function render({ announce = false, autofill = true } = {}) {
  recommendations = recommendProjects(PROJECTS, state);
  const validCompare = comparisonSelection(recommendations, state.compare).map(({ project }) => project.id);
  state.compare = validCompare.length || !autofill
    ? validCompare
    : recommendations.slice(0, 3).map(({ project }) => project.id);

  const outcome = outcomeById.get(state.outcome);
  const cards = recommendations.slice(0, 6).map(recommendationCard);
  elements.recommendationGrid.replaceChildren(...cards);
  elements.recommendationGrid.setAttribute("aria-busy", "false");
  elements.recommendationSummary.textContent = state.constraints.length
    ? `${recommendations.length} projects fit “${outcome.label}”; ranked by ${state.constraints.length} selected constraint ${state.constraints.length === 1 ? "signal" : "signals"}.`
    : `${recommendations.length} projects fit “${outcome.label}”; choose constraints to sharpen the order.`;
  elements.recommendationStatus.textContent = announce
    ? `Shortlist updated. ${Math.min(cards.length, 6)} recommendations shown and ${state.compare.length} selected for comparison.`
    : "";

  renderComparison();
  syncForm();
  updateUrl();
}

function chooseNewBrief() {
  state = readFormState();
  state.compare = [];
  elements.briefFeedback.textContent = "";
  render({ announce: true });
}

async function copyText(value, feedback, successMessage) {
  try {
    await navigator.clipboard.writeText(value);
    feedback.textContent = successMessage;
  } catch {
    feedback.textContent = "Copy was unavailable. Select the address or plan text manually.";
  }
}

function bindEvents() {
  elements.form.addEventListener("change", chooseNewBrief);
  elements.reset.addEventListener("click", () => {
    state = normalizeWorkbenchState();
    render({ announce: true });
  });
  elements.copyBrief.addEventListener("click", () => {
    const url = new URL(window.location.href);
    url.search = serializeWorkbenchState(state);
    copyText(url.href, elements.briefFeedback, "Shareable brief link copied.");
  });
  elements.recommendationGrid.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-project-id]");
    if (!button || !elements.recommendationGrid.contains(button)) return;
    const id = button.dataset.projectId;
    state.compare = state.compare.includes(id)
      ? state.compare.filter((projectId) => projectId !== id)
      : [...state.compare, id].slice(-3);
    render({ announce: true, autofill: false });
  });
  elements.copyPlan.addEventListener("click", () => {
    copyText(formatEvaluationPlan(currentPlan), elements.planFeedback, "Pilot plan copied.");
  });
}

try {
  bindEvents();
  render();
} catch (error) {
  console.error("The Decision Workbench could not be rendered.", error);
  elements.recommendationGrid.setAttribute("aria-busy", "false");
  elements.recommendationGrid.replaceChildren();
  elements.recommendationSummary.textContent = "The interactive shortlist could not be displayed.";
  elements.recommendationStatus.textContent = "Use the complete repository catalog from the Field Guide home page.";
}
