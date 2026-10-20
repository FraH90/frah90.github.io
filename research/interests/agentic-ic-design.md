# Agents in integrated circuit design

Interest captured on 2026-10-20. This is a research direction, not a statement of IC design experience or a validated toolchain.

## Intent

Explore agents both as coding assistants around IC design tools and as active participants in bounded design tasks using an open-source ecosystem.

## Two roles

1. Assistance: scripts, simulation setup, result extraction, report generation, and workflow automation.
2. Active design: proposing candidate circuits or implementations, running permitted tools, inspecting results, and iterating against explicit constraints.

## Open questions

- Start with analog circuit sizing, digital RTL/verification, or another narrow task?
- Which tools, process design kits, licenses, installation requirements, and compute resources make a reproducible experiment feasible?
- What trusted reference and independent verification will distinguish valid improvement from a plausible-looking result?
- How will constraints, failed runs, human interventions, and total cost be recorded?

## Cheapest next step

Scope one small benchmark and research current primary documentation for candidate tools and PDKs. Choose a manually validated baseline before introducing an agent. No tool/PDK is selected or installed by this note.

## Evidence standard

Generated artifacts and passing tool runs alone do not establish manufacturability or silicon performance. Explain exactly what was checked, against which model, and what remains unverified. The research idea is captured in the ledger and is not scheduled by the website roadmap.
