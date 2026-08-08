# Contributing to Samsarix Field Guide

Thanks for helping make the public Samsarix repository map clearer and more accurate.

## Before you begin

Read the [Code of Conduct](CODE_OF_CONDUCT.md) and [Security Policy](SECURITY.md). Do not report vulnerabilities or include secrets, personal information, or private repository material in a public issue.

For catalog changes, treat a repository's public page and reviewed checkout as evidence. Do not infer production readiness, package publication, security, compatibility, or license terms from a name or recent activity.

## Setup

```bash
git clone https://github.com/YOUR_USERNAME/samsarix-field-guide.git
cd samsarix-field-guide
npm ci
npm run check
```

Use `npm start` to serve the site at <http://127.0.0.1:4173> while editing.

## Make a change

1. Create a focused branch.
2. Keep the static, zero-runtime-dependency architecture unless a change has a documented product benefit.
3. Update `docs/catalog.js` for catalog facts, `docs/decision-model.js` for decision evidence, and `docs/PRODUCTIZATION.md` for material product or release decisions.
4. Show both the current product label and literal repository name when they differ.
5. Add or update tests when search, filtering, sorting, routing, serving, or validation changes.
6. Run `npm run check` before opening a pull request.

## Evidence standard

A catalog entry should include only:

- a public `https://github.com/Deathcharge/<repository>` URL;
- a plain-language description supported by repository evidence;
- a narrow use case explaining why someone would inspect it;
- an observable project shape and primary language;
- an activity date that is not presented as proof of maturity.

Avoid claims such as "battle-tested," "production-ready," "published on PyPI," or "supports deployment to X" unless that fact is independently verified, necessary to this guide, and documented with durable evidence.

A decision profile must also name at least one supported outcome, use only declared constraint traits, give a concrete smallest check, and state a meaningful adoption caveat. Constraint matches are fit signals—not quality, security, health, or maturity scores.

## Pull requests

Describe the user problem, evidence behind catalog changes, commands run, and any accessibility, privacy, security, legal, or visual effect. Screenshots are useful only when they materially help review.

By contributing, you agree that your contribution is licensed under MPL-2.0 and that the copyright and license notices may be preserved with the work. Contribution does not grant rights in Samsarix trademarks.

## Release process

The deployable source is `docs/`. Before publishing:

```bash
npm ci
npm run check
npm run audit:catalog
npm run audit:routes
npm start
```

Confirm the primary journey and representative outbound links, merge to the configured Pages source, then smoke-test the published site and social image.

Questions about the project can go to [contact@samsarix.com](mailto:contact@samsarix.com). Support questions can go to [support@samsarix.com](mailto:support@samsarix.com).
