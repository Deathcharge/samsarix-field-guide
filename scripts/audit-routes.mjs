import { PROJECTS } from "../docs/catalog.js";

const headers = {
  Accept: "text/html,application/xhtml+xml,application/vnd.github+json",
  "User-Agent": "samsarix-field-guide-route-audit",
};

async function inspectRoute(project) {
  const response = await fetch(project.repoUrl, {
    method: "HEAD",
    redirect: "follow",
    headers,
    signal: AbortSignal.timeout(15_000),
  });
  return {
    name: project.name,
    status: response.status,
    finalUrl: response.url,
    ok: response.ok,
  };
}

const results = await Promise.all(
  PROJECTS.map(async (project) => {
    try {
      return await inspectRoute(project);
    } catch (error) {
      return {
        name: project.name,
        status: 0,
        finalUrl: project.repoUrl,
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }),
);

const failures = results.filter(({ ok }) => !ok);
if (failures.length) {
  console.error(JSON.stringify({ checked: results.length, failures }, null, 2));
  process.exitCode = 1;
} else {
  console.log(`All ${results.length} catalog repository routes returned successful HTTP responses.`);
}
