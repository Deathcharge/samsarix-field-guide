# Samsarix Field Guide

Samsarix Field Guide is a small, static navigator and decision workbench for the 31 public repositories stewarded by Samsarix LLC. It helps developers match a concrete AI or automation job to independently evaluable projects without presenting the portfolio as one installable platform.

Some GitHub repository addresses still contain the former **Helix** brand because their rename or lifecycle decision is intentionally held. **Samsarix** is the current company and product-family brand. Every destination remains independently responsible for its installation, tests, releases, licensing, and documentation.

**Current maturity:** production baseline. The Decision Workbench, catalog, tests, build, live audits, license, support paths, and least-privilege Pages deployment are merged and published. Destination projects still own every installation, release, security, compatibility, and readiness claim.

**Current release:** [v1.0.0](https://github.com/Deathcharge/samsarix-field-guide/releases/tag/v1.0.0). See the [changelog](CHANGELOG.md) for the release contents and [`CITATION.cff`](CITATION.cff) for machine-readable credit metadata.

## Who it is for

- Developers discovering the Samsarix portfolio for the first time.
- Contributors deciding which public repository matches a specific job.
- Maintainers who need one cautious, maintainable inventory instead of cross-repository marketing claims.

The primary journey is simple: choose an outcome and constraints, review a transparent shortlist, compare up to three projects, copy a bounded pilot plan, and open one relevant repository.

## Quick start

Prerequisites:

- Git
- Node.js 20 or newer (Node.js 24 is used in CI)
- npm 10 or newer

```bash
git clone https://github.com/Deathcharge/samsarix-field-guide.git
cd samsarix-field-guide
npm ci
npm start
```

Open <http://127.0.0.1:4173>.

No runtime credentials, environment variables, databases, private repositories, hosted APIs, analytics, or external fonts are required.

## What the site does

- Maps all 31 active public repositories visible on the owner's GitHub profile at the August 11, 2026, review.
- Matches eight real-world outcomes and six operating constraints against an explicit, reviewed decision profile for every repository.
- Compares up to three candidates without turning fit into an opaque maturity or quality score.
- Generates a copyable three-step pilot plan with one concrete exercise and one limitation to verify.
- Encodes a complete evaluation brief in the URL without accounts, analytics, cookies, or browser storage.
- Preserves the useful architecture-evaluation and lifecycle guidance from the Project Guide and Hub Directory on one canonical, license-conscious boundaries page.
- Shows current product labels alongside stable repository addresses.
- Provides three high-signal starting routes.
- Searches product names, repository names, technologies, descriptions, and use cases.
- Filters by project shape and handles loading, zero-result, script-error, no-JavaScript, and not-found states.
- Uses a reviewed static snapshot instead of making GitHub API calls from a visitor's browser.

Activity dates indicate public repository movement only. They do not certify maintenance, security, package availability, compatibility, licensing, or production readiness.

## Decision Workbench

Open <https://deathcharge.github.io/samsarix-field-guide/workbench.html> or select **Build an evaluation plan** from the home page.

The ranking rule is intentionally small and inspectable:

1. Include only projects whose reviewed profile names the selected outcome.
2. Prefer projects matching more selected constraints.
3. Use primary-versus-secondary outcome fit, featured status, and product name only as tie-breakers.

The result is a fit shortlist, not a security, maintenance, or readiness score. The decision model lives in `docs/decision-model.js`; pure ranking, URL-state, comparison, and pilot-plan behavior live in `docs/workbench-core.js`.

## Development commands

```bash
npm start       # serve docs/ at http://127.0.0.1:4173
npm run lint    # syntax, formatting, metadata, asset, and catalog checks
npm test        # catalog behavior and local-server integration tests
npm run build   # validate and copy the deployable site to dist/
npm run check   # run the complete release check used by CI
npm run audit:catalog # compare the snapshot with the live public GitHub inventory
npm run audit:routes  # confirm every catalog destination returns a successful HTTP response
```

There is no separate type-check command: the product uses standards-based HTML, CSS, and JavaScript without TypeScript or a compile step. JavaScript syntax is checked during `npm run lint`.

## Updating the catalog

Catalog records live in [`docs/catalog.js`](docs/catalog.js). Each record must:

1. Link directly to a public repository owned by `Deathcharge`.
2. Show the current reviewed product name and the literal repository address.
3. Use a cautious summary supported by the repository or its available sibling checkout.
4. Explain the narrow reason someone would inspect it.
5. Treat activity as metadata rather than a maturity claim.
6. Pass `npm run check`.

Each destination repository owns its setup, release, security, and license claims. This guide is a map, not a cross-repository dependency or certification system.

Run `npm run audit:catalog` during a portfolio refresh. It performs a read-only GitHub API comparison and fails if the active public repository names differ from the checked-in catalog; it is deliberately separate from the offline build and test gate.

## Architecture

```text
docs/index.html       semantic page shell and static fallback
docs/styles.css       responsive visual system
docs/catalog.js       reviewed repository records
docs/catalog-core.js  pure search, filter, and sort behavior
docs/app.js           accessible DOM rendering and URL state
docs/decision-model.js reviewed outcomes, constraints, first checks, and caveats
docs/workbench-core.js pure recommendation, comparison, sharing, and pilot behavior
docs/workbench.html    outcome-led decision and evaluation experience
docs/workbench.js      accessible workbench rendering and interactions
scripts/              release lint, schema checks, build, and local server
tests/                catalog and server integration coverage
```

The deployable source is `docs/`, matching the repository's GitHub Pages setup. `npm run build` creates a disposable `dist/` copy for release verification; generated output is not committed.

## Deployment

The least-privilege `.github/workflows/pages.yml` workflow publishes `docs/` after a change reaches `main`:

<https://deathcharge.github.io/samsarix-field-guide/>

The workflow uses GitHub's Pages OIDC deployment path and immutable official-action revisions; it requires no repository-owned deployment secret. CI remains a separate gate, pins its actions to immutable revisions, and Dependabot checks both workflows weekly. After a merge, verify the page, workbench, social image, and representative outbound links.

## Security and privacy

- No authentication, forms, cookies, analytics, browser storage, or visitor-data collection.
- Catalog values are rendered with DOM text nodes rather than HTML injection.
- The page declares restrictive Content Security Policy and referrer metadata.
- The development server constrains paths to `docs/`, supports only `GET` and `HEAD`, and returns defensive headers.
- The primary journey requires no external service or private Samsarix repository.

See [`SECURITY.md`](SECURITY.md) for private vulnerability reporting. General inquiries go to [contact@samsarix.com](mailto:contact@samsarix.com); product support goes to [support@samsarix.com](mailto:support@samsarix.com).

## Licensing and brand

The source and site content in this repository are licensed under the [Mozilla Public License 2.0](LICENSE), with copyright and attribution recorded in [`NOTICE`](NOTICE). MPL-2.0 uses file-level copyleft: distributed modifications to covered files remain available under the same license, while larger works may use other terms. GitHub also exposes the project's machine-readable citation metadata from [`CITATION.cff`](CITATION.cff).

The license does not grant rights to Samsarix names, logos, or branding. See [`TRADEMARKS.md`](TRADEMARKS.md) for the separate brand policy. Linked repositories retain their own license terms.

This structure is intended to keep the public work reusable, credited, and protected without claiming ownership of third-party contributions. It is not legal advice; Samsarix LLC should have counsel review the policy before relying on it for a high-stakes commercial licensing program.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the repository workflow and [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) for community expectations. Product decisions and release evidence are recorded in [`docs/PRODUCTIZATION.md`](docs/PRODUCTIZATION.md). Market evidence and the deliberately narrow product wedge are recorded in [`docs/COMPETITIVE_POSITIONING.md`](docs/COMPETITIVE_POSITIONING.md).

Ran a bounded evaluation? [Share the public pilot evidence](https://github.com/Deathcharge/samsarix-field-guide/issues/new?template=pilot-result.yml). Found a stale fact or fit signal? [Propose an evidence-backed correction](https://github.com/Deathcharge/samsarix-field-guide/issues/new?template=catalog-correction.yml). Never include secrets, private source, personal data, or confidential information in an issue.

Copyright © 2026 Samsarix LLC.
