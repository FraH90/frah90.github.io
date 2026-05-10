"""
Generate precomputed array factor data for the array-factor-demo.

Output: public/data/array-factor/default.json

Usage:
    python scripts/generate_array_factor.py

The output JSON contains a sweep over N, d, and beta combinations
that the React demo component can use as initial data or for interpolation.
For this demo, client-side computation is fast enough that precomputed data
is optional — but this script documents the workflow for heavier demos.
"""

import json
import math
import pathlib

OUTPUT = pathlib.Path(__file__).parent.parent / "public" / "data" / "array-factor" / "default.json"


def compute_af(N: int, d: float, beta: float, points: int = 360):
    theta = [i * math.pi / (points - 1) for i in range(points)]
    k = 2 * math.pi
    af = []
    for t in theta:
        re, im = 0.0, 0.0
        for n in range(N):
            phase = n * (k * d * math.cos(t) + beta)
            re += math.cos(phase)
            im += math.sin(phase)
        af.append(math.sqrt(re**2 + im**2) / N)
    return {
        "theta_deg": [t * 180 / math.pi for t in theta],
        "AF": af,
    }


def main():
    # Default configuration
    default = compute_af(N=8, d=0.5, beta=0.0)

    # Small sweep for reference
    sweep = []
    for N in [4, 8, 16]:
        for d in [0.25, 0.5, 1.0]:
            result = compute_af(N=N, d=d, beta=0.0)
            sweep.append({"N": N, "d": d, "beta": 0.0, **result})

    output = {
        "meta": {
            "description": "Precomputed array factor data",
            "default": {"N": 8, "d": 0.5, "beta": 0.0},
        },
        "default": default,
        "sweep": sweep,
    }

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(output, separators=(",", ":")))
    print(f"Written: {OUTPUT}")


if __name__ == "__main__":
    main()
