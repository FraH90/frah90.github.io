# Restore subdued translucent category text selection

<!-- ledger-template: proposal.v3 -->

## Original thought

<!-- original-thought:start -->
Perfect. fucking perfect. only one thing: the highlighting shit.. it wasnt this i wanted. check before modifying color shit.. the green highlighting of text.. was a nicer color w transparecne. so same thing as before green, but now following visual color consistency.. check how before was the green
<!-- original-thought:end -->

## Proposal

<!-- proposal-body:start -->
## Historical evidence
Before the color rework (4b18bdc), dark selection was #164e3b and light selection #d2e9de, with --ink text. The dark green is an opaque deep tint, rather than an alpha declaration; the owner wants its subdued translucent appearance generalized to category hues.

## Owner correction
Replace the 30% category / 70% white fill and dark selected text with category-over-transparent selection. Use a 34% category tint in dark mode, closely reproducing the historical green over the page, and a restrained 18% tint in light mode. Keep the current theme ink for selected text. Global selection remains neutral. Centralize both opacity settings, keep selection native and script-free, and retain curve/focus corrections.

## Verification
Check real selected text in all five populated categories, themes and mobile/desktop. Verify selected-text contrast over page and elevated code/demo backgrounds, no-script behavior, and no change to focus or publication boundaries. Record current owner preference separately from historical evidence; do not rewrite previous original words.
<!-- proposal-body:end -->
