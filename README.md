# FraH90 — scientific and technical writing

A content-first engineering blog built with Astro and MDX, hosted at **https://frah90.github.io**. Articles explore antennas, RF, optics, signal processing, machine learning, and computational engineering. About provides author context; research interests are not claims of specialist experience.

## Project guidance

- [Working contract](CLAUDE.md) and identical [Codex instructions](AGENTS.md).
- [Architecture and boundaries](docs/architecture.md).
- [Editorial and scientific figure standard](docs/editorial.md).
- [Work ledger, proposals, and roadmap](.work/README.md).
- [Unpublished research notebook](research/README.md).

The ledger records what is implemented. Light/dark switching, collapsed contents, enhanced article metadata, related reading, search, and RSS are planned work, not current capabilities.

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
npm run preview
```

`check:build` checks generated pages, internal links/assets, missing CV links, social-image targets, navigation, sitemap destinations, and separation of planning/research files from public output. It requires a completed build. Browser checks remain necessary for responsive layouts, keyboard interactions, and demos.

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
  components/nav/              Persistent navigation
  components/demos/            React interactive examples
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
- `/about` provides author context and contact.
- `/projects` redirects to writing until actual case studies are available.

Redirect aliases are excluded from the sitemap. The mobile header retains the same Writing/About destinations as desktop. The site's existing FraH90 handle remains the public identity until the author chooses another name.

## Write an article

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

Required fields: `title`, `date`, `category`, and `description`. Optional fields: `tags`, `draft`, and `coverImage`. The current schema defaults `draft` to false, so always start with `draft: true`. `coverImage` is metadata only until figure/cover rendering lands. The current trial articles remain subject to editorial review.

Write prose and math in MDX:

```mdx
The reflection coefficient is $\Gamma = (Z_L-Z_0)/(Z_L+Z_0)$.

$$
\mathrm{VSWR} = \frac{1+|\Gamma|}{1-|\Gamma|}
$$
```

For an existing interactive example, import from a category-level article:

```mdx
import TransmissionLineDemo from '../../../components/demos/TransmissionLineDemo';
import InteractiveFrame from '../../../components/ui/InteractiveFrame.astro';

<InteractiveFrame label="Transmission line">
  <TransmissionLineDemo client:only="react" />
</InteractiveFrame>
```

KaTeX renders MDX math at build time. Browser-only visualization code belongs in React islands, with browser-safe imports. Existing demos use `client:only="react"`; loading/error/static alternatives are pending roadmap work. Raw Astro templates do not run through the Markdown math pipeline.

Review scientific claims, assumptions, figures/captions, units, references, links, and browser behavior before changing `draft` to false. Published articles appear automatically in their listing and topic route. Drafts are excluded through `src/lib/posts.ts`, including article-route generation. Future discovery outputs must use the same eligibility rule.

## Topics

Edit `src/lib/topics.ts` to manage the taxonomy. The schema, filters, article labels, and ordering consume this registry. Current route slugs are `antennas`, `rf`, `optics`, `dsp`, `ml`, and `misc`. Only topics containing published articles receive public filter links and category pages. Use readable display labels without changing stable slugs. Treat slug changes as URL migrations.

## Assets and CV

Put intentional public assets in `public/`; store reproducible data-generation scripts in `scripts/`. Existing generated datasets are under `public/data/`. The default social preview is `public/og-default.png`, with its editable vector source at `public/branding/social-card.svg`. It is a typographic site card, not scientific evidence.

CV links appear only if `public/cv.pdf` exists when the site builds. CV publication from its source repository is deferred; do not commit private source or credentials to make the link appear. See the ledger proposal before choosing automation.

## Deployment

`.github/workflows/deploy.yml` installs dependencies, builds, uploads `dist/`, and deploys to GitHub Pages on pushes to `main` or manual workflow dispatch. GitHub Pages must use **GitHub Actions** as its publishing source. Environment-specific commit/push instructions are in `CLAUDE.md` and `AGENTS.md`.
