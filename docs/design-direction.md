# Design direction — 2026-10-28

The owner wants a slimmer header, icon controls, visible and purposeful interaction motion, a panel that slides from right to left, and a better article grid before publication. This pass implements the navigation changes and an interim lighter editorial grid. It does not claim that the final visual direction is approved.

The site uses Astro static pages, Tailwind CSS, small React demo roots and Plotly. Navigation uses native HTML, a small controller and CSS motion; no animation library or new application dependency is introduced. Keep motion attached to an interaction: drawer entry/exit, backdrop dimming and gentle hover/focus responses. Preserve reduced-motion preferences, clear keyboard focus and no-JavaScript topic navigation.

## Reference sites

Reviewed on 2026-10-28. These are references to study, not copied templates or approved designs.

- [Medium engineering feed](https://medium.com/tag/engineering): a reference for article-title, summary and metadata hierarchy. The account and recommendation surfaces are not requirements for this blog.
- [Distill](https://distill.pub/): a reference for technical publication structure and integrating figures into explanations.
- [Bartosz Ciechanowski](https://ciechanow.ski/): a particularly relevant reference for the planned didactic phased-array series, where interactive explanations accompany the reasoning.
- [Stripe Blog](https://stripe.com/blog): another archive to compare for grouping and presentation of article collections.

For this engineering blog, the grid should eventually give useful scientific figures a role when genuine article assets exist. Avoid invented featured articles, decorative placeholder imagery and metadata that imply unpublished work is complete. The current pass retains the real demo titles, descriptions, dates, labels and URLs. Publication readiness and the remaining design decision are tracked only in the work ledger.
