\## Status Report Suite — Portfolio Project Description



\### What this project is



Status Report Suite is a portfolio-grade document-generation system for small NGOs and consultancies that turns weekly reporting from an informal writing habit into a repeatable pipeline: structured input → validated record → deterministic rendering into editable templates → archivable artifacts and a queryable corpus.



The system is designed so that “business logic” (validation, normalization, computed fields, section semantics) lives in a portable TypeScript engine. Google Workspace integration (Sheets/Docs/Drive) is an optional adapter layer that provides a realistic operational surface for nontechnical teams.



\### Why this exists



Small teams often rely on Google Docs for weekly updates, executive summaries, and grant narratives. This works until it doesn’t: documents drift, structure becomes inconsistent, and the organization loses the ability to compare across time, assemble summaries cheaply, or answer simple operational questions. The resulting cost is not only time; it’s loss of trust in internal reporting and increased risk when external stakeholders (board/funders) request consistency or evidence.



This project demonstrates an approach to solve that class of problem without replacing the team’s tools: it treats Google Workspace as an interface, not as the system’s brain.



---



\## Client vignette (simulated but realistic): Harborlight



Harborlight is a 35-person NGO with ~12 core staff and a rotating set of contractors. Work is split across three teams:



\* Programs (field delivery; two subprograms with different geographies)

\* Fundraising/Grants (funder communications and reporting)

\* Ops (finance/admin)



Harborlight runs on Google Workspace. Shared Drives exist but are inconsistently used; many documents live in personal Drives and are shared as links. Weekly reporting happens on Fridays. The director needs an executive summary Monday morning. The board receives a monthly summary. Two funders require quarterly narrative updates.



\### Current workflow



\* Each team lead writes a weekly update in a Google Doc by copying last week’s document.

\* Format varies by person and by week: bullets vs paragraphs, different headings, inconsistent naming.

\* Metrics are pasted ad-hoc, often without deltas or time ranges.

\* Blockers and risks are described inconsistently; ownership and due dates are often missing.

\* Grants staff gathers reports by searching Drive and Slack, then manually copy-pastes relevant parts into a quarterly funder narrative template.



\### Pain points (client language)



1\. Inconsistent structure makes it hard to scan, summarize, or compare across teams and time.

2\. Executive summaries and grant narratives are manual copy-work; errors and omissions are common.

3\. Provenance is weak: “what claim came from which week’s report?” becomes hard to answer.

4\. Templates drift as people edit them; downstream expectations break silently.

5\. Any tool that forces staff out of Sheets/Docs will not be adopted.



\### What “success” means to Harborlight



\* Team leads can produce a weekly report in 10–15 minutes using a familiar surface.

\* Every run produces:



&nbsp; \* an editable Google Doc report for sharing,

&nbsp; \* a structured canonical record suitable for query and reuse.

\* Exec summary is generated consistently without manual rewriting.

\* The system supports re-entry and audit: it is possible to trace outputs back to inputs and template versions.



---



\## The offer (what Status Report Suite delivers)



Status Report Suite provides:



1\. \*\*A portable reporting engine\*\*



\* Accepts structured inputs (canonical JSON) for a weekly status report.

\* Validates and normalizes the input and produces actionable issues when data is missing or inconsistent.

\* Computes derived fields (week labels, rollups, summary snippets).

\* Produces a medium-neutral render plan (“RenderPlan”) plus provenance metadata.



2\. \*\*A template pack\*\*



\* Two variants, matching Harborlight’s real audiences:



&nbsp; \* Team Detailed (internal; full actionable content)

&nbsp; \* Exec Summary (short; director/board oriented)

\* Templates exist in two surfaces:



&nbsp; \* Markdown templates (canonical, versioned, testable)

&nbsp; \* Google Docs templates (human-editable, branded)



3\. \*\*Anchor-based Google Docs rendering\*\*



\* Docs templates contain named anchors for each generated region (e.g., SUMMARY, BLOCKERS, RISKS).

\* Rendering replaces anchored regions deterministically, without fragile text search.

\* A designated “Manual Notes” region remains untouched so staff can add commentary safely.



4\. \*\*Google Workspace adapter\*\*



\* Google Sheets acts as the operator UI for structured data capture.

\* A custom menu action generates the report into Drive using a chosen template variant.

\* Errors are surfaced back into the Sheet at cell-level plus a run log.

\* Outputs are filed into a predictable Drive structure, with links written back to the Sheet.



5\. \*\*CLI adapter\*\*



\* Local deterministic path for evaluation and portability.

\* Reads JSON input and a template, generates Markdown and a PDF.

\* Also emits a normalized record export (NDJSON) to form a queryable corpus without needing a backend.



---



\## Core design principles (project-local, not ecosystem-wide)



\### Engine-first



All domain rules live in the engine. Workspace is optional and replaceable.



\### Determinism and testability



Markdown rendering is the canonical test surface via golden outputs. Workspace rendering is tested via plan snapshots plus a minimal manual smoke path.



\### Drift control through explicit contracts



\* Canonical schema versioning.

\* Template versioning and provenance embedding.

\* Anchor taxonomy spec and template authoring rules.



\### “Dual output” model



Each generation creates:



\* a human-facing document artifact (Doc/Markdown/PDF)

\* a machine-facing record (normalized JSON, suitable for later indexing)



---



\## Functional requirements (v1)



\### Weekly Status Report schema (conceptual)



Required metadata:



\* organization/team

\* week start/end

\* author

\* RAG status

\* sensitivity (Public/Internal/Restricted)



Sections:



\* accomplishments (bullets)

\* metrics (table: name/value/delta/note)

\* blockers (list: title/impact/owner/neededFrom/dueDate)

\* risks (table: title/category/likelihood/impact/mitigation/owner)

\* decisions (list: title/rationale/date)

\* next week (bullets: title/owner/dueDate)

\* asks (list: ask/fromWhom/byWhen)



Validation examples:



\* weekStart/weekEnd required; valid week range

\* RAG required

\* risks must include likelihood and impact

\* blockers must include owner; “neededFrom” required if a dependency is named

\* at least one accomplishment or an explicit “no progress” marker



\### Template requirements



Two variants (Team Detailed, Exec Summary) with stable anchor taxonomy.



Docs template anchors (indicative):



\* META, SUMMARY, ACCOMPLISHMENTS, METRICS, BLOCKERS, RISKS, DECISIONS, NEXT\_WEEK, ASKS, PROVENANCE

\* MANUAL\_NOTES is reserved and never overwritten.



\### Google Sheets UI requirements



\* A structured sheet layout that matches the schema sections.

\* A config tab storing:



&nbsp; \* template variant selection

&nbsp; \* output folder IDs

&nbsp; \* naming conventions

\* A log tab that appends a row per generation run:



&nbsp; \* timestamp, week, team, RAG, template version, output doc link, result status



\### Drive filing requirements



Predictable structure and naming to enable human retrieval:



\* Shared Drive root: Operations / Reporting

\* Weekly Reports / {Year} / {Team}

\* Exec Summaries / {Year}



Name format:



\* Weekly Status — {Team} — {YYYY-WW}

\* Exec Summary — {YYYY-WW}



\### Record export requirements (no backend yet)



\* A normalized JSON record per report.

\* An appendable NDJSON ledger export (one report per line) so the corpus becomes queryable immediately via simple tooling, and migratable later to a database.



---



\## Non-goals (v1)



\* No attempt to become a project management system.

\* No real-time collaboration features beyond what Docs already provides.

\* No “AI summarization” features; summaries are deterministic and rule-based.

\* No hosted backend; the “database story” is deferred via NDJSON exports.



---



\## Portfolio demonstration plan



This project is intended to be evaluated by cloning and running a deterministic demo, and by following a short “Workspace demo” path.



\### Demo pack contents



\* Sample Harborlight dataset:



&nbsp; \* 8 weeks × 3 teams

&nbsp; \* realistic carry-over blockers and evolving risks

&nbsp; \* a few intentional invalid cases to show error handling

\* Template pack:



&nbsp; \* Markdown templates (2 variants)

&nbsp; \* Docs templates (2 variants) plus anchor taxonomy spec

\* CLI scripts:



&nbsp; \* generate Markdown + PDF

&nbsp; \* emit NDJSON ledger

\* Workspace scripts:



&nbsp; \* create report from a sample sheet into a test Drive folder



\### “Why this is portfolio-grade”



The project demonstrates:



\* outcome ownership: deterministic rendering, validation, drift control, provenance

\* real operational integration: Sheets → Docs → Drive with robust anchors

\* system design discipline: separation of engine and adapters, test strategy, reproducible evaluation path



---



\## Implementation outline (artifact list)



Engine-side:



\* schema + validation + normalization

\* computed fields + stable IDs for items

\* RenderPlan types and compilation

\* Markdown renderer

\* provenance embedding



Adapters:



\* CLI: input → outputs (Markdown + PDF + NDJSON)

\* Google Workspace: sheet mapping → engine → anchored Docs rendering → Drive filing + logs



Templates and docs:



\* two template variants (Docs + Markdown)

\* anchor taxonomy spec + authoring guidelines

\* sample Harborlight dataset + golden outputs

\* evaluator README with “30-second CLI” and “5-minute Workspace” paths



---



\## Open questions (constrained; do not block build)



\* Whether Docs templates are treated as canonical or generated from Markdown is a later decision; v1 can ship with both as parallel surfaces.

\* Long-term indexing/backends can be added later; v1 exports normalized records and an NDJSON ledger to preserve the future path.



