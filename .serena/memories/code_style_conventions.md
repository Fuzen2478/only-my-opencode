**Code Style and Conventions:**
*   **Package Manager**: Exclusively Bun.
*   **Types**: `bun-types` (never `@types/node`).
*   **Build**: ESM output via `bun build` and declaration files with `tsc --emitDeclarationOnly`.
*   **Exports**: Barrel pattern via `index.ts`.
*   **Naming**: Kebab-case for directories, `createXXXHook`/`createXXXTool` for factories.
*   **Testing**: Test-Driven Development (TDD) is mandatory, using `*.test.ts` files with BDD comments (`//#given`, `//#when`, `//#then`).
*   **Agent Temperature**: 0.1 for code agents, maximum 0.3.
*   **Anti-Patterns**: Explicitly avoids `npm`/`yarn`, `@types/node`, direct file operations in code (uses bash tool), direct `bun publish`, local version bumps, type assertions (`as any`), empty catch blocks, deleting failing tests, sequential agent calls, heavy `PreToolUse` hooks, giant commits.