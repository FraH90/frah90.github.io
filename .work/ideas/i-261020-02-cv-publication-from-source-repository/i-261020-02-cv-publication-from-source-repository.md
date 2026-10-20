# Publish a CV from its source repository

<!-- ledger-template: idea.v2 -->

## Original thought

<!-- original-thought:start -->
- Yes cv misses and we need to link it maybe. In the who am i section shit (call better if needed). I actually have one repo now where i have a cv.. maybe we could have a ci cd pipeline that each time i update it on that github profile, it gets updated on the github pages shit. or it could just be a link to that repo( evenif i think i ve private rn)
<!-- original-thought:end -->

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
