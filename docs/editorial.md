# Editorial and authoring guide

This is the agreed publishing standard. Features described as planned are not yet implemented; see the primary roadmap for delivery status.

## Voice and positioning

Write clearly about a concrete question, method, result, or lesson. Breadth is useful when the connections are explicit. Identify whether a piece is a tutorial, an experiment, a project report, or an exploration. Do not turn learning interests into claims of professional specialization. Report failures and limitations with the same precision as successes.

## Article structure

Begin with a short description of what the reader will learn and relevant prerequisites. Show the published date; updated dates are not part of the requested reading UI. Use headings that produce useful section links and a collapsed contents disclosure when there are enough sections to help navigation.

State the problem and model assumptions before deriving or simulating a result. Define symbols, units, angle/phase conventions, normalizations, and valid parameter ranges. Distinguish ideal models from measurements and simulation output. Include references that support substantive claims and links to related articles, code, notebooks, or projects where they exist.

## Scientific figures

Prefer figures that carry information: radiation patterns, annotated schematics, field distributions, spectra, measurement curves, and comparisons with theory or simulation. Use readable axes, units, legends, captions, and text alternatives. Captions explain the setup, source, important parameter choices, and intended observation. State whether data is measured, simulated, calculated, or illustrative. Check both themes and narrow screens. Preserve provenance and reproducible generation scripts/data when possible. AI-created artwork is not evidence of a physical or numerical result.

## Interactive examples

Explain what changing each control demonstrates. Label controls programmatically, include units, and handle the model's boundary cases honestly. Provide a static explanation or representative figure when JavaScript, loading, or computation fails. Avoid implying that a simple analytical demo is a validated engineering design tool.

## Publication workflow

Create MDX under `src/content/blog/<category>/`. The current schema requires `title`, `date`, `category`, and `description`; tags are optional and `draft` currently defaults to false, so always set `draft: true` explicitly while writing. Learning goals, prerequisites, assumptions, related-post references, supporting material, and bibliographic references are optional typed fields with empty defaults. Figure and citation components and collapsed contents are implemented. See [the authoring guide](article-authoring.md) and [draft template](templates/article.mdx). RSS summaries and static full-text search are implemented; see [discovery behavior](search-and-rss.md).

Choose stable category slugs from `src/lib/topics.ts`; only topics with published content appear in public filters. Article URLs include the category, for example `/blog/rf/transmission-line-theory`. From an article in a category subdirectory, component imports currently use `../../../components/...`.

Before publishing: review mathematical/scientific accuracy and citations; run the production build; check equations, figures, tables, code, links, interactive behavior, and mobile reading. Verify draft exclusion from every index and feed. Set a genuine publication date and remove draft status only when the piece is ready.

The existing five articles are trial content. Decide explicitly whether to correct and retain, replace, or retire them before treating the archive as reviewed. Phase 5 corrected the transmission-line short-circuit quarter-wave statement and infinite-VSWR handling, uniform-array steering/sidelobe/beamwidth claims, Gaussian model scope and radius-versus-diameter wording, and DFT scaling/window limitations. Independent model identities and boundary checks now cover those teaching examples. Broader editorial review, physical validation, and the overly general ML claims remain pending; these targeted fixes are not a completed scientific audit.

## Professional context

About currently explains owner-stated interests and approach, links eligible analytical examples and repository source, and retains the existing contact details. The old professional/tool proficiency claims were removed because they were not owner-confirmed. Public name, background, concrete projects and the existing email still need confirmation; keep those decisions in the primary roadmap. Only list tools and experience the author confirms. Private interest notes are source material, not automatically published prose. CV publication is deferred until its source and intended public artifact are known.
