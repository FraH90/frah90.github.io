# Writing-led navigation and a shared topic system

<!-- ledger-template: proposal.v2 -->

<!-- proposal-body:start -->
## Problem

The current entry point goes straight to an article list with little author identity. Mobile header links disappear. Topic pages change layout and terminology, and category labels/styles are duplicated.

## Proposed approach

Keep writing as the main destination. Add a compact site identity and About access. Use a shared topic registry for slugs, labels, ordering, schema choices, filters, badges, and discovery. Reuse a common listing shell for all writing and topic views. Retain article URLs. Resolve the entry route explicitly before changing it.

## UI direction

A restrained header with site identity/home, Writing, About, Search, and a theme control as features land. Keep all primary destinations usable on mobile. Lead the entry page with selected/latest articles and scientific figures; keep the author introduction compact. Topics are filters with readable labels. Projects appears only when it contains useful work. Contact and later CV are available through About. Contents is collapsed on article pages.

## Alternatives and tradeoffs

Keep /blog as the archive and add a writing-led root, or make the root the canonical writing index with a compatible /blog route. Both fit the content-first decision. A large portfolio hero would displace content and does not fit the owner's clarified priority. Full topic labels improve clarity but need wrapping on mobile.

## Risks

Route duplication, inconsistent active states, mobile crowding, accidental URL breakage, and creating empty categories for future interests.

## Open questions

- Which entry-route option best preserves existing links and clarity?
- What public site name and author display name should be used?
- Confirm topic display labels/order during implementation.

## Status boundary

The overall content-first direction is agreed. This detailed UI/routing proposal remains draft; the roadmap is directly derived from the owner's idea, not from an invented acceptance of this proposal.
<!-- proposal-body:end -->
