# Publishing safeguards and deployment checks

<!-- ledger-template: roadmap.v2 -->

## Original thought

<!-- roadmap-original-thought:start -->
Ok. Reminds me this. But the roadmap has been finished? We need to close it. Then the first article.
<!-- roadmap-original-thought:end -->

## Goal

Owner resumed this follow-up on 2026-11-02: validate public output and demo models/payloads before deploying, using supported integration permissions.

## Context and rationale

Transferred from Phase 7 of [website foundation](../../../archive/roadmaps/r-261020-01-scientific-blog-foundation/r-261020-01-scientific-blog-foundation.md). The owner previously said to deal with permission work later; this migration preserves that instruction rather than pretending the work was completed.

## Research and evidence

The sandbox push shim rejected workflow-file changes earlier because the GitHub App lacked workflows permission. After the owner approved the Workflows permission, the supported push succeeded. GitHub Actions run [41495431814](https://github.com/FraH90/frah90.github.io/actions/runs/41495431814) passed both validation commands before upload and deployed successfully. The public blog returns HTTP 200 and includes the simplified previews. Earlier rejection observations below are preserved as history, superseded by the successful run.

## Decisions and trade-offs

The owner explicitly resumed this work on 2026-11-02; it remains non-primary. Checks run after the complete Astro/Pagefind build and before artifact upload. A failed check prevents upload and the dependent deployment job. Local validation and workflow edits do not by themselves prove remote permission or successful deployment. No credentials are added to the checkout.

## Delivery plan

<!-- ledger-phases:start -->
### Phase 1 — Supported workflow permission

**Status:** done · **ID:** `r-261020-03-deployment-checks-p1`

**Useful alone:** The integration can publish authorized workflow edits without adding credentials to the checkout.

**Done when:** The owner’s supported LifeOS/GitHub configuration authorizes workflow edits.

**Depends on:** none

- ✅ **done** · **decision** — Resolve the GitHub integration workflows permission using the supported LifeOS/GitHub configuration; do not add credentials to this repository.
  - ID `r-261020-03-deployment-checks-p1-1` · closed 2026-11-02
  - Evidence (observation): 2026-11-02: supported git_push rejected f8565b26e18c52ccb4b03322a3e57290abe01930: GitHub App cannot update .github/workflows/deploy.yml without workflows permission. No remote update or deployment occurred. Owner must enable permission through the supported LifeOS/GitHub integration configuration; no shell credentials or permission bypass attempted.
  - Evidence (observation): Owner confirmed the GitHub App permission update. Supported git_push successfully advanced main from 4b18bdc to 5294325e9100203a0aceecbfda106880be900d70, including .github/workflows/deploy.yml. GitHub Actions run 41495431814 started for that exact SHA. No repository credentials or LifeOS code changes were needed.

### Phase 2 — CI build and demo gates

**Status:** done · **ID:** `r-261020-03-deployment-checks-p2`

**Useful alone:** Broken public output or demo/model/payload regressions prevent deployment.

**Done when:** Both checks run before artifact upload; invalid output is blocked and a real valid workflow run passes.

**Depends on:** `r-261020-03-deployment-checks-p1`

- ✅ **done** · **build** — Add npm run check:build and npm run check:demos after the Astro/Pagefind build and before GitHub Pages artifact upload; verify broken output/model or payload regressions block deployment and a valid deployment passes.
  - ID `r-261020-03-deployment-checks-p2-1` · closed 2026-11-02 · commits `f8565b26e18c52ccb4b03322a3e57290abe01930`
  - Evidence (measurement): Workflow now runs check:build and check:demos after Astro/Pagefind and before artifact upload; deploy still needs build. Local valid production output and scientific models/payload budgets pass. Temporary broken internal link, 7 MiB extra JS chunk and isolated incorrect array normalization each fail the respective command with nonzero exit. All fixtures restored/removed. Remote workflow permission and a real Actions deployment are not yet verified.
  - Evidence (observation): Workflow implementation and local passing/negative checks are committed in f8565b26e18c52ccb4b03322a3e57290abe01930. GitHub rejected the push for missing App workflows permission; real remote success and deployment remain unverified. This item stays active.
  - Evidence (observation): GitHub Actions https://github.com/FraH90/frah90.github.io/actions/runs/41495431814 for 5294325e9100203a0aceecbfda106880be900d70 completed successfully: Check published output, Check demo models and payload budgets, artifact upload, build job and deploy job all success. Public https://frah90.github.io/blog/ returns HTTP 200 and contains the new preview-chart-thumbnail markup. Local deliberate broken-link, oversized-payload and wrong-normalization failures were verified in the implementation session; no failing code was deployed.
<!-- ledger-phases:end -->

## Risks

Do not add PATs, SSH keys or credentials to the shell/repository. Use the supported integration configuration and retain the existing publishing workflow until an authorized change can be verified.

## Open questions

The owner has deferred this work until later. Resume only when the owner returns to workflow permissions.

## Working notes

The original foundation phase/items are closed as transferred (declined in that old scope), with explicit decision evidence. These replacement items are still todo, not implemented. This roadmap resumes only when the owner returns to the deferred work.
