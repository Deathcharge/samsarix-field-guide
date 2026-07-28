import { CATEGORIES, PROJECTS } from "./catalog.js";
import { filterProjects, sortProjects } from "./catalog-core.js";

const elements = {
  controls: document.querySelector("#catalog-controls"),
  search: document.querySelector("#catalog-search"),
  clearSearch: document.querySelector("#clear-search"),
  filterButtons: document.querySelector("#filter-buttons"),
  grid: document.querySelector("#project-grid"),
  status: document.querySelector("#result-status"),
  reset: document.querySelector("#reset-filters"),
  empty: document.querySelector("#empty-state"),
  emptyReset: document.querySelector("#empty-reset"),
};

const state = {
  query: "",
  category: "all",
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function element(tagName, className, text) {
  const node = document.createElement(tagName);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function formatActivity(value) {
  const parsed = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(parsed.valueOf()) ? "Activity date unavailable" : `Activity ${dateFormatter.format(parsed)}`;
}

function projectCard(project) {
  const article = element("article", "project-card");
  const header = element("div", "project-card-header");
  const category = element("span", "project-category", CATEGORIES[project.category]);
  const activity = element("span", "project-activity", formatActivity(project.lastActivity));
  const title = element("h3", "project-name", project.name);
  const summary = element("p", "project-summary", project.summary);
  const useCase = element("p", "project-use-case", project.useCase);
  const footer = element("div", "project-card-footer");
  const language = element("span", "language-tag", project.language);
  const link = element("a", "project-link");

  link.href = project.repoUrl;
  link.textContent = "Inspect repository";
  link.setAttribute("aria-label", `Inspect ${project.name} on GitHub`);
  const arrow = element("span", "project-link-arrow", "↗");
  arrow.setAttribute("aria-hidden", "true");
  link.append(" ", arrow);

  header.append(category, activity);
  footer.append(language, link);
  article.append(header, title, summary, useCase, footer);
  return article;
}

function updateUrl() {
  if (!window.history?.replaceState || !/^https?:$/.test(window.location.protocol)) {
    return;
  }

  const url = new URL(window.location.href);
  state.query ? url.searchParams.set("q", state.query) : url.searchParams.delete("q");
  state.category !== "all"
    ? url.searchParams.set("category", state.category)
    : url.searchParams.delete("category");
  window.history.replaceState(null, "", url);
}

function updateButtons() {
  const buttons = elements.filterButtons.querySelectorAll("button[data-category]");
  for (const button of buttons) {
    button.setAttribute("aria-pressed", String(button.dataset.category === state.category));
  }
}

function render() {
  const matches = sortProjects(filterProjects(PROJECTS, state));
  elements.grid.replaceChildren(...matches.map(projectCard));
  elements.grid.setAttribute("aria-busy", "false");
  elements.empty.hidden = matches.length !== 0;
  elements.grid.hidden = matches.length === 0;

  const filtersActive = Boolean(state.query) || state.category !== "all";
  elements.clearSearch.hidden = !state.query;
  elements.reset.hidden = !filtersActive;
  elements.status.textContent = `${matches.length} ${matches.length === 1 ? "repository" : "repositories"} shown`;
  updateButtons();
  updateUrl();
}

function resetFilters({ focusSearch = false } = {}) {
  state.query = "";
  state.category = "all";
  elements.search.value = "";
  render();
  if (focusSearch) elements.search.focus();
}

function loadUrlState() {
  if (!/^https?:$/.test(window.location.protocol)) return;

  const params = new URLSearchParams(window.location.search);
  const query = params.get("q")?.slice(0, 120) ?? "";
  const category = params.get("category") ?? "all";
  state.query = query;
  state.category = category === "all" || Object.hasOwn(CATEGORIES, category) ? category : "all";
  elements.search.value = query;
}

function bindEvents() {
  elements.controls.addEventListener("submit", (event) => event.preventDefault());
  elements.search.addEventListener("input", () => {
    state.query = elements.search.value.slice(0, 120);
    render();
  });
  elements.clearSearch.addEventListener("click", () => {
    state.query = "";
    elements.search.value = "";
    render();
    elements.search.focus();
  });
  elements.filterButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button || !elements.filterButtons.contains(button)) return;
    state.category = button.dataset.category;
    render();
  });
  elements.reset.addEventListener("click", () => resetFilters({ focusSearch: true }));
  elements.emptyReset.addEventListener("click", () => resetFilters({ focusSearch: true }));
}

try {
  loadUrlState();
  bindEvents();
  render();
} catch (error) {
  console.error("The catalog could not be rendered.", error);
  elements.grid.setAttribute("aria-busy", "false");
  elements.grid.replaceChildren();
  elements.status.textContent = "The catalog could not be displayed. Use the public GitHub repository link below.";
  elements.empty.hidden = false;
  elements.empty.querySelector("h3").textContent = "Catalog unavailable";
  elements.empty.querySelector("p:not(.empty-mark)").textContent = "The static page loaded, but its catalog script did not finish.";
  elements.emptyReset.hidden = true;
}
