# Work ledger

This repository adopts LifeOS ledger v2. The ledger lives here, not in the LifeOS source repository. LifeOS was inspected read-only to learn the format. Do not modify the LifeOS repository when updating this project.

## Start here

The primary implementation plan is [Scientific blog foundation](roadmaps/r-261020-01-scientific-blog-foundation/r-261020-01-scientific-blog-foundation.md). Phase 0 records this documentation setup; subsequent implementation phases remain todo. Navigation and topic consistency are first.

Captured sources:

- [Content-first scientific blog](ideas/i-261020-01-content-first-scientific-blog/i-261020-01-content-first-scientific-blog.md): the complete originating owner message and agreed direction.
- [CV publication](ideas/i-261020-02-cv-publication-from-source-repository/i-261020-02-cv-publication-from-source-repository.md): deferred until the source and intended artifact are known.
- [Agentic programming and IC design](ideas/i-261020-03-agentic-programming-and-ic-design/i-261020-03-agentic-programming-and-ic-design.md): exploratory research, not scheduled website implementation.

Draft proposals explore [navigation and topics](proposals/p-261020-01-writing-led-navigation-and-topic-system/p-261020-01-writing-led-navigation-and-topic-system.md) and [CV publication options](proposals/p-261020-02-cv-link-or-controlled-publication/p-261020-02-cv-link-or-controlled-publication.md). They are not marked accepted. The roadmap derives directly from the owner-requested blog idea, so implementation does not falsely imply approval of every detailed proposal choice.

## Structure and ownership

`ledger.json` is a small version/repository/date manifest. Each entity lives in a bundle whose directory, JSON filename, Markdown filename, and ID match:

```text
.work/
  ledger.json
  ideas/<id>/<id>.{json,md}
  proposals/<id>/<id>.{json,md}
  roadmaps/<id>/<id>.{json,md}
  archive/ideas/<id>/...
  archive/roadmaps/<id>/...
  schema/*.v2.json
  templates/{idea,proposal,roadmap}.{json,md}
```

Use stable IDs such as `i-261020-01-content-first-scientific-blog`: kind, origin date, daily sequence, and readable name. Allocate new sequences across live and archived entries, never rename an ID just because a title changes. JSON owns identity, status, ordering, relationships, phases, item kinds, closure dates, and evidence. Markdown owns explanation and provenance. Original-thought markers preserve the owner's words; invisible trailing whitespace follows the reference ledger's normalization convention. A roadmap delivery-plan block is generated from its JSON; do not maintain it as an independent task list.

Ideas capture possibilities (`raw`, `elaborated`, `archived`, `declined`). Proposals explore concrete options (`draft`, `ready`, `accepted`, `parked`, `declined`, `archived`). Roadmaps schedule agreed work (`active`, `paused`, `done`, `declined`); their phases/items use `todo`, `active`, `done`, or `declined`. Idea elaboration is not implementation approval. Proposal acceptance is an explicit owner decision and does not itself schedule work.

Keep at most one primary roadmap. Preserve template headings and markers. Keep actual dependencies explicit and avoid circular gates. Mark only verified slices done with real `closed_at` dates and commit or typed evidence; do not invent future SHAs. Record each implementation in both its JSON and synchronized Markdown. Completed build/migration items should have actual commit evidence; documentation/research/decision work may use typed document/decision/observation evidence.

## Validation and updates

Prefer the LifeOS named ledger operations against this checkout when available: they validate and prevent stale writes. Direct file editing remains possible, but validate it before committing.

1. Validate every data JSON against its vendored schema, including matching bundle names and schema paths.
2. Check cross-links, uniqueness, primary-roadmap count, original-thought/template sections, and roadmap Markdown projection with the LifeOS ledger reader when available.
3. Verify any recorded commit IDs exist in this repository, not merely in the reference repository.
4. Keep two-space JSON with trailing newline and `$schema`, `version`, `kind`, `order` first, as emitted by LifeOS `formatJson`.
5. Check relative Markdown links and ensure `.work/` and `research/` are absent from the built site's content/discovery outputs.

The reference reader is `agent/ledger.mjs` in the attached LifeOS checkout. Its `read(projectRoot)` and `validate(ledger, projectRoot)` operations are read-only; `syncRoadmapMarkdown(projectRoot, roadmapId)` writes only the specified project's roadmap. The file exports `renderDeliveryPlan` and `formatJson` for compatible projections/formatting. Do not call these against the LifeOS checkout as a mutation target. The project remains portable through its vendored schemas/templates and does not import LifeOS into its production build.

## Format provenance

Schemas and templates copied from LifeOS source commit `21c47fb5a3510522671cc93f5ce432656423d675` on 2026-10-20. This is reference-format provenance, not evidence of a website implementation commit. The baseline is the `.work/README.md` contract and `agent/ledger.mjs` reader at that revision. No LifeOS application-specific instructions, deployment hooks, backend code, or operational review rules are adopted here.
