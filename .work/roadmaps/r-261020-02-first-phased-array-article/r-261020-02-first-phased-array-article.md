# First substantive phased-array article

<!-- ledger-template: roadmap.v2 -->

## Original thought

<!-- roadmap-original-thought:start -->
Ok. Reminds me this. But the roadmap has been finished? We need to close it. Then the first article.
<!-- roadmap-original-thought:end -->

## Goal

Turn the saved beam-squint writing brief into an owner-written, reproducible phased-array study and publish it after scientific and editorial review.

## Context and rationale

The owner has closed [website foundation](../r-261020-01-scientific-blog-foundation/r-261020-01-scientific-blog-foundation.md) and made the first article the priority. This replaces unfinished foundation item r-261020-01-scientific-blog-foundation-p6-3; first-manuscript validation is carried here as well.

## Research and evidence

The [saved writing brief](../../ideas/i-261020-04-research-oriented-phased-array-article/i-261020-04-research-oriented-phased-array-article.md) contains the proposed bandwidth/aperture study, three scientific figures, primary reading and explicit limitations. It is a brief, not an experiment or completed article.

## Decisions and trade-offs

The owner writes the article; no manuscript, measurements, code results or publication approval are invented. The beam-squint study is the working direction after the owner’s “Ok”; scope can be refined while writing. No new deadline or notification time is inferred from “tomorrow or this week.”

## Delivery plan

<!-- ledger-phases:start -->
**Success metrics:**
- A focused question about directional-response loss versus bandwidth, aperture and scan angle.
- Reproducible figures and independent checks support the conclusions; no invented measurements or novelty claims.
- One owner-approved substantive article is published with correct labels, date, references and discovery outputs.

**Stop if:**
- Re-scope if the first article expands into an unmanageable multi-effect hardware study.
- Do not publish unsupported numerical/physical claims or a manuscript the owner has not approved.

### Phase 0 — Owner-requested visual corrections before writing

**Status:** done · **ID:** `r-261020-02-first-phased-array-article-p0`

**Useful alone:** Articles regain the owner-preferred palette, aligned reading layout and immediately available demos.

**Done when:** Palette, contents, prose width and plot sizing are corrected; automatic demos and fallback behavior pass browser checks.

**Depends on:** none

- ✅ **done** · **build** — Restore neutral zinc dark colors, simplify collapsed Contents, align article prose with applets, and reduce scaled chart height/labels.
  - ID `r-261020-02-first-phased-array-article-p0-1` · closed 2026-10-21 · commits `bdb6326bfc5d4dd10b6ca76ad1f7a2b9c7c04ac6`
  - Evidence (document): src/styles/global.css; src/components/article/TableOfContents.astro; shared chart geometry and article layout. Desktop/mobile screenshots inspected in dark and light themes.
- ✅ **done** · **build** — Automatically mount all four demos on article entry without a load gate or focus jump, preserving static no-JavaScript/error alternatives; document the owner correction.
  - ID `r-261020-02-first-phased-array-article-p0-2` · closed 2026-10-21 · commits `bdb6326bfc5d4dd10b6ca76ad1f7a2b9c7c04ac6`
  - Evidence (measurement): Production build, output checks, numerical identities and payload budget pass. Browser matrix: four demos × 1440/390px × dark/light; automatic controls, aligned prose, no page overflow/focus theft, keyboard disclosure/control endpoints and axe WCAG A/AA pass. No-JavaScript and blocked-module fallback checked. Application JS 210521 decoded / 69785 gzip bytes; controller 1479 gzip bytes.
  - Evidence (document): docs/interactive-demos.md records the 2026-10-21 browser matrix and failure checks: blocked controller/module, simulated render failure, timeout/late completion and theme persistence. Local Chromium only; no owner visual approval or universal-device claim.
- ✅ **done** · **build** — Center displayed equations across articles; correct same-line double-dollar delimiters, preserve inline math and readable local overflow, and document the authoring convention.
  - ID `r-261020-02-first-phased-array-article-p0-3` · closed 2026-10-21 · commits `3c25ea324650641bd9ab7c361325cd5073f52130`
  - Evidence (measurement): Build and output checks pass. All eight existing equations render as KaTeX display blocks across four articles. Local Chromium verifies geometric centering at 1440/390px in dark/light themes, inline math preservation, no page overflow, no-JavaScript rendering and keyboard scrolling of a simulated wide equation. Desktop screenshot inspected.
- ✅ **done** · **build** — Center article tables as blocks while retaining author-controlled cell alignment and local horizontal scrolling.
  - ID `r-261020-02-first-phased-array-article-p0-4` · closed 2026-10-21 · commits `d54e3a734c28b25d0569a89ca37da5bbdad4f1fe`
  - Evidence (measurement): Build/output checks pass. Local Chromium verifies both table-bearing articles at 1440/390px in dark/light and no-JavaScript mode: centered bounds, semantic headers, no page overflow. Simulated wide tables remain keyboard-scrollable. Desktop table screenshot inspected.
- ✅ **done** · **build** — Remove appended permalink symbols beside section headings while retaining native section IDs and Contents navigation.
  - ID `r-261020-02-first-phased-array-article-p0-5` · closed 2026-10-21 · commits `c69db129ff31e41ecf200067d49e5a002fc89ce7`
  - Evidence (measurement): Build and output checks pass. Local Chromium at 1440/390px in dark/light and JavaScript/no-JavaScript modes verifies plain heading text, absent appended symbols and keyboard Contents navigation to the preserved focusable heading ID.
- ✅ **done** · **build** — Replace the persistent demo explanation box with a transient tooltip on the article Demo badge, preserving discovery metadata and accessible interaction.
  - ID `r-261020-02-first-phased-array-article-p0-6` · closed 2026-10-21 · commits `d873ec396e296cda0cf16cbb2ea17876119a6c6a`
  - Evidence (measurement): Build/output checks pass, including retained Demo metadata and no persistent notice. Local Chromium verifies all five articles at 1440/390/320px in both themes: initially hidden explanation, hover/focus reveal, hoverable tooltip, Escape dismissal and on-screen bounds. Touch reveal/outside-tap dismissal also pass with and without JavaScript; no-JavaScript Escape dismissal is not implemented.
- ✅ **done** · **build** — Provide a temporary HTTPS-accessible visual comparison of the original and current phased-array demos and complete article pages.
  - ID `r-261020-02-first-phased-array-article-p0-7` · closed 2026-10-21 · commits `9671bb7bcb8ff0b25066fdc43d53d29d5825ba81`
  - Evidence (measurement): Temporary /design-review/ route uses rendered screenshots at equal 1024px demo widths (original components from 22a1c85, current from b8a8a3e). Production build/output checks pass for 16 pages. Local Chromium checks desktop/mobile, both themes, JS/no-JS, keyboard view switching, image decoding, no page overflow and noindex metadata. Route excluded from sitemap, search and RSS; normal article remains unchanged.
- ✅ **done** · **build** — Restore the original compact Plotly presentation across all four public demos, add working axis titles, retain numerical corrections and static fallbacks, and remove the completed comparison preview.
  - ID `r-261020-02-first-phased-array-article-p0-8` · closed 2026-10-21 · commits `e38cc7adbc6825c911e1f1172ee3d135b83f8bab`
  - Evidence (decision): Owner: “I prefer the old version. A lot. A fucking lot. Only thing it misses: the Theta and module of AF on axis. Only things. For all demos… return to the old plot shit.. only add the names on axis if missing”. This supersedes live-SVG presentation decisions; original numerical errors are not reintroduced.
  - Evidence (measurement): Production build, 15-page output checks, numerical identities and explicit restored-Plotly budget pass. Total JS 5016587 decoded / 1531105 gzip bytes; controller 1559 gzip bytes. Local Chromium covers four demos × 1440/390px × dark/light: all axis titles, original 384px/192px/256px heights, Fourier bars, compact live content, slider endpoints, no page overflow/focus jump or browser errors. Separate no-JS/import/render/timeout fallback checks pass; default screenshots inspected, axis title bounds, live theme update and mobile resize pass.
- ✅ **done** · **build** — Improve phone array plot geometry: remove the redundant title, place |AF| horizontally above the y-axis, narrow padding/margins, and prevent accidental touch zoom.
  - ID `r-261020-02-first-phased-array-article-p0-9` · closed 2026-10-21 · commits `4c485f36ede4df000210a94409f7eef40964a200`
  - Evidence (measurement): Production build, output/model/payload checks pass. Local Chromium at 320/390/430/1440px in both themes verifies horizontal labels within bounds, no chart/rotated y title, >78% of chart width used by plotting area, 288px phone/384px desktop heights, keyboard dB toggle, correct fixed linear/dB ranges, no page overflow, and no-JavaScript/import-failure fallback. Phone screenshots inspected. Physical iPhone Safari was not tested.
- ✅ **done** · **build** — Apply the compact phone layout to every live demo plot: horizontal y labels, hidden y-zero text, no redundant titles, tighter margins/padding and locked gestures.
  - ID `r-261020-02-first-phased-array-article-p0-10` · closed 2026-10-21 · commits `8b64fb5ff7835f9649aec674d0c27c145fbcd128`
  - Evidence (measurement): Build, 15-page output checks, numerical identities and payload budget pass (5017144 decoded / 1531379 gzip JS bytes). Local Chromium verifies five plots across four articles at 320/390/1440px in both themes: no chart/vertical y titles or y-zero text, axis/annotation bounds, >70% horizontal plotting area, keyboard control endpoints/dB ranges, Fourier bars, no overflow, all no-JS and blocked-engine fallbacks. Default screenshots inspected. Mixed extreme Gaussian controls retain signed tick bounds; live theme update passes. Physical iPhone Safari not tested.
- ✅ **done** · **build** — Remove archive intro/count, move topics and magnifying-glass search into a collapsible right panel, lowercase public branding, and restore the earlier compact About structure.
  - ID `r-261020-02-first-phased-array-article-p0-11` · closed 2026-10-27
  - Evidence (measurement): Production build and output/model/payload checks pass (15 pages; existing article/discovery boundaries preserved). Local Chromium verifies 320/390/1440px in dark/light: panel bounds, keyboard toggle/Escape/outside close, topic link/current states, search GET query/results, axe WCAG A/AA and no page overflow. No-JavaScript topic browsing passes. Short landscape and blocked-search-engine fallback checked. About restores the six pre-roadmap subject/tool groups as interests; confirmed engineer background, contact omission and gated CV remain. Social SVG/PNG and shared name are lowercase.

### Phase 1 — Owner manuscript and reproducible evidence

**Status:** active · **ID:** `r-261020-02-first-phased-array-article-p1`

**Useful alone:** A bounded research question and inspectable manuscript/code/figure package can be reviewed before publication.

**Done when:** The owner provides a manuscript plus code/figures or explicitly scoped analytical evidence for the agreed study.

**Depends on:** `r-261020-02-first-phased-array-article-p0`

- ✅ **done** · **decision** — Carry forward the saved beam-squint brief and record the owner’s instruction to close website setup and focus on the first article.
  - ID `r-261020-02-first-phased-array-article-p1-1` · closed 2026-10-20 · commits `cc8bb91fa531416c68287a5708ddbf6886d77e1d`
  - Evidence (decision): The owner said “Ok” to the proposal, asked to keep it as a reminder, and requested closing the foundation roadmap before the first article. The existing idea contains the central question, suggested sweep, three figures, sources and model limits. No manuscript or results are claimed.
- ⬜ **todo** · **build** — Owner writes the phased-array manuscript and provides reproducible code/figures; use the saved beam-squint brief as the working direction, with scope refined by the owner.
  - ID `r-261020-02-first-phased-array-article-p1-2`

### Phase 2 — Scientific review and publication

**Status:** todo · **ID:** `r-261020-02-first-phased-array-article-p2`

**Useful alone:** The completed article can be read, checked and followed through the site.

**Done when:** Claims/model/evidence pass review, the owner approves the final article, and production/draft/discovery/browser checks pass before publication.

**Depends on:** `r-261020-02-first-phased-array-article-p1`

- ⬜ **todo** · **validation** — Review angle/phase conventions, normalization, fixed physical spacing, visible solutions, numerical identities, scientific captions, references and model limits against the actual manuscript/evidence.
  - ID `r-261020-02-first-phased-array-article-p2-1`
- ⬜ **todo** · **build** — With owner approval, prepare final MDX and a genuine publication date; verify figures, math, mobile/desktop, keyboard, themes, draft exclusion and search/RSS/related/sitemap, then publish.
  - ID `r-261020-02-first-phased-array-article-p2-2`
<!-- ledger-phases:end -->

## Risks

A broad phased-array survey would lose the concrete research question. Model assumptions, normalization, angle conventions and reproduced evidence must remain inspectable; ideal array-factor calculations are not realized hardware gain measurements.

## Open questions

When will the owner provide the first manuscript and its code/figures?

A notification time/timezone has not been supplied; no timed reminder has been scheduled.

## Working notes

This is the only primary roadmap. The foundation roadmap remains closed. [Workflow permissions/checks](../r-261020-03-deployment-checks/r-261020-03-deployment-checks.md) remain separately paused under the owner’s earlier deferral. The brief is saved as a persistent reminder; no timed notification has been created.

### Owner visual feedback — 2026-10-21

The owner explicitly reprioritized visual repairs before writing. This is a new corrective phase on the active article roadmap; the historical foundation closure remains intact. No article or deployment-permission work is claimed complete.

> Before writing the article we need to fix lot of shit
> - i dont fukcing like the palette of the dark mode. It's fucking hugly! I prefer the old palette
> - the toc is fucking ugly! THos fuckin 3 lines.. but the toc itself also is ugly!
> - I dont want the "load interactive demo" shit. it must be loaded directly when we open page, as before! Moreover im ok with horizontal size.. but vertical size, u change it? the size of applet. i dunno.. i dont lkike it a lot now. was better before
> - I'm ok with the size horizontal of the apllet.. but writing? it's fucking shit. It's impaginated veyr very bad. Maybe same size as horizontal as the applet? Woudl be better?
>
> I dunno, i handed to u this shit to improove the design.. but u made it even more shitty for some stuff

### Equation alignment correction — 2026-10-21

Owner request: “The formulas.. must ALWAYS appear at the center. I dunno if it's something relative on how we write the article in mdx file or how we render it”

The eight standalone formulas were written as same-line `$$formula$$`, which remark-math treated as inline math. They now use separate-line display fences, and the shared stylesheet explicitly centers display math. Inline formulas remain in prose. Wide displays retain local scrolling with their left edge reachable. The authoring guide and both project contracts record this convention.

### Table alignment correction — 2026-10-21

Owner request: “Also tables should be centered”. Shared article CSS now gives compact tables intrinsic width and automatic horizontal margins, capped at the article width so wide tables retain local scrolling. Cell alignment and semantic markup remain intact; authoring instructions record the default.

### Heading symbol removal — 2026-10-21

Owner request: “The asterisc at the right of the title.. of a topic. i dont like it”. This was the script-appended `#` permalink beside article section headings. Removed that enhancement and its styles; heading IDs and Contents links remain. Both project contracts and authoring/architecture guidance record the preference.

### Transient Demo explanation — 2026-10-21

Owner request: “Remove the box/line Demo article used to demonstrate this site’s features. It is not a reviewed research publication.
Just make appear that shit when we hoover the label "demo", appear somewhere.. but temporary only on hoveer when we hoover..”

Removed the persistent article notice and attached its existing text to the Demo badge as a tooltip. Hover/focus reveals it, Escape dismisses it, and touch focus/outside tap provides phone access. Native CSS hover/focus works without scripts. Listings, search and RSS retain explicit Demo status; this correction changes the article explanation presentation only.

### Accessible design comparison — 2026-10-21

Owner asked for both versions rendered, then reported that local file/image links were not accessible in the chat interface. A temporary public `/design-review/` page provides side-by-side screenshots and a full-page view switch. The older demo was restored in an isolated temporary checkout; the article text and surrounding layout are identical in both renders. Images are visual previews, not live controls. The comparison is noindex, unlinked from site navigation and absent from discovery outputs. Remove the route, screenshot assets and sitemap exclusion once the owner chooses a direction. No visual direction has yet been approved.

### Owner chooses the original demos — 2026-10-21

Original words: “I prefer the old version. A lot. A fucking lot. Only thing it misses: the Theta and module of AF on axis. Only things. For all demos… return to the old plot shit.. only add the names on axis if missing”.

Restored the compact Plotly control/layout design from 22a1c85 for all four public demos, including thin sliders, small monospace rows, original trace types and fixed heights. Axis title strings are normalized to the installed Plotly object syntax. Verified shared models preserve corrected physics/numerics (including true infinite VSWR, spectrum normalization and broadside HPBW coefficient); the live boxes lose the added narrative and SVG legends. Static reference plots stay available without scripts or after errors. Loading completes only after all Plotly charts draw.

The owner’s renderer preference explicitly replaces the SVG payload policy: Plotly is a shared engine capped at 5 MiB decoded/1600 KiB gzip, complete application JS at 6 MiB/1800 KiB. No new application dependency was installed. The comparison route, screenshot assets, noindex option and temporary sitemap exception are removed after the decision. Historical delivery evidence remains intact.

### Phone array plot correction — 2026-10-21

Owner screenshot showed a narrow, tall array plot with a long vertical label and unused negative amplitude range. Owner asked: “Maybe remove the fucking array factor label put only the module af shit but try to put it on the y axis, I mean not written vertically but normally horizontally. On the axis. So we can take the rest of space w plot”.

The array chart now omits its title, labels the y-axis horizontally with `|AF|` (or `|AF| (dB)`), uses explicit narrow margins and phone padding, and renders at 288px on phones while retaining 384px on larger screens. Fixed axis ranges prevent touch drag zoom from adding unused negative linear amplitude space. Other demos retain the restored layout. Browser verification uses Chromium viewport emulation; no physical iOS Safari verification is claimed.

### Shared compact plot treatment — 2026-10-21

Owner: “Having two zero is ugly. Delete the y axis one. And maybe u can move the plot a lil bit to left, there’s that empty space…. Maybe we could enlarge it?
Do them all the modifications for all plots in all articles”.

The shared Plotly wrapper now applies horizontal y-axis labels, suppresses redundant visible titles, locks axis gestures and hides only y-zero tick text using label aliases. Every live demo frame gets narrow phone padding. Array left margin moves to 26px; transmission uses 30px; other charts use 36px for signed/longer ticks. Standard phone plots are 288px, desktop 384px; Fourier retains its 192/256px panels and bars. Transmission voltage range remains physically bounded at 0–2 and Fourier spectrum remains nonnegative even at zero input. Semantic names/units, data and gridlines remain. This supersedes the earlier array-only scope.

### Archive, panel and About correction — 2026-10-27

Owner request:

> Remove the "writing", bla bla bla, and about the author. Not needed. The topic selector.. make it a side panel, on the right for now (we'lll see if on the left), collapsible.. with nice ui. In that panel it also go the search shit, in the form of a ingrandimento lens, that now is on top bar (wrong position yeah)
> Not needed the counter "5 articles"
> The frah90 shit im undecided if to keep it that way or name the blog another way, but we'll see. for now put it all in minuscolo, not FraH90, everything lowercase
> And the "about" section.. i preferred the version before the codex modificatons in the about section.. i preferred the previous version yeah

The archive begins with cards; topic routes retain their contextual heading. A global native-details panel appears on the right with a search field/lens submit and populated topic links. It is nonmodal, collapsed initially, and supports native no-JavaScript browsing; small enhancements provide Escape, outside click and a close button. The Search route remains functional but is removed from main navigation. Shared name and social card now use frah90.

About restores the compact introduction and six-group structure from 22a1c85. Original contact links and unconfirmed professional/skills assertions are not republished: the owner-confirmed electronic-engineer background and privacy choices remain, and subjects/tools are framed as interests for study. This is structural restoration rather than a verbatim rollback of those claims. No new public name or proficiency is inferred.
