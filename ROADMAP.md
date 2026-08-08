# Samsarix Field Guide roadmap

This roadmap separates four gates: merge, release, publication, and flagship adoption. Passing one does not imply the next.

## Product boundary

Portfolio role: **flagship companion**. Treat this as a thin companion to Samsarix Unified. The flagship remains canonical for account, social, realm, billing, and durable user-data behavior.
Planned repository identity: `Deathcharge/samsarix-field-guide` (ready).

Current disposition: The Decision Workbench production baseline is merged and published. It provides an outcome-led matcher, three-candidate comparison, and bounded pilot planner that remains independent from the flagship. Flagship adoption remains a separate decision.

## Stabilize the productized default

- Keep the default branch buildable from a clean checkout and preserve exact-head CI evidence.
- Keep Samsarix LLC branding, package identity, license metadata, and compatibility aliases internally consistent.
- Preserve the pre-productization default under a rollback ref before merging; do not delete legacy history.
- Review priority: Keep all 30 catalog rows aligned with the live public inventory through `npm run audit:catalog`.
- Review priority: approve brand/MPL.
- Review priority: green CI.
- Review priority: merge.
- Review priority: browser/Pages/link verification.

## Production baseline and next hardening

- Bind generated content and links to an explicit flagship release or API version.
- Test navigation, accessibility, deployment, and stale-content behavior.
- Assign a freshness owner or consolidate the content into the flagship.

Current hardening backlog:

- Catalog descriptions and activity remain a dated snapshot even though repository-name drift now has a live read-only audit command.
- No automated content-maturity or outbound-service health certification; those remain destination-owned checks.
- Production HTML, JavaScript, decision data, social asset, and custom 404 were smoke-tested; browser interaction and assistive-technology lab testing remain future hardening.
- A future company/flagship site may link to or replace this route, but this repository is the canonical public portfolio map until that migration is explicit.
- The 1.88 MB social image is larger than necessary for a small static site.
- License transition and content ownership need approval.

## Decision Workbench

- [x] Define eight concrete AI, automation, developer-tool, application, creative, and architecture use cases.
- [x] Give every catalog project an explicit fit profile, smallest credible check, and adoption caveat.
- [x] Rank goal and selected constraint matches without implying a quality or maturity score.
- [x] Compare up to three candidates and generate a copyable evidence-oriented pilot plan.
- [x] Encode the brief in a shareable URL without accounts, tracking, cookies, or browser storage.
- [x] Provide structured public issue forms for reproducible pilot results and evidence-backed corrections.
- [ ] Collect consented adoption evidence through shared URLs, repository issues, README links, and owner-visible GitHub traffic.
- [ ] Add or change outcome profiles only when destination-owned evidence supports the change.

## Samsarix adoption

- Define a public API, event, schema, artifact, or deployment contract before connecting to Samsarix Unified.
- Add a consumer-owned contract fixture covering authentication, privacy, limits, errors, and version compatibility.
- Make one implementation canonical; remove or freeze duplicate behavior only after parity and rollback are proven.
- Record an owner, support level, compatibility window, and measurable adoption signal.

## Completion evidence

A milestone is complete only when its exact commit, commands and results, artifact digest, consumer or deployment, and rollback path are recorded in a pull request or release record. README claims must not exceed that evidence.
