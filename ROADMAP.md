# Samsarix Field Guide roadmap

This roadmap separates four gates: merge, release, publication, and flagship adoption. Passing one does not imply the next.

## Product boundary

Portfolio role: **flagship companion**. Treat this as a thin companion to Samsarix Unified. The flagship remains canonical for account, social, realm, billing, and durable user-data behavior.
Planned repository identity: `Deathcharge/samsarix-field-guide` (ready).

Current disposition: Productization and repository-coordinate updates are merged. This branch makes Field Guide the canonical public portfolio map and consolidates the useful evaluation/lifecycle guidance without copying incompatible source trees. Release and flagship adoption remain separate decisions.

## Stabilize the productized default

- Keep the default branch buildable from a clean checkout and preserve exact-head CI evidence.
- Keep Samsarix LLC branding, package identity, license metadata, and compatibility aliases internally consistent.
- Preserve the pre-productization default under a rollback ref before merging; do not delete legacy history.
- Review priority: Keep all 30 catalog rows aligned with the live public inventory through `npm run audit:catalog`.
- Review priority: approve brand/MPL.
- Review priority: green CI.
- Review priority: merge.
- Review priority: browser/Pages/link verification.

## Release candidate

- Bind generated content and links to an explicit flagship release or API version.
- Test navigation, accessibility, deployment, and stale-content behavior.
- Assign a freshness owner or consolidate the content into the flagship.

Current hardening backlog:

- Catalog descriptions and activity remain a dated snapshot even though repository-name drift now has a live read-only audit command.
- No automated content-maturity or outbound-service health certification; those remain destination-owned checks.
- Hosted/visual/accessibility claims were not independently tested in this audit.
- A future company/flagship site may link to or replace this route, but this repository is the canonical public portfolio map until that migration is explicit.
- The 1.88 MB social image is larger than necessary for a small static site.
- License transition and content ownership need approval.

## Samsarix adoption

- Define a public API, event, schema, artifact, or deployment contract before connecting to Samsarix Unified.
- Add a consumer-owned contract fixture covering authentication, privacy, limits, errors, and version compatibility.
- Make one implementation canonical; remove or freeze duplicate behavior only after parity and rollback are proven.
- Record an owner, support level, compatibility window, and measurable adoption signal.

## Completion evidence

A milestone is complete only when its exact commit, commands and results, artifact digest, consumer or deployment, and rollback path are recorded in a pull request or release record. README claims must not exceed that evidence.
