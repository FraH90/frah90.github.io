# Reading proportions and controls review

Measured 2026-10-28 in local Chromium at a 1440 × 1000 CSS-pixel viewport and default browser scale. These are samples of individual articles, not universal site-wide specifications. Computed paragraph sizes are rounded; different typefaces have different apparent sizes. Lead paragraphs and captions are excluded from the body comparison. Analog Devices denied browser access, so no measurement is claimed for it.

| Sample article | Body font / line height | Paragraph width |
| --- | --- | --- |
| Current frah90 | Lora, 19.84 / 34.72px | 1024px |
| [Oxide](https://oxide.computer/blog/voxel-labs) | Suisse Intl, 16 / 24px | 793px |
| [Anthropic](https://www.anthropic.com/research/redesigning-source-control) | Anthropic Serif, 16.69 / 25.53px | 625px |
| [Google Research](https://research.google/blog/the-sleep-framework-a-new-way-for-llms-to-retain-knowledge-in-continual-learning/) | Google Sans Flex, 17.5 / 25.4px | 1296px |
| [DeepMind](https://deepmind.google/blog/beyond-tree-cover-mapping-the-worlds-forest-types/) | Google Sans Flex, 17.5 / 25.38px | 624px |
| [Spotify](https://engineering.atspotify.com/2026/9/why-spotify-is-not-using-bayesian-a-b-testing) | 18 / 27px | 772px |
| [Cloudflare](https://blog.cloudflare.com/origin-range-requests/) | Inter, 16 / 28px | 715px |
| [GitHub](https://github.blog/engineering/how-we-use-github-to-be-more-productive-collaborative-and-secure/) | Mona Sans, 18 / 30px | 699px |
| [Quanta](https://www.quantamagazine.org/how-voting-is-like-a-klein-bottle-20261026/) | Merriweather, 16 / 30px | 560px |
| [IEEE Spectrum](https://spectrum.ieee.org/magnetic) | Ivar Text, 24 / 36px | 790px |
| [Analog Dialogue](https://www.analog.com/en/resources/technical-articles/characteristics-and-industrial-measurement-analysis.html) | Browser access denied | Unmeasured |

## Current behavior

The site shell stops growing at 64rem (1024px with a 16px root), while gutters adapt to viewport width. Article prose currently fills that shell. The effective article rule at the end of global.css overrides the earlier generic article-content rule: font-size is clamp(1.0625rem, .97rem + .3vw, 1.25rem), with line-height 1.75. At 390px, prose measures 17px with a 29.75px line height in a 350px column; at 320px the column is 280px. Desktop title size is 36px, phone title size 30px. Zoom and user font settings can alter the rendered result. Article height depends on its content; a fixed aspect ratio is not a useful constraint for a whole article.

## Recommendations for owner review

These are recommendations, not newly approved layout changes. The ledger owns the remaining decision.

A useful comparison would be 18px desktop prose, line-height about 1.65–1.75, and a 760–800px prose column while keeping figures/applets up to the existing 1024px. This would revise the earlier same-width prose/figure choice. If shared edges are preferred, an approximately 880px common reading/figure canvas is a reasonable comparison variant. Reducing the font while retaining 1024px prose would lengthen the lines further.

A desktop Explore panel could reserve space like Contents, retaining a modal overlay on phones. Opening both panels together should not squeeze plots into a narrow middle strip; define mutual exclusion or a minimum reading width. Current modal Explore behavior remains in place pending that choice.

For control placement, mirrored outline/discovery controls near the viewport edges make their spatial roles clear. A slim full-width header is a cleaner place to anchor them than unrelated floating positions; keep the brand and reading links visually tied to the central content. Phones need normal reachable header controls rather than a permanent pair of side rails. Position and layer choices should be assessed together at wide, laptop and phone widths.

## Configuration versus dashboard

Width/color tokens already exist in global.css; effective type sizing and spacing still have component-specific rules. A dedicated design-token stylesheet could consolidate the supported settings (prose/figure widths, typography, spacing, panel widths) without adding an admin application. A repository file would be edited here and published by the existing build; it would not be a private secret store or a file visitors can overwrite.

An optional local-only style preview could later expose sliders and export chosen settings. A dashboard served on the public site would need real access control and a service to persist edits; hiding its route would not make it private. GitHub Pages itself publishes static files, so a browser-only settings form cannot save repository defaults by itself. See [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

## Delivered footer refinement

The article-end All writing link is removed. The shared footer uses a 12px label, a 44px interaction row and 8px vertical padding, yielding 61px including its border. About/RSS links retain 44px targets, muted contrast and visible keyboard focus. The footer remains present; removal has not been requested as a firm decision.

## Owner-selected trial — 2026-10-28

The owner selected the 880px shared column and 18px/30px prose trial, paired desktop panels with mirrored slide motion, viewport-edge header controls, an applet-header expand/restore control and a single central settings file. These supersede the earlier measured frah90 baseline above. Reference-site measurements remain historical observations; the unresolved final design review is still tracked in the primary roadmap.

The applet maximum defaults to 1280px and contracts to fit available space; height remains unchanged. On phones the control may add no width when the shared column already fills available space. Settings are repository defaults, not a private dashboard or per-reader preference UI.
