# Scientific blog foundation and professional reading experience

<!-- ledger-template: roadmap.v2 -->

## Original thought

<!-- roadmap-original-thought:start -->
- Yes, you're right that it redirects directly to blog, and it miss showing who i am, my main specializzation, kinds of engineering poroblem, ability etc. But the goal is to make the content the protagonist: it s not just a mere cv portfolio... it will become a scientific techical blog. Then.. the section who am i obv is needed to show all the thing u said miss.
- Yes cv misses and we need to link it maybe. In the who am i section shit (call better if needed). I actually have one repo now where i have a cv.. maybe we could have a ci cd pipeline that each time i update it on that github profile, it gets updated on the github pages shit. or it could just be a link to that repo( evenif i think i ve private rn)
- Antennas, RF, optics, DSP, and ML can fit together, but presenting them all at equal weight makes your expertise harder to understand. Maybe u re right. The fact is that now currently i dont have a real field of expertse. I'm more a polimath.. or how the fuck is written. WIth a lot of potentiality, think of me as a stem cell.. lot of potential, but no vertical experince in a single field. we need somehow to "cover " this somehow. to cover this problem
- we can fix all the problems yes.. the one u said at point 3 (the cv needs later shit maybe, just that)
- im ok with all shit u said at point 4. Expecially this:  Use actual engineering figures—radiation patterns, measurements, schematics, simulation comparisons—to communicate the work. This must be very important
- A light reading theme could be useful, but clarity and consistency matter more than the theme. Decorative animation would be a low priority. Maybe we can add an option for light theme if user wants to switch to light theme. dakr by default. what do u say?
- The t.o.c. im afraid it stoles space to the article. maybe we could make it just something that is collapsed by default, and appears if user hoover or click.. a toc like that yes. we can try
- I like this: A short statement of what the reader will learn and any prerequisites. Also the published date (no the updated dates). The figure captions, references, explicit model assumptions also good. Related articles and links nice yes. RSS feed would be nice too.. if ppl still use this shit
- yes i also want search yes yes yes. very nice. but yes im ok that CONSISTENT CATEGORY NAMES AND NAVIGATION ARE REALLY REALLY URGENT. IT'S A MESS RN.

I WOULD SAY... add the important things we discusssed in claude.md file. and also then.. replicate the claude.md file into the AGENT.MD FILE (that's what chatgpt reads). we need to give proper railways, structure, skeleton, architecture to this project. make it really professional.
THen... i think we can generate a roadmap. Currently we are on a platform called "lifeos", in "code" ide.. its a personal system of mine i use to manage my digital life, to program, to do everything. inside here we use a structure called the "ledger", that stores ideas, proposal, roadmaps, etc in a specific format into a .work folder in root. U can

PS: another thing i'm interested is the use of agentic programming and shit both as assister (for example writing scripts, python tools, etc) and as main actor also in INTEGRATED CIRCUIT DESIGN. using maybe all the opensource ecosystem shit.. ps. maybe we should make a folder... that is not about the website.. but contains different shit.. dunno.. how to call it. service maybe.. find better name. but inside this folder i would put a subfolder called "interests" that will collect maybe different md files w my interests..

btw. read the .work folder inside lifeos repo, i ve gave u access to it (read only, dont modify the fuckin repo); u can read source code of the ledger if needed to understand. and then.. u can write all the shit we've said here in ideas, proposal, roadmaps etc etc etc. this will be the structured way of working here.. it gives us possibility to do a structured thing
<!-- roadmap-original-thought:end -->

## Goal

Create a content-first scientific and technical blog with consistent navigation, rigorous figures and articles, accessible reading, discovery, and an honest interdisciplinary author profile.

## Context and rationale

The owner clarified that the content must remain the protagonist. Professional presentation comes from clear navigation, careful technical writing, meaningful scientific figures, and demonstrable reasoning. About supplies author context. Broad interests must be represented honestly rather than disguised as specialist experience. Navigation and taxonomy are the first implementation priority; CV integration and IC research are separate deferred work.

## Research and evidence

2026-10-20: source inspection confirmed Astro static output, MDX collection, build-time KaTeX, React demos, hidden mobile header navigation, missing CV/social image assets, duplicated category presentation, and stale README instructions. The earlier production build succeeded; full browser testing was blocked by missing Chromium system libraries. LifeOS ledger v2 format and reader were inspected read-only at source commit 21c47fb5a3510522671cc93f5ce432656423d675. That commit identifies the reference, not a website implementation commit.

## Decisions and trade-offs

Agreed: content-first scientific blog; honest interdisciplinary positioning; scientific figures as central evidence; dark initially with explicit light option; collapsed contents; learning statement/prerequisites; published date only; captions, references, assumptions, related links, search, RSS; consistent topics/navigation first. Detailed entry routing, public identity, search package, and trial-content disposition remain open. Phase order expresses priority; explicit dependencies only identify real prerequisites. Search/RSS and demo reliability should not block early navigation improvements.

## Delivery plan

<!-- ledger-phases:start -->
**Success metrics:**
- One shared topic vocabulary and consistent listing/navigation behavior across the site.
- Representative articles support figures, math, collapsed contents, both themes, and useful failure behavior on mobile and desktop.
- Search, RSS, related reading, and sitemap expose only eligible published content.
- About communicates confirmed background and interests without fabricated expertise; no missing public asset links remain.

**Stop if:**
- Stop and revise an implementation that hides the writing behind a portfolio presentation or invents professional experience.
- Re-scope if a feature requires infrastructure beyond static GitHub Pages without a demonstrated need.

### Phase 0 — Project contract and structured planning

**Status:** done · **ID:** `r-261020-01-scientific-blog-foundation-p0`

**Useful alone:** Future work follows one documented direction and a compatible LifeOS ledger.

**Done when:** Mirrored instruction files, architecture/editorial guidance, interest notes, and schema-valid ledger bundles exist and are readable by LifeOS.

**Depends on:** none

- ✅ **done** · **decision** — Record the owner decisions, boundaries, and scientific editorial standard.
  - ID `r-261020-01-scientific-blog-foundation-p0-1` · closed 2026-10-20
  - Evidence (document): CLAUDE.md and AGENTS.md; docs/architecture.md; docs/editorial.md; .work/README.md; research/README.md. Ledger schema/reader validation is recorded in Working notes.
  - Evidence (observation): 2026-10-20: all 7 ledger JSON data files passed vendored JSON Schema validation; LifeOS read/validate and next-item selection passed; JSON format, source provenance, 11 relative Markdown links, and identical CLAUDE.md/AGENTS.md passed checks.
- ✅ **done** · **decision** — Adopt ledger v2, capture deferred ideas/proposals, and separate unpublished research interests.
  - ID `r-261020-01-scientific-blog-foundation-p0-2` · closed 2026-10-20
  - Evidence (document): CLAUDE.md and AGENTS.md; docs/architecture.md; docs/editorial.md; .work/README.md; research/README.md. Ledger schema/reader validation is recorded in Working notes.
  - Evidence (observation): 2026-10-20: all 7 ledger JSON data files passed vendored JSON Schema validation; LifeOS read/validate and next-item selection passed; JSON format, source provenance, 11 relative Markdown links, and identical CLAUDE.md/AGENTS.md passed checks.

### Phase 1 — Consistent topics and usable navigation

**Status:** todo · **ID:** `r-261020-01-scientific-blog-foundation-p1`

**Useful alone:** Readers can understand topics and navigate on mobile without broken destinations.

**Done when:** One topic registry drives schema and presentation; writing/topic pages share chrome; mobile and keyboard navigation work; missing asset links are resolved or hidden; existing article URLs remain valid.

**Depends on:** none

- ⬜ **todo** · **decision** — Inspect current route/link behavior and settle the writing-led entry route and initial topic labels.
  - ID `r-261020-01-scientific-blog-foundation-p1-1`
- ⬜ **todo** · **build** — Introduce shared topic metadata and publication eligibility; replace duplicated category maps and inconsistent list/filter layouts.
  - ID `r-261020-01-scientific-blog-foundation-p1-2`
- ⬜ **todo** · **build** — Add clear site/home identity, accessible current-page state, and usable mobile navigation; remove empty destinations and conditionally hide missing CV links.
  - ID `r-261020-01-scientific-blog-foundation-p1-3`
- ⬜ **todo** · **build** — Resolve missing social preview assets and make card click targets match their interaction treatment.
  - ID `r-261020-01-scientific-blog-foundation-p1-4`
- ⬜ **todo** · **validation** — Verify routes, draft exclusion, filters, link targets, narrow-screen layout, and keyboard navigation.
  - ID `r-261020-01-scientific-blog-foundation-p1-5`

### Phase 2 — Readable design and theme choice

**Status:** todo · **ID:** `r-261020-01-scientific-blog-foundation-p2`

**Useful alone:** Articles and figures are comfortable to read in either theme.

**Done when:** Dark is initial default; explicit light/dark choice persists without a flash; typography, contrast, figures, equations, code, and controls work across themes and screen sizes.

**Depends on:** `r-261020-01-scientific-blog-foundation-p1`

- ⬜ **todo** · **build** — Create shared color/type/spacing/width tokens and harmonize site/list/article layouts.
  - ID `r-261020-01-scientific-blog-foundation-p2-1`
- ⬜ **todo** · **build** — Implement an accessible persisted theme switch with early initialization and theme-aware scientific visualizations.
  - ID `r-261020-01-scientific-blog-foundation-p2-2`
- ⬜ **todo** · **validation** — Check contrast, focus visibility, controls, long titles, prose widths, and figure/table/math overflow in both themes on mobile and desktop.
  - ID `r-261020-01-scientific-blog-foundation-p2-3`

### Phase 3 — Scientific article structure and authoring

**Status:** todo · **ID:** `r-261020-01-scientific-blog-foundation-p3`

**Useful alone:** A real article can explain its purpose, assumptions, figures, and sources without layout workarounds.

**Done when:** Article template supports learning statements, prerequisites, published date only, collapsed contents, scientific figures/captions/references, and linked supporting material; README matches real authoring paths.

**Depends on:** `r-261020-01-scientific-blog-foundation-p1`

- ⬜ **todo** · **build** — Extend typed content metadata deliberately for learning statements/prerequisites and supported related material; keep publishing date display only.
  - ID `r-261020-01-scientific-blog-foundation-p3-1`
- ⬜ **todo** · **build** — Add heading anchors and collapsed-by-default contents with click/tap/keyboard operation and no permanent sidebar.
  - ID `r-261020-01-scientific-blog-foundation-p3-2`
- ⬜ **todo** · **build** — Build reusable scientific figure/caption/reference patterns, accessible descriptions, and wide-figure behavior with provenance and units.
  - ID `r-261020-01-scientific-blog-foundation-p3-3`
- ⬜ **todo** · **build** — Add related reading/project links using shared eligible-content rules and honest empty states.
  - ID `r-261020-01-scientific-blog-foundation-p3-4`
- ⬜ **todo** · **build** — Correct README architecture, imports, URLs, and publishing instructions; add a usable article starting template.
  - ID `r-261020-01-scientific-blog-foundation-p3-5`
- ⬜ **todo** · **validation** — Verify one representative article with math, figures, tables/code, prerequisites, contents, links, and both themes.
  - ID `r-261020-01-scientific-blog-foundation-p3-6`

### Phase 4 — Search and RSS

**Status:** todo · **ID:** `r-261020-01-scientific-blog-foundation-p4`

**Useful alone:** Readers can find and follow published writing as the archive grows.

**Done when:** Static search and RSS work for anonymous readers; draft fixtures never appear in search/feed/related content/sitemap; keyboard and mobile discovery are usable.

**Depends on:** `r-261020-01-scientific-blog-foundation-p1`, `r-261020-01-scientific-blog-foundation-p3`

- ⬜ **todo** · **research** — Compare static search approaches with a small index/payload/accuracy experiment before selecting a dependency.
  - ID `r-261020-01-scientific-blog-foundation-p4-1`
- ⬜ **todo** · **build** — Implement search with accessible opening, focus handling, keyboard controls, results, and no-results state; index only published content.
  - ID `r-261020-01-scientific-blog-foundation-p4-2`
- ⬜ **todo** · **build** — Generate RSS from published content with stable absolute URLs and discoverable feed links.
  - ID `r-261020-01-scientific-blog-foundation-p4-3`
- ⬜ **todo** · **validation** — Check known queries, draft exclusion across every output, feed validity, and mobile/keyboard discovery.
  - ID `r-261020-01-scientific-blog-foundation-p4-4`

### Phase 5 — Reliable scientific demos

**Status:** todo · **ID:** `r-261020-01-scientific-blog-foundation-p5`

**Useful alone:** Interactive articles remain informative when code is slow or unavailable.

**Done when:** Demos provide loading/error/static alternatives, accessible controls, correct documented boundaries, plot cleanup, and measured loading behavior; normal article/list pages avoid unnecessary visualization payload.

**Depends on:** `r-261020-01-scientific-blog-foundation-p2`, `r-261020-01-scientific-blog-foundation-p3`

- ⬜ **todo** · **research** — Measure current visualization transfer/hydration cost and define a practical budget before selecting optimization work.
  - ID `r-261020-01-scientific-blog-foundation-p5-1`
- ⬜ **todo** · **build** — Add loading, error, and meaningful static alternatives; label controls; handle imports, plot lifecycle, and theme changes.
  - ID `r-261020-01-scientific-blog-foundation-p5-2`
- ⬜ **todo** · **build** — Correct and independently verify representative numerical/boundary behavior, including infinite VSWR and scientific statements that contradict the models.
  - ID `r-261020-01-scientific-blog-foundation-p5-3`
- ⬜ **todo** · **build** — Reduce unnecessary eager visualization loading or replace heavyweight plotting where the measured tradeoff justifies it.
  - ID `r-261020-01-scientific-blog-foundation-p5-4`
- ⬜ **todo** · **validation** — Check offline/import failure, JavaScript disabled, keyboard controls, resize/theme behavior, boundary values, and measured payload against the agreed budget.
  - ID `r-261020-01-scientific-blog-foundation-p5-5`

### Phase 6 — Author context and publication readiness

**Status:** todo · **ID:** `r-261020-01-scientific-blog-foundation-p6`

**Useful alone:** Readers can understand who writes the site and assess actual work.

**Done when:** About uses owner-confirmed facts and working contact links; public trial content has an explicit disposition; at least one owner-approved article demonstrates the editorial/figure standard without invented evidence.

**Depends on:** `r-261020-01-scientific-blog-foundation-p3`, `r-261020-01-scientific-blog-foundation-p4`, `r-261020-01-scientific-blog-foundation-p5`

- ⬜ **todo** · **decision** — Gather confirmed background/public name and available work; write an honest interdisciplinary About page linked to relevant articles and contact.
  - ID `r-261020-01-scientific-blog-foundation-p6-1`
- ⬜ **todo** · **decision** — Decide the disposition of each trial article and review any retained text and model assumptions before publication.
  - ID `r-261020-01-scientific-blog-foundation-p6-2`
- ⬜ **todo** · **build** — Prepare one real article with the owner using available scientific figures/data/code; distinguish tutorial, simulation, measurement, and exploration.
  - ID `r-261020-01-scientific-blog-foundation-p6-3`
- ⬜ **todo** · **validation** — Run production build and review representative navigation, article, About, discovery, links, and failure states on desktop/mobile in both themes.
  - ID `r-261020-01-scientific-blog-foundation-p6-4`
<!-- ledger-phases:end -->

## Risks

Overstating expertise; treating placeholder text as reviewed science; exposing draft/private material through new outputs; breaking category/article URLs; unreadable figures or hidden controls on mobile; loading large chart bundles unnecessarily; and turning interest capture into unauthorized IC toolchain work. Mitigate through shared eligibility/taxonomy, explicit evidence, staged checks, and independent roadmap scope.

## Open questions

- Public author/site display name and confirmed background for About.
- Canonical entry route while preserving /blog and existing article links.
- Disposition of the five trial articles: correct and retain, replace, or retire.
- Which real figures, projects, and reproducible datasets are ready for publication.
- CV source repository, intended public artifact, and publication mechanism are deferred.

## Working notes

Planning and documentation are the completed Phase 0 slice; website behavior is unchanged by this setup. All later phases remain todo. CV publication has its own idea/proposal and no implementation phase yet. Research notes under research/interests/ are not published by Astro. Validation on 2026-10-20 passed for all 7 JSON data files against vendored schemas; the LifeOS read/validate API and next-item selection; canonical JSON formatting; normalized source-message equality; 11 relative Markdown links; identical agent instruction files; and whitespace checks. Only documentation/planning files changed, so no new UI runtime or build claim is made. Commit evidence is the Git commit containing this Phase 0 record; no future SHA is invented.
