# Decision Workbench — Competitive Positioning

Research date: August 8, 2026

## Market evidence

Established internal developer portals solve organization-scale inventory and operations problems:

- [Backstage Software Catalog](https://backstage.io/docs/features/software-catalog/) centralizes ownership and metadata, searches entities, harvests repository-owned YAML, and becomes a hub for integrated tooling.
- [Port](https://docs.port.io/) combines a catalog/context layer with governance scorecards, self-service actions, automations, access controls, and AI/agent workflows.
- [Cortex Scorecards](https://docs.cortex.io/scorecards/create) codify engineering standards; its initiatives turn failed rules into owned work with goals and deadlines.
- [OpsLevel](https://docs.opslevel.com/docs/introducing-opslevel) discovers software from engineering systems, then adds ownership, checks, scorecards, and self-service workflows.
- [Atlassian Compass](https://www.atlassian.com/software/compass/features) combines a component catalog with relationships, operational activity, metrics, and health scorecards.
- [GitHub repository discovery](https://docs.github.com/en/get-started/exploring-projects-on-github/discovering-projects-on-github) is strong for finding projects by topic, language, popularity, and community, but does not turn one portfolio into a job-specific adoption plan.

These products are credible references, not feature checklists for this repository. Rebuilding live ingestion, organization ownership, operational metrics, access control, scorecards, and workflow execution would erase the Field Guide's low-cost, public, no-account advantage.

## Defensible wedge

**Job:** Help a developer evaluate an unfamiliar public AI/automation portfolio before they commit integration time.

**Promise:** Turn one outcome and a set of non-negotiable constraints into:

1. a transparent shortlist;
2. a comparison of up to three candidates;
3. one concrete first check per candidate;
4. one adoption caveat per candidate; and
5. a copyable, evidence-oriented pilot plan.

**Why this can win:**

- No account, installation, organization rollout, connector, or live API is required.
- Recommendations expose their matching signals instead of using a hidden or aggregate quality score.
- Every candidate has a smallest credible evaluation step and a named limitation.
- The complete brief is encoded in the URL, making it portable without tracking or browser storage.
- The workbench is useful even when every destination service is offline.

OpenSSF Scorecard is a useful boundary reference: its maintainers explicitly describe checks as opinionated heuristics with possible false positives and false negatives, and warn that an aggregate score hides individual behaviors. The Decision Workbench therefore ranks declared fit signals only and leaves security or health certification to destination-owned evidence. See the [OpenSSF Scorecard project](https://github.com/ossf/scorecard).

## Supported use cases

1. Control AI spend.
2. Govern agent actions.
3. Build agent workflows.
4. Evaluate multi-agent decisions.
5. Improve developer workflow.
6. Add application capabilities.
7. Create and adapt content.
8. Understand the Samsarix architecture and lifecycle.

## Product boundaries

The workbench does not:

- claim that a recommendation is secure, maintained, compatible, published, or production-ready;
- ingest private repositories, cloud resources, incidents, deployments, or organization data;
- execute repository code or model calls;
- replace destination READMEs, licenses, security policies, tests, or release evidence;
- store a user's brief or record analytics; or
- perform self-service infrastructure actions.

## Adoption signals

Because the site deliberately avoids analytics, product learning should use consented, repository-native evidence:

- [structured pilot-result issues](https://github.com/Deathcharge/samsarix-field-guide/issues/new?template=pilot-result.yml) that include a shared workbench URL and reproducible evidence;
- pull requests correcting a decision profile or first-check plan;
- links from destination repository READMEs;
- GitHub traffic visible to repository owners; and
- explicit reports that a copied pilot plan led to adoption or rejection.

The next expansion should follow evidence from those signals rather than adding speculative portal features.
