# Interactive demos

## Current owner decision — original Plotly presentation

On 2026-10-21 the owner reviewed an equal-width comparison and explicitly chose the original demo design for all demos, requesting only missing axis names. Live controls now use the original compact arrangement, thin sliders, monospace readouts and Plotly plot types. Standard plots are 384px tall on desktop / 288px on phones; Fourier retains 192px time and 256px bar-spectrum panels. No added explanatory paragraphs or standalone legends sit inside the live boxes. Existing article assumptions/references remain.

`PlotlyChart.tsx` converts axis title strings into `{ text }` objects so labels actually render with the installed engine. It applies semantic theme colors. Shared verified models retain corrected Fourier one-sided/window normalization, DC/Nyquist treatment, true infinite VSWR, Gaussian divergence convention and safe array steering limits. The displayed broadside beamwidth estimate uses 50.8/(N d/λ) degrees; the original 102 coefficient was incorrect for half-power width.

Automatic loading preserves the calculated static reference until every Plotly chart reports a completed draw. Imports/render failures and the 15-second timeout retain the reference and Retry control. No JavaScript still provides static SVG figures and model context. Ordinary pages never request Plotly. The production engine is capped at 5 MiB decoded / 1600 KiB gzip; all application JS at 6 MiB / 1800 KiB, controller at 3 KiB gzip and article HTML at 32 KiB gzip. This deliberately supersedes the much smaller SVG payload budget because the owner selected Plotly. Run `npm run build`, `npm run check:build`, and `npm run check:demos`.

The subsequent mobile array correction removes its redundant title, puts `|AF|` horizontally above the y-axis, narrows margins and phone padding, and uses 288px below the `sm` breakpoint. dB mode says `|AF| (dB)`. Fixed axis ranges prevent accidental touch zoom from introducing unused negative amplitude space. Desktop remains 384px; other demos keep their restored presentation.

## Historical SVG implementation record (superseded)

The following records the earlier SVG replacement and its measurements. Its renderer, controls and payload policy are historical, not current requirements.

### Archived teaching-example notes

## Scope and scientific boundaries

Four published trial articles use `InteractiveDemo.astro`: array factor, transmission line, ideal Gaussian propagation, and spectral leakage. The frame renders calculated reference figures and observations at build time. The same pure TypeScript models and chart specifications drive optional React controls. No measured dataset or validated engineering design is implied. Keep model assumptions, units, normalization and angle conventions next to the example.

The unused `ModeProfileViewer.tsx` is an exploratory fixture with unvalidated Bessel/eigenvalue approximations. It is not imported by public routes, indexed, or treated as a solver. Its legacy Plotly wrapper remains in source but is absent from the published JavaScript. Publishing a mode solver requires separate numerical/reference work.

## Measured baseline and optimization decision

Measured on 2026-10-20 in Chromium, ARM64 sandbox, production preview, new page/browser cache per route, unthrottled local network. These are container observations, not field-user or mobile hardware performance guarantees. Resource Timing `encodedBodySize` reports compressed response-body bytes; `decodedBodySize` reports decoded bytes; neither includes all connection or response-header overhead. Inline theme/article scripts, CSS, HTML and fonts are outside the JavaScript response-body totals below.

| Article | Previous eager JS encoded / decoded bytes | Previous document-to-first-plot | New JS encoded / decoded after activation | New click-to-ready |
| --- | ---: | ---: | ---: | ---: |
| Array factor | 1,526,124 / 5,005,713 | 1,836 ms | 66,804 / 204,907 | 99 ms |
| Spectral leakage | 1,526,340 / 5,006,911 | 1,901 ms | 66,794 / 204,902 | 94 ms |
| Gaussian beam | 1,525,973 / 5,005,617 | 1,802 ms | 66,615 / 204,591 | 102 ms |
| Transmission line | 1,526,088 / 5,005,824 | 1,805 ms | 66,680 / 204,773 | 99 ms |

The following activation measurements describe the previous click-to-load implementation, superseded by automatic loading on 2026-10-21. They are historical, not current navigation timings.

The previous Plotly chunk alone was 1,461,514 encoded / 4,805,636 decoded bytes. Initial script execution in the old demos was about 1.28–1.30 seconds. Writing and the non-demo ML article fetched no external application-JS resource in that baseline. The new demo controller is approximately 1.6 KB gzip / 3.6 KB decoded before activation; no React renderer or demo code is requested until the reader loads a demo. Activated totals above include that controller and the chosen demo's dependencies. The new click timing and previous navigation timing start at different events; they are not a controlled user-experience speedup ratio. All four model bundles together remain below the budget below. Minor loader/error-message changes can shift exact bytes from these recorded measurements; checks use ceilings rather than fixed hashes.

These curves and spectra need axes, legends, units, accessible explanations and parameter updates. Native SVG provides those with no new dependency and substantially less loading/initialization work. It intentionally omits Plotly pan/zoom, hover inspection, and modebar controls. At small widths charts scroll locally at a readable minimum width; the frame explains that behavior. Do not use this renderer as a general substitute for 3D, large datasets, or interactive scientific analysis.

## Budgets

Payload/model ceilings were established with the replacement; automatic entry loading supersedes the original activation policy on 2026-10-21:

- Load the chosen React demo automatically on article entry; the controller must stay below 3 KiB gzip. Ordinary pages must not request demo code.
- All emitted application JavaScript under `dist/_astro/` combined must stay at or below 250 KiB decoded / 80 KiB gzip. This is stricter than a per-demo cap and excludes the separately lazy Pagefind engine.
- No Plotly chunk in the current published build.
- Each of the four article documents, including reference SVGs, at or below 32 KiB gzip.
- The 512-point direct DFT at or below 50 ms p95 in 30 local Node runs. This guards an obvious regression; it is not a universal frame-time promise on slow devices.
- A stalled activation returns to a readable reference/error state after 15 seconds. Later completion must not replace that state unexpectedly.

Run `npm run build`, `npm run check:build`, and `npm run check:demos`. The latter checks independent numerical identities and the generated payload/document ceilings. Network and UI behavior require browser checks as well. The current full application set measures about 211 KB decoded / 70 KB gzip, with a local DFT p95 around 8 ms. No new library was installed into the application.

## Loading, failure and lifecycle

`InteractiveDemo.astro` emits static SVG, a parameter statement, model description and observation. Its small controller automatically imports only the relevant demo plus `demo-mount.tsx`. A loading announcement keeps the static example visible. After React commits, the reference and status hide without moving focus or scrolling. Normal operation shows no load button or reference toggle. Failure preserves the reference and offers Retry demo; only a manual successful retry focuses the controls. Without JavaScript, the static reference remains readable.

Dynamic import, React root rendering, and timeout failures restore the static case and a retry control. A timed-out import cannot mount later because each activation carries a generation counter. Unmounts clean up roots; pagehide preserves browser-cache entries and releases a leaving page's root. No chart engines, global theme listeners or resize observers are needed by native SVG. Theme tokens update its strokes/text while control values and paths remain intact.

The React root owns an initially empty live container only; it never clears Astro's static reference. This follows [React's partial-page createRoot guidance](https://react.dev/reference/react-dom/client/createRoot). Error callbacks dispose the failed root after its commit instead of synchronously unmounting during React work. With JavaScript disabled or even the loader blocked, the figures and explanatory text remain useful and no dead start button appears.

## Numerical checks and targeted corrections

- Array factor: compare direct phasor summation with the closed-form uniform-array expression; test broadside, nulls, invalid principal steering and multiple visible in-phase orders. Broadside is 90° from the array axis. The old beamwidth readout was removed; article text now limits the 50.8°/(N·d/λ) approximation to sufficiently long broadside arrays. Uniform weighting does not make sidelobes arbitrarily small with increasing N. Exact half-wave endfire has an opposite-end ambiguity. The phase control uses integer degrees, converted to radians in the model, so zero and both ±π endpoints are representable without range-step drift.
- Transmission line: test match, 100 Ω on 50 Ω, short, passive reactive loads, and the analytic ideal-open Γ = +1 boundary. Short/reactive loads show true infinite VSWR. A short has a voltage null at the load and maximum λ/4 away. A finite maximum slider resistance is not called an ideal open circuit.
- Gaussian beam: test waist value, √2 radius at the Rayleigh range, propagation symmetry, and positive finite control endpoints. Radius and divergence half-angle use consistent paraxial conventions. High-divergence settings show a model-limit warning at λ/(πw₀) > 0.1 rad; this is a conservative explanatory threshold, not a sharp validity boundary. The standalone reference-data generator uses the same paraxial half-angle convention. Radius is distinguished from mode-field diameter in the article.
- DFT: test zero input, DC, Nyquist, coherent sinusoid amplitude and off-bin distant leakage. One-sided amplitudes are normalized by the sum of window weights; non-endpoint bins are doubled. The N/2+1 output now includes Nyquist and has matching frequency/amplitude lengths. Symmetric Hann/Hamming/Blackman windows use N−1. Coherent gain correction does not remove scalloping or broadened main lobes.

Primary references: [Ellingson's standing waves](https://phys.libretexts.org/Bookshelves/Electricity_and_Magnetism/Electromagnetics_I_(Ellingson)/03%3A_Transmission_Lines/3.13%3A_Standing_Waves), [standing-wave ratio](https://phys.libretexts.org/Bookshelves/Electricity_and_Magnetism/Electromagnetics_I_(Ellingson)/03%3A_Transmission_Lines/3.14%3A_Standing_Wave_Ratio), [Bevelacqua's uniform arrays](https://www.antenna-theory.com/arrays/weights/uniform.php) and [grating lobes](https://www.antenna-theory.com/arrays/weights/gratinglobes.php), [MIT Gaussian beam lecture](https://ocw.mit.edu/courses/6-974-fundamentals-of-photonics-quantum-electronics-spring-2006/871c32e6e4a44cbb1546741ef06f0f2f_parax_wav_eq_gau.pdf), and [SciPy spectral analysis](https://docs.scipy.org/doc/scipy/tutorial/signal.html#spectral-analysis). The articles link their relevant sources through typed references. These checks verify representative ideal models; broader editorial review and publication decisions remain in Phase 6.

## Owner visual correction — 2026-10-21

Automatic loading is the current product decision. The initial bundle now includes React and the selected demo; the historical click-to-ready timings above do not apply. The complete application set remains under 250 KiB decoded / 80 KiB gzip. Charts use 960×360 geometry with 200/250-high stacked Fourier panels, 16-unit labels, and local scrolling below a 48rem minimum plot width. Article prose shares the applet shell.

Production browser review on 2026-10-21 covered all four demos at 1440px and 390px in both themes: automatic controls, matched prose/applet edges, no page overflow or initial focus/scroll movement, keyboard contents/control endpoints, and axe WCAG A/AA checks passed. Dark/light screenshots were inspected. Separate checks passed for no JavaScript, blocked controller/module, simulated React render failure, timeout with late completion, retry fallback and theme persistence. These are local Chromium checks, not a claim of every browser/device or owner visual approval.

## Shared compact live-plot layout — 2026-10-21

After reviewing the phone array layout, the owner requested the same changes for all plots in all articles, plus hiding the duplicated y-axis zero and reclaiming more horizontal space. `PlotlyChart` now suppresses visible plot titles, derives a horizontal y-axis annotation from the semantic axis name, locks gesture zoom, and uses tight margins. Plotly `labelalias` hides only the y-axis zero text: its gridline and numerical data are unchanged. All live demo frames use 8px phone padding (20px desktop). The array left margin is 26px, transmission 30px, and other plots 36px to accommodate signed tick values. Standard phone plots are 288px; Fourier preserves its 192/256px panels. Labels are `|AF|`, `|AF| (dB)`, `±w (µm)`, `|V| / |V⁺|`, `Amplitude (a.u.)` and `|X| (a.u.)`.

## Optional width expansion — 2026-10-28

Each applet header has a progressive expand/restore icon on the right. Normal applets align to the 880px article canvas. Expanded applets grow up to the configured maximum (1280px by default), bounded by viewport gutters and any reserved side panel. Controls and all plots in a multi-plot demo expand together; labels, units and scientific data remain unchanged. Expanded live plot heights use the configured 1.5× scale; collapsing restores the original heights. The shared ResizeObserver updates Plotly after container changes. The button is hidden without scripts; static/no-JavaScript/failure figures remain readable. Width motion respects reduced-motion settings.

The current 1.5× height trial yields 576px desktop / 432px phone live plots, and 288px/384px for the Fourier pair. This enlarges the plotting area without scaling axis fonts or controls. Outside page clicks restore all expanded applets; clicks on plot/control/panel contents are retained. No-JavaScript disclosure requires manual collapse.

The proportional follow-up supersedes independent expanded width/height settings: both chart dimensions now use one factor capped at 1.5×, reduced according to available browser width/height and docked panels. See [responsive plot expansion](responsive-plots.md). Normal sizes and scientific data are preserved; when there is no room to enlarge, the control is disabled with an explanation.
