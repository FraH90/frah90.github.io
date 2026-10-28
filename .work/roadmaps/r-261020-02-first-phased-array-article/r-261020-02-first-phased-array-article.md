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
  - ID `r-261020-02-first-phased-array-article-p0-11` · closed 2026-10-27 · commits `11a7d8181e880d17414176092ed80d18197e0ee4`
  - Evidence (measurement): Production build and output/model/payload checks pass (15 pages; existing article/discovery boundaries preserved). Local Chromium verifies 320/390/1440px in dark/light: panel bounds, keyboard toggle/Escape/outside close, topic link/current states, search GET query/results, axe WCAG A/AA and no page overflow. No-JavaScript topic browsing passes. Short landscape and blocked-search-engine fallback checked. About restores the six pre-roadmap subject/tool groups as interests; confirmed engineer background, contact omission and gated CV remain. Social SVG/PNG and shared name are lowercase.

### Phase 2 — Design refinement before article publication

**Status:** active · **ID:** `r-261020-02-first-phased-array-article-design`

**Useful alone:** A slim animated navigation and an inspectable editorial grid improve the existing site before new articles are published.

**Done when:** The owner has reviewed the visual direction and agreed the grid/article presentation, with appropriate browser checks passing.

**Depends on:** `r-261020-02-first-phased-array-article-p0`

- ✅ **done** · **build** — Slim the header, replace boxed controls with icons, implement animated right drawer, remove repeated article CTAs and deliver an interim editorial grid with design references.
  - ID `r-261020-02-first-phased-array-article-design-1` · closed 2026-10-28 · commits `62ef3ca94175b3dcdcb4ad4dc331d7fe23d66e88`
  - Evidence (measurement): Production build/output/model/payload checks pass. Local Chromium at 320/390/1440px in both themes verifies 53px total header, icon-only controls, CTA removal, divider-based two-column grid, drawer bounds/focus/Escape/backdrop/search and axe WCAG A/AA. In-flight transform proves slide animation; reduced motion, no-JavaScript disclosure, unsupported-dialog fallback and short-landscape navigation pass. Screenshots inspected. No animation dependency added; physical Safari not tested.
  - Evidence (document): docs/design-direction.md records the current pass and primary reference links: Medium engineering feed, Distill, Bartosz Ciechanowski and Stripe Blog. The grid is explicitly interim, not owner-approved final design.
  - Evidence (measurement): Final interaction review additionally verifies Escape from a populated search input, pointer-driven open/close without changing page scroll, and icon theme persistence after reload. Escape is captured before the browser search-input clear action.
- ⬜ **todo** · **decision** — Review reference sites and agree the remaining grid/article visual direction with the owner before publishing substantive articles.
  - ID `r-261020-02-first-phased-array-article-design-2`
- ✅ **done** · **build** — Replace opening model-assumption callouts with closing Key takeaways and move article Contents into a collapsible left PDF-style outline.
  - ID `r-261020-02-first-phased-array-article-design-3` · closed 2026-10-28 · commits `621e4acdc05facc3cf4de08ff8f666bbc15c6ba3`
  - Evidence (measurement): Production build, 15-page route/discovery checks, numerical model checks and payload budget pass (5017406 decoded / 1531505 gzip JS bytes). Local Chromium verifies all five articles at 320/390/1024/1440px in dark/light: removed assumptions boxes, closing takeaways, left outline geometry, section jumps/focus, desktop reserved space, phone dismissal, no overflow and axe WCAG A/AA. Desktop/phone screenshots inspected. All four live demos resize without overflow when the outline opens; section highlighting, Escape from reading content, independent right dialog and reduced motion pass. Blocked-Plotly static fallback and outline selection pass. Physical Safari not tested.
  - Evidence (document): docs/article-authoring.md, docs/templates/article.mdx and mirrored AGENTS.md/CLAUDE.md document takeaways metadata and left-outline behavior. Scientific model context remains in prose. The final grid/article visual-review decision remains open.
  - Evidence (measurement): No-JavaScript phone/desktop review verifies native disclosure, section fragment links, closing summary and no page overflow. Without scripts the phone outline is closed manually through its summary.
- ✅ **done** · **build** — Remove the article-end All writing link and slim the shared footer; measure reference typography and record unresolved layout/settings options.
  - ID `r-261020-02-first-phased-array-article-design-4` · closed 2026-10-28 · commits `524cbf0849f63d04e18956e7732178448acb391c`
  - Evidence (measurement): Production build and 15-page route/discovery/privacy checks pass. Local Chromium at 320/390/1440px in dark/light verifies absent All writing link, 61px footer, 12px labels, no horizontal overflow, keyboard About-to-RSS focus order and axe WCAG A/AA on the footer. Phone no-JavaScript About navigation passes; screenshot inspected. Physical Safari not tested.
  - Evidence (document): docs/layout-review.md records measured paragraph sizes, line heights and widths from nine reference sites at 1440px, with direct article sources; Analog Dialogue browser access was denied and is explicitly unmeasured. Width/font, Explore layer, edge controls and settings/dashboard remain recommendations for owner review.
- ✅ **done** · **build** — Trial an 880px shared article canvas with 18px/30px prose, centralized settings, paired animated header-edge panels and expandable applet widths.
  - ID `r-261020-02-first-phased-array-article-design-5` · closed 2026-10-28 · commits `57f86b305ee23d249492bdd2ae33f0a097e13573`
  - Evidence (measurement): Production build, 15-page route/discovery/privacy checks, independent numerical identities and payload budget pass (5018025 decoded / 1531712 gzip application JS bytes; demo controller 1767 gzip bytes). Local Chromium at 320/390/1024/1440/1920px in both themes verifies 880px maximum aligned canvas, 18px/30px prose, edge controls, modal phone versus nonmodal docked desktop behavior, reserved margins, mutual exclusion, Escape, focus containment, expansion/restore and axe WCAG A/AA. Screenshots inspected.
  - Evidence (measurement): All four live demos expand to 1280px when space permits and fit reserved-panel/phone widths without overflow; reduced motion and cross-breakpoint dialog mode switching pass. Mirrored in-flight slide, phone section-target focus, populated-search Escape, in-flight expansion overflow and keyboard restoration pass. Native no-JavaScript phone navigation and blocked Plotly static fallback pass. Physical Safari not tested.
  - Evidence (document): src/styles/settings.css is the central visual-default file. README, architecture, interactive-demo and authoring guides document the trial; mirrored AGENTS.md/CLAUDE.md record the owner decisions. docs/layout-review.md retains reference font/line-height measurements. Final owner visual approval remains open.
  - Evidence (measurement): Additional desktop no-JavaScript review confirms exclusive native disclosures and left/right reserved margins; mobile Explore GET search returns Pagefind results.
- ✅ **done** · **build** — Trial 25px prose line spacing, stable Explore hover motion, 1.5× expanded plot heights and shared outside-click layout restoration.
  - ID `r-261020-02-first-phased-array-article-design-6` · closed 2026-10-28 · commits `664b63f9fff7d32b46459fcbf681b0389c685b1c`
  - Evidence (measurement): Production build, 15-page output/discovery/privacy checks, independent numerical models and payload budget pass (5018096 decoded / 1531740 gzip application JS bytes; demo controller 1790 gzip bytes). Local Chromium checks four demos at 390/1440px in both themes: 25px line height, exact normal/1.5× expanded plot heights including both Fourier plots, bounded widths, functional keyboard sliders, inside-click preservation, gutter dismissal/restoration, left/right dialog dismissal, no page overflow and axe WCAG A/AA. Screenshots inspected.
  - Evidence (measurement): Combined panel and expanded plot reset together on background click; clicks inside either tool preserve both. Reduced motion, Escape from populated search, stable Explore link padding on hover, native no-JavaScript navigation, hidden unavailable expand button and blocked-Plotly static fallback pass. Physical Safari not tested.
  - Evidence (document): Mirrored AGENTS.md/CLAUDE.md and README/architecture/demo/layout guides record 18px/25px prose, centralized height presets/1.5× expansion and shared dismissal. The final design approval remains open.
- ✅ **done** · **build** — Use one proportional plot scale capped at 1.5×, fitted to browser viewport dimensions and available space with responsive panel/window updates.
  - ID `r-261020-02-first-phased-array-article-design-7` · closed 2026-10-28 · commits `5ddd9216a48ee11a826b19b987d8d2873493c359`
  - Evidence (measurement): Production build, 15-page output/discovery/privacy checks, independent demo models and payload budget pass (5019806 decoded / 1532439 gzip application JS bytes; controller 2479 gzip bytes). Pure fitting checks cover maximum, width/height limits, undersized space and zero dimensions. Local Chromium verifies all four demos at 390×844, 1024×768, 1280×800, 1440×900 and 1920×650 in both themes: matching expanded width/height ratios, factor between 1 and 1.5, short-window limits, no-room disabled controls, fit without overflow, panel-aware recalculation and slider preservation. Screenshots inspected; axe WCAG A/AA passes on representative expanded articles.
  - Evidence (measurement): Live window resizing across wide, short and phone viewports preserves chosen slider values and recalculates scale; reduced motion/Escape and outside restoration pass. No-JavaScript and blocked-engine static alternatives remain readable with unavailable expansion hidden. Physical Safari not tested.
  - Evidence (document): docs/responsive-plots.md explains the algorithm, reusable viewport helper, per-chart height budget and normal-size floor. Settings, README, architecture and mirrored instruction files record proportional fitting; final design approval remains open.
- ✅ **done** · **build** — Replace discontinuous debounced plot resizing with coalesced relayout, try 27px prose line spacing and hide internal reference keys.
  - ID `r-261020-02-first-phased-array-article-design-8` · closed 2026-10-28 · commits `f57a8bd1059b030f7ec0427b8ed688e15b615bed`
  - Evidence (measurement): Production build, 15-page output/discovery/privacy checks, independent models and payload budget pass (5020051 decoded / 1532575 gzip application JS bytes; controller 2483 gzip bytes). Local Chromium samples four demos/five plots in both themes through expansion/collapse: 8–19 distinct geometry redraws during each 420ms transition and final chart/container agreement within 1px. The coalesced relayout path replaces delayed Plots.resize; separate ease-in-out plot timing reduces abrupt initial movement. This is measured local Chromium behavior, not a 60fps or universal-device guarantee.
  - Evidence (measurement): 27px prose line height, hidden reference keys with retained ref-* IDs/descriptive links, keyboard sliders, panel resizing, phone resize, reduced motion and representative axe WCAG A/AA pass. Rapid reversal and theme change during resizing settle correctly without page errors. Viewport/short-window fit, slider persistence, no-JavaScript and blocked-engine static alternatives also pass. Reference screenshot inspected; physical Safari not tested.
  - Evidence (document): README, architecture, authoring and responsive-plot guidance document 18px/27px prose, hidden bibliography keys and serialized resize updates. Mirrored AGENTS.md/CLAUDE.md remain identical. Final owner design approval remains open.
- ✅ **done** · **build** — Replace public categories with multi-tag discovery, introduce media article cards and trial a latest-article showcase with a lightweight interactive scientific preview.
  - ID `r-261020-02-first-phased-array-article-design-9` · closed 2026-10-28 · commits `f002f8cd5a16928f369510b5484e1a961423bb0f`
  - Evidence (measurement): Production build, 33-page route/link/fragment/discovery/privacy checks, independent models and payload budget pass (5024317 decoded / 1534488 gzip application JS bytes; demo controller 2483 gzip bytes). A newer temporary draft with a unique misc tag was excluded from the feature, article/tag routes, discovery, RSS and sitemap; fixture was removed after review. All five original article URLs remain; old category indexes redirect and are absent from the sitemap. ML appears in both ML and DSP tag archives; RSS and Pagefind results carry multiple tags.
  - Evidence (measurement): Local Chromium at 320/390/1024/1440px in dark/light verifies feature plus four media cards, one/two/three-column layouts, multiple independently clickable tag badges, no nested links/overflow, keyboard steering/card/tag navigation, current-tag and Writing states and axe WCAG A/AA. No-JavaScript tag navigation and old-route redirects pass; search returns tagged results. Archive requests no Plotly/demo engine. Configurable square media also fits phone/desktop. Screenshots inspected; phone steering controls moved below the figure to avoid axis overlap. Physical Safari not tested.
  - Evidence (document): docs/tags-and-previews.md documents the taxonomy, compatibility field/redirects, model-derived and illustrative preview provenance, image/GIF/video schema, controlled motion and custom browser-safe renderers. The draft command seeds a registered broad tag and retains draft status; verified generated fixture removed. Typed GIF/video branches are implemented but playback with owner-supplied media assets has not been reviewed. Final feature/media shape approval remains open; latest-article/landscape are the stated initial trial.
- ✅ **done** · **build** — Prevent mobile right-drawer clipping caused by dialog scroll offsets during off-screen autofocus.
  - ID `r-261020-02-first-phased-array-article-design-10` · closed 2026-10-28 · commits `ad132946d24037769c1eda9b5b82ae677a5c84ce`
  - Evidence (measurement): Pre-fix Chromium reproduction records a native 320px dialog scrollLeft while the right drawer is initially translated off-screen. The fix uses overflow:clip on the wrapper and clears offsets after focus/before reveal. Production build and 33-page route/discovery/privacy checks pass.
  - Evidence (measurement): Local Chromium at 320/393/430/1440px in dark/light tests both panels through three open/close cycles each. Initial/forced wrapper scrollLeft/scrollTop stay zero; drawers/headings stay within viewport and right pane aligns to its right edge. Inner scrolling, populated-search Escape, focus restoration, backdrop dismissal, no page overflow and axe WCAG A/AA pass. Reduced-motion and no-JavaScript tag browsing pass. Phone screenshot inspected. A downloaded WebKit browser could launch but could not initialize a test page in this container; physical iPhone/WebKit verification remains outstanding.
  - Evidence (document): docs/architecture.md records the focus/scroll-container mechanism and targeted correction. No new visual direction, dependency or article content is introduced; final design review remains open.

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

**Depends on:** `r-261020-02-first-phased-array-article-p1`, `r-261020-02-first-phased-array-article-design`

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

### Slim header, animated drawer and ongoing design review — 2026-10-28

Owner request:

> the top bar is shit. can we do it slimmer? also the buttons are shit. i dont want rectangle buttons, just icons fuck sake. and also which fuckin framework are u usin? i dont see any animation, any shit.. it's .. look dead. for side panel i meant something that opens like from right to left, it folds shit like that, and show shit to select.. i dunno take fucking insipration from other blogs, website, i dunno shit like medium. or gimme a list of website we could take insipration from. adjust this shit for now. Also remove the read article shit in a card. And we need to take insipration from other shit on how to design the grid. i dunno currently i want to improove a lot the design before publishing anything,

A new independently useful design phase keeps the remaining visual review active instead of claiming the redesign complete. Article publication now depends on this phase as well as the manuscript/evidence phase; writing can proceed independently. Current changes provide a 52px navigation row plus border, icon-only theme/menu controls, real slide/fade drawer transitions and an interim lighter grid without repeated CTA text. Native dialog manages modal focus while a native disclosure remains the no-script/unsupported-browser fallback. CSS motion honors reduced-motion preferences. The stack remains Astro/Tailwind with React islands for demos.

Reference rationale is in docs/design-direction.md. The owner has not yet selected a reference or approved a final grid. Earlier discussion also favors a phased-array series with the first two or three installments didactic; no final series outline/manuscript is claimed approved by this design delivery.

### Article outline and closing summary — 2026-10-28

Owner request:

> that box with model assumption.. in all articles, i dont need it. But i like the visual idea. We will use that box shit, for the end of the article mauybe, and call it "take away" OR SHIT like that, to summarize that article
> the table of content.. let's put it in the left, when we open an article. collapsible. mostly such as a pdf viewr that gives u shit to navigate the pdf.

Implementation moves the existing scientific context into ordinary prose and adds concise, article-specific `takeaways` metadata. The accent-edge summary follows the body, before supporting material/references. The left native disclosure starts collapsed; desktop opening reserves reading space, while phones use an overlay that scripts close on section selection. Scripts add current-section highlighting, Escape and focus transfer. Right-side topic/search discovery remains independent. This iteration does not close the owner visual-review decision.

### Proportions, configuration and footer — 2026-10-28

The owner is undecided about article width/font size, a desktop Explore panel that reserves space, viewport-edge controls and a private settings dashboard versus configuration files. The definite change requested was: “I want to remove for shure that all writing button on the end of page. and make more discrete (more slim) the btm page with rss about and shit. dunno if ill remove it in the end. well see”.

The footer/link change is delivered. Measurements and recommendations are recorded in [the layout review](../../../docs/layout-review.md). Layout alternatives and a dashboard are not implemented or treated as approved. No private route or authentication claim is introduced. The final design decision remains open.

### Owner-selected canvas, panels and settings trial — 2026-10-28

Owner request:

> 1. What's a line lenght? Maybe we can try 880px shared column for text and plots.. preserving aligned edges. and let's see. Maybe we can put a button to extend the plots to a maximum size.. on the right (same bar of the plot name). it expands the plot with some animation dunno
> 2. I'd say make it 18px, with 30px line spacing. let's see how it does (u didnt mentioned line spacing of those other blogs). line spacing maybe is too big currently, we'll see
> 3. yes, ok. also i like the current animation of the explore tab when it opens, keep it in the new implementation and give it also to toc
> 4. iim ok with new proposed button posiiton
> 5. let's try a single centralized setting file for now.

The trial keeps normal prose/applets aligned at 880px, uses 18px/30px prose, and centralizes defaults in `src/styles/settings.css`. Both native-disclosure enhancements share a responsive panel controller: nonmodal desktop space reservation, mobile native modality, mirrored slide motion and one panel open at a time. Header controls occupy opposite viewport edges. Applets expand around the reading column up to a configured 1280px maximum, bounded by available space, with width motion and original plot heights. This trial does not mark the final design-review decision complete.

### Line spacing, expanded plot height and outside dismissal — 2026-10-28

Owner request:

> ok, much better. let's make line spacing 25, let's try it. moreover.. the animation of the categories panel, right, make it like the left one.. it's nicer, less nervous. And the plot, maybe let's try to maximeze it even vertically, let's say that clicking that button make it 1.5x enlargment. what do u say? or give differetn proportion to height shit? I want to be enalrged yes. btw. every modification we make on the page, such as opening left and right panel, or also zomming the plot.. it goes away, restores back and close all shit if we click on empty space, that's not the panels or the plot

The current trial keeps the 880px canvas and 18px prose while reducing line spacing to 25px. Both panels retain the common slide easing/timing; Explore removes the additional horizontal link-hover shift. Expanded live plots use a centralized 1.5× height multiplier; collapse restores original heights. A shared outside-click event restores panels and expanded applets together, excluding panel/applet internals, links, controls and active text selection. No manuscript or final visual approval is inferred.

### Proportional viewport-aware expansion — 2026-10-28

Owner clarification:

> Expanded plots now become 1.5× taller, while retaining width expansion. I meant 1.5 both dimension. So we mantain proportions. No? btw.. this should be also based on how much space we have on screen. not all screens are equal. Besides mobile shit. WE should maybe from browser acquire the screen dimensions? also could turn usefull in other stuff. and regulate "zoom" based on that? With an algorighm dunno

The shared scale is capped at 1.5 and constrained by available chart width and height; both dimensions use that same scale. The algorithm uses the browser layout viewport in CSS pixels, excludes frame chrome from the width ratio, handles the Fourier pair with a common factor, and never shrinks normal charts. No-room expansion controls are disabled; static/failure cases hide them. ResizeObserver/window events update the fit during panel and window changes. `src/lib/viewport.ts` exposes reusable viewport/measurement helpers and a pure fitting function. The prior independent 1280px width cap and fixed expanded-height setting are superseded; final design approval remains open.

### Continuous plot resize, 27px leading and reference titles — 2026-10-28

Owner request:

> The resize in both direction gives a glitch effect on the plots. It isnt possible to make it more smooth? not discontinuous
> PS. try to make the space line shit 27px also.. and remove this content between parenthesis in the reference.. what's that shitk? link url shoudl be enough

Plotly's debounced resize path deferred geometry changes until the CSS size transition settled. The replacement coalesces observations into requestAnimationFrame updates and serializes explicit relayout calls, keeping the latest dimensions and avoiding competing responsive callbacks. Internal reference IDs remain citation targets but are no longer shown in the bibliography; linked titles/details remain. The latest line-spacing trial is 27px. Final owner design approval remains open.

### Multi-tag archive and media showcase — 2026-10-28

Owner request:

> Perfect. really perfect. now another major rework: instead of categories.. I0m thinknig bout making those shit become "tags". Basically the meaning is that we can assign multiple tags to an article.. instead of only one category. what do u say? Also im anticipating i want to do a lil redesign of the card.. of an article. Basically giving it also an image. I duno if to keep it rectangle, like now or make it squared like in oxide blog shit. The images can be also animated gif, or animated content created through some libraries.. so it's basically a box content where wverything can go. based on article. Also.. before the listing all articles shit, i want to have a section (dunno how much size) that maybe i dunno showcase interactive content.. and maybe the writing "blog" on top left is necessary what do u say? By central content shit before the articles grid i mean something like in oxide or in google blog shit.. but i dunno if to put the latest article or what.. i want to get creative, to make the shit accaptivating. it could be the last article yes, with maybe enlarged image of previw but also another shit.
> In the card of the article also the tags must be present. i would put em in a little small box like "demo" shit.. but still mantaining the colors  of each category.

The initial reviewable trial uses the latest published article as the feature (no owner response to the optional feature preference is inferred). A compact Blog heading, large preview and three/two/one-column media grid replace the text-only archive. Landscape media is configurable to square. Existing models supply scientific previews; the ML card has an explicitly illustrative workflow, not fabricated results. The phased-array feature includes a native slider and precomputed paths without importing a plotting engine on listings. Typed image/GIF/video metadata and a shared component boundary support future media; GIF playback is deliberate and videos use native controls.

Registered multiple tags now drive public navigation, tag archives, article/card badges, related matches, Pagefind metadata/results and RSS. The ML demo carries both ML and DSP to demonstrate cross-topic discovery. Old article URLs remain; category index aliases redirect to tag archives and are excluded from the sitemap. The category field is retained as an internal compatibility detail. Final visual review remains open.

### Mobile right-panel clipping — 2026-10-28

The owner supplied an iPhone screenshot showing only the rightmost strip of the Explore drawer at the left viewport edge, asking: “There is this bug in the right pane. Fix it”. During opening, native dialog autofocus produced a 320px horizontal wrapper scroll offset in Chromium before the slide completed; the screenshot is consistent with that offset remaining applied on iPhone. The outer dialog now clips without acting as a scroll container, and the controller clears offsets after focus and before showing the drawer. The inner drawer retains normal vertical scrolling and native modal focus behavior. This is a bug correction, not a new visual direction or final-design approval.
