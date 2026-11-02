# Work ledger

This repository follows LifeOS's current bundle format: **manifest v2, proposals v3, roadmaps v2**. Versions belong to each entity; do not set the manifest or roadmaps to v3. The ledger lives here. LifeOS remains read-only reference material for this project's work.

## Start here

The [scientific blog foundation](archive/roadmaps/r-261020-01-scientific-blog-foundation/r-261020-01-scientific-blog-foundation.md) is done, closed and archived. Its evidence and original words remain available. Its [source proposal](archive/proposals/p-261020-01-writing-led-navigation-and-topic-system/p-261020-01-writing-led-navigation-and-topic-system.md) combines the original content-first blog request, navigation proposal and notes. It is archived because its only linked roadmap is archived; migration does not retroactively approve every exploratory option in its text.

The only primary roadmap remains [the first phased-array article](roadmaps/r-261020-02-first-phased-array-article/r-261020-02-first-phased-array-article.md). Final visual review and the owner-written manuscript remain open. The owner favors a series whose first two or three installments are didactic; the saved beam-squint brief is a possible later study, not a completed manuscript or final outline.

[Workflow permissions and deployment checks](roadmaps/r-261020-03-deployment-checks/r-261020-03-deployment-checks.md) remain paused and non-primary under the owner's instruction to handle permissions later. Migration does not complete or resume them.

Proposals preserve the sources and elaboration:

- [Phased-array article](proposals/p-261020-04-research-oriented-phased-array-article/p-261020-04-research-oriented-phased-array-article.md): planned, linked to historical foundation work and the active article roadmap.
- [CV publication](proposals/p-261020-02-cv-link-or-controlled-publication/p-261020-02-cv-link-or-controlled-publication.md): draft, with the original request and publication options; still deferred.
- [Agentic programming and IC design](proposals/p-261020-03-agentic-programming-and-ic-design/p-261020-03-agentic-programming-and-ic-design.md): draft, exploratory interests with no scheduled roadmap or claim of expertise.

[Archive and metadata refinement](proposals/p-261102-01-refine-archive-proportions-scientific-previews-and-q/p-261102-01-refine-archive-proportions-scientific-previews-and-q.md) captures the owner’s 2026-11-02 design feedback. The implemented trial is recorded in the primary roadmap; final owner visual review remains open.

[Category-owned refinements](proposals/p-261102-02-category-owned-refinements-and-a-single-article-badg/p-261102-02-category-owned-refinements-and-a-single-article-badg.md) records the subsequent instruction to nest tags under categories, put article tags and Demo inside one colored badge, and remove icon focus rings. It supersedes the visible-tag-row trial; final visual review remains open.

Article Studio is planned in **LifeOS's own ledger**, not this blog ledger. Continue its implementation from a LifeOS session.

## Structure and ownership

```text
.work/
  ledger.json
  proposals/<id>/<id>.{json,md}
  roadmaps/<id>/<id>.{json,md}
  archive/proposals/<id>/...
  archive/roadmaps/<id>/...
  schema/{ledger.v2,proposal.v3,roadmap.v2}.json
  templates/{proposal,roadmap}.{json,md}
```

Use stable dated IDs such as `p-261020-04-research-oriented-phased-array-article` and `r-261020-02-first-phased-array-article`. Directory, JSON filename, Markdown filename and ID must match. Allocate daily sequences across live and archived entries. A title change does not rename an ID. Migrated ideas retain their old IDs in `formerly`; current links use proposal IDs. Never recreate `ideas/` or `archive/ideas/`.

JSON owns lifecycle, ordering, relationships, phases, items, dates and evidence. Markdown owns original words and rationale. Proposal v3 Markdown has an immutable `Original thought` between `original-thought` markers and an editable `Proposal` between `proposal-body` markers. Its template marker is `proposal.v3`. Keep both halves in one bundle rather than duplicating an idea entity.

Proposal statuses are `raw`, `draft`, `ready`, `accepted`, `planned`, `parked`, `archived` and `declined`. Capturing words alone creates a raw proposal; elaboration makes it a draft. Acceptance is an explicit owner decision and does not start work. Creating a roadmap from a proposal links both directions and sets planned; planned requires a roadmap. Editing an accepted proposal returns it to draft. Proposals are never executable tasks or “done.” Closed proposals live in `archive/proposals/`.

Roadmaps schedule agreed work with `active`, `paused`, `done` or `declined` status; phases/items use `todo`, `active`, `done` or `declined`. Use `from_proposal`, never obsolete `from_idea`. New proposal-derived roadmaps inherit original words and snapshot the agreed body. A migrated historical source link does not invent past acceptance or a snapshot. Preserve immutable roadmap original words and generated delivery-plan blocks.

Keep at most one primary roadmap. Current LifeOS close operations also archive roadmaps. Do not leave closed plans in the live folder. When all linked roadmaps are archived, their planned proposal is archived too. Use named archive/restore operations and repair links when bundles move. Keep real dependency gates and independently useful phases. Mark only verified work done, with closure dates and actual commit or typed evidence. Build/migration work needs the implementation SHA; research/decisions may use document, measurement, decision or observation evidence. JSON owns the delivery plan; do not create another task list in docs or research.

## Validation and operations

Prefer current named ledger operations: `ledger_capture` preserves words, `ledger_propose` elaborates, `ledger_proposals` reads proposals, and roadmap operations schedule/complete work. Use each tool's current schema; the removed idea capture/elaboration interface is obsolete. Optional ledger reminders are separate; no reminder file is needed until used here.

For migrations/direct edits:

1. Validate every bundle JSON against its vendored schema, including matching names and schema paths.
2. Check cross-links, uniqueness, primary count, required Markdown sections and generated projections with the attached `agent/ledger.mjs`. Its `read(projectRoot)` and `validate(ledger, projectRoot)` are read-only.
3. Compare original-thought blocks with pre-migration copies and verify preservation of elaboration, existing task state and commit evidence. Check relative documentation links, including archived bundles.
4. Verify recorded commits exist in this repository's history. LifeOS source SHAs are format provenance, not evidence of a blog implementation.
5. Keep two-space JSON with trailing newline and `$schema`, `version`, `kind`, `order` first, as emitted by `formatJson`. Call `syncRoadmapMarkdown(projectRoot, id)` only against this repository to update projections.
6. Keep `.work/` and `research/` outside content loaders/public assets. Documentation-only changes require ledger/link checks, not a fabricated UI test claim.

Recent Code changes also support commit-to-item verification using `Work: <item-id>` trailers and optional due ledger reminders. Use those where relevant; LifeOS's own hooks, production procedures and deployment rules are not imported into this blog.

## Migration provenance — 2026-11-02

LifeOS commit `0e4b863a2e042c541c75f4018d7f10d0c5a38a10` merged ideas/proposals. Its `scripts/migrate-work-proposals-v3.mjs <repo> [--dry-run]` was inspected and run against this blog only. Current schemas/templates were copied from the attached checkout at source commit `39d6eebd2b0b660274e50eedda4b6db6c39bda7d`. These are format provenance, not blog implementation evidence. Original v2 adoption came from `21c47fb5a3510522671cc93f5ce432656423d675` on 2026-10-20.

Four ideas and two v2 proposals became four v3 proposals. Matching pairs were merged, retaining original words and both sets of notes. Former IDs, roadmap source links and Markdown links were migrated; stale schemas/templates were removed. The already-completed foundation roadmap and its source proposal were archived with the current archive operation, retaining closure dates/evidence. Two sibling-roadmap links needed explicit repair after that archive move. The article remains active/primary and deployment follow-up remains paused.

One correction was necessary: the IC-design idea had old status elaborated but no roadmap. The script maps this to invalid planned without a roadmap. Its migrated status is draft, preserving its unscheduled exploratory meaning rather than inventing implementation or acceptance.

The upstream migration rewrites bundle files only: separately preserve attachments such as research.md before using it elsewhere. This blog's old bundles had no such attachments. Re-running migration after conversion is a no-op. Never run it against LifeOS from this project's session.
