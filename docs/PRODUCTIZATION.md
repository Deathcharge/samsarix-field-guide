# Productization record

Last updated: July 28, 2026

This is the living decision and release record for Helix Field Guide. It records what was observed in this repository, what the product is now, why that shape was chosen, and what remains owner-controlled.

## Current repository assessment

### Starting state

- The repository was a GitHub Pages documentation site with one 603-line `docs/index.html`, five long ecosystem/consolidation reports, a generic README, generic contribution/community files, and a BSL-style `LICENSE`.
- There was no package manifest, lockfile, source/test split, local verification command, CI workflow, or documented working static-server command.
- The working tree was clean on `main`, tracking `origin/main`. Only `main` and its remote-tracking branches were present locally.
- The seven commits were almost entirely generated documentation and a single-page portal expansion.
- The live GitHub Pages URL returned HTTP 200, but its response reported a November 10, 2025 last-modified date and served an earlier site than the local `main` content.

### What worked

- `docs/index.html` was a browser-loadable static document.
- The existing GitHub Pages URL was reachable without credentials.
- Several outbound public GitHub repository links were reachable.
- The repository had no runtime secret, database, authentication, analytics, paid API, or hosted-service dependency.

### What was incomplete, broken, or misleading

- The README instructed users to install nonexistent `requirements.txt` files, browse a nonexistent `examples/` directory, run nonexistent `pytest` tests, inspect nonexistent architecture/API/deployment documents, and rely on nonexistent GitHub Actions.
- The README claimed MIT licensing while the checked-in file is labeled Business Source License 1.1.
- The website claimed 13 production-ready, battle-tested PyPI packages, 70K+ lines of code, zero external dependencies, and several supported deployment targets without evidence in this repository.
- The page linked `LICENSE` and `LICENSE.PROPRIETARY` as if both were published under `docs/`; the latter file did not exist at all.
- Prominent `helix-unified` and `helix-platform` GitHub links returned HTTP 404 to an unauthenticated visitor on the audit date.
- `helixcollective.dev`, used in license/contact claims, did not resolve in the audit environment.
- The five ecosystem reports asserted that other repositories had been consolidated, deployed, tested, and made enterprise-ready. This repository contained no evidence sufficient to support those claims, and the current public profile still showed many supposedly consolidated repositories.
- Package cards looked clickable but were non-interactive `<div>` elements.
- There were no meaningful loading, empty, failure, no-JavaScript, or not-found states.
- Accessibility gaps included decorative click cursors, weak keyboard affordances, no skip link, no status announcements, and no reduced-motion handling.
- External Google Fonts introduced an unnecessary third-party request.

## Chosen product definition

**Product:** Helix Field Guide, a dependency-free, static, goal-oriented navigator for a reviewed subset of Deathcharge's public Helix repositories.

**Target user:** A developer or potential contributor encountering the public Helix repository collection and asking, "Which repository should I inspect for my job?"

**Primary use case:** In under a minute, choose an outcome, search or filter public projects, understand the limits of the catalog's claims, and open one relevant repository.

**Product form:** A single-page static catalog hosted from `docs/`, plus zero-dependency Node.js verification, tests, build tooling, and a local development server.

**Reason to exist independently of `helix-unified`:** The owner-designated flagship is not publicly reachable. A truthful public directory is a distinct portfolio/navigation function and does not reproduce flagship application behavior.

### Deliberately out of scope

- Reimplementing or summarizing the private flagship.
- Installing, importing, or certifying code from other Helix repositories.
- A live cross-repository dependency graph.
- Authentication, accounts, submissions, comments, analytics, or a database.
- Package registry, release, compatibility, security, or production-readiness claims.
- Automatic GitHub API calls in a visitor's browser.
- Production deployment or GitHub Pages settings changes without owner authorization.

## Product and architecture decisions

1. **Cautious catalog over platform marketing.** The page promises navigation only. Each destination must prove its own maturity.
2. **Reviewed subset over fake completeness.** Twelve representative repositories cover useful project shapes; the owner's GitHub profile remains the complete public list.
3. **Static snapshot over runtime GitHub API.** This removes rate limits, loading outages, privacy leakage, and a network requirement from the core journey.
4. **Plain HTML/CSS/JavaScript over a framework.** The product does not need a dependency or compile step. This keeps install and operating costs effectively zero.
5. **Data and behavior separated.** `catalog.js` contains facts, `catalog-core.js` contains pure search/filter/sort behavior, and `app.js` owns safe DOM rendering.
6. **Text nodes over HTML templates.** Catalog values are inserted with `textContent`/DOM APIs rather than injected as HTML.
7. **GitHub Pages `docs/` retained.** This preserves the repository's existing distribution shape. `dist/` is disposable verification output only.
8. **Checks without deployment authority.** CI verifies changes but does not deploy them.
9. **Legal file preserved.** The inconsistent license was documented, not reinterpreted or changed.

## Assumptions

- The current public GitHub profile and public repository pages are the best available evidence for catalog scope on July 28, 2026.
- A recent activity date is observable metadata, not proof of health or maintenance.
- `https://deathcharge.github.io/helix-ecosystem-website/` remains the intended canonical URL because it returned HTTP 200 during the audit.
- The owner will decide whether the current license was intended to govern this website.
- The public site should remain useful when every other Helix service is unavailable.

## Bounded current research

- GitHub's official Pages documentation confirms that a site can publish directly from a `docs/` folder on a branch when no custom build control is needed. That supports retaining the simplest existing distribution path.
- GitHub also supports Actions-based Pages deployment, but enabling that publishing source and deployment permission is owner-controlled; this repository therefore adds CI checks only.
- Backstage demonstrates the value of a centralized software catalog for a large engineering estate. This repository has one owner and a small public collection, so the defensible wedge is a far lighter, static field guide rather than a service catalog platform.
- The owner's public GitHub profile listed 30 public repositories and supplied the observable names, languages, descriptions, and activity dates used to bound the curated catalog.

## Baseline command results

| Check | Actual baseline result |
| --- | --- |
| `git status --short --branch` | `## main...origin/main`; no modified or untracked files. |
| `git branch --all --no-color` | Local `main`, `origin/main`, and `origin/HEAD -> origin/main` only. |
| `git log -8 --oneline` | Seven commits; latest `b5173a6 docs: enhance README with comprehensive documentation`. |
| `rg --files` | Ten tracked files: README, license/community files, `docs/index.html`, and five long Markdown reports. |
| Install | No manifest or lockfile existed, so there was no repository install command to run. |
| Lint/type-check/test/build | No scripts, configuration, source tests, CI, or build command existed. |
| Start | A raw static document existed, but no repository-owned server/start command was documented. |
| Live Pages HEAD request | HTTP 200; 14,100-byte HTML; last modified November 10, 2025. |
| Public `helix-unified` URL | HTTP 404 for an unauthenticated request. |
| Public `helix-platform` URL | HTTP 404 for an unauthenticated request. |
| `helixcollective.dev` | DNS resolution failed in the audit environment. |

## Findings and priorities

### P0 — blocks a credible first release

- [x] Replace false setup, CI, testing, licensing, package, and readiness claims.
- [x] Define a standalone product that does not depend on the private flagship.
- [x] Complete the browse/search/filter/open-repository journey.
- [x] Add reproducible local start, validation, tests, build, lockfile, and CI.
- [x] Remove broken core-path links and deceptive non-interactive package cards.
- [x] Add empty, loading, script-failure, no-JavaScript, and 404 behavior.

### P1 — seriously harms usefulness, reliability, security, or maintainability

- [x] Make the catalog data-driven and schema-validated.
- [x] Add keyboard focus, labels, live result announcements, skip navigation, responsive layouts, and reduced-motion support.
- [x] Remove external fonts, analytics implications, and runtime API calls.
- [x] Add a restrictive in-document Content Security Policy and a bounded local server.
- [x] Replace generic contribution and conduct promises with repository-specific, supportable guidance.
- [x] Remove obsolete reports that made unverified claims about other repositories.
- [ ] Owner/legal review of `LICENSE` scope, Change Date/initial-release interaction, licensor identity, pricing URL, and contact address.
- [ ] Owner publishes a verified private conduct/security contact method.
- [ ] Owner deploys the revised `docs/` output and verifies the canonical URL.

### P2 — valuable after the first credible release

- [ ] Establish a documented review cadence and issue template for catalog corrections.
- [ ] Expand the reviewed subset only when each additional repository has a narrow, evidence-backed route.
- [ ] Add automated outbound-link monitoring that reports failures without blocking local/offline use.
- [ ] Add edge-level security headers if the owner moves from branch-based Pages to a host that supports them.
- [ ] Add real-user feedback only after a privacy-respecting collection method and owner channel exist.

## Implementation checklist

- [x] Preserve and audit the clean starting worktree.
- [x] Inspect every tracked artifact, recent history, local branches, placeholders, claims, links, license, and deployment shape.
- [x] Research the owner's current public repository profile and official GitHub Pages guidance.
- [x] Define product, target user, core journey, boundary with flagship, distribution, and sustainability.
- [x] Implement semantic page shell and visual system.
- [x] Implement reviewed catalog records and pure search/filter/sort behavior.
- [x] Implement safe DOM rendering, URL state, reset, and ordinary failure states.
- [x] Add local server, lint/contract checks, tests, deterministic build, and CI.
- [x] Rewrite README, contributing guidance, and conduct policy.
- [x] Remove misleading legacy reports.
- [x] Generate, inspect, and wire the social preview image.
- [x] Run final clean install and all verification commands.
- [x] Perform adversarial final review and resolve locally actionable findings.

## Release acceptance criteria

- [x] Product identity, audience, and scope are explicit.
- [x] A user can choose a route, search/filter, recover from zero results, and open a destination.
- [x] The main page remains understandable without JavaScript.
- [x] No runtime secrets, credentials, private service, database, or API are required.
- [x] Claims are limited to reviewed public evidence and clearly scoped.
- [x] Configuration and runtime resource use are bounded.
- [x] CI runs the same meaningful check as local development.
- [x] `npm ci`, lint, tests, build, and local smoke checks pass from the documented commands.
- [x] The social preview asset contains only approved text and is wired into metadata.
- [ ] The owner confirms or corrects the repository's legal license scope before describing the release as generally adoptable.
- [ ] The owner publishes and smoke-tests the changed `docs/` site.

## Completed work

- Replaced the 603-line marketing portal with Helix Field Guide.
- Added three outcome-led routes and a twelve-entry reviewed repository catalog.
- Added search, category filters, query-string state, clear/reset actions, results announcements, and empty/error/no-script states.
- Added a responsive visual system with high-contrast focus treatment and reduced-motion support.
- Added a custom 404 page, restrictive CSP/referrer metadata, canonical/social metadata, and a zero-request privacy posture.
- Generated and inspected one project-specific social card with the exact text "HELIX FIELD GUIDE" and "Find the right route.", then saved it as `docs/og.png` and wired absolute Open Graph/X metadata.
- Added a zero-dependency package manifest, lockfile workflow, local server, lint/contract verifier, static build, integration tests, and CI.
- Rewrote setup, architecture, security/privacy, deployment, limitation, contribution, conduct, and license documentation.
- Removed five obsolete generated reports whose cross-repository claims could not be supported here.

## Deferred work and rationale

- **Full 30-repository catalog:** Deferred because breadth without repository-by-repository review would recreate the original credibility problem.
- **Live GitHub synchronization:** Deferred because rate limits, network failure, privacy, and unreviewed text are poor tradeoffs for a small public index.
- **Framework migration:** Deferred because the primary experience is fully supportable with static platform features.
- **User submissions/accounts:** Deferred because they add identity, moderation, persistence, privacy, and abuse-control requirements without evidence of need.
- **Other-repository testing:** Out of scope; this repository must not claim to certify independent projects.

## Owner-, legal-, and production-blocked tasks

1. **License decision:** Confirm whether `LICENSE` is meant to cover this website; correct the named Licensed Work, parameters, pricing URL, and contact through legal review if necessary; then verify the rendered README/site language.
2. **Private reporting contact:** Publish a working private address or enable an appropriate GitHub reporting channel, then update the Code of Conduct and any future security policy.
3. **Production publication:** Merge or push the reviewed changes, confirm Pages uses `main/docs`, wait for deployment, and smoke-test the canonical URL and `og.png` response.
4. **Repository metadata:** Set a concise GitHub About description, website URL, and topics if the owner wants better discoverability.

## Known risks

- Static catalog facts can drift after the review date.
- A destination repository can change, disappear, become private, or change license without this site knowing.
- GitHub Pages branch publishing cannot set all recommended security response headers.
- The unresolved repository license may deter contribution or reuse.
- The live site remains stale until owner-authorized publication.
- Search/filter behavior is tested without a full browser DOM automation stack; visual browser QA was not requested and is outside the local static checks.

## Distribution and sustainability

**Distribution:** GitHub Pages from `main/docs`, with a local `npm start` preview and a verified `dist/` artifact. No package, store, account, or private infrastructure is required.

**Sustainability:** Keep the catalog free and static. Hosting and runtime cost should remain effectively zero under ordinary GitHub Pages use. The plausible model is portfolio discovery and contributor routing, not direct monetization. If commercial Helix products emerge, link to independently verifiable product pages rather than turning this catalog into an unverified sales surface.

## Final verification record

| Command/check | Actual result |
| --- | --- |
| `npm install --package-lock-only --ignore-scripts` | Passed; generated lockfile, audited one root package, zero vulnerabilities. |
| `npm ci` | Passed from the committed lockfile in 47 seconds; audited one root package, zero vulnerabilities. |
| `npm run check` | Final post-review run passed: 19 text files linted, 5/5 tests passed, and `dist/` built successfully. |
| `npm test` within `npm run check` | 5 passed, 0 failed: catalog schema, normalized search, composed filters, stable sorting, HTTP serving, security headers, HEAD, 404, and traversal containment. |
| Local `GET /` | HTTP 200; `text/html`; 12,703 bytes; restrictive CSP, no-referrer, no-sniff, and frame-deny headers. |
| Local `GET /og.png` | HTTP 200; `image/png`; 2,107,849 bytes. Source dimensions 1730×909; generated text inspected as exact. |
| Local `GET /missing-route` | HTTP 404 with the custom HTML error page. |
| Local `POST /` | HTTP 405 with `Allow: GET, HEAD`. |
| Twelve catalog repository HEAD requests | 12/12 returned HTTP 200 on July 28, 2026. |
| Secret-pattern scan | No AWS access key, OpenAI-style key, GitHub PAT, or Slack token pattern found. |
| `git diff --check` | Passed; no whitespace errors. |

### Validation not run

- The GitHub-hosted CI workflow was not run because changes were not pushed.
- No production Pages deployment or post-deployment smoke test was run because the owner did not authorize a push or live-infrastructure change.
- No full visual browser automation, screenshot comparison, or assistive-technology lab test was run. The product's pure behavior, HTTP contract, semantics, focus styles, reduced-motion CSS, and responsive rules were inspected and locally tested; browser UI QA was not explicitly requested.
- Destination repository installs, tests, packages, deployments, and licenses were not run because other repositories are out of scope.

## Adversarial final review

- The first complete check exposed an invalid `node:url` import in the lint runner. It was corrected before any passing result was recorded.
- Official action repositories showed `actions/checkout@v7` and `actions/setup-node@v7` as the current usage, so CI was updated from the initially drafted older majors.
- The local server was hardened to reject resolved paths outside the site root, including symlink-based escape paths in addition to encoded `..` traversal.
- A `.nojekyll` marker was added so GitHub Pages treats the deployable directory as raw static files.
- Internal section links are now validated against document IDs, and the social asset is required and size-checked by the repository contract.
- User-facing setup and site surfaces were scanned for the retired readiness, package, and dependency claims. Remaining mentions are explicit warnings or historical evidence, not product promises.
- The entire changed tree was scanned for common committed-secret patterns; no match was found.
- All twelve catalog destination links returned HTTP 200 during the final review.
- The remaining license/contact and publication issues require owner authority and cannot be fixed honestly from repository evidence alone.

## Release disposition

**Final:** release candidate with named external gates. The local product, documentation, checks, tests, build, and HTTP smoke path pass. Owner/legal license review, a verified private reporting contact, and owner-authorized Pages publication/smoke testing remain.
