# CV link versus controlled artifact publication

<!-- ledger-template: proposal.v3 -->

## Original thought

<!-- original-thought:start -->
- Yes cv misses and we need to link it maybe. In the who am i section shit (call better if needed). I actually have one repo now where i have a cv.. maybe we could have a ci cd pipeline that each time i update it on that github profile, it gets updated on the github pages shit. or it could just be a link to that repo( evenif i think i ve private rn)
<!-- original-thought:end -->

## Proposal

<!-- proposal-body:start -->
## Problem

The site references a missing CV. The real CV lives in a different repository that may be private.

## Proposed approach

Defer integration until the source and intended public PDF are identified. Prefer the simplest stable artifact link if available. If automatic synchronization adds clear value, let the source workflow publish only the selected PDF to a deliberate public destination, using limited CI credentials and preserving the last good artifact after a failed update.

## UI direction

A clearly labeled CV link in About after a valid public artifact is available. Hide or remove dead links in the meantime; no empty CV flow.

## Alternatives and tradeoffs

A direct artifact URL requires little maintenance but depends on that destination's stability. A copied PDF is simple but manually synchronized. Source-triggered publication automates freshness at the cost of cross-repository permissions and failure handling. A private repository link is not a usable CV for anonymous readers.

## Risks

Publishing unintended private content, granting excessive workflow permissions, replacing a working PDF with a failed output, or creating infrastructure before the actual source workflow is understood.

## Open questions

Source repository and branch; PDF generation command/path; intended public data; preferred public destination; available CI permissions; update trigger and failure reporting.

## Status boundary

Draft and deferred. No acceptance, roadmap, secrets, repository visibility change, or automation is implied.

## What the thing is

Eventually expose the intended public CV from About, either through a stable public PDF link or a controlled update pipeline from its source repository.

## What is known

The owner already has a CV in another repository, possibly private. Repository identity, artifact path, visibility, permissions, and update process are not yet known. The website currently links a missing /cv.pdf.

## Why it might work

A single CV source avoids manual duplicate edits. A stable PDF can serve website readers without exposing source files.

## What would kill it

A solution that exposes private source, leaks credentials, or requires a fragile multi-repository workflow without a clear maintenance benefit.

## Cheapest next step

When CV work is resumed, identify its source repository, generated PDF, and intended public contents. Compare a public artifact link with automated publication before choosing CI.

## Working notes

Deferred by the owner. No automation or public link is implemented in this change. The navigation phase may remove or conditionally hide broken CV links without selecting a CV integration.
<!-- proposal-body:end -->
