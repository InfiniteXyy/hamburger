# Hamburger.js Dependency Upgrade Plan

> Prepared for Phase 2 of the hamburger-refactor project.
> All dependencies were last updated circa late 2021.

---

## 1. Current Dependency Inventory

### Root `package.json` (devDependencies)

| Package | Current Version | Category |
|---------|----------------|----------|
| `@babel/cli` | ^7.16.0 | Build / Transpilation |
| `@babel/core` | ^7.16.0 | Build / Transpilation |
| `@babel/plugin-transform-react-jsx` | ^7.16.0 | Build / Transpilation |
| `@babel/preset-env` | ^7.16.0 | Build / Transpilation |
| `@babel/preset-flow` | ^7.16.0 | Build / Transpilation |
| `@babel/preset-typescript` | ^7.16.0 | Build / Transpilation |
| `@types/jest` | ^27.0.2 | Testing Types |
| `@types/react` | ^17.0.33 | React Types |
| `@types/react-dom` | ^17.0.10 | React Types |
| `babel-jest` | ^27.3.1 | Testing |
| `babel-loader` | ^8.2.3 | Build (Webpack) |
| `babel-plugin-transform-class-properties` | ^6.24.1 | Build (Legacy) |
| `concurrently` | ^7.1.0 | Dev Tooling |
| `jest` | ^27.3.1 | Testing |
| `parcel` | ^2.0.0 | Bundler (Examples) |
| `prettier` | ^2.4.1 | Formatting |
| `react` | ^17.0.2 | Runtime |
| `react-dom` | ^17.0.2 | Runtime |
| `rimraf` | ^3.0.2 | Dev Tooling |
| `rollup` | ^2.58.3 | Build / Bundler |
| `taze` | ^0.4.5 | Dependency Checker |
| `tslib` | ^2.3.1 | Runtime Helper |
| `typescript` | ^4.4.4 | Language |
| `@parcel/transformer-sass` | ^2.0.0 | Build (Examples) |

### `@hamburger/core` (packages/hamburger-js)

| Package | Current Version | Type |
|---------|----------------|------|
| `fast-equals` | ^2.0.3 | dependency |
| `@hamburger/platform-react` | 0.0.1 | devDependency (workspace) |
| `@rollup/plugin-node-resolve` | ^13.0.6 | devDependency |
| `@rollup/plugin-typescript` | ^8.3.0 | devDependency |
| `@types/classnames` | ^2.3.1 | devDependency |
| `@types/enzyme` | ^3.10.10 | devDependency |
| `enzyme` | ^3.11.0 | devDependency |
| `enzyme-adapter-react-16` | ^1.15.6 | devDependency |

### `@hamburger/cli` (packages/hamburger-cli)

| Package | Current Version | Type |
|---------|----------------|------|
| `commander` | ^8.3.0 | dependency |
| `enquirer` | ^2.3.6 | dependency |
| `sucrase` | ^3.20.3 | devDependency |

### `@hamburger/loader` (packages/hamburger-loader)

| Package | Current Version | Type |
|---------|----------------|------|
| `@hamburger/core` | 0.0.1 | peerDependency |

### `@hamburger/static` (packages/hamburger-static)

| Package | Current Version | Type |
|---------|----------------|------|
| `fs-extra` | ^10.0.0 | dependency |
| `@hamburger/core` | 0.0.1 | peerDependency |

### `@hamburger/platform-react` (packages/platform-react)

| Package | Current Version | Type |
|---------|----------------|------|
| `react` | >16.13.0 | peerDependency |
| `react-dom` | >16.13.0 | peerDependency |
| `@hamburger/core` | 0.0.1 | peerDependency |

### `@hamburger/platform-vue` (packages/platform-vue)

| Package | Current Version | Type |
|---------|----------------|------|
| `vue` | 2 | devDependency |
| `vue` | >2.6.0 | peerDependency |
| `@hamburger/core` | 0.0.1 | peerDependency |

---

## 2. Target Versions

### Core Language & Build

| Package | Current | Target | Notes |
|---------|---------|--------|-------|
| `typescript` | ^4.4.4 | **~5.7.x** | Latest stable TS 5.x |
| `rollup` | ^2.58.3 | **^4.x** | Major rewrite; plugin API changed |
| `@rollup/plugin-node-resolve` | ^13.0.6 | **^16.x** | Must match Rollup 4 |
| `@rollup/plugin-typescript` | ^8.3.0 | **^12.x** | Must match Rollup 4 |

### Testing

| Package | Current | Target | Notes |
|---------|---------|--------|-------|
| `jest` | ^27.3.1 | **REMOVE** | Replace with Vitest |
| `babel-jest` | ^27.3.1 | **REMOVE** | Not needed with Vitest |
| `@types/jest` | ^27.0.2 | **REMOVE** | Not needed with Vitest |
| `enzyme` | ^3.11.0 | **REMOVE** | Abandoned; replace with Testing Library |
| `enzyme-adapter-react-16` | ^1.15.6 | **REMOVE** | Abandoned |
| `@types/enzyme` | ^3.10.10 | **REMOVE** | Not needed |
| **NEW** `vitest` | - | **^3.x** | Modern, Vite-based test runner |
| **NEW** `@testing-library/react` | - | **^16.x** | Standard React testing |
| **NEW** `@testing-library/jest-dom` | - | **^6.x** | DOM matchers |
| **NEW** `happy-dom` | - | **^17.x** | Fast DOM implementation for Vitest |

### React Ecosystem

| Package | Current | Target | Notes |
|---------|---------|--------|-------|
| `react` | ^17.0.2 | **^19.x** | Latest stable (or ^18.x for safer upgrade) |
| `react-dom` | ^17.0.2 | **^19.x** | Match React version |
| `@types/react` | ^17.0.33 | **^19.x** | Match React version |
| `@types/react-dom` | ^17.0.10 | **^19.x** | Match React version |

### Babel (Reduce or Remove)

| Package | Current | Target | Notes |
|---------|---------|--------|-------|
| `@babel/cli` | ^7.16.0 | **REMOVE** | Use tsc + Rollup/Vite for transforms |
| `@babel/core` | ^7.16.0 | **REMOVE** | Not needed if using tsc |
| `@babel/plugin-transform-react-jsx` | ^7.16.0 | **REMOVE** | TS handles JSX |
| `@babel/preset-env` | ^7.16.0 | **REMOVE** | TS + Rollup handle targeting |
| `@babel/preset-flow` | ^7.16.0 | **REMOVE** | No Flow usage found |
| `@babel/preset-typescript` | ^7.16.0 | **REMOVE** | Use tsc directly |
| `babel-loader` | ^8.2.3 | **REMOVE** | No webpack usage in core |
| `babel-plugin-transform-class-properties` | ^6.24.1 | **REMOVE** | Ancient (Babel 6!); TS handles this |

### Dev Tooling

| Package | Current | Target | Notes |
|---------|---------|--------|-------|
| `prettier` | ^2.4.1 | **^3.x** | Config format changes |
| `concurrently` | ^7.1.0 | **^9.x** | Minor update |
| `rimraf` | ^3.0.2 | **^6.x** or use `del-cli` | v4+ is ESM-only |
| `taze` | ^0.4.5 | **^0.18.x** | Minor update |
| `tslib` | ^2.3.1 | **^2.8.x** | Minor update (compatible) |

### CLI Package

| Package | Current | Target | Notes |
|---------|---------|--------|-------|
| `commander` | ^8.3.0 | **^13.x** | Several major versions behind |
| `enquirer` | ^2.3.6 | **^2.4.x** or switch to `@inquirer/prompts` | enquirer is mostly unmaintained |
| `sucrase` | ^3.20.3 | **^3.35.x** | Still actively maintained |

### Other

| Package | Current | Target | Notes |
|---------|---------|--------|-------|
| `fast-equals` | ^2.0.3 | **^5.x** | Major API changes in v3+ |
| `fs-extra` | ^10.0.0 | **^11.x** | ESM-first in v11 |
| `parcel` | ^2.0.0 | **^2.13.x** | Still v2, but much more stable now |
| `vue` | 2.x | **^3.x** | Vue 2 is EOL; platform-vue needs full rewrite |
| `@types/classnames` | ^2.3.1 | **REMOVE** | classnames is not used as a dependency |

---

## 3. Breaking Changes to Be Aware Of

### TypeScript 4.4 -> 5.7

- **`moduleResolution: "bundler"`** is the new recommended setting (TS 5.0+). Current `"node"` still works but `"bundler"` is better for modern bundlers.
- **Decorators**: `experimentalDecorators` is the legacy decorator spec. TS 5.0+ supports the TC39 Stage 3 decorators natively. The codebase uses `experimentalDecorators: true` -- need to audit if any decorators are used and decide which spec to target.
- **`target: "es5"`** is outdated. Modern browsers and Node.js support ES2020+ natively. Recommend `"es2022"` or higher.
- **`verbatimModuleSyntax`** replaces `isolatedModules` and `importsNotUsedAsValues` in TS 5.0+.
- **`@types/react` v19** no longer uses the `React.FC` implicit children pattern.

### Rollup 2 -> 4

- **Plugin API changes**: Many plugins need major version bumps. The `@rollup/plugin-typescript` and `@rollup/plugin-node-resolve` APIs have changed.
- **`import pkg from './package.json'`** in rollup.config.js requires `--experimental-json-modules` or an import assertion. Recommend reading with `createRequire` or switching to a different pattern.
- **Config file format**: Rollup 4 expects ESM config by default. The current `rollup.config.js` uses ESM `import`/`export` which should be fine, but the `import pkg from './package.json'` pattern needs updating.
- **Node.js version**: Rollup 4 requires Node.js 18+.

### React 17 -> 18/19

- **New JSX Transform**: React 18+ uses the automatic JSX runtime (`react/jsx-runtime`). The codebase uses a custom `jsxFactory: "hamburger.createElement"` in the example tsconfig, which means the framework has its own createElement. This is a key consideration -- the custom JSX factory must be preserved or adapted.
- **`ReactDOM.render` removed in React 19**: React 18 deprecated it; React 19 removes it. Must use `createRoot`.
- **Concurrent features**: React 18+ uses concurrent rendering by default with `createRoot`. Existing tests using Enzyme's `shallow()` will not work.
- **`@types/react` v19**: No longer has implicit `children` in `React.FC`. This should not affect hamburger since it uses its own component model, but the platform-react adapter may need updates.

### Enzyme -> Testing Library

- **Complete API change**: Enzyme's `shallow()` / `mount()` / `render()` are replaced by Testing Library's `render()`.
- **Philosophy shift**: Testing Library tests user-visible behavior (query by role, text, label) rather than internal component structure (`.props()`, `.state()`).
- **All 7 existing test files need rewriting**.

### Jest -> Vitest

- **Mostly compatible**: Vitest is largely API-compatible with Jest (`describe`, `it`, `expect` all work).
- **Config format**: Uses `vitest.config.ts` instead of `jest.config.js`. No `.babelrc` needed.
- **`setupFilesAfterSetup`** becomes `setupFiles` in Vitest config.
- **Mocking API**: `jest.fn()` becomes `vi.fn()`, `jest.mock()` becomes `vi.mock()`.

### fast-equals 2 -> 5

- **Named exports changed**: The API was reorganized in v3. `deepEqual` and `shallowEqual` are still available but import paths may differ.
- Need to audit usage in `@hamburger/core` to determine impact.

### Prettier 2 -> 3

- **`trailingComma` default changed** from `"es5"` to `"all"`.
- **Some formatting changes**: Will cause whitespace diffs across the codebase. Run `prettier --write` after upgrade.

### Vue 2 -> 3

- **Complete API rewrite**: Composition API, `createApp()` instead of `new Vue()`, different template compiler.
- The `platform-vue` package will need a full rewrite.

---

## 4. Migration Steps (Ordered)

### Step 1: Upgrade TypeScript (Low Risk)

1. Update `typescript` to `~5.7.x` in root `package.json`.
2. Update all `tsconfig.json` files:
   - Change `target` from `"es5"` to `"es2022"`.
   - Change `moduleResolution` from `"node"` to `"bundler"` (where applicable).
   - Add `"strict": true` to root tsconfig if not already present.
   - Evaluate whether to keep `experimentalDecorators` (check if decorators are actually used).
3. Remove `@types/classnames` (unused dependency).
4. Run `tsc --noEmit` across all packages and fix type errors.

### Step 2: Upgrade Rollup (Medium Risk)

1. Update `rollup` to `^4.x` in root `package.json`.
2. Update Rollup plugins:
   - `@rollup/plugin-node-resolve` to `^16.x`
   - `@rollup/plugin-typescript` to `^12.x`
3. Rewrite `packages/hamburger-js/rollup.config.js`:
   - Replace `import pkg from './package.json'` with a `createRequire` pattern or inline the values.
   - Verify plugin options still work with new APIs.
4. Test build: `cd packages/hamburger-js && pnpm build`.

### Step 3: Remove Babel (Medium Risk)

1. Remove all `@babel/*` packages from root `devDependencies`.
2. Remove `babel-jest`, `babel-loader`, `babel-plugin-transform-class-properties`.
3. Delete `packages/hamburger-js/.babelrc`.
4. Update `packages/hamburger-loader` build script to use a different transpiler (tsc or sucrase).
5. Verify builds still work.

### Step 4: Migrate Testing Framework (High Risk -- Separate Phase)

> This step is large enough to be its own phase (Task #4). The plan here is for reference.

1. Install Vitest + happy-dom:
   ```
   pnpm add -D vitest happy-dom @testing-library/react @testing-library/jest-dom
   ```
2. Create `vitest.config.ts` in `packages/hamburger-js/`:
   ```ts
   import { defineConfig } from 'vitest/config';
   export default defineConfig({
     test: {
       environment: 'happy-dom',
       globals: true,
       setupFiles: ['./scripts/setupTests.ts'],
     },
   });
   ```
3. Remove `jest.config.js`, `.babelrc`, and `scripts/setupTests.js`.
4. Rewrite each test file from Enzyme `shallow()` to Testing Library `render()`.
5. Replace `jest.fn()` with `vi.fn()` where used.
6. Update `package.json` scripts: `"test": "vitest run"`.

### Step 5: Upgrade React (Medium Risk)

1. Update `react` and `react-dom` to `^19.x` (or `^18.x` for a safer first step).
2. Update `@types/react` and `@types/react-dom` to match.
3. Update `platform-react` peerDependencies to `"react": ">=18"`.
4. Audit `platform-react` for `ReactDOM.render()` usage and replace with `createRoot`.
5. Verify the custom JSX factory (`hamburger.createElement`) still works with the new JSX transform.

### Step 6: Upgrade Dev Tooling (Low Risk)

1. Update `prettier` to `^3.x`, run `prettier --write .` to normalize formatting.
2. Update `concurrently` to `^9.x`.
3. Update `rimraf` to `^6.x` or replace with `del-cli`.
4. Update `taze` to latest.
5. Update `tslib` to `^2.8.x`.

### Step 7: Upgrade Remaining Dependencies (Low-Medium Risk)

1. Update `fast-equals` to `^5.x`, fix any import changes in `@hamburger/core`.
2. Update `commander` to `^13.x` in `@hamburger/cli`, update CLI option parsing.
3. Update `fs-extra` to `^11.x` in `@hamburger/static`.
4. Update `parcel` to latest `^2.13.x` in root (used for examples).
5. Evaluate `enquirer` -- consider switching to `@inquirer/prompts` if enquirer is too stale.

### Step 8: Vue Platform (Low Priority -- Can Be Deferred)

1. The `platform-vue` package targets Vue 2.x which is EOL.
2. If Vue support is still desired, rewrite for Vue 3 Composition API.
3. Otherwise, deprecate/remove the package.

---

## 5. Potential Compatibility Issues

### Node.js Version Requirement
- Rollup 4 requires **Node.js >= 18**.
- The project should set `"engines": { "node": ">=18" }` in root `package.json`.
- Verify CI/CD environments run Node.js 18+.

### Custom JSX Factory
- Hamburger uses `hamburger.createElement` as its JSX factory (visible in `examples/basic/tsconfig.json`).
- React 18+ encourages the automatic JSX runtime (`react/jsx-runtime`).
- The custom factory must be preserved -- this is core to the framework's design. Ensure `tsconfig.json` uses `"jsx": "react"` (classic transform) with `"jsxFactory": "hamburger.createElement"`, NOT `"jsx": "react-jsx"` (automatic transform).

### ESM vs CommonJS
- Several updated packages are ESM-only or ESM-first (rimraf v4+, fs-extra v11).
- The project currently mixes `"module": "commonjs"` (platform tsconfigs) with `"module": "esnext"` (core tsconfig).
- Need a clear ESM strategy: recommend outputting both CJS and ESM builds (already done via Rollup for core).

### Workspace Protocol
- Current `pnpm-workspace.yaml` uses `"packages/**"` glob pattern which is unusual (double-star). Standard is `"packages/*"`. Verify this resolves correctly, or change to `"packages/*"`.
- Internal workspace references use fixed `"0.0.1"` versions. Consider switching to `"workspace:*"` protocol for pnpm.

### Enzyme Test Adapter
- The project uses `enzyme-adapter-react-16` despite depending on React 17. There was never an official `enzyme-adapter-react-17`. This is a pre-existing bug/incompatibility that will be resolved by moving to Testing Library.

### Missing setupTests.js
- `jest.config.js` references `scripts/setupTests.js` but this file was not found. Tests may already be broken. The Vitest migration will create a new setup file.

---

## 6. Recommended New Tools

### Replace Jest + Enzyme with Vitest + Testing Library

**Why Vitest:**
- Native TypeScript support (no Babel needed for tests)
- Compatible with Jest's API (easier migration)
- Extremely fast (uses Vite's transform pipeline)
- Built-in code coverage via `@vitest/coverage-v8`
- Watch mode with instant feedback

**Why Testing Library:**
- Enzyme is abandoned (last release: 2019, no React 18+ support)
- Testing Library is the React community standard
- Tests are more resilient to refactoring (test behavior, not implementation)
- Official React documentation recommends it

### Consider Vite for Dev Server (Examples)

- Currently using Parcel for the `examples/basic` playground.
- Vite would align with Vitest and provide a faster, more configurable dev experience.
- Not critical for Phase 2, but worth considering for Phase 4+.

### Add ESLint with TypeScript Support

- No ESLint config exists in the project.
- Recommend adding `@eslint/js` + `typescript-eslint` (flat config format).
- This is planned as Phase 5 (Task #8).

### Consider Biome as Alternative

- Biome (successor to Rome) can replace both ESLint and Prettier.
- Much faster than ESLint + Prettier combined.
- Worth evaluating, though Prettier + ESLint is more widely adopted.

---

## Summary

The dependency upgrade is significant but manageable when broken into ordered steps. The highest-risk items are:

1. **Testing migration** (Enzyme -> Testing Library + Jest -> Vitest): This is the most labor-intensive change since all 7 test files need rewriting. However, since Enzyme is abandoned with no React 18+ support, this is unavoidable.

2. **Rollup 2 -> 4**: Plugin API changes and the JSON import pattern need attention, but the config is simple enough that this should be straightforward.

3. **React 17 -> 18/19**: The custom JSX factory is the main concern. As long as the classic JSX transform is used, this should work.

The Babel stack can be entirely removed since TypeScript + Rollup handle all current transpilation needs. This dramatically simplifies the build pipeline.
