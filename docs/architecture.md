# Architecture and product direction

Agreed direction: 2026-10-20. This document describes boundaries and intended architecture; the roadmap records what is actually implemented.

## Product

A content-first scientific and technical publication with a visible author. Readers should reach useful writing immediately, understand its assumptions, and navigate related topics. Employers can assess the author through the quality of the reasoning, code, figures, and experiments. About provides professional context without claiming experience that the work does not substantiate.

## Existing implementation

Astro generates static pages for GitHub Pages. MDX files under `src/content/blog/` form the `blog` collection defined in `src/content.config.ts`. The root currently redirects to `/blog`. Routes include article and category pages and About. The former empty Projects route now redirects to writing. React islands host analytical demos; KaTeX renders MDX math at build time. The published demos use build-time SVG reference figures and automatically mounted React controls with the original compact Plotly presentation. GitHub Actions builds and deploys pushes to `main`.

Phase 1 now shares topic metadata and listing components, keeps navigation visible at mobile sizes, gates CV links on the presence of the PDF, and supplies a real social preview asset. Root and Projects redirect aliases are excluded from the sitemap. Phase 2 adds shared reading/theme tokens, a persisted light option, and theme-aware scientific plots. Phase 3 adds optional article metadata, native collapsed contents, scientific figures/citations, related reading, and a safe draft-creation command. Phase 4 adds Pagefind full-text search and a summary RSS feed. Phase 5 adds static scientific demo alternatives, bounded loading/error recovery, lighter plotting, and independent analytical checks. The foundation roadmap is now closed: About now uses owner-stated interests rather than unconfirmed skill/experience claims; the owner has confirmed electronic engineer, retained the FraH90 handle, declined public contacts, and retained the five original articles as labeled demos. The first substantive phased-array article has its own primary roadmap; workflow permissions/checks remain a separate owner-deferred follow-up. See [the ledger entry points](../.work/README.md).

## Target information architecture

- A writing-led entry page: selected/latest articles, meaningful scientific figures, clear topic access, and a compact author link. Phase 1 retains `/` → `/blog` and existing article URLs; no URL migration is needed.
- A consistent writing index and topic views using the same layout and controls.
- An article template optimized for prose, equations, figures, and optional interactions.
- About for background, interdisciplinary interests, links to demonstrated work, and eventually CV; the owner has declined public contacts.
- Projects when there is real publishable work. An empty placeholder is not a useful navigation destination. Articles may link case studies when those exist.
- Search and RSS for discovery and following new publications.

## Ownership

| Location | Responsibility |
| --- | --- |
| `src/content/blog/` | Publishable MDX articles and drafts |
| `src/content.config.ts` | Content schema; extend deliberately for learning statements and prerequisites |
| `src/lib/` | Publication eligibility, topic registry, discovery helpers |
| `src/layouts/` | Site shell and article structure |
| `src/components/` | Navigation, article elements, controls, interactive demos |
| `src/styles/` | Shared design tokens, theme, typography, responsive rules |
| `public/` | Deliberately public figures, generated datasets, icons, future CV asset |
| `scripts/` | Reproducible figure/data generation and maintenance tools |
| `docs/` | Architecture and editorial guidance |
| `.work/` | Ideas, proposals, executable roadmaps, evidence, and history |
| `research/interests/` | Unpublished personal interests and possible investigations |

## Content and taxonomy

The shared topic registry at `src/lib/topics.ts` is implemented, with stable machine slugs, human labels, order, and presentation metadata. Existing slugs are retained; future changes need a deliberate migration. Current labels for stable slugs: Antennas & Arrays (`antennas`), RF & Microwave (`rf`), Optics & Photonics (`optics`), Signal Processing (`dsp`), Machine Learning (`ml`), and Other Topics (`misc`). The registry defines display order; new interests do not automatically become empty public categories.

The collection schema, topic filters, article labels, and category routes consume this vocabulary. `src/lib/posts.ts` provides shared publication eligibility for listings and article routes. Related reading and RSS use these helpers; search indexes only generated published article routes. Future discovery surfaces must preserve the same eligibility rule.

## Reading and interaction

`src/styles/global.css` owns semantic colors, topic/plot colors, shared page gutters, a 64rem site shell, and aligned article prose/demos within that shell (46rem remains available for other reading pages). The original neutral zinc dark palette is retained. Dark is the initial default. `BaseLayout.astro` applies a validated `frah90-theme` preference inline before the body can paint; `ThemeToggle.astro` provides the accessible action, persistence, cross-tab synchronization, and browser-history restoration. Blocked storage does not break the current-page action; no-JavaScript pages remain dark with the unavailable button hidden.

Article prose and interactive frames share aligned edges. Long words wrap; wide tables, code, and equations scroll inside their own containers and become keyboard-focusable when needed. Both syntax palettes are emitted through [Astro's Shiki configuration](https://docs.astro.build/en/guides/syntax-highlighting/). KaTeX follows the surrounding text color. The four published demos use Plotly with original compact controls and fixed-height plots. Axis titles use object syntax supported by the installed Plotly version. Theme updates preserve control values; browser-only imports stay behind the demo boundary. Static SVG is retained for loading, failures and no JavaScript.

`render(post).headings` supplies native section IDs and labels to `TableOfContents.astro`; its left outline uses HTML details/summary, initially collapsed, and needs no JavaScript for section navigation. A small rehype plugin makes heading targets programmatically focusable without adding tab stops, and headings remain free of appended permalink symbols. Opening the outline reserves 17rem on desktop (1024px and wider) and overlays on smaller screens. JavaScript adds Escape, mobile dismissal, focus transfer and current-section highlighting.

`src/content.config.ts` owns optional plain-text learning goals, prerequisites, closing takeaways, typed supporting links, unique reference keys, and collection references for curated related posts. `getRelatedPosts` filters through shared publication eligibility before rendering, removes self/duplicates, and adds only genuinely overlapping published topics/tags. Unknown curated IDs fail article generation. Empty tools are omitted.

`src/components/article/` owns contents, scientific figures, citations, and reference rendering. Figures require explicit provenance/type/caption; image figures also require alt text and dimensions. Their visual source colors are preserved. `scripts/new-post.mjs` uses the shared topic registry and the non-published template at `docs/templates/article.mdx`; exclusive file creation prevents overwrites. The output checker validates local HTML fragments and duplicate IDs as well as public files. See [the authoring guide](article-authoring.md).

Search uses Pagefind after the Astro build, scoped to published article bodies; its engine is loaded only on query submission. RSS is generated from the same eligible posts through a summary-only static endpoint. See [the discovery decision, measurements, and behavior](search-and-rss.md). No server is required.

Demos use shared pure models and chart specifications for build-time examples and optional React controls. The small loader automatically imports the renderer and chosen demo on page entry; import/render/timeout failure retains the static case. See [the measured baseline, budgets, scientific checks, and fallback design](interactive-demos.md).

## Deferred integrations

CV source repository, artifact path, publication permission, and update mechanism are unknown. Compare a public artifact link with controlled CI publication from a private source. Never make a private source repository public as a side effect. If automation is selected later, publish only the intended PDF and use limited credentials supplied through CI secrets, with a last-known-good artifact on failure.

## Verification

Validate each phase against its roadmap acceptance criteria. UI work covers narrow/mobile and desktop layouts, keyboard operation, both themes, content and plot overflow, and failure states. Publishing work checks draft exclusion across every output and existing article URL continuity. Scientific claims and demos need domain review and representative numerical/boundary checks. Documentation changes require internal links, mirrored instruction files, and valid ledger state.

The owner’s 2026-10-21 visual correction replaces the ruled contents block with a compact native disclosure and removes the demo activation gate. SVG plots use a 960×360 viewBox (shorter stacked Fourier panels), preventing oversized labels and excessive height at the full article width. On narrow screens plots scroll locally at a 48rem minimum width.

After reviewing both versions on 2026-10-21, the owner chose the original Plotly demos for all four published applets. This supersedes the SVG live renderer and scaled chart sizing. Plotly costs are explicitly budgeted in `scripts/check-demo-budget.mjs`; only demo pages request the engine. The temporary comparison route and images were removed after this decision.

The mobile array correction keeps Plotly but removes the chart title and rotated y-axis title. `horizontalYLabel` places a themed `|AF|` annotation above the y-axis. The array explicitly uses 36/12px side margins and disables automatic margin expansion, a 288px phone height (384px desktop), and fixed axes; other demos retain their original settings.

The compact live-plot policy now applies to every published demo chart: horizontal y-axis annotations, no redundant chart title, hidden y-zero label through Plotly label aliases, and locked gestures. Shared defaults own these presentation rules; individual demos supply units, ranges and trace data. Array/transmission can use narrower explicit margins.

## Archive and navigation correction — 2026-10-27

The archive begins with article cards; the hero, author teaser, inline topic strip and count are removed. `DiscoveryPanel.astro` provides a global right-side, collapsed-by-default disclosure with eligible topic links and a GET search form using a magnifying-glass submit button. Header Search navigation is removed. Native details supplies no-JavaScript topic access; JavaScript adds Escape, close-button and outside-click dismissal without making the nonmodal panel a focus trap. Topic routes preserve their heading/current state. The shared visible identity and social card are lowercase `frah90`. About restores the pre-roadmap compact introduction and six-group structure; lists describe interests and study topics, not verified proficiency, and personal contacts remain absent.

## Slim navigation and motion — 2026-10-28

The header uses a 52px navigation row plus its border, with icon-only theme/menu controls and 44px interaction targets. `DiscoveryPanel` starts as a native details disclosure. When native dialog support and scripts are available, the existing drawer moves into a body-level modal dialog, avoiding header stacking/containing-block constraints. A two-frame opening sequence transitions the drawer from the right; close waits for the transform transition (with a bounded fallback). Native dialog supplies focus containment; Escape, backdrop and the close icon restore focus to the trigger. Reduced-motion mode closes immediately and disables slide/fade motion. Without scripts/dialog support, the original disclosure remains navigable.

The shared article card now uses a top divider, typography and a small hover response instead of a rounded border box and repeated CTA. The grid remains an interim direction; owner design review gates article publication. Reference rationale lives in [design direction](design-direction.md). Existing Astro/Tailwind/React boundaries and Plotly demos are unchanged.

## Article outline and closing summary — 2026-10-28

The owner replaced the inline Contents block with a fixed left PDF-style outline, separate from right-side topic discovery. It remains collapsed initially and scrolls independently. Native disclosure/fragment navigation works without scripts. Article assumptions now live in the prose; the former accent-edge callout styling is used by optional `takeaways` metadata at the end of the article body, before supporting material and references. Existing demo context is retained rather than discarded or relabeled as a conclusion.

## Footer and reading-proportion review — 2026-10-28

Articles omit the bottom All writing return link. The shared footer is a compact 61px row with 12px labels and retained 44px link targets. [The layout review](layout-review.md) records measured typography across reference articles and pending choices about widths, panel behavior, edge controls and configuration; those choices have not been implemented.
