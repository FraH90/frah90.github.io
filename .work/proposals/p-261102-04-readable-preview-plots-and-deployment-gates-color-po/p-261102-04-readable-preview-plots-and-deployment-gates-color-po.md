# Readable preview plots and deployment gates; color policy follow-up

<!-- ledger-template: proposal.v3 -->

## Original thought

<!-- original-thought:start -->
Preview readability: some card plots still have tiny axis text. We could simplify thumbnails and reserve detailed labels for the article. Do this
Publishing safeguards: the deferred CI checks should eventually block broken output or demo regressions before deployment. Ideally finish this before publishing, though it doesn’t block drafting. And do this
Then another thing we need to discuss after u finish: color coherence in articles. Some articles or preview use different colors shit.. it becomes non coherent. we need to understand how to use color. currently greeen is predominant, is present even in articles where category has different color. or we use green everywhere.. or we use in that article the color of the tag.. we need to understand
<!-- original-thought:end -->

## Proposal

<!-- proposal-body:start -->
## Requested delivery
Simplify small scientific preview plots while preserving the model curves, units and accessible context. Keep detailed ticks and labels in article figures. Add the existing production-output and numerical/demo-budget checks before Pages artifact upload; verify valid output passes and representative regressions fail.

## Scheduling
Preview implementation belongs in the primary article roadmap's design phase. The owner explicitly resumes the deferred deployment checks; supported workflow permission and a real GitHub run remain evidence gates, not assumptions.

## Follow-up discussion
Decide how neutral chrome, global interaction accents, category identity and scientific trace colors relate. Record this as an open decision; do not recolor all articles before the discussion. Green currently appears as both interaction accent and some scientific traces.

## Boundaries
Do not change article plot data, layout or public demo status. Do not add credentials to bypass workflow-edit permissions. Keep physical-device and remote workflow verification limitations explicit.

## Owner-approved color direction — 2026-11-02

After reviewing the proposed color table, the owner said “ok go”. Implement neutral global chrome/prose/headings/equations; primary-category article links, controls/readouts, takeaways and Contents; neutral Demo; and shared scientific role colors across preview/static/live plots. Multiple curves remain distinguishable with labels/line styles; preserve external scientific conventions. Implementation is recorded in the primary article roadmap design item r-261020-02-first-phased-array-article-design-apply-owne. This resolves the earlier open color-policy discussion without claiming final design acceptance.
<!-- proposal-body:end -->
