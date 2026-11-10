# frah90 — scientific and technical writing

A content-first engineering blog built with Astro and MDX, hosted at **https://frah90.github.io**. Articles explore antennas, RF, optics, signal processing, machine learning, and computational engineering. About provides author context; research interests are not claims of specialist experience.

## Project guidance

- [Working contract](CLAUDE.md) and identical [Codex instructions](AGENTS.md).
- [Architecture and boundaries](docs/architecture.md).
- [Editorial and scientific figure standard](docs/editorial.md).
- [Work ledger, proposals, and roadmap](.work/README.md).
- [Unpublished research notebook](research/README.md).

The ledger records what is implemented. Light/dark switching is implemented. Collapsed contents, article metadata, scientific figure/citation components, related reading, and draft scaffolding are implemented. Static full-text search and a summary RSS feed are implemented; see [discovery behavior and checks](docs/search-and-rss.md).

The website foundation roadmap is closed. The current priority is [the first substantive phased-array article](.work/roadmaps/r-261020-02-first-phased-array-article/r-261020-02-first-phased-array-article.md); publishing safeguards are verified and their roadmap is archived in the ledger.

## Local development

Use Node **22.12 or newer** (CI uses Node 24).

```bash
npm ci
npm run dev
```

Production verification:

```bash
npm run build
npm run check:build
npm run check:demos
npm run preview
```

The build runs Astro followed by Pagefind. Search requires this generated index: use the production preview for search testing; `npm run dev` alone has no index. RSS is a static endpoint with summaries and absolute article links.

`check:build` checks generated pages, internal links/assets and fragment targets, duplicate IDs, missing CV links, social-image targets, navigation, sitemap destinations, search index/article counts, RSS membership/dates/discovery, and separation of planning/research files from public output. It requires a completed build. Browser checks remain necessary for responsive layouts, keyboard interactions, and demos.

## Structure

```text
blog/
  <YYYY-MM-DD>-<slug>/         One article per folder: index.mdx + figures/, data/, scripts/
  taxonomy.json                Categories and tags
  blocks.json                  What Article Studio's / menu offers
src/
  content.config.ts            Typed article schema
  lib/taxonomy.ts              Reads and checks blog/taxonomy.json
  lib/tags.ts                  Tag helpers over the taxonomy
  lib/topics.ts                Category helpers over the taxonomy
  lib/posts.ts                 Shared publication eligibility and queries
  lib/site.ts                  Public identity and build-time CV eligibility
  pages/                       Static routes
  layouts/                     Site shell and article layout
  components/blog/             Shared listing and article cards
  components/article/          Contents, scientific figures, citations/references
  components/nav/              Persistent navigation
  components/ui/               Chart, slider, equation, and demo wrappers
  styles/global.css            Tailwind, KaTeX, shared interaction styles
public/                        Deliberately public assets and datasets
scripts/                       Dataset generation and build-output checks
docs/                          Architecture and editorial guidance
.work/                         LifeOS-compatible planning ledger
research/interests/            Unpublished interests and investigations
```

`docs/`, `.work/`, and `research/` are outside the published content loaders. They are absent from the built website; files committed to a public repository are still publicly readable on GitHub.

## Routes and navigation

- `/` redirects to `/blog`, keeping writing first.
- `/blog` has a compact Blog heading, featured latest eligible article, and a responsive media-card grid.
- `/categories/<slug>` lists the primary subject; `/tags/<slug>` retains specific and legacy broad-tag archives. Legacy `/blog/<topic>` indexes redirect to categories, legacy `/blog/<topic>/<article>` addresses forward to the article, and retired demo tags redirect to their category.
- `/blog/<year>/<article>` is the article URL, for example `/blog/2026/transmission-line-theory`.
- `/about` restores the earlier compact introduction and six subject/tool groups, presented as interests for study and exploration. The public identity is lowercase frah90; background is electronic engineer. Personal name and contacts are intentionally omitted.
- `/search?q=beam+steering` searches published article text (JavaScript required; tag browsing remains available without it).
- `/rss.xml` supplies the summary RSS feed.
- `/projects` redirects to writing until actual case studies are available.

Redirect aliases are excluded from the sitemap. The header keeps Writing/About and theme controls. Its icon-only menu control opens a full-height drawer from the right, with expandable categories containing their specific refinements and a magnifying-glass search form. Native dialog focus handling, Escape/backdrop dismissal and CSS slide/fade motion enhance the drawer; reduced motion is respected and native disclosure preserves tag browsing without JavaScript. The public identity is lowercase frah90; a personal name and contacts are deliberately omitted.

## Reading themes

Dark is the initial default, independently of the browser's system preference. The header button switches to light or dark and stores the explicit choice under `frah90-theme` in local storage. It applies before body rendering, persists across page loads, and synchronizes between tabs. If storage is blocked, the switch still works for the current page; if JavaScript is disabled, the site stays readable in dark mode and hides the unavailable switch.

Semantic color and layout tokens live in `src/styles/global.css`. Article prose, headings and demos share the same 64rem shell; neutral zinc colors restore the original dark palette. The left article Contents outline stays collapsed initially; opening it reserves space on desktop and overlays on phones. Wide equations, code, and tables scroll locally and receive keyboard focus when they overflow. Shiki emits both code palettes at build time. Plotly charts use shared theme colors and visible axis titles. Range controls use native styling and associated labels. See [interactive demo behavior and measured budgets](docs/interactive-demos.md).

## Write an article

Use `npm run new:post -- rf/my-article` to create a draft safely, or copy the [article template](docs/templates/article.mdx). Write closing `<Takeaways>` and `<References>` blocks at the bottom of the MDX body, not YAML. See the [full authoring guide](docs/article-authoring.md) for learning goals, prerequisites, closing takeaways, figures, references, supporting material, and related reading.

Create `blog/2026-10-20-my-article/index.mdx` with explicit draft status:

```yaml
---
title: A concrete engineering question
date: 2026-10-20
category: rf
description: A concise description of the question and what the article explains.
tags: [rf, impedance]
draft: true
---
```

Required fields: `title`, `date`, primary category/stable URL group `category`, and `description`; published articles also need at least one registered tag. Optional fields include `draft`, `demo`, `preview`, and legacy `coverImage`. The current schema defaults `draft` to false, so always start with `draft: true`. `coverImage` is a basic card-image fallback; prefer typed `preview` metadata for accessible image/GIF/video media. Use `ScientificFigure` for captioned figures inside articles. The five original articles remain public with `demo: true` and explicit Demo labels; keep this separate from draft eligibility.

Write prose and math in MDX:

```mdx
The reflection coefficient is $\Gamma = (Z_L-Z_0)/(Z_L+Z_0)$.

$$
\mathrm{VSWR} = \frac{1+|\Gamma|}{1-|\Gamma|}
$$
```

A demo belongs to its article, like its figures: `blog/<folder>/demos/<Name>.tsx` is the live React component and `<Name>.reference.ts` beside it the calculated case shown before scripts load (also the article's preview card). The article refers to it relatively:

```mdx
import InteractiveDemo from '../../src/components/ui/InteractiveDemo.astro';

<InteractiveDemo src="./demos/TransmissionLineDemo.tsx" />
```

`src/lib/remark-article-demos.mjs` fails the build when the component or its reference is missing, and the loader finds each component by that path, so there is no list of demos in `src/`. Shared plumbing stays in `src/`: the frame, `PlotlyChart`/`Slider`, `demo-colors.ts`, `chart-geometry.ts` and the `DemoReference` type (`demo-charts.ts`). Each article's maths lives with it: `demos/model.ts` (pure, checked by `npm run check:demos`) and `demos/chart.ts` (its chart specifications). Each reference supplies a calculated static figure, units, model assumptions, and a reference observation before scripts load. Interactive controls start automatically on page entry without moving focus. Errors or a 15-second stalled load leave the reference visible and offer Retry demo. No interactive JavaScript or plotting library is needed to read the example. The original compact Plotly layouts and plot types are restored, with named axes and units. Heights are 384px desktop / 288px phones, or 192/256px for the Fourier pair. All live plots use short horizontal y-axis labels, tight margins and no redundant chart titles. The y-axis zero label is hidden while data and gridlines remain intact. Static SVG reference plots remain available when scripts fail.

Callouts use GitHub's syntax — a quote whose first line is `[!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]` or `[!CAUTION]`, optionally followed by a title — and `src/lib/remark-callouts.mjs` renders them (an unknown kind fails the build). `<Embed src="https://…" title="…" />` places an external player, map or page in a fixed-ratio frame; `<details><summary>` makes a collapsible section; tables and `[^note]` footnotes are plain Markdown.

**Article Studio's `/` menu is content:** `blog/blocks.json` lists every generic block it offers (text, callouts, math, code, media, structure) and the component imports they need. Add or reword an entry there — no Studio code change — and it appears in the menu on its next open. The article's own files and citations are added by Studio itself.

KaTeX renders MDX math at build time. The published demos use automatically loaded Plotly charts in small React roots; browser code remains outside static rendering.

Review scientific claims, assumptions, figures/captions, units, references, links, and browser behavior before changing `draft` to false. Published articles appear automatically in their primary category and matching tag routes. Drafts are excluded through `src/lib/posts.ts`, including article-route generation. Search, RSS, related reading, and sitemap also exclude drafts.

## Topics

Edit `blog/taxonomy.json` (by hand or from Article Studio) to manage the public taxonomy: categories with their label and accent tone, tags with their parent category, and retired-tag redirects. No code change is needed. Registered tags have stable slugs, readable labels and order; only tags used by published articles receive content archives; explicit retired-tag redirects preserve former links. The categories are currently `antennas`, `rf`, `optics`, `dsp`, `ml`, and `misc`; category and tag slugs share one namespace, and the build fails with a sentence if the file is inconsistent. An article can carry tags from any group. Treat slug changes as URL migrations.

## Assets and CV

Keep an article's figures, data and the scripts that make them inside its own `blog/<date>-<slug>/` folder. `public/` is for site-wide files only. The default social preview is `public/og-default.png`, with its editable vector source at `public/branding/social-card.svg`. It is a typographic site card, not scientific evidence.

CV links appear only if `public/cv.pdf` exists when the site builds. CV publication from its source repository is deferred; do not commit private source or credentials to make the link appear. See the ledger proposal before choosing automation.

## Deployment

`.github/workflows/deploy.yml` installs dependencies, builds, runs `check:build` and `check:demos`, then uploads `dist/` and deploys to GitHub Pages on pushes to `main` or manual workflow dispatch. GitHub Pages must use **GitHub Actions** as its publishing source. Environment-specific commit/push instructions are in `CLAUDE.md` and `AGENTS.md`.

Tables are centered automatically, with local scrolling for wide tables. Displayed equations use `$$` delimiters on separate lines and are centered globally; single-line `$...$` stays inline. See [math authoring](docs/article-authoring.md#displayed-equations).

The article Demo badge shows its explanation temporarily on hover/focus (tap on touchscreens); no persistent notice box interrupts reading.

The archive currently uses an interim two-column editorial grid with light dividers and no repeated “Read article” labels. See [design direction and reference sites](docs/design-direction.md); further grid review is tracked in the primary roadmap before article publication.

The footer stays compact with About/RSS access; articles omit the bottom “All writing” link. See [the measured layout review](docs/layout-review.md) for typography comparisons and pending proportion/control choices.

Visual defaults are centralized in [settings.css](src/styles/settings.css): shared article width (880px), prose type (18px/27px), maximum proportional plot scale (1.5×), panel widths, motion, gutters and palettes. Edit these values here and rebuild to publish defaults. The demo-header expand icon temporarily widens an applet; it applies the same fitted scale to plot width and height, up to 1.5×. Window size and open panels limit enlargement; plots that already fill available space retain their normal size. Clicking outside panels/applets restores the normal layout; controls, links and text selections remain usable. Both header-edge panels reserve space on desktop and become modal overlays on phones, with one open at a time.

See [responsive plot expansion](docs/responsive-plots.md) for the fitting rule and viewport helper.

Plotly geometry follows animated container dimensions through coalesced relayout updates rather than a delayed resize. Reference lists display linked titles/details without exposing internal citation keys.

The archive now uses a compact Blog heading, featured latest eligible article and responsive media cards. Articles have one colored category badge and date, with their specific tags and Demo status inside its disclosure; old article URLs are preserved and legacy indexes redirect. [Tags and preview authoring](docs/tags-and-previews.md) covers the registry, image/GIF/video metadata, steering showcase and configurable media shape. The `category` field supplies the primary public subject and preserves the URL group.

Visual authoring conventions: [shared visual guidelines](docs/visual-guidelines.md) cover header/canvas alignment, category-owned tag refinements, reusable media slots and ring-free icon focus with visible keyboard markers. [Tags and previews](docs/tags-and-previews.md) documents primary categories, compatibility routes and image/GIF/video authoring.

Specific tag filters use `/categories/<category>/<tag>`; Demo is gray article status, not an available filter; old category/Demo URLs redirect to the category. Assign specific tags under their registered parent in `blog/taxonomy.json`; keep `demo` as a boolean, not a manual tag. Native click/tap/keyboard activation works without JavaScript; mouse hover is a progressive enhancement.

Explore category text navigates directly; its plus sign and empty row space expand specific tags. There are no All articles / All [category] articles rows, and no Demo option in Explore.
