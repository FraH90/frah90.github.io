# CLAUDE.md

## Committing and pushing

### Detect the environment first

```bash
test -d /workspace && echo "sandbox" || echo "local"
```

`/workspace` exists only inside the Life-OS `/code` sandbox container (Arcadia). It is absent on any normal machine or local checkout. Run this check before every push attempt; never assume one environment or the other.

---

### Inside the sandbox (`/workspace` exists)

`git add` and `git commit` work normally.

**`git push` will always fail — do not attempt it.**
This is by design, not misconfiguration. The sandbox shell has no git credential and no token in its environment or remote URL. The GitHub token is minted per-run by the Life-OS backend, lives only on the push shim, and is intentionally never exposed to the container shell. There is nothing to fix here; do not add a credential, PAT, or SSH key to work around it.

Push using the `git_push` MCP tool instead:
- If the tool is available, call it after committing.
- If it is not yet available (MCP server still connecting), wait briefly and search for it with `ToolSearch` before giving up.
- If it is confirmed unavailable, stop after the commit and tell the user: *"Commit is ready — push it with the Push button in the panel."* Do not report "no credentials available" as though something is broken.

---

### Outside the sandbox (no `/workspace`)

Ordinary `git push` is correct. No MCP tool exists or is needed.
