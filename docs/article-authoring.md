# Writing a technical article

The article tools are optional and render as static HTML. The five original articles remain explicitly labeled demos; adding these tools does not validate their claims.

## Start a draft

```bash
npm run new:post -- rf/my-article
```

Use a topic from `src/lib/topics.ts`. The command copies [the article template](templates/article.mdx), sets the topic and current UTC date, and keeps `draft: true`. It rejects invalid paths, unknown topics, and existing files. Edit the working title, description, and learning goal before publishing. The template is outside the content loader and never becomes an article by itself.

A file at `src/content/blog/rf/my-article.mdx` becomes `/blog/rf/my-article`. Set a genuine publication date when ready; only this published date is displayed. No updated date is rendered.

## Metadata

`demo` is a boolean editorial label, defaulting to false. Set `demo: true` for public examples of the site; they receive a Demo label and notice in discovery/article views. This is separate from `draft: true`, which excludes a piece from publication entirely. Ordinary articles are not certified as reviewed merely because demo is false. Optional array fields default to empty arrays, so older articles remain valid. Values are plain text, not Markdown or LaTeX; put rich explanations and equations in the body.

```yaml
learningGoals:
  - Explain the question the article answers.
prerequisites:
  - Complex numbers
assumptions:
  - State the actual idealizations and valid parameter range.
relatedPosts:
  - rf/transmission-line-theory
resources:
  - label: Source code
    url: https://github.com/FraH90/frah90.github.io
    kind: code
references:
  - id: astro
    title: Astro content collections
    detail: Documentation for the publishing framework; replace with the actual source for a scientific claim.
    url: https://docs.astro.build/en/guides/content-collections/
```

`learningGoals` renders as “What you’ll learn”; `prerequisites` is a compact line below it. `assumptions` renders a short model-assumptions section. Omit these fields when they add nothing; do not add empty placeholders to a published article.

`relatedPosts` uses collection IDs, including category, rather than URLs. Curated published links appear first, followed by published articles sharing a topic or tag, up to three results. Duplicates, the current article, and drafts are excluded. Missing curated IDs fail article generation so typos cannot silently become broken recommendations. No related panel appears when nothing is relevant.

`resources` supports `code`, `notebook`, `project`, `data`, `report`, and `other` (default). It links existing supporting material; it does not create project pages. URL fields accept HTTP(S) or root-relative public paths. Prefer stable HTTPS sources. Local files and fragment targets are checked by `npm run check:build`.

## Sections and contents

Start body sections at `##`, with `###` for subsections. Astro supplies heading IDs, including unique IDs for repeated headings. The native “Contents” disclosure is collapsed by default and appears when there are at least two relevant sections. It includes second/third-level body headings and any rendered assumptions, material, references, and related-reading sections. It works without JavaScript and uses no sidebar.

JavaScript adds small heading permalink links as an enhancement; native IDs and contents links remain usable without it. Reserve `article-tools-*`, `fig-*`, and `ref-*` for the article components. Avoid duplicate IDs when adding custom markup.

## Scientific figures

Import from a category-level article:

```mdx
import ScientificFigure from '../../../components/article/ScientificFigure.astro';
```

For an actual image asset:

```mdx
<ScientificFigure
  id="result"
  label="1"
  src="/images/my-article/result.svg"
  alt="Describe the plotted quantities, axes, and important observation."
  width={1200}
  height={600}
  caption="Explain the result and the conditions under which it holds."
  kind="simulation"
  source="Name the real script, dataset, instrument, or publication."
  sourceUrl="/data/my-article/results.json"
  parameters="State the parameter values, units, and normalization."
  wide={true}
/>
```

This is an authoring example, not an existing asset. Supply real public files before publishing. `id`, `caption`, `kind`, and `source` are required. An image also requires descriptive `alt` and positive intrinsic `width`/`height`. `label`, `sourceUrl`, `parameters`, and `wide` are optional. Supported kinds are `analytical`, `simulation`, `measurement`, `schematic`, and `illustration`; choose the one that accurately describes the evidence.

The default figure fits the prose measure; `wide={true}` uses the wider article area. Link to it with `[Figure 1](#fig-result)`. Captions show provenance and result type. Colors in a supplied image are preserved; images are never automatically inverted between themes. Check labels and contrast in both modes, or author a vector figure using semantic CSS tokens.

For inline SVG or other static markup, omit image props and provide a slot. Give the SVG `role="img"` and a descriptive `aria-label` (or linked title/description). Continue to provide the figure caption, type, and source. This is for authored scientific diagrams, not invented measurement data.

Tables are centered automatically within the article. Use normal Markdown table syntax; cell alignment stays under the author’s control. Wide tables scroll locally instead of widening the page.

## Displayed equations

Use `$...$` for inline math within prose. Displayed equations are always centered by the shared stylesheet. Put each `$$` delimiter on its own line, with blank lines around the block:

```md
$$
AF(\theta) = \frac{1}{N} \sum_{n=0}^{N-1} e^{j n \psi}
$$
```

Do not use `$$formula$$` on one line: remark-math parses that as inline math. Wide display equations scroll locally on small screens so their left edge remains reachable by keyboard; split long derivations into logical lines with LaTeX `aligned` when useful. Math is rendered at build time and remains readable without JavaScript.

## Citations and references

Reference IDs must be unique lowercase letters/numbers/hyphens. URL is optional for a book or other offline source; include enough bibliographic detail to identify it.

```mdx
import Citation from '../../../components/article/Citation.astro';

Explain a sourced claim <Citation reference="astro" />.
```

The key must exist in the article's `references` array. It renders as `[astro]`, links to `#ref-astro`, and moves focus to that reference. Use short source keys or quoted numeric string IDs if numerical citations are preferred. The references section is generated automatically after the article and omitted when empty. The build-output check catches missing citation/contents/figure targets and duplicate IDs in rendered HTML.

## Before publishing

Replace template placeholders, verify scientific accuracy and citations, and review assumptions, figures, units, and limitations. Check that linked code/data/projects exist and are suitable for publication. Run:

```bash
npm run build
npm run check:build
npm run preview
```

Review the article on mobile and desktop in both themes, including contents, equation/table/code overflow, figures, reference links, and related reading. Drafts must stay absent from public output. Set `draft: false` only after review. Search and RSS are implemented and reuse the same publication eligibility.
