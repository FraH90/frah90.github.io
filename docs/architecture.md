# Architecture and product direction

Agreed direction: 2026-10-20. This document describes boundaries and intended architecture; the roadmap records what is actually implemented.

## Product

A content-first scientific and technical publication with a visible author. Readers should reach useful writing immediately, understand its assumptions, and navigate related topics. Employers can assess the author through the quality of the reasoning, code, figures, and experiments. About provides professional context without claiming experience that the work does not substantiate.

## Existing implementation

Astro generates static pages for GitHub Pages. MDX files under `src/content/blog/` form the `blog` collection defined in `src/content.config.ts`. The root currently redirects to `/blog`. Routes include article and category pages and About. The former empty Projects route now redirects to writing. React islands host analytical demos; KaTeX renders MDX math at build time. Plotly is dynamically imported by its wrapper. GitHub Actions builds and deploys pushes to `main`.

Phase 1 now shares topic metadata and listing components, keeps navigation visible at mobile sizes, gates CV links on the presence of the PDF, and supplies a real social preview asset. Root and Projects redirect aliases are excluded from the sitemap. Phase 2 adds shared reading/theme tokens, a persisted light option, and theme-aware scientific plots. Enhanced article structure and discovery remain roadmap work.

## Target information architecture

- A writing-led entry page: selected/latest articles, meaningful scientific figures, clear topic access, and a compact author link. Phase 1 retains `/` → `/blog` and existing article URLs; no URL migration is needed.
- A consistent writing index and topic views using the same layout and controls.
- An article template optimized for prose, equations, figures, and optional interactions.
- About for background, interdisciplinary interests, links to demonstrated work, contact, and eventually CV.
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

The collection schema, topic filters, article labels, and category routes consume this vocabulary. `src/lib/posts.ts` provides shared publication eligibility for listings and article routes. Future related reading, search, and RSS must use these same helpers.

## Reading and interaction

`src/styles/global.css` owns semantic colors, topic/plot colors, shared page gutters, a 64rem site shell, and a 46rem prose measure. Dark is the initial default. `BaseLayout.astro` applies a validated `frah90-theme` preference inline before the body can paint; `ThemeToggle.astro` provides the accessible action, persistence, cross-tab synchronization, and browser-history restoration. Blocked storage does not break the current-page action; no-JavaScript pages remain dark with the unavailable button hidden.

Article prose stays narrower than figures and interactive frames. Long words wrap; wide tables, code, and equations scroll inside their own containers and become keyboard-focusable when needed. Both syntax palettes are emitted through [Astro's Shiki configuration](https://docs.astro.build/en/guides/syntax-highlighting/). KaTeX follows the surrounding text color. `PlotlyChart.tsx` resolves CSS variables into colors understood by Plotly and uses [Plotly.react](https://plotly.com/javascript/plotlyjs-function-reference/) with stable UI revision to preserve reader zoom while changing theme. Axis settings merge with shared defaults instead of replacing their grid/text colors. Plot instances and theme listeners are cleaned up on unmount; scientific model calculations are unaffected.

A collapsed contents disclosure remains Phase 3 work: heading anchors, click/touch/keyboard operation, and no permanent sidebar.

Search should fit the static hosting model. Select an implementation after testing indexing, math/code handling, payload, keyboard/mobile UI, and draft exclusion. RSS is generated from eligible published content. Do not introduce a server solely for either feature.

Demos explain their model, provide useful loading/error/static output, and avoid loading large visualization code on ordinary reading/list pages. Determine a measured payload budget before optimizing; the baseline Plotly output was roughly 4.6 MB uncompressed, not a measured transfer size or load time.

## Deferred integrations

CV source repository, artifact path, publication permission, and update mechanism are unknown. Compare a public artifact link with controlled CI publication from a private source. Never make a private source repository public as a side effect. If automation is selected later, publish only the intended PDF and use limited credentials supplied through CI secrets, with a last-known-good artifact on failure.

## Verification

Validate each phase against its roadmap acceptance criteria. UI work covers narrow/mobile and desktop layouts, keyboard operation, both themes, content and plot overflow, and failure states. Publishing work checks draft exclusion across every output and existing article URL continuity. Scientific claims and demos need domain review and representative numerical/boundary checks. Documentation changes require internal links, mirrored instruction files, and valid ledger state.
