# Tags, media cards and the featured article

## Public taxonomy

Articles use multiple canonical slugs in `tags`. `src/lib/tags.ts` owns readable labels, ordering and colors; broad tags reuse the established zinc-theme topic accents. Add a registry entry before using a new tag. The schema rejects unknown slugs and published articles without tags. The former `signal-processing` alias in the ML demo is normalized to `dsp`, so there is one Signal Processing destination. Drafts may not populate public tag navigation or generate tag pages.

`/tags/<slug>` lists every published article carrying that tag, regardless of its legacy URL group. Explore, cards, article headers, related content, search metadata/results and RSS consume the same tags. RSS uses repeated standard category elements for tags and retains the independent Demo label.

The `category` field is retained solely for compatibility/authoring URL groups, and original article IDs/URLs remain unchanged. Old `/blog/<category>` index routes redirect to their corresponding tag archives and are excluded from the sitemap. The draft command retains its `<url-group>/<slug>` path and seeds a matching broad tag; authors can add any other registered tags. Related reading now ranks shared tags rather than assigning extra weight to one category.

## Archive hierarchy

The archive has a compact Blog heading, then the latest eligible article as a larger feature, followed by the remaining articles in a three-column media grid (two columns on tablets, one on phones). The feature is selected by the existing deterministic date/ID ordering, never from a draft. It is labeled Featured demo when appropriate; this does not claim peer review or original research. There is no author/CV introduction, article count or horizontal topic strip.

The array feature offers a lightweight steering preview, precomputed from the existing uniform-array model at seven scan angles. Its native slider swaps build-time SVG paths; no Plotly or React engine is loaded on the archive. The static 90° reference remains with scripts disabled. This is a preview of the retained demo, not a new substantive article or measurement. When a different article becomes latest, its own media takes this position.

Current landscape preview proportions are a trial: `--card-media-ratio: 8 / 5` in `src/styles/settings.css`; `1 / 1` tries square media without changing the card structure. `--archive-width` controls the archive canvas independently of the 880px reading canvas. Article typography, Plotly demos and the About page retain their existing design.

Cards show date, Demo status, title, description and colored outlined tag badges. One title link covers the card; individual tag links and media controls remain separate keyboard/pointer targets, avoiding nested links. Tag pages omit the feature and show all matching articles. The final design decision remains open for owner review.

## Media authoring

`ArticlePreview.astro` is the shared media boundary for featured and grid cards. Prefer an image/figure belonging to the article, with provenance and scientific context in the article. The four scientific demos use calculated SVG previews from their existing models; the ML demo uses an explicitly illustrative workflow diagram, not invented results. Articles without media receive a plain typographic fallback.

```yaml
preview:
  kind: image
  src: /images/my-article/figure.webp
  alt: Describe the scientific content of the image.
  width: 1200
  height: 750
```

Animated GIFs require a still poster and an explicit play/pause control:

```yaml
preview:
  kind: gif
  src: /images/my-article/animation.gif
  poster: /images/my-article/still.webp
  alt: Describe what the animation demonstrates.
  width: 1200
  height: 750
```

The poster is the initial and no-script state. Animation starts only on request, can be stopped, and resets on reduced-motion preference changes or when the page becomes hidden. Native video previews use `kind: video`, `src`, `poster`, and `alt`, with controls, inline playback and metadata preload; no autoplay is used. `coverImage` remains a basic image fallback for older metadata; prefer the typed `preview` field. No sample media URLs are published unless their files actually exist.

For a custom library-driven preview, extend the shared Astro media component with an explicit browser-safe renderer and static fallback, as done by the built-in steering preview. Arbitrary HTML/scripts are not accepted through frontmatter. Keep expensive libraries off archive pages unless separately justified and budgeted; never present decorative animation as scientific evidence.
