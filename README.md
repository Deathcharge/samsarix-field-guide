# Samsarix Field Guide

Samsarix Field Guide is a small, static navigator for the 30 public repositories stewarded by Samsarix LLC. It helps developers find a focused application, developer tool, library, service, research project, or earlier portal without presenting the portfolio as one installable platform.

Some GitHub repository addresses still contain the former **Helix** brand. Those names are retained as stable URLs and project history; **Samsarix** is the current company and product-family brand. Every destination remains independently responsible for its installation, tests, releases, licensing, and documentation.

**Current maturity:** release candidate. The site, checks, tests, build, catalog audit, license, contact paths, and publishing branch are ready for review. The live GitHub Pages site updates when this branch is merged into the configured publishing source.

## Who it is for

- Developers discovering the Samsarix portfolio for the first time.
- Contributors deciding which public repository matches a specific job.
- Maintainers who need one cautious, maintainable inventory instead of cross-repository marketing claims.

The primary journey is simple: choose an outcome or search/filter the catalog, read the evidence boundary, and open one relevant repository.

## Quick start

Prerequisites:

- Git
- Node.js 20 or newer (Node.js 24 is used in CI)
- npm 10 or newer

```bash
git clone https://github.com/Deathcharge/samsarix-field-guide.git
cd helix-ecosystem-website
npm ci
npm start
```

Open <http://127.0.0.1:4173>.

No runtime credentials, environment variables, databases, private repositories, hosted APIs, analytics, or external fonts are required.

## What the site does

- Maps all 30 repositories visible on the owner's public GitHub profile at the July 28, 2026 review.
- Shows current product labels alongside stable repository addresses.
- Provides three high-signal starting routes.
- Searches product names, repository names, technologies, descriptions, and use cases.
- Filters by project shape and handles loading, zero-result, script-error, no-JavaScript, and not-found states.
- Uses a reviewed static snapshot instead of making GitHub API calls from a visitor's browser.

Activity dates indicate public repository movement only. They do not certify maintenance, security, package availability, compatibility, licensing, or production readiness.

## Development commands

```bash
npm start       # serve docs/ at http://127.0.0.1:4173
npm run lint    # syntax, formatting, metadata, asset, and catalog checks
npm test        # catalog behavior and local-server integration tests
npm run build   # validate and copy the deployable site to dist/
npm run check   # run the complete release check used by CI
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

## Architecture

```text
docs/index.html       semantic page shell and static fallback
docs/styles.css       responsive visual system
docs/catalog.js       reviewed repository records
docs/catalog-core.js  pure search, filter, and sort behavior
docs/app.js           accessible DOM rendering and URL state
scripts/              zero-dependency lint, build, and local server
tests/                catalog and server integration coverage
```

The deployable source is `docs/`, matching the repository's GitHub Pages setup. `npm run build` creates a disposable `dist/` copy for release verification; generated output is not committed.

## Deployment

GitHub Pages publishes the site from the repository's configured branch and `docs/` directory:

<https://deathcharge.github.io/helix-ecosystem-website/>

CI verifies changes but does not own deployment credentials or Pages settings. After a merge to the publishing branch, verify the page, social image, search, filters, and representative outbound links.

## Security and privacy

- No authentication, forms, cookies, analytics, browser storage, or visitor-data collection.
- Catalog values are rendered with DOM text nodes rather than HTML injection.
- The page declares restrictive Content Security Policy and referrer metadata.
- The development server constrains paths to `docs/`, supports only `GET` and `HEAD`, and returns defensive headers.
- The primary journey requires no external service or private Samsarix repository.

See [`SECURITY.md`](SECURITY.md) for private vulnerability reporting. General inquiries go to [contact@samsarix.com](mailto:contact@samsarix.com); product support goes to [support@samsarix.com](mailto:support@samsarix.com).

## Licensing and brand

The source and site content in this repository are licensed under the [Mozilla Public License 2.0](LICENSE), with copyright and attribution recorded in [`NOTICE`](NOTICE). MPL-2.0 uses file-level copyleft: distributed modifications to covered files remain available under the same license, while larger works may use other terms.

The license does not grant rights to Samsarix names, logos, or branding. See [`TRADEMARKS.md`](TRADEMARKS.md) for the separate brand policy. Linked repositories retain their own license terms.

This structure is intended to keep the public work reusable, credited, and protected without claiming ownership of third-party contributions. It is not legal advice; Samsarix LLC should have counsel review the policy before relying on it for a high-stakes commercial licensing program.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the repository workflow and [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) for community expectations. Product decisions and release evidence are recorded in [`docs/PRODUCTIZATION.md`](docs/PRODUCTIZATION.md).

Copyright © 2026 Samsarix LLC.
