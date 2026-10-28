# Editorial and authoring guide

This is the agreed publishing standard. Features described as planned are not yet implemented; see [the work ledger](../.work/README.md) for the closed foundation and current article roadmap.

## Voice and positioning

Write clearly about a concrete question, method, result, or lesson. Breadth is useful when the connections are explicit. Identify whether a piece is a tutorial, an experiment, a project report, or an exploration. Do not turn learning interests into claims of professional specialization. Report failures and limitations with the same precision as successes.

## Article structure

Begin with a short description of what the reader will learn and relevant prerequisites. Show the published date; updated dates are not part of the requested reading UI. Use headings that produce useful section links and a collapsible left contents outline when there are enough sections to help navigation.

State the problem and model assumptions in the prose before deriving or simulating a result; do not add an opening assumptions callout. Close with a concise “Key takeaways” callout summarizing supported conclusions. Define symbols, units, angle/phase conventions, normalizations, and valid parameter ranges. Distinguish ideal models from measurements and simulation output. Include references that support substantive claims and links to related articles, code, notebooks, or projects where they exist.

## Scientific figures

Prefer figures that carry information: radiation patterns, annotated schematics, field distributions, spectra, measurement curves, and comparisons with theory or simulation. Use readable axes, units, legends, captions, and text alternatives. Captions explain the setup, source, important parameter choices, and intended observation. State whether data is measured, simulated, calculated, or illustrative. Check both themes and narrow screens. Preserve provenance and reproducible generation scripts/data when possible. AI-created artwork is not evidence of a physical or numerical result.

## Interactive examples

Explain what changing each control demonstrates. Label controls programmatically, include units, and handle the model's boundary cases honestly. Provide a static explanation or representative figure when JavaScript, loading, or computation fails. Avoid implying that a simple analytical demo is a validated engineering design tool.

## Publication workflow

Create MDX under `src/content/blog/<category>/`. The current schema requires `title`, `date`, `category`, and `description`; tags are optional and `draft` currently defaults to false, so always set `draft: true` explicitly while writing. Learning goals, prerequisites, assumptions, related-post references, supporting material, and bibliographic references are optional typed fields with empty defaults. Figure and citation components and collapsed contents are implemented. See [the authoring guide](article-authoring.md) and [draft template](templates/article.mdx). RSS summaries and static full-text search are implemented; see [discovery behavior](search-and-rss.md).

Choose stable category slugs from `src/lib/topics.ts`; only topics with published content appear in public filters. Article URLs include the category, for example `/blog/rf/transmission-line-theory`. From an article in a category subdirectory, component imports currently use `../../../components/...`.

Before publishing: review mathematical/scientific accuracy and citations; run the production build; check equations, figures, tables, code, links, interactive behavior, and mobile reading. Verify draft exclusion from every index and feed. Set a genuine publication date and remove draft status only when the piece is ready.

The owner chose to retain all five original articles as public demos. They use `demo: true`, with labels in listings, article headers, related cards, search and RSS. Their URLs and existing dates are retained. Demo status is independent of draft status and does not certify review. Phase 5 corrected the transmission-line short-circuit quarter-wave statement and infinite-VSWR handling, uniform-array steering/sidelobe/beamwidth claims, Gaussian model scope and radius-versus-diameter wording, and DFT scaling/window limitations. Independent model identities and boundary checks now cover those teaching examples. Broader editorial review, physical validation, and the overly general ML claims remain pending; these targeted fixes are not a completed scientific audit.

## Professional context

About uses the FraH90 handle and the owner-confirmed background “electronic engineer,” with the stated interdisciplinary interests and exploratory agentic/IC-design direction. The owner does not want a personal name or contacts published. Do not restore a contact panel, email link, or GitHub profile contact link. Repository links may identify inspectable source code. Only list additional tools, experience or project outcomes the author confirms. CV publication remains deferred.

Public classification uses multiple registered tags. The legacy category field only preserves URL grouping. Choose appropriate article-owned preview media and label calculated/illustrative material honestly; animated previews require deliberate playback and a static alternative. See [tags and previews](tags-and-previews.md).
