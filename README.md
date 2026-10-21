# FraH90 — scientific and technical writing

A content-first engineering blog built with Astro and MDX, hosted at **https://frah90.github.io**. Articles explore antennas, RF, optics, signal processing, machine learning, and computational engineering. About provides author context; research interests are not claims of specialist experience.

## Project guidance

- [Working contract](CLAUDE.md) and identical [Codex instructions](AGENTS.md).
- [Architecture and boundaries](docs/architecture.md).
- [Editorial and scientific figure standard](docs/editorial.md).
- [Work ledger, proposals, and roadmap](.work/README.md).
- [Unpublished research notebook](research/README.md).

The ledger records what is implemented. Light/dark switching is implemented. Collapsed contents, article metadata, scientific figure/citation components, related reading, and draft scaffolding are implemented. Static full-text search and a summary RSS feed are implemented; see [discovery behavior and checks](docs/search-and-rss.md).

The website foundation roadmap is closed. The current priority is [the first substantive phased-array article](.work/roadmaps/r-261020-02-first-phased-array-article/r-261020-02-first-phased-array-article.md); deferred workflow permissions and automatic CI checks remain a separate follow-up in the ledger.

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
src/
  content/blog/<topic>/*.mdx    Articles and drafts
  content.config.ts            Typed article schema
  lib/topics.ts                Stable slugs, display labels, colors, and order
  lib/posts.ts                 Shared publication eligibility and queries
  lib/site.ts                  Public identity and build-time CV eligibility
  pages/                       Static routes
  layouts/                     Site shell and article layout
  components/blog/             Shared listing and article cards
  components/article/          Contents, scientific figures, citations/references
  components/nav/              Persistent navigation
  components/demos/            Automatically mounted React controls and SVG charts
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
- `/blog` lists published articles; `/blog/<topic>` filters the same listing by topic.
- `/blog/<topic>/<article>` is the article URL, for example `/blog/rf/transmission-line-theory`.
- `/about` presents the author’s stated interdisciplinary interests, links the published demos and repository source. The public identity remains FraH90; background is electronic engineer. Personal name and contacts are intentionally omitted.
- `/search?q=beam+steering` searches published article text (JavaScript required; topics remain available without it).
- `/rss.xml` supplies the summary RSS feed.
- `/projects` redirects to writing until actual case studies are available.

Redirect aliases are excluded from the sitemap. The mobile header retains the same Writing/About/Search destinations as desktop. FraH90 is the intended public identity; a personal name and contacts are deliberately omitted.

## Reading themes

Dark is the initial default, independently of the browser's system preference. The header button switches to light or dark and stores the explicit choice under `frah90-theme` in local storage. It applies before body rendering, persists across page loads, and synchronizes between tabs. If storage is blocked, the switch still works for the current page; if JavaScript is disabled, the site stays readable in dark mode and hides the unavailable switch.

Semantic color and layout tokens live in `src/styles/global.css`. Article prose, headings and demos share the same 64rem shell; neutral zinc colors restore the original dark palette. The compact Contents disclosure stays collapsed initially. Wide equations, code, and tables scroll locally and receive keyboard focus when they overflow. Shiki emits both code palettes at build time. Scientific SVG charts inherit shared theme tokens. Range controls use native styling and associated labels. See [interactive demo behavior and measured budgets](docs/interactive-demos.md).

## Write an article

Use `npm run new:post -- rf/my-article` to create a draft safely, or copy the [article template](docs/templates/article.mdx). See the [full authoring guide](docs/article-authoring.md) for learning goals, prerequisites, assumptions, figures, references, supporting material, and related reading.

Create `src/content/blog/rf/my-article.mdx` with explicit draft status:

```yaml
---
title: A concrete engineering question
date: 2026-10-20
category: rf
description: A concise description of the question and what the article explains.
tags: [transmission-lines]
draft: true
---
```

Required fields: `title`, `date`, `category`, and `description`. Optional fields: `tags`, `draft`, `demo`, and `coverImage`. The current schema defaults `draft` to false, so always start with `draft: true`. `coverImage` remains metadata only; use the `ScientificFigure` component for captioned inline or wide figures. The five original articles remain public with `demo: true` and explicit Demo labels; keep this separate from draft eligibility.

Write prose and math in MDX:

```mdx
The reflection coefficient is $\Gamma = (Z_L-Z_0)/(Z_L+Z_0)$.

$$
\mathrm{VSWR} = \frac{1+|\Gamma|}{1-|\Gamma|}
$$
```

For an existing analytical example, import from a category-level article:

```mdx
import InteractiveDemo from '../../../components/ui/InteractiveDemo.astro';

<InteractiveDemo kind="transmission" />
```

Supported kinds are `array`, `fourier`, `gaussian`, and `transmission`. Each supplies a calculated static figure, units, model assumptions, and a reference observation before scripts load. Interactive controls start automatically on page entry without moving focus. Errors or a 15-second stalled load leave the reference visible and offer Retry demo. No interactive JavaScript or plotting library is needed to read the example. These compact SVG plots provide labeled curves and local horizontal scrolling, without Plotly pan/zoom or hover inspection.

KaTeX renders MDX math at build time. The published demos use native SVG and small on-demand React roots; browser code remains outside static rendering. The old `PlotlyChart` and unused `ModeProfileViewer` are exploratory code, excluded from current published bundles. The mode viewer's approximations are unvalidated; do not publish it as an optical solver.

Review scientific claims, assumptions, figures/captions, units, references, links, and browser behavior before changing `draft` to false. Published articles appear automatically in their listing and topic route. Drafts are excluded through `src/lib/posts.ts`, including article-route generation. Search, RSS, related reading, and sitemap also exclude drafts.

## Topics

Edit `src/lib/topics.ts` to manage the taxonomy. The schema, filters, article labels, and ordering consume this registry. Current route slugs are `antennas`, `rf`, `optics`, `dsp`, `ml`, and `misc`. Only topics containing published articles receive public filter links and category pages. Use readable display labels without changing stable slugs. Treat slug changes as URL migrations.

## Assets and CV

Put intentional public assets in `public/`; store reproducible data-generation scripts in `scripts/`. Existing generated datasets are under `public/data/`. The default social preview is `public/og-default.png`, with its editable vector source at `public/branding/social-card.svg`. It is a typographic site card, not scientific evidence.

CV links appear only if `public/cv.pdf` exists when the site builds. CV publication from its source repository is deferred; do not commit private source or credentials to make the link appear. See the ledger proposal before choosing automation.

## Deployment

`.github/workflows/deploy.yml` installs dependencies, builds, uploads `dist/`, and deploys to GitHub Pages on pushes to `main` or manual workflow dispatch. GitHub Pages must use **GitHub Actions** as its publishing source. Environment-specific commit/push instructions are in `CLAUDE.md` and `AGENTS.md`.

Tables are centered automatically, with local scrolling for wide tables. Displayed equations use `$$` delimiters on separate lines and are centered globally; single-line `$...$` stays inline. See [math authoring](docs/article-authoring.md#displayed-equations).

The article Demo badge shows its explanation temporarily on hover/focus (tap on touchscreens); no persistent notice box interrupts reading.

A temporary [design comparison](/design-review/) presents rendered screenshots of the original and current phased-array demos and full article pages. It is excluded from sitemap/search/RSS and marked noindex; remove the route and `public/design-review/` assets after the owner chooses a direction.
