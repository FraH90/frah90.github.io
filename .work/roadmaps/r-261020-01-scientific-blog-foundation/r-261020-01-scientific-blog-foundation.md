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

**Status:** done · **ID:** `r-261020-01-scientific-blog-foundation-p1`

**Useful alone:** Readers can understand topics and navigate on mobile without broken destinations.

**Done when:** One topic registry drives schema and presentation; writing/topic pages share chrome; mobile and keyboard navigation work; missing asset links are resolved or hidden; existing article URLs remain valid.

**Depends on:** none

- ✅ **done** · **decision** — Inspect current route/link behavior and settle the writing-led entry route and initial topic labels.
  - ID `r-261020-01-scientific-blog-foundation-p1-1` · closed 2026-10-20 · commits `fe021f4234b382875a4064ae13ef8ada42fb9654`
  - Evidence (decision): Retain / -> /blog as the writing-first entry and preserve category/article URLs. Use existing FraH90 identity, Writing/About navigation, and stable slug labels/order in src/lib/topics.ts. Redirect empty /projects to /blog; CV links depend on a real public PDF.
- ✅ **done** · **build** — Introduce shared topic metadata and publication eligibility; replace duplicated category maps and inconsistent list/filter layouts.
  - ID `r-261020-01-scientific-blog-foundation-p1-2` · closed 2026-10-20 · commits `fe021f4234b382875a4064ae13ef8ada42fb9654`
  - Evidence (document): src/lib/topics.ts is shared by the collection schema, topic filters, routes and article labels. src/lib/posts.ts owns draft eligibility. PostListing.astro shares archive/category layout.
- ✅ **done** · **build** — Add clear site/home identity, accessible current-page state, and usable mobile navigation; remove empty destinations and conditionally hide missing CV links.
  - ID `r-261020-01-scientific-blog-foundation-p1-3` · closed 2026-10-20 · commits `fe021f4234b382875a4064ae13ef8ada42fb9654`
  - Evidence (observation): Chromium passed visible navigation, active state, keyboard skip/focus, and no page overflow at 320/390/768/1440px. Root and Projects aliases lead to Writing. CV links are absent without the PDF; presence/absence eligibility also passed an isolated temporary-directory check.
- ✅ **done** · **build** — Resolve missing social preview assets and make card click targets match their interaction treatment.
  - ID `r-261020-01-scientific-blog-foundation-p1-4` · closed 2026-10-20 · commits `fe021f4234b382875a4064ae13ef8ada42fb9654`
  - Evidence (document): public/og-default.png and editable public/branding/social-card.svg replace the missing preview target; Open Graph image URLs are absolute. Whole-card links passed non-title-area pointer and keyboard-focus checks.
- ✅ **done** · **validation** — Verify routes, draft exclusion, filters, link targets, narrow-screen layout, and keyboard navigation.
  - ID `r-261020-01-scientific-blog-foundation-p1-5` · closed 2026-10-20 · commits `fe021f4234b382875a4064ae13ef8ada42fb9654`
  - Evidence (observation): Final npm run build and npm run check:build passed (14 pages). Chromium checked writing, topic, About and an interactive article at 320/390/768/1440px, keyboard focus/skip, card targets, aliases and no-JS reading. A temporary draft fixture stayed out of routes/listings/topics/sitemap and was removed before the final build. The site remains dark; light mode belongs to Phase 2.

### Phase 2 — Readable design and theme choice

**Status:** done · **ID:** `r-261020-01-scientific-blog-foundation-p2`

**Useful alone:** Articles and figures are comfortable to read in either theme.

**Done when:** Dark is initial default; explicit light/dark choice persists without a flash; typography, contrast, figures, equations, code, and controls work across themes and screen sizes.

**Depends on:** `r-261020-01-scientific-blog-foundation-p1`

- ✅ **done** · **build** — Create shared color/type/spacing/width tokens and harmonize site/list/article layouts.
  - ID `r-261020-01-scientific-blog-foundation-p2-1` · closed 2026-10-20 · commits `1843f4a049cce9450db2813058dd00c488bf5b82`
  - Evidence (document): src/styles/global.css provides semantic colors, readable prose/figure widths, theme-aware typography and syntax colors, local overflow, and focus styling. Layouts, cards, topics, About and demos now consume those tokens.
- ✅ **done** · **build** — Implement an accessible persisted theme switch with early initialization and theme-aware scientific visualizations.
  - ID `r-261020-01-scientific-blog-foundation-p2-2` · closed 2026-10-20 · commits `1843f4a049cce9450db2813058dd00c488bf5b82`
  - Evidence (observation): Chromium verified initial dark default regardless of system preference; explicit light/dark persistence across reload/navigation and cross-tab sync; saved light applied by the head script without the toggle module; invalid/blocked storage; keyboard toggle; chart font/trace changes with preserved zoom; labeled keyboard range inputs.
- ✅ **done** · **validation** — Check contrast, focus visibility, controls, long titles, prose widths, and figure/table/math overflow in both themes on mobile and desktop.
  - ID `r-261020-01-scientific-blog-foundation-p2-3` · closed 2026-10-20 · commits `1843f4a049cce9450db2813058dd00c488bf5b82`
  - Evidence (observation): Final production build and check:build passed for 14 pages. Both themes passed responsive checks at 320/390/768/1440px across writing/topic/About and four live demos; axe contrast, label, button/link-name checks passed at 390/1440px. Temporary long-title/code/math/table/figure fixture passed localized keyboard scroll and width checks and was removed before final build. No-JS reading and plot-import error handling passed.

### Phase 3 — Scientific article structure and authoring

**Status:** done · **ID:** `r-261020-01-scientific-blog-foundation-p3`

**Useful alone:** A real article can explain its purpose, assumptions, figures, and sources without layout workarounds.

**Done when:** Article template supports learning statements, prerequisites, published date only, collapsed contents, scientific figures/captions/references, and linked supporting material; README matches real authoring paths.

**Depends on:** `r-261020-01-scientific-blog-foundation-p1`

- ✅ **done** · **build** — Extend typed content metadata deliberately for learning statements/prerequisites and supported related material; keep publishing date display only.
  - ID `r-261020-01-scientific-blog-foundation-p3-1` · closed 2026-10-20 · commits `f4d13ff2cbff0914e5be99068e804b40319e545d`
  - Evidence (document): Content schema adds optional learningGoals, prerequisites, assumptions, relatedPosts collection references, resources, and unique bibliographic references with empty defaults. Existing trial articles render without placeholders; the article header displays one publication date only.
- ✅ **done** · **build** — Add heading anchors and collapsed-by-default contents with click/tap/keyboard operation and no permanent sidebar.
  - ID `r-261020-01-scientific-blog-foundation-p3-2` · closed 2026-10-20 · commits `f4d13ff2cbff0914e5be99068e804b40319e545d`
  - Evidence (document): Native details/summary contents starts collapsed and uses Astro heading metadata. Chromium verified click/keyboard/no-JS navigation, focus transfer, repeated-heading IDs and progressive permalinks. Contents and heading targets remain static HTML without a sidebar.
- ✅ **done** · **build** — Build reusable scientific figure/caption/reference patterns, accessible descriptions, and wide-figure behavior with provenance and units.
  - ID `r-261020-01-scientific-blog-foundation-p3-3` · closed 2026-10-20 · commits `f4d13ff2cbff0914e5be99068e804b40319e545d`
  - Evidence (document): ScientificFigure supports source/type/caption/parameters, image alt/dimensions or accessible inline content, and optional wide layout. Citation and reference components provide stable source links. Duplicate reference keys fail schema validation; missing alt raised a specific rendering error; a broken citation fragment failed check:build.
- ✅ **done** · **build** — Add related reading/project links using shared eligible-content rules and honest empty states.
  - ID `r-261020-01-scientific-blog-foundation-p3-4` · closed 2026-10-20 · commits `f4d13ff2cbff0914e5be99068e804b40319e545d`
  - Evidence (document): Related reading prioritizes curated published entries and topic/tag overlaps, excludes self/duplicates/drafts, and omits empty panels. Fixture verified three published recommendations and hidden draft sentinel. Missing curated ID raised a specific authoring error. Supporting resources render only when provided.
- ✅ **done** · **build** — Correct README architecture, imports, URLs, and publishing instructions.
  - ID `r-261020-01-scientific-blog-foundation-p3-5` · closed 2026-10-20 · commits `fe021f4234b382875a4064ae13ef8ada42fb9654`, `f4d13ff2cbff0914e5be99068e804b40319e545d`
  - Evidence (document): README.md now describes actual routes, topic registry, draft eligibility, current MDX imports, CV behavior, deployment/build checks, and explicitly pending features. Completed during Phase 1.
- ✅ **done** · **build** — Add a usable article starting template with the enhanced article metadata once that schema lands.
  - ID `r-261020-01-scientific-blog-foundation-p3-7` · closed 2026-10-20 · commits `f4d13ff2cbff0914e5be99068e804b40319e545d`
  - Evidence (document): docs/templates/article.mdx and npm run new:post create typed, draft-first articles from the shared topic registry. CLI checks passed for creation, overwrite refusal, invalid path and unknown topic. docs/article-authoring.md documents metadata, figures, citations, related material and publishing checks.
- ✅ **done** · **validation** — Verify one representative article with math, figures, tables/code, prerequisites, contents, links, and both themes.
  - ID `r-261020-01-scientific-blog-foundation-p3-6` · closed 2026-10-20 · commits `f4d13ff2cbff0914e5be99068e804b40319e545d`
  - Evidence (observation): Fixture passed both themes at 320/390/768/1440px: math/code/table, goals/prerequisites/assumptions, contents/section focus, narrow/wide figures, captions/provenance, citations/references, related draft filtering, and selected axe rules. Final 14-page build/check:build and real articles at 390/1440px passed; fixtures were removed. No-JS contents/citations passed.

### Phase 4 — Search and RSS

**Status:** done · **ID:** `r-261020-01-scientific-blog-foundation-p4`

**Useful alone:** Readers can find and follow published writing as the archive grows.

**Done when:** Static search and RSS work for anonymous readers; draft fixtures never appear in search/feed/related content/sitemap; keyboard and mobile discovery are usable.

**Depends on:** `r-261020-01-scientific-blog-foundation-p1`, `r-261020-01-scientific-blog-foundation-p3`

- ✅ **done** · **research** — Compare static search approaches with a small index/payload/accuracy experiment before selecting a dependency.
  - ID `r-261020-01-scientific-blog-foundation-p4-1` · closed 2026-10-20 · commits `182fe279a87af1c074b59fbcd9b4a6ebc6a90eb7`
  - Evidence (document): docs/search-and-rss.md records the five-article metadata/full-text experiment, eight query results, raw/gzip JSON sizes, Pagefind response-body bytes, official sources, and the rendered-content/chunked-index decision. Pagefind 1.5.2 is pinned; existing unrelated lockfile edits are preserved.
- ✅ **done** · **build** — Implement search with accessible opening, focus handling, keyboard controls, results, and no-results state; index only published content.
  - ID `r-261020-01-scientific-blog-foundation-p4-2` · closed 2026-10-20 · commits `182fe279a87af1c074b59fbcd9b4a6ebc6a90eb7`
  - Evidence (document): Dedicated /search provides a labeled bookmarkable GET form, lazy Pagefind loading, status announcements, loading/no-results/failure states, ten-result batches, keyboard focus/Escape behavior, and native topic fallback. Indexed HTML is limited to generated published article bodies; duplicate KaTeX markup, islands, contents and article-tool sections are excluded. Failed result downloads reset the engine before retry.
- ✅ **done** · **build** — Generate RSS from published content with stable absolute URLs and discoverable feed links.
  - ID `r-261020-01-scientific-blog-foundation-p4-3` · closed 2026-10-20 · commits `182fe279a87af1c074b59fbcd9b4a6ebc6a90eb7`
  - Evidence (document): Static /rss.xml emits summary-only RSS 2.0 from getAllPosts with XML-escaped text, absolute stable article links/GUIDs, publication dates and topic labels. Every regular page supplies feed autodiscovery and a visible footer link; README and mirrored working contracts describe the delivered features.
- ✅ **done** · **validation** — Check known queries, draft exclusion across every output, feed validity, and mobile/keyboard discovery.
  - ID `r-261020-01-scientific-blog-foundation-p4-4` · closed 2026-10-20 · commits `182fe279a87af1c074b59fbcd9b4a6ebc6a90eb7`
  - Evidence (observation): Production build/check:build passed. Chromium checked both themes at 320/390/768/1440px, known/body/phrase/empty queries, keyboard navigation and pagination focus, query URLs/history, no-JS topic fallback, blocked engine and fragment recovery, and selected axe rules. Temporary fixtures verified 11-result pagination, code indexing, formula exclusion, exact escaped/Unicode RSS XML roundtrip, and draft exclusion across routes/listings/related/search/feed/sitemap. Fixtures removed before final 15-page/five-article build. No manual screen-reader or scientific accuracy audit claimed.

### Phase 5 — Reliable scientific demos

**Status:** done · **ID:** `r-261020-01-scientific-blog-foundation-p5`

**Useful alone:** Interactive articles remain informative when code is slow or unavailable.

**Done when:** Demos provide loading/error/static alternatives, accessible controls, correct documented boundaries, plot cleanup, and measured loading behavior; normal article/list pages avoid unnecessary visualization payload.

**Depends on:** `r-261020-01-scientific-blog-foundation-p2`, `r-261020-01-scientific-blog-foundation-p3`

- ✅ **done** · **research** — Measure current visualization transfer/hydration cost and define a practical budget before selecting optimization work.
  - ID `r-261020-01-scientific-blog-foundation-p5-1` · closed 2026-10-20 · commits `b628e603c674eaf758af1dcd58cf014223517b68`
  - Evidence (document): docs/interactive-demos.md records production Chromium measurements: previous demos fetched ~1.526 MB encoded / 5.006 MB decoded JS, first plot ~1.80–1.90s, script execution ~1.28–1.30s in this ARM64 container. Budgets: initial controller ≤3 KiB gzip; all application JS ≤250 KiB decoded / 80 KiB gzip; demo HTML ≤32 KiB gzip; direct DFT p95 ≤50ms; loading timeout 15s.
- ✅ **done** · **build** — Add meaningful static alternatives and complete loading/error behavior around browser-only demos; verify fallback content and import failure beyond the existing chart error message.
  - ID `r-261020-01-scientific-blog-foundation-p5-2` · closed 2026-10-20 · commits `b628e603c674eaf758af1dcd58cf014223517b68`
  - Evidence (document): InteractiveDemo emits calculated reference SVG, parameters, units, descriptions and observations before JavaScript. Explicit activation loads only the chosen React controls. Loading/import/root-render/15s timeout errors preserve the reference and provide retry; stale imports cannot mount after timeout. Chromium verified no-JS, offline, blocked controller/module, render exception, timeout/late completion, and import retry.
- ✅ **done** · **build** — Make plots and range controls theme-aware, preserve plot zoom, clean up plot/theme listeners, associate slider labels, and handle plot import/render rejection.
  - ID `r-261020-01-scientific-blog-foundation-p5-6` · closed 2026-10-20 · commits `1843f4a049cce9450db2813058dd00c488bf5b82`, `b628e603c674eaf758af1dcd58cf014223517b68`
  - Evidence (observation): Completed during Phase 2: live charts render in development and production, change axis/trace colors, preserve a real drag-zoom, and still respond to keyboard slider input. Blocked plot import produced a readable error message without an unhandled page error. Full scientific/static fallbacks remain p5-2.
  - Evidence (document): Phase 5 replaces public Plotly plots with native SVG; theme changes preserve parameters/paths without listeners or plot instances. The former zoom interaction is intentionally omitted for these simple plots (docs/interactive-demos.md). Legacy Plotly cleanup/zoom support remains unchanged for unpublished exploratory code.
- ✅ **done** · **build** — Correct and independently verify representative numerical/boundary behavior, including infinite VSWR and scientific statements that contradict the models.
  - ID `r-261020-01-scientific-blog-foundation-p5-3` · closed 2026-10-20 · commits `b628e603c674eaf758af1dcd58cf014223517b68`
  - Evidence (observation): Shared ideal models passed independent array closed-form/null/grating/sidelobe/half-power identities, transmission match/short/reactive/open checks and infinite VSWR, Gaussian waist/Rayleigh/symmetry/endpoints, and DFT zero/DC/Nyquist/bin-amplitude/leakage checks. Targeted article corrections add explicit assumptions and sources; integer-degree phase controls include zero/±180°. Broader editorial review remains Phase 6.
- ✅ **done** · **build** — Reduce unnecessary eager visualization loading or replace heavyweight plotting where the measured tradeoff justifies it.
  - ID `r-261020-01-scientific-blog-foundation-p5-4` · closed 2026-10-20 · commits `b628e603c674eaf758af1dcd58cf014223517b68`
  - Evidence (observation): Four published demos use native SVG rather than Plotly. Initial demo code is ~1.6 KB gzip; activated article JS is ~66.6–66.8 KB encoded versus ~1.526 MB previously. Complete emitted application JS is 210898 decoded / 69895 gzip bytes, under budget. No Plotly chunk is generated; ordinary pages request no demo/React assets. SVG intentionally omits Plotly zoom/hover inspection; tradeoff documented.
- ✅ **done** · **validation** — Check offline/import failure, JavaScript disabled, keyboard controls, resize/theme behavior, boundary values, and measured payload against the agreed budget.
  - ID `r-261020-01-scientific-blog-foundation-p5-5` · closed 2026-10-20 · commits `b628e603c674eaf758af1dcd58cf014223517b68`
  - Evidence (observation): Final build/check:build/check:demos passed for 15 pages and five indexed/feed articles. Chromium checked four demos at 320/390/768/1440px in both themes: keyboard activation/focus, slider endpoints/windows, invalid steering, infinite VSWR, paraxial warning, actual resize/theme parameter preservation, local SVG scrolling, no-JS figures, navigation, loading/failure recovery and selected axe rules. DFT p95 ~8ms locally. No manual screen-reader or field-performance claim.

### Phase 6 — Author context and publication readiness

**Status:** active · **ID:** `r-261020-01-scientific-blog-foundation-p6`

**Useful alone:** Readers can understand who writes the site and assess actual work.

**Done when:** About uses owner-confirmed background and privacy choices; the five original articles remain explicitly labeled public demos; at least one owner-written/approved substantive article meets the editorial and figure standard.

**Depends on:** `r-261020-01-scientific-blog-foundation-p3`, `r-261020-01-scientific-blog-foundation-p4`, `r-261020-01-scientific-blog-foundation-p5`

- ✅ **done** · **decision** — Apply the confirmed profile/privacy choices: retain FraH90, state electronic engineer, omit personal name and contacts, and link writing/source without unconfirmed proficiency claims.
  - ID `r-261020-01-scientific-blog-foundation-p6-1` · closed 2026-10-20 · commits `8149b37f2f9e44fed56c496518634445de922440`
  - Evidence (document): About now uses the owner-stated interdisciplinary interests and learning/development orientation. Unconfirmed professional experience/tool lists were removed. Existing FraH90 handle/email retained, with explicit requests for public name, background, projects/tools and email confirmation. Full author-profile decision remains open pending owner input.
  - Evidence (decision): Owner confirms electronic engineer, keeps the existing public handle, declines personal name and public contacts. About now states the confirmed background; its contact panel/email and the footer profile contact link are removed. Source repository links remain inspectable code, not a contact panel. Mirrored working contracts record these choices.
- ✅ **done** · **decision** — Retain all five original articles as explicitly labeled public demos, preserving URLs and distinguishing demo status from draft eligibility and reviewed research.
  - ID `r-261020-01-scientific-blog-foundation-p6-2` · closed 2026-10-20 · commits `8149b37f2f9e44fed56c496518634445de922440`
  - Evidence (document): The paired roadmap Markdown inventories all five trial articles, available analytical evidence, unchanged public status and owner decisions needed. No article was retired, promoted to reviewed work, assigned a new publication date, or automatically selected as the first approved article.
  - Evidence (decision): Owner explicitly chose to retain and label the original articles as demos. All five now use demo:true with shared label/notice in listings, headers, related cards, search metadata/results and RSS titles/descriptions/categories. URLs/GUIDs and existing dates are preserved; this is not certification of scientific review.
- ▶️ **active** · **build** — Prepare one real article with the owner using available scientific figures/data/code; distinguish tutorial, simulation, measurement, and exploration.
  - ID `r-261020-01-scientific-blog-foundation-p6-3`
  - Evidence (document): Owner plans to write a deeper, research-oriented phased-array article. Idea i-261020-04-research-oriented-phased-array-article preserves the request and proposes a bounded beam-squint bandwidth/aperture study, primary starting sources, assumptions, three scientific figures and reproducibility checks. The exact subtopic is a suggestion, with no manuscript, new calculation, novelty claim or publication approval fabricated.
- ▶️ **active** · **validation** — Run production build and review representative navigation, article, About, discovery, links, and failure states on desktop/mobile in both themes.
  - ID `r-261020-01-scientific-blog-foundation-p6-4` · commits `8149b37f2f9e44fed56c496518634445de922440`
  - Evidence (observation): Current About slice passed production build/output/demo checks and Chromium at 320/390/768/1440px in both themes: layout, active navigation, keyboard/skip and article links, selected axe rules, no-JS topic browsing and CV absence. GitHub profile/source URLs returned HTTP 200; email syntax/link retained but ownership/deliverability not verified. Final owner article and wider Phase 6 sign-off remain pending.
  - Evidence (observation): Production build/output/demo checks pass. Chromium verifies no contacts and Demo labels across listing/article/related/search views at 320/1440 in both themes, selected axe and no-JS labeling. Isolated ordinary/draft fixtures distinguish normal articles from demos and preserve draft exclusion; fixtures removed before the final 15-page/five-article build. Final owner manuscript review remains pending.
- ✅ **done** · **build** — Replace the unconfirmed biography/skills grid with a professional interest-led About structure, eligible topic/article links, source access and existing contact/CV behavior.
  - ID `r-261020-01-scientific-blog-foundation-p6-5` · closed 2026-10-20 · commits `8149b37f2f9e44fed56c496518634445de922440`
  - Evidence (document): src/pages/about.astro presents physical models, signals/inference and engineering software as interests; agentic IC design is explicitly exploratory. Topic labels use the shared registry; links and examples use shared published-content queries so empty/draft destinations are omitted. There are no invented credentials, employer/project claims, skill proficiency levels, or empty profile placeholders.

### Phase 7 — Workflow permissions and automated deployment checks

**Status:** todo · **ID:** `r-261020-01-scientific-blog-foundation-p7`

**Useful alone:** Broken public links and assets can stop deployment automatically instead of relying on a local check.

**Done when:** Workflow-file edits are authorized through the integration, npm run check:build and npm run check:demos run after the production build and before upload, and a successful workflow run verifies the gate.

**Depends on:** `r-261020-01-scientific-blog-foundation-p6`

- ⬜ **todo** · **decision** — Resolve the GitHub integration workflows permission using the supported LifeOS/GitHub configuration; do not add credentials to this repository.
  - ID `r-261020-01-scientific-blog-foundation-p7-1`
- ⬜ **todo** · **build** — Add npm run check:build and npm run check:demos after the Astro/Pagefind build and before GitHub Pages artifact upload; verify broken output/model or payload regressions block deployment and a valid deployment passes.
  - ID `r-261020-01-scientific-blog-foundation-p7-2`
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

Phases 0, 1, 2, 3, 4, and 5 are complete. Phase 1 retains the writing-first entry, unifies taxonomy/listings, fixes mobile navigation and broken destinations, supplies the social card, and adds local build-output checks. Owner-confirmed author context, trial-article disposition and an approved publication example remain pending. The README and plot/control theme slices were delivered early; their article-template and static-demo remainders are now complete. CV publication has its own idea/proposal and no implementation phase yet. Research notes under research/interests/ are not published by Astro. Validation on 2026-10-20 passed for all 7 JSON data files against vendored schemas; the LifeOS read/validate API and next-item selection; canonical JSON formatting; normalized source-message equality; 11 relative Markdown links; identical agent instruction files; and whitespace checks. Only documentation/planning files changed in Phase 0, so that initial phase made no new UI runtime or build claim. Commit evidence is the Git commit containing this Phase 0 record; no future SHA is invented.


### Phase 1 verification — 2026-10-20

Production build and `npm run check:build` passed for 14 pages. Chromium was made usable through temporary user-space system libraries; the LifeOS checkout was not changed. Browser checks passed for Writing, Antennas & Arrays, About, and the transmission-line article at 320, 390, 768, and 1440 pixels, including no horizontal page overflow, consistent topic order/layout, semantic active states, full-card click targets, keyboard focus, skip-to-content, and redirect aliases. Navigation and reading also passed without JavaScript under dark and light system preferences; explicit light-theme UI is still Phase 2. No page errors occurred during the checked routes.

A temporary draft with a unique sentinel and otherwise empty `misc` category was excluded from generated content, article routes, filters, and sitemap. It was removed before the final production build. CV eligibility passed for both missing and present PDF files in an isolated temporary directory; no CV fixture was published. Shared output checks run via `npm run check:build`. Adding them to deployment CI was deferred because the GitHub App rejected workflow changes without workflows permission; the existing deployment workflow is retained. Screenshots were captured for desktop/mobile writing, topic, About, and article pages; the desktop/mobile writing listings and social card were visually reviewed. Numerical demo correctness, broader scientific review, and demo fallbacks remain pending phases.


### Deferred workflow follow-up — 2026-10-20

The owner said: “we'l deal with those permission shit later, add it at the end of roadmap maybe.” Phase 7 now records the permission decision and CI build-output gate after the publication work. No workflow file or GitHub permission is changed by Phase 2.


### Phase 2 verification — 2026-10-20

Shared semantic colors replace hard-coded dark-only utilities across the shell, lists, article chrome, About, controls, and plots. Prose is limited to 46rem inside a 64rem shell while figures and demos can use the wider area. Long titles wrap and oversized equations/code/tables scroll locally, with focus and accessible names when they overflow. Shiki emits light/dark palettes at build time, and KaTeX inherits the theme. No numerical model or article claim was changed in this phase.

The theme is dark initially, including under a light OS preference. An early inline head script reads a validated local preference before body paint; the header button persists the explicit choice and synchronizes it between tabs. Browser checks passed for reload/navigation persistence, invalid preferences, denied storage, saved light before the toggle module executes, keyboard actions, and no-JavaScript reading. The button is hidden when scripting is unavailable. Denied storage permits switching on the current page without pretending that the preference can persist.

Chromium checked Writing, a topic view, About, and the array-factor, Fourier, Gaussian-beam, and transmission-line articles in both themes at 320, 390, 768, and 1440 pixels. There was no horizontal page overflow. Selected axe rules (contrast, labels, button names, link names) passed at 390/1440 pixels. Representative dark/light article and listing screenshots were visually reviewed. Chart theme updates preserved real drag-zoom and keyboard slider changes continued to work. A blocked plotting import showed the explicit chart error message without an unhandled page error; complete static/demo failure alternatives remain Phase 5.

A temporary published layout fixture exercised a long title, prose/link/quotation/list, syntax-highlighted code, a long equation, a wide table, and a wide non-data figure. Both palettes passed contrast checks. Local keyboard scrolling and ARIA/scroll-region checks passed for code/table/math; figure width exceeded the prose measure on desktop. The fixture and its otherwise empty topic were removed before the final production build. `npm run build` and `npm run check:build` passed for the final 14-page output, and fixture text/routes were absent. Numerical accuracy, static scientific fallback design, and manual assistive-technology testing were not claimed by these UI checks.


### Phase 3 verification — 2026-10-20

The article collection now supports optional plain-text learning goals, prerequisites and assumptions; typed supporting material; unique reference keys; and curated related collection references. Older articles use empty defaults and acquire no empty panels. Only the publication date is displayed. The article template/guide documents the fields and the draft creation command. Exclusive writes prevent overwriting an existing article, and the command validates topic/slug against the shared registry.

Native collapsed contents uses Astro heading IDs/metadata and works with click, keyboard, touch-sized controls, and no JavaScript. The heading plugin adds programmatic focus targets without tab stops; optional client permalinks preserve native IDs. Repeated headings retained distinct targets. ScientificFigure supports image or inline-vector content, narrow/wide layout, captions, result type, parameters/units context, provenance, and optional source links. Image figures require alt text and positive dimensions. Citation links target the generated reference list; empty bibliography/material/related panels are omitted.

A temporary published article exercised goals, prerequisites, assumptions, math, syntax-highlighted code, a table, image/vector figures, captions and references, duplicate body headings, and curated plus automatic related reading. It passed Chromium checks in both themes at 320, 390, 768, and 1440 pixels, with no horizontal page overflow. Selected axe contrast, label, button/link-name, image-alt, ARIA and scroll-region rules passed. Dark mobile and light desktop screenshots were visually reviewed. No-JavaScript contents and citation navigation passed. Related results excluded a draft, duplicates, and the current article; the draft sentinel was absent from generated HTML/sitemap.

Negative checks verified duplicate reference keys fail schema validation, missing related IDs raise a specific authoring error, missing image alt raises a specific rendering error and prevents figure output, and broken citation fragments fail the generated-output checker. The latter also checks duplicate rendered IDs and local HTML fragment targets.

All temporary articles and the negative-test page were removed. The final production build and check:build passed for 14 pages, including fragment integrity; no temporary article/topic remained. Existing public articles passed collapsed contents, focus, permalink, empty-state, theme and overflow checks at 390/1440 pixels; native contents also worked with JavaScript disabled. This verifies publishing infrastructure, not a scientific review of the existing trial text. Search/RSS remain Phase 4; workflow permissions remain deferred to Phase 7.


### Phase 4 verification — 2026-10-20

Pagefind 1.5.2 now runs after Astro through npm run build; the deployment workflow already invokes that command. The five-article experiment, costs, alternatives and official sources are recorded in [the discovery design note](../../../docs/search-and-rss.md). Search indexes rendered published article bodies, excluding menus, related tools, live islands and duplicate KaTeX markup. Scientific prose and code are searchable; symbolic formula semantics are not claimed. The dedicated search page uses native navigation, a labeled bookmarkable query form, live status, highlighted excerpts, ten-result batches, no-results, retry and topic fallback. The engine loads only for a nonempty submitted query. RSS is summary-only, with stable absolute permalinks, publication dates, topic labels, escaped XML, head discovery and footer access.

Chromium checks passed at 320, 390, 768 and 1440 pixels in both themes, with no page overflow. Known title/body queries, exact phrase and absent queries, URL restoration, keyboard submission/result navigation and Escape clearing passed. With JavaScript disabled, topic browsing remained usable. Selected axe contrast, labels, button/link names, ARIA and scrolling rules passed. Representative mobile dark/light screenshots were visually reviewed. These checks are not a manual screen-reader audit.

A temporary set of 11 published fixtures checked pagination and focus on the first newly loaded result, literal code search, exclusion of duplicated rendered formulas, and XML escaping/Unicode roundtrips. A temporary draft in an otherwise empty category had no route/category/listing/related/search/feed/sitemap presence. The RSS parsed with Python ElementTree and its dates/GUIDs matched the expected articles. A blocked engine recovered on form resubmission. A blocked result fragment exposed Pagefind's cached rejection; the implementation now destroys the failed engine before retry and that recovery passed independently.

Fixtures were removed before the final 15-page build. npm run build, npm run check:build, final search/feed smoke, vendored schemas, LifeOS reader validation, mirrored instructions, relative documentation links and whitespace checks passed. The output checker now requires a generated search runtime, compares indexed article counts, checks exact RSS article membership/dates, and checks feed autodiscovery. The dependency lock's Pagefind-only changes passed npm ci --dry-run; pre-existing unrelated lockfile edits remain unstaged. Phase 5 demo reliability/performance is next. Workflow permissions and automatic check:build CI invocation remain deferred to Phase 7.


### Phase 5 verification — 2026-10-20

The measured Plotly baseline, replacement decision, budgets, model conventions and limits are recorded in [interactive demo architecture](../../../docs/interactive-demos.md). The four published teaching examples now use build-time SVG reference figures and explicit on-demand React controls sharing pure analytical models/chart specifications. Every reference carries parameters, units, calculated provenance and observations. No Plotly bundle is emitted; the old wrapper and unvalidated mode-profile fixture remain unpublished. The compact SVG renderer deliberately omits Plotly zoom/hover inspection.

The initial controller is approximately 1.6 KB gzip; activated per-article JS is about 66.6–66.8 KB encoded versus about 1.526 MB in the previous eager implementation. All emitted application JS totals 210898 decoded / 69895 gzip bytes, below the conservative 250 KiB decoded / 80 KiB gzip cap. Demo HTML remains below 32 KiB gzip each. The direct 512-point DFT p95 was about 8 ms across 30 local runs against a 50 ms ceiling. The measurements are local ARM64/Chromium observations, not mobile field guarantees; docs distinguish response-body bytes, headers, decoded size and timing start points.

Independent identities verify uniform-array closed form, nulls, sidelobes, long broadside-array half-power width and visible grating orders; transmission-line match/short/reactive/analytic-open cases; Gaussian waist/Rayleigh/symmetry and finite endpoints; DFT zero/DC/Nyquist/coherent amplitude and off-bin distant leakage. Corrected public text addresses short-circuit quarter-wave behavior, array sidelobe/beamwidth and endfire ambiguity, Gaussian model scope/radius conventions, and window amplitude/scalloping limits, with typed assumptions and primary references. The phase slider now uses integer degrees so zero and ±180° are reachable without step drift. Trial-article disposition and comprehensive editorial review remain Phase 6.

Chromium checked all four demos in dark/light at 320, 390, 768 and 1440 pixels: static/reference/live states, keyboard loading/focus, range endpoints, window buttons, invalid steering, true infinite VSWR, high-divergence warning, state/path preservation across theme changes, local chart scrolling and no horizontal page overflow. Actual viewport resizing retained values/paths. Exact phase endpoints and opposite-endfire ambiguity passed. Ordinary Writing/About/ML/Search pages requested no demo/React assets. Representative mobile light and desktop dark frames were visually reviewed; selected axe contrast/labels/button/link/image/ARIA/scroll-region rules passed. This is not a manual screen-reader or comprehensive browser audit.

JavaScript-disabled pages retained figures/parameters/observations with hidden inactive controls. Blocked controller and demo imports, offline activation, a deliberately throwing React component, 15-second stalled import and late completion all preserved readable references. A transient import failure recovered on retry. Root unmounting and generation guards prevent stale async mounts; native SVG needs no plot/theme/resize cleanup. No scientific fixture was retained or published.

The final production build, check:build and check:demos passed for 15 pages, five published search documents and five feed entries. README, script guidance and architecture match the actual activation/static paths. Vendored-schema, LifeOS ledger-reader/projection, mirrored-instruction, documentation-link and whitespace checks passed. Phase 6 author context/content decisions is next. Phase 7 retains owner-deferred workflow permissions, now scheduling both output and demo checks before deployment artifact upload. No workflow or LifeOS repository file was modified.


### Phase 6 author/publication preparation — 2026-10-20

Phase 6 is active, not complete. The owner authorized continuing implementation. A conservative About page is implemented from already stated interests and intent. The owner has been asked for public name, education/current role, concrete projects/tools, email confirmation, the disposition of the five trial articles, and the first real article/topic with available evidence. No answers or editorial approval are inferred from silence. CV publication and Phase 7 workflow permissions remain deferred.

#### Author facts and source boundaries

The originating owner message confirms breadth across antennas, RF, optics, DSP and ML; developing depth rather than claiming vertical expertise; a content-first scientific/technical blog; and interest in agentic programming both as engineering assistance and within integrated circuit design using open-source tools. About expresses these as interests and intentions. It does not publish research-folder notes or introduce new categories.

The existing site handle FraH90 and GitHub profile/source links are retained. The existing public email frah.221190@gmail.com is retained pending explicit confirmation; a valid mailto link does not verify mailbox ownership or delivery. The GitHub profile and website repository returned HTTP 200. The former biography's professional/background claims and proficiency list (including HFSS/CST, VNA measurements, PyTorch and other tools) were not confirmed by the owner and are omitted. No education, employer, years of experience, project outcome or personal name is guessed.

About now has a readable introduction, three connected-interest sections, published-only topic links, two eligible analytical teaching examples, source access and existing contact links. It calls agentic IC design an exploration and avoids turning trial articles into professional-project evidence. It retains CV gating: no PDF link appears without the asset.

#### Trial-content decision inventory

This is the owner-decision record within the existing roadmap, not a separate implementation task list. All five entries currently retain draft: false and their existing 2026-05-10 date; neither their status nor date is an approval or a verified publication history. All original article URLs remain unchanged.

| Collection ID | Available evidence and current limits | Owner decision |
| --- | --- | --- |
| antennas/phased-array-basics | Uniform isotropic-element analytical array factor; static/live figures and independent steering/null/grating/sidelobe checks. No coupled-element or hardware experiment. Targeted Phase 5 text corrections. | Pending: retain/develop, replace, or retire. |
| rf/transmission-line-theory | Lossless-line equations, static/live voltage-envelope model and match/short/reactive/ideal-open checks. No measured line/VNA data. Targeted Phase 5 text corrections. | Pending: retain/develop, replace, or retire. |
| optics/gaussian-beam-intuition | Ideal free-space paraxial Gaussian model with waist/Rayleigh checks, stated radius conventions and a high-divergence warning. No experimental beam or fiber-coupling result. | Pending: retain/develop, replace, or retire. |
| dsp/spectral-leakage | Analytical sine signals and 512-point DFT; window/DC/Nyquist/coherent-amplitude/leakage checks. No acquired signal dataset or instrument experiment. | Pending: retain/develop, replace, or retire. |
| ml/ml-for-signal-data | Prose advice without attached dataset, implementation, comparative metrics or sources. Broad recommendations have not been reviewed as an empirical result. | Pending: substantiate/reframe, replace, or retire. |

The choices presented to the owner are keeping clearly labeled examples while selecting a real article separately, developing them into publishable tutorials, or retiring public listings while preserving source. No choice is selected automatically. A retirement decision would need deliberate handling of existing inbound URLs and shared discovery eligibility; no redirect or route deletion is made here.

#### First approved article: inputs still needed

The owner has been asked to choose a real question/project and identify available code, figures, simulations or measurements. Its article kind must reflect the evidence: analytical tutorial, numerical exploration, simulation, measurement or project report. Existing model/code checks could support an analytical tutorial if selected; they cannot establish measured engineering performance. No topic is silently selected, no new public article is invented, and p6-3 remains open for that collaboration.

#### Verification of the delivered About slice

Production build and generated-output checks passed, preserving 15 pages, five search documents and five RSS entries; the independent demo/model/payload checks also passed. Chromium checked About at 320, 390, 768 and 1440 pixels in dark/light, with no page overflow. Active navigation, skip-link focus, keyboard reading navigation, populated topic links, eligible article examples, contact URLs and absent-CV behavior passed. Selected axe contrast, headings, labels, button/link/image-name and ARIA rules passed. JavaScript-disabled topic navigation passed. An isolated build temporarily marked the two featured examples as drafts: About omitted their links, their otherwise empty topic destinations and the empty examples panel. The original source bytes/statuses were restored before the final build. Representative desktop/mobile screenshots were visually reviewed. No manual screen-reader or email-delivery test is claimed.

README, architecture and editorial guidance match the conservative profile. Schema/ledger-reader/projection, relative documentation-link, mirrored-instruction and whitespace checks passed. The About implementation slice is complete, while author facts, final article dispositions, the first owner-approved article and final Phase 6 acceptance remain open. No workflow or LifeOS repository file was modified.


### Owner profile/demo decisions and phased-array direction — 2026-10-20

The owner's complete words are preserved in [the phased-array article idea](../../ideas/i-261020-04-research-oriented-phased-array-article/i-261020-04-research-oriented-phased-array-article.md). These decisions supersede the earlier pending questions: retain the FraH90 handle without adding a personal name; state electronic engineer; omit public contacts; keep the five original articles and label them Demo. The earlier inventory remains historical provenance; every row now has the same explicit retain-as-demo disposition. No full scientific-review certification is implied.

About now states the confirmed background and removes its contact panel/email. The footer's profile contact link is removed; links to the source repository remain code provenance. Both working contracts record the profile/privacy and demo decisions so future agents do not restore contacts or ask for the declined name. CV publication remains deferred.

A typed demo boolean, default false, is distinct from draft eligibility. Each original MDX article explicitly sets demo:true. Shared article-status text labels public cards, article headers/notices and metadata, related cards, search results, and RSS title/description/category. Existing URLs, feed GUIDs, publication dates and the publication helper are preserved. Demo:false does not certify review; draft:true still excludes every publication surface. New authoring guidance documents the distinction.

The first substantive article will be written by the owner and will concern phased arrays at greater depth. The linked idea proposes a bandwidth/aperture study of beam squint: a stated directional-loss requirement, fixed-phase steering versus ideal true-time delay, explicit physical spacing and angle conventions, and three research figures. It links an Analog Devices technical explanation and Cai et al.'s research paper as starting points. This is an elaborated suggestion, not an accepted subtopic, completed simulation, manuscript, novelty claim, or automatic publication. No article is generated or scheduled for an invented deadline. Phase 6 remains active until the owner-written article and its evidence are available and approved.

Production build/check:build/check:demos passed for the clean 15-page/five-article output. Chromium checked 320/1440px and both themes: confirmed background, no contact links, five public demo labels in listing/topic/article/related/search views, metadata, no overflow, selected axe rules and no-JavaScript labels/navigation. The original broadside array and other demo behavior is unchanged. RSS XML retains five items with stable links/GUIDs and explicit Demo titles/categories. An isolated ordinary article had no demo notice/status/RSS category; a draft demo had no route/listing/related/feed/sitemap presence. Fixtures were removed before the final build. Vendored schemas, LifeOS reader/projection, instruction equality, relative documentation links and whitespace checks passed. No workflow or LifeOS source file was modified.
