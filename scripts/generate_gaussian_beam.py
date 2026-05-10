"""
Generate precomputed Gaussian beam propagation data.

Output: public/data/gaussian-beam/default.json

Usage:
    python scripts/generate_gaussian_beam.py

This script is an example of the precomputed-data workflow:
run locally, commit the JSON, the browser loads it for the initial render.
Slider changes trigger pure-JS recomputation for interactivity.
"""

import json
import math
import pathlib

OUTPUT = pathlib.Path(__file__).parent.parent / "public" / "data" / "gaussian-beam" / "default.json"


def gaussian_beam(w0_um: float, lambda_um: float, z_max_mm: float, points: int = 500):
    w0  = w0_um * 1e-6
    lam = lambda_um * 1e-6
    z_max = z_max_mm * 1e-3
    zR = math.pi * w0**2 / lam

    z = [-z_max + 2 * z_max * i / (points - 1) for i in range(points)]
    w = [w0 * math.sqrt(1 + (zi / zR) ** 2) for zi in z]

    return {
        "meta": {
            "w0_um": w0_um,
            "lambda_um": lambda_um,
            "z_max_mm": z_max_mm,
            "zR_mm": zR * 1e3,
            "divergence_deg": math.degrees(math.atan(lam / (math.pi * w0))),
        },
        "z_mm": [zi * 1e3 for zi in z],
        "w_um": [wi * 1e6 for wi in w],
    }


def main():
    data = gaussian_beam(w0_um=5.0, lambda_um=1.55, z_max_mm=2.0)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(data, separators=(",", ":")))
    print(f"Written: {OUTPUT}")


if __name__ == "__main__":
    main()
