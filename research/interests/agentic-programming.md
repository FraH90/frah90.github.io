# Agentic programming for engineering

Interest captured on 2026-10-20; no expertise or completed project is asserted.

## Intent

Explore agents as assistants for writing scripts, Python tools, numerical experiments, data processing, and engineering workflows. Assess where agents can also plan and execute a bounded workflow with human review.

## Questions to investigate

- Which tasks have clear inputs, outputs, and independent correctness checks?
- Can an agent produce reproducible code and explain failures rather than only generate plausible output?
- How much supervision, debugging time, and compute does an agent-assisted workflow require compared with a manual baseline?

## Candidate experiment

Choose a small engineering calculation with a known analytical result. Compare manual and agent-assisted implementations using fixed inputs and independent checks. Record errors, corrections, and review effort. This is a possible experiment, not committed work.

## Evidence standard

Keep prompts, tool/model versions, generated code, test inputs, and numerical validation where appropriate. Separate agent assistance from decisions and verification performed by the author. Never publish a claimed speedup without measuring the baseline.
