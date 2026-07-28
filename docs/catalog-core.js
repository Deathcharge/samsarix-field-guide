export function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("en-US")
    .trim();
}

export function projectSearchText(project) {
  return normalizeText(
    [
      project.name,
      project.category,
      project.language,
      project.summary,
      project.useCase,
    ].join(" "),
  );
}

export function filterProjects(projects, { query = "", category = "all" } = {}) {
  const normalizedQuery = normalizeText(query);
  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  return projects.filter((project) => {
    if (category !== "all" && project.category !== category) {
      return false;
    }

    const haystack = projectSearchText(project);
    return terms.every((term) => haystack.includes(term));
  });
}

export function sortProjects(projects) {
  return [...projects].sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1;
    }

    const activityOrder = right.lastActivity.localeCompare(left.lastActivity);
    if (activityOrder !== 0) {
      return activityOrder;
    }

    return left.name.localeCompare(right.name, "en-US", { sensitivity: "base" });
  });
}
