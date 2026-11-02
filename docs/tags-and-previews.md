# Tags, media cards and the featured article

## Categories and specific tags

`category` is now the primary public subject as well as the stable URL group. `src/lib/topics.ts` owns category labels/colors; category archives live at `/categories/<slug>`. Original article URLs remain unchanged. The draft command still uses `<url-group>/<slug>` and seeds the broad topic slug for compatibility. Public articles require at least one registered tag in the existing schema; that can be their broad topic slug, with no specific tags shown.

`src/lib/tags.ts` owns canonical tag labels and colors. Broad topic slugs remain valid for existing `/tags/<slug>` links and cross-subject classification; specific tags have an explicit parent category and appear only inside the category disclosure. The ML demo retains its legacy DSP association, while its primary category is Machine Learning. Category archives use the primary category; legacy broad tag archives may span categories. Search uses the same category disclosure for the primary category and its specific tags; related content and RSS retain canonical metadata.

The demo tags were pruned to one specific tag for array/RF/optics, FFT and windowing for DSP, and no specific tags for ML. Eight previously public, redundant tags redirect to the corresponding populated category through `retiredTagCategories`. Explicitly reusing a registered tag takes precedence over its retirement redirect. Unpopulated categories and draft-only tags do not create public archives. Redirects are excluded from the sitemap; old `/blog/<category>` indexes now redirect to category archives. Preserve these compatibility paths when evolving the taxonomy.

Explore shows search and five category-name links; clicking their plus sign or blank row area expands the specific published tags. Remove redundant All articles / All [category] articles rows. Cards/articles/search show only a colored category badge and date. The badge reveals this article’s category-tinted specific tags and neutral-gray Demo status. Specific links narrow the category through `/categories/<category>/<tag>`; Demo remains neutral gray editorial status inside the article disclosure and is not an available refinement. Mouse hover enhances native click/tap/keyboard disclosure; all links work without JavaScript. See [visual guidelines](visual-guidelines.md).

## Archive hierarchy

The archive has a compact Blog heading, then the latest eligible article as a larger feature, followed by the remaining articles in a three-column media grid (two columns on tablets, one on phones). The feature is selected by the existing deterministic date/ID ordering, never from a draft. A small Demo label identifies demo status without repeating a featured-demo heading; it does not claim peer review or original research. There is no author/CV introduction, article count or horizontal topic strip.

The array feature offers a lightweight steering preview from the existing uniform-array model, using all 721 samples for its initial reference and every update. Its integrated thin native slider selects 45–135° in one-degree steps; drawing is coalesced to animation frames. No Plotly or React engine is loaded on the archive. The static 90° reference remains with scripts disabled. This is a preview of the retained demo, not a new substantive article or measurement. When a different article becomes latest, its own media takes this position.

Current landscape preview proportions are a trial: `--card-media-ratio: 8 / 5` in `src/styles/settings.css`; `1 / 1` tries square media without changing the card structure. `--archive-width` controls the archive canvas independently of the 880px reading canvas. Article typography, Plotly demos and the About page retain their existing design.

Cards show category/date metadata, title and description; tags and Demo are inside the category disclosure. One title link covers the card; individual tag links and media controls remain separate keyboard/pointer targets, avoiding nested links. Tag pages omit the feature and show all matching articles. The final design decision remains open for owner review.

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

## Refinement generation

`getCategoryRefinements` shares publication-scoped category options between Explore and static routes. Draft-only tags, empty categories do not create filter pages. The tag registry owns parent categories; the topic registry owns category colors/tokens. Demo is a special status, never a selectable filter or category-owned tag. Earlier category/Demo filter URLs redirect to the parent category and are absent from the sitemap. Legacy broad tags remain compatible metadata and global archives, but are not displayed as specific child tags.
