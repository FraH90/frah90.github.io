# Scripts

Python scripts that precompute simulation data for the interactive demos.
Output JSON files go into `public/data/` and are committed to the repo.
GitHub Actions does NOT need Python — data is pregenerated locally.

## Workflow

```
python scripts/<script>.py        # generates public/data/<demo>/default.json
git add public/data/              # commit the data
git push                          # GitHub Actions builds & deploys
```

## Scripts

| Script | Output | Demo |
|---|---|---|
| `generate_array_factor.py` | `public/data/array-factor/default.json` | Array Factor Demo |
| `generate_gaussian_beam.py` | `public/data/gaussian-beam/default.json` | Gaussian Beam Demo |

## Requirements

```
pip install numpy scipy  # optional — scripts use stdlib math by default
```

## When to Precompute vs. Compute in Browser

| Precompute | Compute in browser |
|---|---|
| Heavy parameter sweeps (>100ms) | Real-time slider response |
| Initial page load data | Interactive updates |
| Results from external solvers (CST, HFSS) | Simple analytical formulas |
| Jupyter notebook exports | Anything with <10ms compute time |
