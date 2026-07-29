# Samsarix Field Guide roadmap

This roadmap separates four gates: merge, release, publication, and flagship adoption. Passing one does not imply the next.

## Product boundary

Portfolio role: **flagship companion**. Treat this as a thin companion to Samsarix Unified. The flagship remains canonical for account, social, realm, billing, and durable user-data behavior.
Planned repository identity: `Deathcharge/samsarix-field-guide` (ready).

Current disposition: Merge the productization branch after exact-head verification and rollback-ref creation; release and adoption remain separate decisions.

## Stabilize the productized default

- Keep the default branch buildable from a clean checkout and preserve exact-head CI evidence.
- Keep Samsarix LLC branding, package identity, license metadata, and compatibility aliases internally consistent.
- Preserve the pre-productization default under a rollback ref before merging; do not delete legacy history.
- Review priority: Reconcile 30 catalog rows to final audit.
- Review priority: approve brand/MPL.
- Review priority: green CI.
- Review priority: merge.
- Review priority: browser/Pages/link verification.

## Release candidate

- Bind generated content and links to an explicit flagship release or API version.
- Test navigation, accessibility, deployment, and stale-content behavior.
- Assign a freshness owner or consolidate the content into the flagship.

Current hardening backlog:

- Catalog data is a dated manual snapshot; activity and product labels will drift across 30 repositories.
- No automated comparison with the public GitHub repository list or outbound-link health check.
- Hosted/visual/accessibility claims were not independently tested in this audit.
- Branding and role relative to a future flagship/company website need an owner decision.
- The 1.88 MB social image is larger than necessary for a small static site.
- License transition and content ownership need approval.

## Samsarix adoption

- Define a public API, event, schema, artifact, or deployment contract before connecting to Samsarix Unified.
- Add a consumer-owned contract fixture covering authentication, privacy, limits, errors, and version compatibility.
- Make one implementation canonical; remove or freeze duplicate behavior only after parity and rollback are proven.
- Record an owner, support level, compatibility window, and measurable adoption signal.

## Completion evidence

A milestone is complete only when its exact commit, commands and results, artifact digest, consumer or deployment, and rollback path are recorded in a pull request or release record. README claims must not exceed that evidence.
