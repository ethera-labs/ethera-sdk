# AGENTS.md

## Build Artifacts

- If a task requires running a build and the build modifies files in `dist/`, revert those `dist/` changes before completing the task.
- Treat generated `dist/` diffs as temporary build output unless the user explicitly asks to keep or update them.

## RPC Naming

- The custom RPC method name is `ethera_buildSignedUserOpsTx` (served by the ethera-bundler).
- Treat it as protocol/API surface, not branding: keep the name identical across the SDK, the bundler, and any gateway, and do not fork it into per-consumer variants.
