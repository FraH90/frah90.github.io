# Visual guidelines

These are the current design trials from the owner's 2026-11-02 feedback. Implementation follows these rules; final visual approval remains open in the primary roadmap. Change centralized dimensions in `src/styles/settings.css` rather than scattering new widths or colors through components.

## Proportions and navigation

Use a wider archive canvas (1216px maximum) for media and the grid, and the existing 880px article canvas for reading and applets. Consistency means shared spacing, hierarchy and aligned edges within each view, rather than forcing every page into one width. On roomy desktop screens, header identity/navigation align with the current canvas; outline/Explore controls remain at viewport edges. On smaller screens, reserve space for usable controls instead of forcing desktop alignment. Docked desktop panels reserve content space and the header follows that available space. Keep the slim header and established panel motion.

## Media is an article-owned slot

`ArticlePreview.astro` is the shared boundary for feature and grid media. An article can supply a typed image, GIF with still poster, or video. A custom interactive preview requires an explicit browser-safe renderer with a static alternative. These types are supported now; authors do not need to redesign cards when adding their own assets. See [media metadata](tags-and-previews.md).

Keep controls within the interactive preview frame. Use compact labels, thin tracks and small monospace readouts, consistent with the article demos. A preview can use a lighter engine or simpler interaction, but must retain readable axes/units, correct data, accessible context and valid boundary cases. Do not display redundant titles or both axis zero labels. Do not decimate data differently after the reader touches a control: the array preview now uses the same 721-point model before/after steering, with one-degree controls and frame-coalesced drawing. Do not smooth curves in a way that changes their numerical meaning.

Do not autoplay GIF/video or decorative motion. Keep a still/no-JavaScript alternative and playback controls independent of the article link. Source figures from the work, not invented measurements. Label calculated and illustrative material honestly. Keep heavyweight Plotly/React demo engines off the archive unless justified by a measured need. Article demos keep their established Plotly presentation and scientific models.

## Quiet metadata

Use one broad primary category from the topic registry for each article: Antennas & Arrays, RF & Microwave, Optics & Photonics, Signal Processing or Machine Learning as applicable. The category is a small colored text link; it is not a large badge. Keep publication date and Demo status beside it in a compact metadata row. Tags are optional for presentation: use zero to two specific concepts or methods when they help discovery, such as FFT or windowing. Do not tag every keyword or infer expertise from a software/library name. Tags use small neutral, low-contrast borders and never compete with the title.

On articles, put the tag row below the title/description. On cards and the feature, place it after the description. Explore starts with search and a short category list; specific tags remain in a collapsed native disclosure. Do not create a tall wall of colorful category/tag rows. Preserve useful inbound links through compatibility routes or explicit redirects when pruning taxonomy.

## Focus and interaction

Never draw a large accent-colored frame around an entire article card. Keyboard focus uses a title underline for cards and small neutral outlines for controls and links. Preserve native focus, keyboard activation and modal focus handling. Pointer/touch interaction must not leave keyboard-style frames behind; switching back to the keyboard restores visible cues. Keep adequate hit areas even when labels are visually small. Hover is an enhancement, not required navigation.

Demo explanations are transient hover/focus/tap tooltips. Keep them within the metadata row's available width so even hidden tooltip geometry cannot widen the page. Keep tag/category links and media controls independently operable; no nested links or repeated Read article button.

## Review before delivery

Check desktop/phone widths, both themes, keyboard/touch media interaction and focus, no-JavaScript navigation/static media, media failure, scientific labels and published/draft routes. Use actual browser measurements for alignment/overflow and view screenshots. Record verified behavior and any physical-device or owner-media limitations in the ledger. A successful implementation check does not replace the owner's final design review.
