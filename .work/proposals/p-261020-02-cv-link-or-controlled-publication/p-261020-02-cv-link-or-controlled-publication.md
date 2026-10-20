# CV link versus controlled artifact publication

<!-- ledger-template: proposal.v2 -->

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
<!-- proposal-body:end -->
