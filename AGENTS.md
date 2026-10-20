# Project working contract

This file and `AGENTS.md` must remain byte-for-byte identical. Update both in the same commit. `AGENTS.md` is the standard Codex entry point; `CLAUDE.md` is the Claude entry point.

## Purpose and positioning

Build a professional scientific and technical blog where the content is the protagonist. It also demonstrates the author's engineering ability to potential employers. Do not convert it into a CV landing page or make a portfolio introduction a barrier to reading.

The author has broad engineering interests and is developing depth through study, experiments, tools, and projects. Present this honestly as an interdisciplinary practice. Never invent credentials, employment, measurements, project outcomes, specialist experience, or proficiency. Distinguish demonstrated work from current learning and future interests. Show the connections between topics rather than forcing a single specialization.

## Start here

- Read `docs/architecture.md`, `docs/editorial.md`, and `.work/README.md` before relevant changes.
- Read the primary roadmap bundle under `.work/roadmaps/`; select its next actionable item. Ideas are capture, proposals explore options, and roadmaps schedule agreed work. Do not implement a raw idea automatically.
- `research/interests/` contains development and research notes, not published articles or proof of expertise.
- LifeOS repositories attached to this session are reference material only. Never modify them for this project's tasks.

## Product decisions

- Content comes first. Keep a clear author identity and an accessible About page with background, interests, demonstrated work, and contact. CV belongs there when available; CV integration is deferred.
- Fix navigation and category consistency first. Use one topic registry for stable slugs, readable labels, ordering, and presentation. Preserve existing article URLs or add redirects when a migration is agreed.
- Keep navigation visible and usable on mobile, with a clear site/home identity and semantic current-page state. Avoid empty public destinations and misleading link targets.
- Dark is the initial default. Offer an explicit accessible light/dark switch, persist the choice, avoid a theme flash, and theme charts, equations, code, and controls as well as page chrome.
- Give scientific figures a central role: radiation patterns, schematics, measurements, simulation comparisons, and other evidence. Figures need units, captions, source/context, and accessible explanations. Never substitute decorative generated imagery for scientific evidence.
- Use consistent typography, spacing, widths, filters, and card behavior. Keep prose readable and let figures expand where useful. Contrast and keyboard usability are requirements.
- Article contents navigation is collapsed by default and must not consume a permanent sidebar. Click/tap and keyboard must work; hover is optional enhancement.
- Articles show a short learning statement, prerequisites where relevant, and a published date. Do not display updated dates. Add explicit model assumptions, captions, references, and related reading/project links when applicable.
- Search and RSS are planned features. Draft content must be excluded consistently from listings, routes, related content, search, RSS, and sitemap.
- Interactive demos require loading/error behavior and a meaningful static alternative, correct boundary cases, associated control labels, units, and a deliberate performance budget.
- Trial articles are development fixtures pending an explicit editorial decision. Do not present them as verified research or invent replacement content.

## Architecture and boundaries

- Keep Astro static output for GitHub Pages. Use MDX for writing, build-time KaTeX for math, and small React islands for interactions.
- Keep browser-only visualization imports behind browser-safe boundaries. Do not turn the site into a full React application to implement search or theme switching.
- `src/`, `public/`, and the build configuration own the published site. `docs/` owns project architecture and editorial guidance. `.work/` owns planning state. `research/` owns unpublished interests and exploratory notes. Never expose the latter folders through a content loader, search index, RSS feed, or copied build assets by accident.
- Shared metadata and eligibility helpers belong in `src/lib/`; rendering components consume them. Avoid duplicating category maps and publication rules in each page.
- Use the existing stack unless a concrete requirement justifies a new dependency. Research new ecosystem choices when implementing them; proposed tools are not installed or endorsed merely because a note mentions them.

## Ledger and delivery discipline

- Use LifeOS ledger v2 bundles: stable dated IDs, matching directory/JSON/Markdown names, vendored schemas, and required template sections. JSON owns lifecycle, links, ordering, phases, and items; Markdown owns rationale and original words.
- Preserve original-thought blocks verbatim. Keep roadmap delivery-plan projections synchronized with JSON using LifeOS ledger operations when available. Do not create a second task list in `docs/` or `research/`.
- Keep at most one primary roadmap. Use real dependency gates and independently useful phases. Record open questions without guessing answers.
- Update the affected roadmap JSON and Markdown for every implementation. Mark only verified work done, with `closed_at` and actual commit or typed document/decision/measurement evidence. Never invent a commit SHA or mark the entire redesign complete because planning is finished.
- Validate bundles against vendored schemas and the LifeOS ledger reader when available. These are this repository's bundles; do not write to the LifeOS ledger while validating them.
- Inspect the working tree and staged paths. Stage explicit owned paths; preserve other edits and agent session files. Never use broad staging or destructive cleanup to make the tree appear clean.
- Run checks appropriate to the change. UI work needs desktop/mobile, keyboard, both themes, and no-JavaScript/failure review where relevant; publishing changes need draft and route checks. State untested limitations honestly. Documentation-only changes need link/format/ledger checks, not a fabricated UI test claim.
- Keep README authoring instructions accurate when implementation changes. Commit finished work. Pushing `main` triggers GitHub Pages deployment; follow the environment-specific push instructions below.

## Committing and pushing

### Detect the environment first

```bash
test -d /workspace && echo "sandbox" || echo "local"
```

`/workspace` exists only inside the Life-OS `/code` sandbox container (Arcadia). It is absent on any normal machine or local checkout. Run this check before every push attempt; never assume one environment or the other.

---

### Inside the sandbox (`/workspace` exists)

`git add` and `git commit` work normally.

**`git push` will always fail — do not attempt it.**
This is by design, not misconfiguration. The sandbox shell has no git credential and no token in its environment or remote URL. The GitHub token is minted per-run by the Life-OS backend, lives only on the push shim, and is intentionally never exposed to the container shell. There is nothing to fix here; do not add a credential, PAT, or SSH key to work around it.

Push using the `git_push` MCP tool instead:
- If the tool is available, call it after committing.
- If it is not yet available (MCP server still connecting), wait briefly and search for it with `ToolSearch` before giving up.
- If it is confirmed unavailable, stop after the commit and tell the user: *"Commit is ready — push it with the Push button in the panel."* Do not report "no credentials available" as though something is broken.

---

### Outside the sandbox (no `/workspace`)

Ordinary `git push` is correct. No MCP tool exists or is needed.
