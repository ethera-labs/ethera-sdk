# AGENTS.md

## Build Artifacts

- If a task requires running a build and the build modifies files in `dist/`, revert those `dist/` changes before completing the task.
- Treat generated `dist/` diffs as temporary build output unless the user explicitly asks to keep or update them.

## RPC Naming

- The custom RPC method name is `compose_buildSignedUserOpsTx`.
- Do not rename this RPC method to `ethera_buildSignedUserOpsTx` or other brand-based variants. Treat it as protocol/API surface, not branding.
