# Contributing to Helix Field Guide

Thanks for helping make the public Helix repository map clearer and more accurate.

## Before you begin

Read the [Code of Conduct](CODE_OF_CONDUCT.md). For catalog changes, treat a repository's own public page as the evidence source. Do not infer production readiness, package publication, security, compatibility, or license terms from a repository name or recent activity.

## Setup

```bash
git clone https://github.com/YOUR_USERNAME/helix-ecosystem-website.git
cd helix-ecosystem-website
npm ci
npm run check
```

Use `npm start` to serve the site at <http://127.0.0.1:4173> while editing.

## Make a change

1. Create a focused branch.
2. Keep the static, zero-runtime-dependency architecture unless a change has a documented product benefit.
3. Update `docs/catalog.js` for catalog facts and `docs/PRODUCTIZATION.md` when a decision, risk, or release criterion changes.
4. Add or update tests when search, filtering, sorting, routing, serving, or validation behavior changes.
5. Run `npm run check` before opening a pull request.

## Catalog evidence standard

A catalog entry should include only:

- a public `https://github.com/Deathcharge/<repository>` URL;
- a plain-language description supported by the repository or the owner's public profile;
- a narrow use case explaining why someone would inspect it;
- a project-shape category and observable primary language;
- the date on which activity metadata was reviewed.

Activity is not maturity. Avoid claims such as "battle-tested," "production-ready," "published on PyPI," or "supports deployment to X" unless that exact claim has been independently verified, is necessary to the field guide, and is documented with durable evidence.

## Pull requests

Describe:

- the user problem addressed;
- the evidence behind any catalog fact;
- the commands run and their results;
- accessibility, privacy, or security effects;
- screenshots only when they materially help reviewers evaluate a visual change.

Keep unrelated changes separate. Maintainers may ask for a narrower claim or scope even when a destination repository uses broader marketing language.

## Release process

The default release artifact is the `docs/` directory. Before publishing:

```bash
npm ci
npm run check
npm start
```

Confirm the primary journey and outbound links, then have an owner publish `main/docs` through the repository's GitHub Pages settings. Do not deploy, change Pages settings, or add external services without owner authorization.

## License

Contributions are governed by the repository's existing [`LICENSE`](LICENSE). Its project scope and contact details are awaiting owner/legal confirmation; contributors should review it before submitting work. Do not describe this repository as MIT or Apache licensed.
