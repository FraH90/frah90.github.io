# Deferred workflow permissions and deployment checks

<!-- ledger-template: roadmap.v2 -->

## Original thought

<!-- roadmap-original-thought:start -->
Ok. Reminds me this. But the roadmap has been finished? We need to close it. Then the first article.
<!-- roadmap-original-thought:end -->

## Goal

Preserve the unfinished CI/workflow follow-up outside the completed website foundation without bypassing the owner’s explicit deferral.

## Context and rationale

Transferred from Phase 7 of [website foundation](../r-261020-01-scientific-blog-foundation/r-261020-01-scientific-blog-foundation.md). The owner previously said to deal with permission work later; this migration preserves that instruction rather than pretending the work was completed.

## Research and evidence

The sandbox push shim rejected workflow-file changes earlier because the GitHub App lacked workflows permission. Existing npm run check:build and npm run check:demos run locally; automatic CI invocation and a successful gated deployment are still unverified.

## Decisions and trade-offs

Paused and non-primary because the owner explicitly deferred permissions. The article does not technically depend on this configuration, so there is no artificial cross-roadmap dependency. No workflow or credential is changed during documentation closeout.

## Delivery plan

<!-- ledger-phases:start -->
### Phase 1 — Supported workflow permission

**Status:** todo · **ID:** `r-261020-03-deployment-checks-p1`

**Useful alone:** The integration can publish authorized workflow edits without adding credentials to the checkout.

**Done when:** The owner’s supported LifeOS/GitHub configuration authorizes workflow edits.

**Depends on:** none

- ⬜ **todo** · **decision** — Resolve the GitHub integration workflows permission using the supported LifeOS/GitHub configuration; do not add credentials to this repository.
  - ID `r-261020-03-deployment-checks-p1-1`

### Phase 2 — CI build and demo gates

**Status:** todo · **ID:** `r-261020-03-deployment-checks-p2`

**Useful alone:** Broken public output or demo/model/payload regressions prevent deployment.

**Done when:** Both checks run before artifact upload; invalid output is blocked and a real valid workflow run passes.

**Depends on:** `r-261020-03-deployment-checks-p1`

- ⬜ **todo** · **build** — Add npm run check:build and npm run check:demos after the Astro/Pagefind build and before GitHub Pages artifact upload; verify broken output/model or payload regressions block deployment and a valid deployment passes.
  - ID `r-261020-03-deployment-checks-p2-1`
<!-- ledger-phases:end -->

## Risks

Do not add PATs, SSH keys or credentials to the shell/repository. Use the supported integration configuration and retain the existing publishing workflow until an authorized change can be verified.

## Open questions

The owner has deferred this work until later. Resume only when the owner returns to workflow permissions.

## Working notes

The original foundation phase/items are closed as transferred (declined in that old scope), with explicit decision evidence. These replacement items are still todo, not implemented. This roadmap resumes only when the owner returns to the deferred work.
