# Helix Field Guide

Helix Field Guide is a small, static navigator for the public repositories in the Deathcharge Helix ecosystem. It helps a developer choose a focused application, developer tool, library, research project, or earlier portal without presenting the collection as one installable platform.

The owner identifies `helix-unified` as the flagship project. That repository is not publicly reachable, so this site deliberately does not duplicate or describe it. The field guide remains independently useful as a public orientation layer for the repositories anyone can evaluate.

**Current maturity:** release candidate. The local site, checks, tests, and build are reproducible. Publishing the revised `docs/` directory and confirming the repository license/contact details are owner-controlled release gates.

## Who it is for

- Developers discovering the Helix ecosystem for the first time.
- Contributors deciding which public repository matches a specific job.
- The repository owner, who needs one cautious and maintainable public catalog instead of a constellation of unverified marketing claims.

The primary journey is: open the field guide, choose an outcome or search/filter the catalog, read the scope note, and open one relevant public repository.

## Quick start

Prerequisites:

- Git
- Node.js 20 or newer (Node.js 24 is used in CI)
- npm 10 or newer

```bash
git clone https://github.com/Deathcharge/helix-ecosystem-website.git
cd helix-ecosystem-website
npm ci
npm start
```

Open <http://127.0.0.1:4173>.

No runtime credentials, environment variables, databases, private repositories, hosted APIs, or external fonts are required.

## What the site does

- Presents three high-signal starting routes.
- Searches repository names, technologies, descriptions, and use cases.
- Filters the reviewed catalog by project shape.
- Handles initial loading, zero-result, script-error, no-JavaScript, and not-found states.
- Explains exactly what the catalog does and does not verify.
- Uses static, reviewed catalog data rather than making live GitHub API calls in a visitor's browser.

The catalog's activity dates indicate repository movement only. They do not certify maintenance quality, security, package availability, compatibility, licensing, or production readiness.

## Development commands

```bash
npm start       # serve docs/ at http://127.0.0.1:4173
npm run lint    # syntax, formatting, metadata, asset, and catalog checks
npm test        # catalog behavior and local-server integration tests
npm run build   # validate and copy the deployable site to dist/
npm run check   # run the complete release check used by CI
```

There is no separate type-check command: the product uses standards-based HTML, CSS, and JavaScript without TypeScript or a compile step. JavaScript syntax is checked on every `npm run lint`.

## Updating the catalog

Catalog entries live in [`docs/catalog.js`](docs/catalog.js). Each entry must:

1. Link directly to a public repository owned by `Deathcharge`.
2. Use a cautious summary supported by the repository or public GitHub profile.
3. Explain the narrow reason someone would inspect it.
4. Record the most recently reviewed activity date without converting that date into a maturity claim.
5. Pass `npm run check`.

The site intentionally contains a reviewed subset, with a link to the owner's complete public repository list. It is not an automatic inventory.

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

The deployable source is `docs/`, matching the repository's existing GitHub Pages shape. `npm run build` creates a disposable `dist/` copy for release verification; generated output is not committed.

## Deployment

GitHub Pages can publish this site directly from the `docs/` directory on the default branch. The currently configured live URL is:

<https://deathcharge.github.io/helix-ecosystem-website/>

Publishing is intentionally not automated by this repository's CI workflow. The owner must merge or push the reviewed changes and confirm that Pages is configured to deploy `main/docs`. A deployment workflow can be added later if the owner explicitly chooses GitHub Actions as the publishing source.

No production deployment was performed as part of the productization work.

## Security and privacy

- The site has no authentication, forms, cookies, analytics, browser storage, or visitor data collection.
- Catalog rendering uses DOM text nodes rather than HTML injection.
- The browser page declares a restrictive Content Security Policy and no-referrer policy.
- The development server constrains paths to `docs/`, supports only `GET` and `HEAD`, and returns defensive headers.
- No external service or private Helix repository is needed for the primary journey.
- Outbound GitHub links leave this site and are governed by GitHub and each destination repository.

GitHub Pages does not let this repository set arbitrary HTTP response headers when publishing directly from a branch. The in-document policy covers the current static threat model; owner-controlled edge headers are optional future hardening.

## Limitations

- Catalog facts are a reviewed snapshot dated July 28, 2026 and can become stale.
- Destination repositories have varying maturity and licenses; inspect each one before adoption.
- The field guide does not test or certify code in other repositories.
- The owner-designated flagship is outside the public catalog while it is not publicly reachable.
- The current `LICENSE` names a different "Licensed Work" and references unresolved owner contact/domain details. It is preserved unchanged pending owner or legal review.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the repository-specific workflow and [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) for community expectations.

Product decisions, baseline evidence, priorities, completed work, remaining gates, and release acceptance criteria are maintained in [`docs/PRODUCTIZATION.md`](docs/PRODUCTIZATION.md).

## License status

The repository currently contains the Business Source License 1.1 text with project-specific parameters in [`LICENSE`](LICENSE). It is **not** MIT licensed, despite the previous README's claim. The license names "Helix Licensing System" rather than this website; changing or interpreting that legal scope requires an owner decision. Linked repositories retain their own license terms.
