# frah90.github.io

Technical portfolio and interactive engineering blog.
Live at **https://frah90.github.io**

Topics: antennas & phased arrays, RF & transmission lines, photonics & optics, signal processing, DSP, machine learning on signal data.

---

## Technology Rationale

| Layer | Choice | Why |
|---|---|---|
| Site framework | **Astro** (static output) | Islands architecture — static HTML by default, React hydrates only where needed |
| UI components | **React** (islands only) | Interactive demos, sliders, plots. Never a full SPA — Astro handles routing |
| Styling | **Tailwind CSS v4** | `@tailwindcss/vite` integration, no config file needed, utility-first |
| Articles | **MDX** | Markdown with embedded React components — write prose, drop in live demos |
| Math | **KaTeX** via `remark-math` + `rehype-katex` | Renders at build time → no runtime JS loading, fast, small CSS |
| Plots | **Plotly.js** (primary), D3, Three.js, p5.js | Per-demo choice. Plotly via dynamic `import()` inside `useEffect` to avoid SSR crash |
| Content typing | **Astro Content Collections + Zod** | Type-safe frontmatter, categories enforced at build time |
| Hosting | **GitHub Pages** (user site) | Free, version-controlled, no base path needed |
| Deploy | **GitHub Actions** `deploy-pages@v4` | Auto-deploy on push to `main` |

### Key architectural decisions

**Why `client:only="react"` for demo components** — Plotly, Three.js, and p5.js access `window`/`document` at module scope. Astro's build-time SSR would crash on this. `client:only` skips server-side rendering entirely for those components, running them only in the browser.

**Why dynamic `import()` for Plotly inside `useEffect`** — even with `client:only`, Plotly is ~3 MB. A dynamic import means it is loaded only when the component mounts, not blocking the initial page render.

**Why precomputed JSON instead of server-side computation** — GitHub Pages is static-only. Heavy numerical work (antenna sweeps, mode solving) runs locally in Python, outputs JSON, and the JSON is committed to the repo. The browser loads the JSON for the initial render; sliders drive fast client-side recomputation for interactivity.

---

## Architecture

```
frah90.github.io/
├── .github/workflows/deploy.yml     # GitHub Actions CI/CD
├── public/
│   ├── favicon.svg
│   ├── cv.pdf
│   └── data/                        # precomputed JSON — served verbatim
│       ├── array-factor/default.json
│       └── gaussian-beam/default.json
├── scripts/                         # Python scripts that generate public/data/**
│   ├── generate_array_factor.py
│   ├── generate_gaussian_beam.py
│   └── README.md
├── src/
│   ├── content/
│   │   ├── config.ts                # Zod schemas for blog + demos collections
│   │   ├── blog/                    # .md and .mdx articles (subfolder = category)
│   │   │   ├── antennas/
│   │   │   ├── ml/
│   │   │   ├── rf/
│   │   │   ├── optics/
│   │   │   ├── dsp/
│   │   │   └── misc/
│   │   └── demos/                   # metadata stubs for each demo
│   ├── layouts/
│   │   ├── BaseLayout.astro         # HTML shell, nav, footer
│   │   ├── BlogPostLayout.astro     # article chrome (title, date, category, tags, prose)
│   │   └── DemoPageLayout.astro     # named slots: intro, equations, demo, interpretation
│   ├── components/
│   │   ├── nav/Header.astro
│   │   ├── blog/PostCard.astro
│   │   ├── demos/                   # React islands (client:only="react")
│   │   │   ├── ArrayFactorDemo.tsx
│   │   │   ├── FourierTransformDemo.tsx
│   │   │   ├── TransmissionLineDemo.tsx
│   │   │   ├── GaussianBeamDemo.tsx
│   │   │   └── ModeProfileViewer.tsx
│   │   └── ui/
│   │       ├── Slider.tsx           # reusable controlled range input
│   │       └── PlotlyChart.tsx      # dynamic-import Plotly wrapper
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── skills.astro
│   │   ├── projects.astro
│   │   ├── contact.astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   ├── [slug].astro         # getStaticPaths from blog collection
│   │   │   └── [category]/index.astro
│   │   └── demos/
│   │       ├── index.astro
│   │       ├── array-factor-demo.astro
│   │       ├── fourier-transform-demo.astro
│   │       ├── transmission-line-demo.astro
│   │       ├── gaussian-beam-demo.astro
│   │       └── mode-profile-viewer.astro
│   ├── lib/
│   │   ├── posts.ts                 # getCollection helpers for blog
│   │   └── demos.ts                 # getCollection helpers for demos
│   └── styles/global.css            # Tailwind + KaTeX CSS import
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

**Build pipeline:**
```
src/ + public/  →  npm run build  →  dist/  →  GitHub Actions  →  GitHub Pages
```

---

## Local Development

**Prerequisites:** Node >= 20, npm >= 9

```bash
# Install dependencies
npm install

# Start dev server (hot reload)
npm run dev
# -> http://localhost:4321

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## How to Add a Blog Post

1. Create a `.mdx` file in `src/content/blog/<category>/`:
   ```
   src/content/blog/rf/my-new-article.mdx
   ```

2. Add frontmatter (all fields required unless marked optional):
   ```yaml
   ---
   title: My Article Title
   date: 2026-06-01
   category: rf              # must match enum in config.ts
   description: One sentence.
   tags: [tag1, tag2]        # optional
   draft: false              # set true to hide from production
   coverImage: /images/cover.png  # optional
   ---
   ```

3. Write content in Markdown + MDX:

   **Math (KaTeX):**
   ```mdx
   Inline: $E = mc^2$

   Display block:
   $$
   \nabla \times \mathbf{B} = \mu_0 \mathbf{J}
   $$
   ```

   **Embed a Plotly chart:**
   ```mdx
   import PlotlyChart from '../../components/ui/PlotlyChart';

   <PlotlyChart
     client:only="react"
     data={[{ x: [1,2,3], y: [4,5,6], type: 'scatter' }]}
     layout={{ title: 'My Chart' }}
   />
   ```

   **Embed a Three.js animation:**
   ```mdx
   import MyAnimation from '../../components/demos/MyAnimation';
   <MyAnimation client:only="react" />
   ```

4. The article is automatically available at `/blog/my-new-article`.

**Draft mode:** set `draft: true` in frontmatter to exclude from all collection queries.

---

## How to Add a New Blog Category

1. Add the new string to the `category` enum in `src/content/config.ts`:
   ```ts
   category: z.enum(['antennas', 'ml', 'rf', 'optics', 'dsp', 'misc', 'new-category']),
   ```
2. Create the folder: `src/content/blog/new-category/`
3. The `/blog/new-category` route is generated automatically by `[category]/index.astro`.
4. The category appears in the blog listing filter automatically.

---

## How to Add a Demo

1. **Create the React component** in `src/components/demos/MyDemo.tsx`:
   - Use `useState` for slider values
   - Use `useMemo` for recomputed data
   - Use `<Slider>` from `../ui/Slider`
   - Use `<PlotlyChart>` from `../ui/PlotlyChart`

2. **Create the demo page** in `src/pages/demos/my-demo.astro`:
   ```astro
   ---
   import DemoPageLayout from '../../layouts/DemoPageLayout.astro';
   import MyDemo from '../../components/demos/MyDemo';
   ---
   <DemoPageLayout title="..." domain="rf" difficulty="intermediate" description="...">
     <div slot="intro">Concept explanation here.</div>
     <div slot="equations">$$your = equation$$</div>
     <MyDemo client:only="react" />
     <div slot="interpretation">Physical meaning here.</div>
   </DemoPageLayout>
   ```

3. **Create the metadata stub** in `src/content/demos/my-demo.md`:
   ```yaml
   ---
   title: My Demo
   domain: rf
   difficulty: intermediate
   description: One sentence.
   techStack: [Plotly.js, React]
   ---
   ```

4. The demo appears automatically in `/demos` listing.

---

## Precomputed Data Workflow

For demos where browser-side computation would be too slow:

1. Write a Python script in `scripts/`:
   ```python
   # scripts/generate_my_demo.py
   import json, pathlib
   OUTPUT = pathlib.Path("public/data/my-demo/default.json")
   data = { ... }  # your simulation
   OUTPUT.parent.mkdir(parents=True, exist_ok=True)
   OUTPUT.write_text(json.dumps(data))
   ```

2. Run it locally:
   ```bash
   python scripts/generate_my_demo.py
   ```

3. Commit the output JSON:
   ```bash
   git add public/data/my-demo/
   ```

4. In your React component, fetch the data on mount:
   ```tsx
   useEffect(() => {
     fetch('/data/my-demo/default.json')
       .then(r => r.json())
       .then(setPrecomputed);
   }, []);
   ```

**When to precompute vs compute in browser:**

| Precompute (Python) | Compute in browser (JS) |
|---|---|
| Electromagnetic field solvers | Array factor, Gaussian beam |
| Large parameter sweeps (>100ms) | Real-time slider response |
| Results from CST / HFSS / other tools | Simple analytical formulas |
| Jupyter notebook outputs | DFT (<=512 points) |

---

## Jupyter Notebook Integration

Three options — choose based on what you need:

### Option A: Export Plotly as self-contained HTML (recommended)
```python
import plotly.io as pio
pio.write_html(fig, "public/notebook-outputs/my-plot.html", full_html=False)
```
Then in your MDX article:
```mdx
<iframe src="/notebook-outputs/my-plot.html" width="100%" height="500" frameborder="0" />
```
Works for any Plotly figure. Fully interactive. No style conflicts.

### Option B: Export figure as JSON, render with PlotlyChart
```python
import json
with open("public/data/my-notebook/figure.json", "w") as f:
    f.write(fig.to_json())
```
Then load and render it in a React component — full control over styling.

### Option C: nbviewer iframe
```mdx
<iframe
  src="https://nbviewer.org/github/FraH90/frah90.github.io/blob/main/notebooks/my-notebook.ipynb"
  width="100%" height="600"
/>
```
Simplest option. Less control over style.

---

## Math Equations

KaTeX renders at **build time** via `remark-math` + `rehype-katex`.

**In `.mdx` files** (works automatically):
```mdx
Inline: $\psi = kd\cos\theta + \beta$

Display:
$$
AF(\theta) = \frac{1}{N} \sum_{n=0}^{N-1} e^{jn\psi}
$$
```

**In `.astro` files** — this is a known gotcha. KaTeX only runs inside the MD/MDX pipeline. Raw `.astro` template slots are processed by esbuild/Vite as JSX, which chokes on `$$...$$` delimiters (it parses `$` as a JS expression). Do not write `$$` in `.astro` files directly.

The solution used in this project: a `KatexEq` React component at `src/components/ui/KatexEq.tsx` that calls `katex.renderToString()` at runtime:

```astro
---
import KatexEq from '../../components/ui/KatexEq';
---
<KatexEq display={true} client:only="react">
  {"AF(\\theta) = \\frac{1}{N} \\sum_{n=0}^{N-1} e^{jn\\psi}"}
</KatexEq>
```

Pass the LaTeX string as a JS string literal (double-escape backslashes: `\\frac`, `\\sum`, etc.).
Use `display={true}` for block equations, omit or `display={false}` for inline.

Alternative if you want zero JS at runtime: write the equations slot content in a `.mdx` file and import it as a component — the MDX pipeline runs KaTeX at build time. But `KatexEq` is simpler for demo pages.

---

## Client Directives Reference

| Directive | When to use |
|---|---|
| `client:only="react"` | Plotly, Three.js, p5.js — anything that accesses `window` at module scope |
| `client:load` | Components with meaningful static HTML that also need hydration |
| `client:visible` | Components below the fold — hydrate only when they scroll into view |
| `client:idle` | Non-critical widgets — hydrate when browser is idle |

All demo components in this project use `client:only="react"`.

---

## Deployment

GitHub Actions builds and deploys automatically on push to `main`.

**Required one-time GitHub UI setup:**
1. Go to your repo on GitHub
2. Settings -> Pages -> Source: select **"GitHub Actions"** (not "Deploy from a branch")
3. Done — the workflow in `.github/workflows/deploy.yml` handles everything else

**Manual deploy:** Actions tab -> select workflow -> "Run workflow"

---

## Adding Dependencies

```bash
# Visualization libraries (import dynamically inside useEffect)
npm install <library>

# Astro integrations (also patches astro.config.mjs automatically)
npx astro add <integration>

# TypeScript types
npm install --save-dev @types/<library>
```

When adding a visualization library that accesses `window` (Three.js, p5.js, etc.):
- Import it only inside `useEffect` with dynamic `import()`
- Use `client:only="react"` on the component in `.astro` files
- Never import at module scope in any file Astro might SSR

---

## Scripts Reference

| Script | Purpose | Output | Run |
|---|---|---|---|
| `generate_array_factor.py` | Precompute array factor parameter sweep | `public/data/array-factor/default.json` | `python scripts/generate_array_factor.py` |
| `generate_gaussian_beam.py` | Precompute Gaussian beam propagation | `public/data/gaussian-beam/default.json` | `python scripts/generate_gaussian_beam.py` |
