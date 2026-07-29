# Samsarix Field Guide — Productization Record

Review date: July 28, 2026

Company steward: Samsarix LLC

Repository: `Deathcharge/samsarix-field-guide`

Canonical deployment: <https://deathcharge.github.io/samsarix-field-guide/>

## Release disposition

**Release candidate.** The repository is a coherent standalone product: a dependency-free, searchable public portfolio guide. Local implementation, documentation, automated checks, license structure, support contacts, publication workflow, branch publication, and hosted CI are in place. Pull-request review, merge, and post-deployment smoke testing are the remaining production gates.

## Evidence reviewed

The review covered:

- every tracked file and recent commit in this repository;
- the authenticated GitHub inventory for `Deathcharge`;
- all 30 repositories publicly reachable from that profile on the review date;
- the sibling Git checkouts available in the local parent workspace;
- each available sibling's README heading, manifest, test directory, workflow count, license heading, branch, worktree state, and most recent local commit;
- the configured GitHub Pages URL and this repository's remote/branch state; and
- official Mozilla licensing guidance for MPL-2.0.

Private repositories were used only to understand portfolio boundaries. They are not catalog routes and no private source or implementation detail is reproduced here.

## Product definition

**Product:** Samsarix Field Guide, a static, goal-oriented navigator for the public Samsarix portfolio and its Helix-era repository addresses.

**Target user:** A developer, evaluator, or contributor asking, “Which repository should I inspect for this job?”

**Primary use case:** In under a minute, choose an outcome, search or filter the complete public inventory, understand the limits of the catalog's claims, and open one relevant repository.

**Reason to exist independently:** Portfolio navigation is a distinct function from any agent runtime or flagship application. Every destination owns its installation, tests, releases, security posture, and license; this repository owns only discovery and evidence boundaries.

## Brand transition

Samsarix LLC and the Samsarix product family replace the former Helix company branding. Existing repository names containing `helix` remain visible because they are real GitHub addresses and historical identifiers. The guide therefore displays:

1. the current reviewed product label; and
2. the literal repository name and URL.

This avoids broken links, preserves provenance, and does not imply that every sibling repository has completed its own rename or release process.

## Catalog decision

The first productization pass used a representative 12-repository subset because evidence was incomplete. Owner confirmation, authenticated GitHub access, and local sibling checkouts now support a bounded 30-repository inventory.

The catalog is still a static reviewed snapshot rather than a visitor-side GitHub API integration. This keeps the primary journey private, deterministic, fast, rate-limit-free, and usable if another service is unavailable.

Each entry records:

- current reviewed product label;
- literal public repository name and URL;
- project shape and observable primary language;
- cautious summary and narrow use case; and
- public activity metadata that is not presented as a maturity signal.

## Licensing decision

The previous `LICENSE` was a customized Business Source License file that named “Helix Licensing System,” “Helix Collective,” dead contact/domain details, and parameters unrelated to this website. It was not a reliable grant for this repository.

The selected structure is:

- **MPL-2.0** for repository source and site content;
- **`NOTICE`** for the Samsarix LLC copyright, attribution, license application notice, and working contact paths; and
- **`TRADEMARKS.md`** to reserve Samsarix names and branding separately from source-code rights.

Why MPL-2.0:

- Mozilla describes it as file-level copyleft: distributed modifications to covered files remain under MPL while separate files in a larger work may use other terms.
- MPL requires license notices to be preserved and includes a contributor patent grant.
- MPL explicitly does not grant trademark, service-mark, or logo rights, allowing source reuse and brand control to be handled separately.
- It avoids the ambiguity and project mismatch of the former customized BSL file while giving more reciprocity than Apache-2.0 or MIT.

Primary references:

- [Mozilla Public License 2.0](https://www.mozilla.org/MPL/2.0/)
- [Mozilla's MPL-2.0 FAQ](https://www.mozilla.org/MPL/2.0/FAQ/)
- [Mozilla's license-header guidance](https://www.mozilla.org/MPL/headers/)

This is a practical repository default, not legal advice. Counsel should review copyright ownership, contributor history, and trademark strategy before Samsarix LLC relies on these files in a dispute, dual-license program, or formal enforcement action.

## Architecture decisions

1. **Static files over an application framework.** The experience needs no runtime dependency or compile step.
2. **Data separated from rendering.** `catalog.js` holds facts, `catalog-core.js` holds pure behavior, and `app.js` renders with safe DOM APIs.
3. **No visitor-side API calls.** The catalog is deterministic and sends no background requests.
4. **GitHub Pages `docs/` retained.** This preserves the known deployment shape and canonical URL.
5. **Repository-owned quality gate.** One zero-dependency command checks formatting, syntax, schema, behavior, HTTP handling, and build output.
6. **Each destination stands alone.** No sibling source is copied or required at runtime.

## Completed work

- Rebuilt the marketing portal as a focused field guide.
- Expanded the catalog from 12 representative routes to all 30 public repositories.
- Rebranded site identity, metadata, documentation, contacts, and legal ownership for Samsarix LLC.
- Kept current product labels distinct from Helix-era repository addresses.
- Added search, category filters, URL state, reset actions, accessible status announcements, and ordinary failure states.
- Added responsive styling, keyboard focus, reduced-motion handling, restrictive browser metadata, and a no-request privacy posture.
- Added local server, verification, tests, deterministic build, lockfile, and CI.
- Added working general, support, conduct, and private security contact paths.
- Replaced the mismatched license with standard MPL-2.0 plus notice and trademark files.
- Reworked the social preview for the Samsarix identity.

## Release acceptance criteria

- [x] Product identity, audience, and scope are explicit.
- [x] All 30 public repositories are represented once.
- [x] Current product labels and literal repository addresses are both visible.
- [x] A user can choose a route, search/filter, recover from zero results, and open a destination.
- [x] The main page remains understandable without JavaScript.
- [x] No runtime secret, account, private service, database, analytics, or API is required.
- [x] Claims are limited to reviewed evidence and clearly scoped.
- [x] CI runs the same meaningful check as local development.
- [x] MPL-2.0, copyright notice, trademark policy, and working contact paths are present.
- [x] GitHub-hosted CI passes on the pushed branch.
- [ ] A draft pull request is reviewed and merged.
- [ ] The published site and social asset are smoke-tested after deployment.
- [ ] Counsel reviews ownership and trademark policy before formal enforcement or commercial dual licensing.

## Known risks and deferred work

- Catalog facts can drift after the review date; review changes against public repositories and available checkouts.
- Destination repositories have independent maturity and licenses; this guide does not certify them.
- A bounded set of public URLs retain Helix-era names because their historical or consolidation decision is intentionally held. The catalog uses every completed Samsarix repository coordinate and keeps only those explicit holds.
- GitHub Pages branch publishing cannot set every recommended HTTP response header.
- Private flagship and company-site work can change without this public guide knowing.
- Browser UI screenshot or assistive-technology lab testing was not requested; semantic structure, CSS behavior, pure catalog logic, and HTTP contracts are covered locally.
- Legal files improve clarity but cannot replace counsel's review of ownership, prior contributions, registrations, or jurisdiction-specific enforcement.

## Final verification record

| Check | Result |
| --- | --- |
| `npm ci` | Passed; one root package audited, zero vulnerabilities. |
| `npm run check` | Passed; 21 text files linted, site contract validated, 5/5 tests passed, and `dist/` built. |
| Catalog contract | Passed; 30 unique records and 30 unique public repository URLs. |
| Outbound route audit | Passed; all 30 catalog repository URLs returned HTTP 200 on July 28, 2026. |
| Social asset | Inspected at 1731×909; approved text is “SAMSARIX FIELD GUIDE” and “Find the right route.” |
| `git diff --check` | Passed after the final implementation review. |
| GitHub-hosted CI | Passed on draft pull request #1 after branch publication. |
| Production Pages smoke test | Pending merge to the configured publishing branch. |
