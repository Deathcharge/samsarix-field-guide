export const OUTCOMES = Object.freeze([
  {
    id: "control-ai-costs",
    label: "Control AI spend",
    description: "Record usage, estimate cost, and surface budget or telemetry signals.",
  },
  {
    id: "govern-agent-actions",
    label: "Govern agent actions",
    description: "Put explicit policy, review, or redaction boundaries in front of automation.",
  },
  {
    id: "build-agent-workflows",
    label: "Build agent workflows",
    description: "Compose tools, model adapters, steps, and state into bounded local workflows.",
  },
  {
    id: "evaluate-multi-agent",
    label: "Evaluate multi-agent decisions",
    description: "Test consensus, quorum, handoff, or coordination behavior without hiding the rules.",
  },
  {
    id: "improve-developer-workflow",
    label: "Improve developer workflow",
    description: "Add review-first assistance, scaffolding, page analysis, or code-planning tools.",
  },
  {
    id: "add-app-capabilities",
    label: "Add application capabilities",
    description: "Embed chat, notifications, metrics, health reporting, or a safe local workspace.",
  },
  {
    id: "create-content",
    label: "Create and adapt content",
    description: "Draft stories, inspect creative stages, or adapt approved material for channels.",
  },
  {
    id: "understand-portfolio",
    label: "Understand the architecture",
    description: "Inspect roles, boundaries, lifecycle history, and the shape of the public portfolio.",
  },
].map(Object.freeze));

export const CONSTRAINTS = Object.freeze([
  { id: "no-key", label: "No API key", description: "A useful evaluation path works without provider credentials." },
  { id: "local-first", label: "Local-first", description: "The primary evaluation stays on the developer's machine." },
  { id: "deterministic", label: "Deterministic path", description: "A meaningful path does not depend on model output." },
  { id: "python", label: "Python", description: "The project exposes a Python package, CLI, or service." },
  { id: "visual", label: "Visible interface", description: "The project includes a browser, editor, or extension experience." },
  { id: "embeddable", label: "Embeddable", description: "The project is designed to sit inside another application." },
].map(Object.freeze));

const profiles = {
  "samsarix-token-cost-manager": {
    outcomes: ["control-ai-costs", "build-agent-workflows"],
    traits: ["no-key", "local-first", "deterministic", "python", "embeddable"],
    firstCheck: "Record a synthetic usage event, calculate its cost, and exercise one budget check.",
    watchFor: "Provider prices are configuration; verify model names, effective dates, and rates before using the result for a real budget.",
  },
  "samsarix-integration-guard": {
    outcomes: ["govern-agent-actions", "add-app-capabilities"],
    traits: ["no-key", "local-first", "deterministic", "python", "embeddable"],
    firstCheck: "Run a fixture containing representative secrets and personal data, then inspect the redacted output and category counts.",
    watchFor: "Pattern-based detection can miss novel formats and produce false positives; test it against your own payload shapes.",
  },
  "samsarix-vscode": {
    outcomes: ["improve-developer-workflow"],
    traits: ["no-key", "local-first", "visual"],
    firstCheck: "Attach one disposable file, request a single edit through local Ollama, and confirm that the native diff blocks writes until approval.",
    watchFor: "The project deliberately avoids repository indexing, terminal autonomy, and multi-file agents; verify that narrow scope fits the job.",
  },
  "samsarix-portfolio-board": {
    outcomes: ["understand-portfolio", "improve-developer-workflow"],
    traits: ["no-key", "local-first", "visual"],
    firstCheck: "Run the default public-account view without a token and compare its activity and repository-standard signals with GitHub.",
    watchFor: "The dashboard depends on live GitHub data and per-process caches; it does not provide private-repository access, durable history, or write actions.",
  },
  "agent-consensus": {
    outcomes: ["evaluate-multi-agent", "build-agent-workflows"],
    traits: ["no-key", "local-first", "deterministic", "python", "embeddable"],
    firstCheck: "Feed explicit approve, reject, and needs-review votes into a small quorum scenario and inspect the final decision record.",
    watchFor: "Participants must already return explicit decisions; the library does not infer consensus from arbitrary conversation text.",
  },
  helix: {
    outcomes: ["understand-portfolio"],
    traits: ["no-key", "local-first", "deterministic"],
    firstCheck: "Compare every advertised setup command with the files actually present before treating the repository as executable.",
    watchFor: "This is a historical entry whose public documentation predates the current Samsarix portfolio model.",
  },
  "samsarix-agent-ethics": {
    outcomes: ["govern-agent-actions", "build-agent-workflows"],
    traits: ["no-key", "local-first", "deterministic", "python", "embeddable"],
    firstCheck: "Model one allowed action, one denied action, and one action requiring human review; confirm that each result explains the matching rule.",
    watchFor: "A deterministic gate only enforces the policies you write; it does not establish that those policies are complete or ethically sufficient.",
  },
  "samsarix-agent-orchestration": {
    outcomes: ["build-agent-workflows", "add-app-capabilities"],
    traits: ["no-key", "local-first", "deterministic", "python", "embeddable"],
    firstCheck: "Register two trusted functions in a dependency graph, force one retry or timeout, and inspect the JSON run report.",
    watchFor: "The workbench runs trusted in-process callables; it is not a distributed scheduler or an untrusted-code sandbox.",
  },
  "samsarix-agent-swarm": {
    outcomes: ["evaluate-multi-agent", "build-agent-workflows"],
    traits: ["no-key", "local-first", "deterministic", "python", "embeddable"],
    firstCheck: "Run the bundled responders through a bounded round-robin scenario and inspect completion, timeout, and transcript behavior.",
    watchFor: "The no-key experience is a coordination simulator, not evidence that a live model workflow will behave the same way.",
  },
  "samsarix-codegen": {
    outcomes: ["improve-developer-workflow"],
    traits: ["no-key", "local-first", "deterministic", "python"],
    firstCheck: "Analyze a disposable source fixture and review the generated plan without granting the tool write access to the repository.",
    watchFor: "The bounded workflow produces inspectable plans; it deliberately does not autonomously edit or execute generated code.",
  },
  "samsarix-analytics": {
    outcomes: ["control-ai-costs", "add-app-capabilities"],
    traits: ["no-key", "local-first", "deterministic", "python", "embeddable"],
    firstCheck: "Record a metric, cross a deterministic threshold, and verify the alert and snapshot returned to the caller.",
    watchFor: "Metrics are process-local; verify persistence, multiprocess aggregation, and export requirements separately.",
  },
  "samsarix-page-lens": {
    outcomes: ["improve-developer-workflow"],
    traits: ["no-key", "local-first", "deterministic", "visual"],
    firstCheck: "Load the unpacked extension on a disposable page and compare its reading, term, and structure signals with the visible content.",
    watchFor: "Review the current browser permissions and distribution status; heuristic page signals are orientation aids, not semantic analysis.",
  },
  "samsarix-chat-engine": {
    outcomes: ["add-app-capabilities", "build-agent-workflows"],
    traits: ["no-key", "local-first", "python", "embeddable"],
    firstCheck: "Start one local instance, persist a room message, and confirm that a second client receives the WebSocket event.",
    watchFor: "The focused service does not supply user accounts, authorization, moderation, federation, or multi-instance fan-out.",
  },
  "samsarix-cli": {
    outcomes: ["improve-developer-workflow"],
    traits: ["no-key", "local-first", "deterministic", "python"],
    firstCheck: "Generate one starter in a temporary directory, run its documented check, then deliberately damage metadata and confirm detection.",
    watchFor: "Confirm that the reviewed templates match your stack and verify current package-publication status before depending on a registry install.",
  },
  "samsarix-field-atlas": {
    outcomes: ["understand-portfolio", "evaluate-multi-agent"],
    traits: ["no-key", "local-first", "deterministic", "visual"],
    firstCheck: "Run one browser scenario, trace each role handoff, and export the resulting coordination blueprint as JSON.",
    watchFor: "The scenarios are deterministic explanations of a coordination model; they do not execute agents or report live system state.",
  },
  "samsarix-core": {
    outcomes: ["build-agent-workflows", "improve-developer-workflow"],
    traits: ["no-key", "local-first", "deterministic", "python", "embeddable"],
    firstCheck: "Declare one typed local tool, invoke it through the async API, and exercise input and failure validation.",
    watchFor: "The runtime is a focused tool primitive, not an agent loop, model provider, marketplace, network service, or sandbox.",
  },
  "samsarix-creative-spirals": {
    outcomes: ["create-content"],
    traits: ["no-key", "local-first", "deterministic", "python"],
    firstCheck: "Turn one approved draft into channel-specific files and inspect every reported truncation before copying the output.",
    watchFor: "The project creates review bundles but does not connect accounts or publish content to social platforms.",
  },
  "samsarix-story-studio": {
    outcomes: ["create-content"],
    traits: ["no-key", "local-first", "deterministic", "visual"],
    firstCheck: "Use the labeled no-key demo to generate, archive, continue, and export one short chapter before configuring a provider.",
    watchFor: "Deterministic demo output proves the workflow, not the quality or safety of optional provider-backed writing.",
  },
  "samsarix-discord-bot": {
    outcomes: ["add-app-capabilities", "control-ai-costs"],
    traits: ["python"],
    firstCheck: "Use a test Discord application and disposable health endpoint to confirm that the status command is private and omits sensitive endpoint details.",
    watchFor: "A live evaluation needs Discord credentials and reachable health endpoints; it is a read-only view, not an incident-response platform.",
  },
  "samsarix-field-guide": {
    outcomes: ["understand-portfolio", "improve-developer-workflow"],
    traits: ["no-key", "local-first", "deterministic", "visual"],
    firstCheck: "Use the Decision Workbench to create a shortlist, compare three candidates, and copy a pilot plan without leaving the browser.",
    watchFor: "The catalog is a reviewed snapshot and a fit navigator; destination repositories own their release, security, and quality evidence.",
  },
  "samsarix-agent-engine": {
    outcomes: ["build-agent-workflows"],
    traits: ["no-key", "local-first", "python", "embeddable"],
    firstCheck: "Exercise the documented offline agent/session path, then substitute a disposable OpenAI-compatible endpoint only if that boundary is needed.",
    watchFor: "Live prompts require a compatible endpoint; the package is intentionally thinner than a tool graph, database, or hosted control plane.",
  },
  "samsarix-narrative-engine": {
    outcomes: ["create-content", "build-agent-workflows"],
    traits: ["no-key", "local-first", "deterministic", "python", "embeddable"],
    firstCheck: "Run one creative brief through the deterministic editorial pipeline and inspect every intermediate artifact before enabling a provider.",
    watchFor: "Confirm provider-call ceilings and publication status before treating the optional live path as a supported dependency.",
  },
  "samsarix-notifications": {
    outcomes: ["add-app-capabilities"],
    traits: ["no-key", "local-first", "deterministic", "python", "embeddable"],
    firstCheck: "Inject a test transport, trigger success and retry cases, and inspect explicit delivery results without sending a real message.",
    watchFor: "The library is not a durable queue, hosted preference service, or guarantee against process loss.",
  },
  "samsarix-spirals": {
    outcomes: ["build-agent-workflows", "add-app-capabilities"],
    traits: ["no-key", "local-first", "deterministic", "python", "embeddable"],
    firstCheck: "Run a small JSON workflow that validates and reshapes a fixture, then confirm exact output and failure behavior.",
    watchFor: "The runner is for bounded local workflows, not hosted automation, third-party connectors, or durable distributed execution.",
  },
  "helix-unified-hub": {
    outcomes: ["understand-portfolio"],
    traits: ["no-key", "local-first", "deterministic", "visual"],
    firstCheck: "Use the lifecycle labels to separate maintained material, external destinations, and retained historical concepts.",
    watchFor: "This directory describes material bundled in its own repository; it is not the private flagship or a live system dashboard.",
  },
  "samsarix-workspace": {
    outcomes: ["add-app-capabilities", "improve-developer-workflow"],
    traits: ["no-key", "local-first", "deterministic", "python", "visual"],
    firstCheck: "Point the app at a disposable folder and exercise create, edit, rename, move, and allowed virtual commands.",
    watchFor: "The browser operates on a configured local folder; review path confinement and backup expectations before using important files.",
  },
  "neural-mesh": {
    outcomes: ["evaluate-multi-agent", "build-agent-workflows"],
    traits: ["no-key", "local-first", "python", "embeddable"],
    firstCheck: "Use deterministic fake adapters to exercise success, timeout, disagreement, and quorum behavior before connecting any provider.",
    watchFor: "Textual agreement is not factual correctness; the application must decide when a quorum is appropriate and how results are reviewed.",
  },
  "policy-engine": {
    outcomes: ["govern-agent-actions", "build-agent-workflows"],
    traits: ["no-key", "local-first", "deterministic", "python", "embeddable"],
    firstCheck: "Evaluate representative action and resource JSON through allow and deny policies, then inspect the matched-rule explanation.",
    watchFor: "Authorization quality depends on application-owned input and policy completeness; the engine does not discover permissions automatically.",
  },
  "routine-engine": {
    outcomes: ["build-agent-workflows", "add-app-capabilities"],
    traits: ["no-key", "local-first", "deterministic", "python", "embeddable"],
    firstCheck: "Register trusted functions for a small dependency DAG and verify exact success, skip, and failure results.",
    watchFor: "Use a larger orchestrator if you need distributed workers, event streaming, a scheduler UI, or multi-tenant control.",
  },
  "ucf-protocol": {
    outcomes: ["evaluate-multi-agent", "understand-portfolio"],
    traits: ["no-key", "local-first", "deterministic", "python", "embeddable"],
    firstCheck: "Record six explicit coordination signals, inspect the derived phase and score, then export the observation as versioned JSON Lines.",
    watchFor: "The transparent score is a configured coordination-health model, not a measurement of consciousness or proof of system quality.",
  },
  "unified-llm": {
    outcomes: ["build-agent-workflows", "control-ai-costs"],
    traits: ["no-key", "local-first", "python", "embeddable"],
    firstCheck: "Use fake adapters to exercise normalized responses, timeout, retry, fallback, and cancellation before connecting an endpoint.",
    watchFor: "The SDK is an in-process reliability boundary, not a gateway, model catalog, billing system, or native translation layer for every provider.",
  },
};

export const PROJECT_PROFILES = Object.freeze(
  Object.fromEntries(
    Object.entries(profiles).map(([id, profile]) => [
      id,
      Object.freeze({
        ...profile,
        outcomes: Object.freeze([...profile.outcomes]),
        traits: Object.freeze([...profile.traits]),
      }),
    ]),
  ),
);
