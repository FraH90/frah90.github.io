# Responsive proportional expansion

The owner-selected trial uses a maximum scale of 1.5 in **both** chart dimensions. This replaces the earlier independent frame-width and height limits. Axis fonts, control sizes and scientific values retain their normal sizes.

The fitting rule is:

```text
scale = max(1, min(maximumScale,
                   availablePlotWidth / normalPlotWidth,
                   availablePlotHeight / tallestNormalPlotHeight))
expandedChartWidth  = normalChartWidth × scale
expandedChartHeight = normalChartHeight × scale
```

Normal width is measured from the current article column, excluding frame borders/padding. Available width excludes viewport gutters and any docked panel. Available height is the browser viewport height minus the site header, applet title bar and configured vertical breathing room. For the Fourier pair, the tallest normal plot determines a single common factor for both plots. Individual plots fit that height budget; controls and stacked plots can still require normal page scrolling. Normal charts are never shrunk to fit a short viewport.

At full available size a normal 838 × 384px chart becomes 1257 × 576px. If only 1100px of chart width is available, the factor drops to about 1.313 and height becomes about 504px. If height is the tighter limit, the same reduced factor applies to width. A phone chart already filling its column usually has no room to grow while preserving proportions, so the expand control is disabled with an explanation.

`src/lib/viewport.ts` reads browser layout dimensions in CSS pixels; browser zoom, split windows and window resizing affect these dimensions. Physical screen resolution and pixel density are not layout constraints. CSS length tokens (including clamp/rem) are measured through one hidden, noninteractive probe. No dimensions are stored or sent anywhere.

`src/lib/demo-expansion.ts` observes the normal column and main reading area, listens for window resize and demo mounting, and updates shared size variables. Plotly's ResizeObserver follows the resulting chart geometry through coalesced relayout updates, without the built-in resize debounce. Panel animation and expansion can interpolate sizes; the final settled dimensions use the common factor. Dismissal, Escape and the restore control return to normal geometry without resetting scientific controls. Reduced-motion settings disable transitions. No-JavaScript and failed demos retain static figures and hide the unavailable expansion control.

Settings live in `src/styles/settings.css`: `--plot-max-scale`, `--plot-viewport-padding`, normal height presets, and shared page gutters. The default plot heights remain 384px desktop / 288px phones and 192/256px for the Fourier pair.

Plot expansion has separate motion settings (`--plot-duration`, `--plot-easing`): a 420ms ease-in-out trial starts and finishes gently, while panels retain their own timing. Geometry updates are coalesced to animation frames with one Plotly relayout in flight, and the latest size is applied after pending work completes.
