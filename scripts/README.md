# Scripts

`npm run check:build` checks completed static output: public links/assets/fragments, sitemap, discovery boundaries, and search/RSS membership.

`npm run check:demos` runs independent analytical model checks and the built payload budget. Run `npm run build` first for the budget check. No Python or external numerical package is needed in CI. The model checks use Node's built-in TypeScript stripping (Node 22.12+); they cover array closed-form identities, transmission-line boundaries, Gaussian beam identities, DFT amplitude/window behavior, and a local 50 ms p95 computation ceiling.

`npm run new:post -- rf/my-article` safely creates a draft. See [the authoring guide](../docs/article-authoring.md).

## Reference datasets

These Python scripts use only the standard library and write deliberately public reference JSON. They are examples of a precomputation workflow, not dependencies fetched by the current demos. Static figures and interactive controls share `src/lib/demo-models.ts` instead.

| Command | Output |
| --- | --- |
| `python3 scripts/generate_array_factor.py` | `public/data/array-factor/default.json` |
| `python3 scripts/generate_gaussian_beam.py` | `public/data/gaussian-beam/default.json` |

Inspect generated changes and commit explicit paths. Push according to [the environment-specific project instructions](../CLAUDE.md); sandbox pushes use the LifeOS tool.

Use precomputed datasets for expensive sweeps, external solvers, or measured data, preserving units, setup, provenance, and reproducible scripts. Small analytical models may run locally after a reader activates a demo. See [demo architecture and budgets](../docs/interactive-demos.md). Neither approach turns illustrative calculations into validated engineering measurements.
