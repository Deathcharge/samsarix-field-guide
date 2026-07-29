import { PROJECTS } from "../docs/catalog.js";

const owner = "Deathcharge";
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "samsarix-field-guide-catalog-audit",
  "X-GitHub-Api-Version": "2022-11-28",
};

if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

const response = await fetch(`https://api.github.com/users/${owner}/repos?type=owner&per_page=100&sort=full_name`, {
  headers,
});

if (!response.ok) {
  throw new Error(`GitHub catalog request failed with ${response.status} ${response.statusText}`);
}

const remoteNames = (await response.json())
  .filter((repository) => !repository.private && !repository.archived)
  .map((repository) => repository.name)
  .sort((left, right) => left.localeCompare(right, "en-US", { sensitivity: "base" }));
const catalogNames = PROJECTS.map(({ name }) => name).sort((left, right) =>
  left.localeCompare(right, "en-US", { sensitivity: "base" }),
);

const remoteSet = new Set(remoteNames);
const catalogSet = new Set(catalogNames);
const missingFromCatalog = remoteNames.filter((name) => !catalogSet.has(name));
const absentFromGitHub = catalogNames.filter((name) => !remoteSet.has(name));

if (missingFromCatalog.length || absentFromGitHub.length) {
  console.error(
    JSON.stringify(
      {
        owner,
        remoteCount: remoteNames.length,
        catalogCount: catalogNames.length,
        missingFromCatalog,
        absentFromGitHub,
      },
      null,
      2,
    ),
  );
  process.exitCode = 1;
} else {
  console.log(`Catalog matches all ${remoteNames.length} active public repositories owned by ${owner}.`);
}
