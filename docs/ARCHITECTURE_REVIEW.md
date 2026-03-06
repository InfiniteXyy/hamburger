# hamburger.js Architecture Review

**Date:** 2026-03-05
**Reviewer:** Senior Architect
**Version Analyzed:** 0.0.1

---

## 1. Project Overview

hamburger.js is a declarative UI framework inspired by SwiftUI and Jetpack Compose. It provides a fluent/builder-pattern API for constructing web UIs (e.g., `Text('Hello').color('red').bold()`). The framework supports multiple rendering backends (native DOM, React, Vue) through a platform abstraction layer.

---

## 2. Current Architecture

### 2.1 Package Structure

```
hamburger/
├── packages/
│   ├── hamburger-js/        (@hamburger/core)     - Core library
│   ├── hamburger-loader/    (@hamburger/loader)    - DSL template tag / webpack loader
│   ├── hamburger-static/    (@hamburger/static)    - Static site generator
│   ├── hamburger-cli/       (@hamburger/cli)       - CLI scaffolding tool
│   ├── platform-react/      (@hamburger/platform-react) - React adapter
│   └── platform-vue/        (@hamburger/platform-vue)   - Vue adapter
├── examples/
│   ├── basic/               - Basic React example
│   ├── reactive-react/      - Reactive mode with React
│   └── static/              - Static site generation example
└── experiment/              - Experimental playground (Parcel-based)
```

### 2.2 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     User Application                         │
│                                                              │
│   Text('Hello').color('red')    VStack(Text('a'), Button()) │
│              │                            │                  │
└──────────────┼────────────────────────────┼──────────────────┘
               │                            │
               ▼                            ▼
┌──────────────────────────────────────────────────────────────┐
│                    @hamburger/core                            │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐     │
│  │  Components (Builder Pattern)                        │     │
│  │                                                      │     │
│  │  ViewClass (base)                                    │     │
│  │    ├── TextClass    ─── Text(), Link()               │     │
│  │    ├── StackClass   ─── HStack(), VStack()           │     │
│  │    ├── ButtonClass  ─── Button()                     │     │
│  │    ├── InputClass   ─── Input()                      │     │
│  │    ├── ImageClass   ─── Image()                      │     │
│  │    ├── ListClass    ─── List(), ListItem()           │     │
│  │    ├── TableClass   ─── Table(), TableRow()          │     │
│  │    ├── LayoutClass  ─── Layout()                     │     │
│  │    └── PureHTMLClass─── PureHTML()                   │     │
│  └──────────────────────────┬──────────────────────────┘     │
│                             │ .build()                       │
│                             ▼                                │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  Core Engine                                          │    │
│  │                                                       │    │
│  │  createElement() ──▶ DOMElement (virtual tree)        │    │
│  │  config.platform ──▶ platform.createElement()         │    │
│  │  mount()         ──▶ platform.render()                │    │
│  │                                                       │    │
│  │  Reactive System:                                     │    │
│  │    reactive()  ──▶ Proxy-based state observation      │    │
│  │    listen()    ──▶ Component subscription + rerender  │    │
│  │    rerender()  ──▶ Basic reconciliation (tree diff)   │    │
│  └──────────────────────────┬──────────────────────────┘     │
│                             │                                │
└─────────────────────────────┼────────────────────────────────┘
                              │
         ┌────────────────────┼───────────────────────┐
         │                    │                       │
         ▼                    ▼                       ▼
┌──────────────┐   ┌──────────────────┐    ┌──────────────────┐
│ DefaultPlatform│  │  ReactPlatform   │    │   VuePlatform    │
│ (Native DOM)   │  │  (@hamburger/    │    │  (@hamburger/    │
│                │  │   platform-react)│    │   platform-vue)  │
│ domfy() ──▶    │  │                  │    │                  │
│ document.      │  │ React.create     │    │ Vue render fn    │
│ createElement  │  │ Element()        │    │ h()              │
│                │  │ ReactDOM.render()│    │ Vue.$mount()     │
└──────────────┘   └──────────────────┘    └──────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  Auxiliary Packages                                           │
│                                                              │
│  @hamburger/loader    ─── DSL parser (lex → syntax → codegen)│
│  @hamburger/static    ─── Server-side HTML renderer          │
│  @hamburger/cli       ─── Project scaffolding (commander)    │
└──────────────────────────────────────────────────────────────┘
```

### 2.3 Data Flow

```
Builder API Call Chain
    │
    ▼
ViewClass instance (mutates _tag, _props, _children)
    │
    │ .build()
    ▼
createElement(tag, props, children)
    │
    │ Normalizes children (strings → {type:null, props:{content}}, IBuildable → .build())
    ▼
config.platform.createElement(DOMElement)
    │
    │ Platform-specific transform
    ▼
Platform-specific element (DOM Node / ReactElement / VNode)
```

---

## 3. Identified Issues and Technical Debt

### 3.1 Critical Issues

| # | Issue | Location | Severity |
|---|-------|----------|----------|
| 1 | **Pervasive `any` types** -- `ChildElement` is `Primitive \| IBuildable \| any`, effectively disabling type checking for the most important type in the system. | `lib/types.ts:5` | High |
| 2 | **`@ts-ignore` on every component factory function** -- JSX overload signatures use `@ts-ignore` to suppress errors rather than properly modeling the dual API. | `Text.ts:48`, `Link.ts:18`, `Button.ts:31`, `Stack.ts:72,81` | High |
| 3 | **Mutable builder pattern lacks type safety** -- All builder methods return `this` but the base class `ViewClass` is the return type, so subclass-specific methods are lost after calling a base method. | `View.ts` (all methods) | High |
| 4 | **`new Function()` in DSL loader** -- The `betterEval()` function uses `new Function()` to evaluate generated code, which is a code injection risk. | `hamburger-loader/src/index.js:54` | High |
| 5 | **No `dangerouslySetInnerHTML` sanitization** -- `PureHTML` passes raw HTML strings without any sanitization. | `PureHTML.ts:6`, `domfy.ts:37-39` | High |

### 3.2 Architecture Issues

| # | Issue | Description |
|---|-------|-------------|
| 6 | **Global mutable config singleton** | `config.ts` holds a global mutable `platform` reference. This makes testing difficult, prevents multiple platform instances, and creates implicit coupling. |
| 7 | **Mixed module formats across packages** | Core uses TypeScript + Rollup, loader uses Flow + Babel, static uses CommonJS, CLI uses Sucrase. No consistent build pipeline. |
| 8 | **Platform abstraction is incomplete** | The `HamburgerPlatform` interface has only 3 methods (`name`, `createElement`, `render`). There is no lifecycle, no error boundary, no event normalization. |
| 9 | **Reconciler is naive** | `reactive.ts` reconciler replaces entire subtrees when child count changes, does not support keyed children, and has no batching. |
| 10 | **Circular conceptual dependency** | `createElement` reads `config.platform` at build time. Components call `createElement` from `build()`. This means component construction is tied to the current platform. |
| 11 | **Vue platform targets Vue 2 only** | Uses deprecated `new Vue()` constructor and Vue 2 render function API. Vue 3 is not supported. |
| 12 | **React platform uses deprecated `ReactDOM.render`** | React 18+ requires `createRoot()`. The current code will show deprecation warnings on React 17 and fail on React 18+. |

### 3.3 Code Quality Issues

| # | Issue | Location |
|---|-------|----------|
| 13 | **Unused generic parameter** -- `margin<T>()` declares generic `T` that is never used. | `View.ts:67` |
| 14 | **`IView<T>` generic is unused** -- The `T` parameter on `IView` is declared but never constrained or used. | `types.ts:20` |
| 15 | **Inconsistent conditional pattern** -- Some methods use `when !== false` (double negation), others use `when === false` with early return. | Throughout `View.ts`, `Text.ts`, `Stack.ts` |
| 16 | **`flatMap` polyfill is unnecessary** -- `Array.prototype.flatMap` has been available since ES2019 and is supported by all modern targets. | `utils.ts` |
| 17 | **TypeScript `target: es5`** -- The tsconfig targets ES5, requiring unnecessary downleveling. Modern browsers/Node all support ES2020+. | `tsconfig.json` |
| 18 | **No strict mode** -- TypeScript `strict: true` is not enabled. This means `strictNullChecks`, `noImplicitAny`, etc. are all off. | `tsconfig.json` |
| 19 | **Loader uses Flow type annotations** -- The hamburger-loader package uses Flow types (`// @flow`, `type { ... }`) while the rest of the project uses TypeScript. | `hamburger-loader/src/*.js` |
| 20 | **CSS class coupling** -- Components emit CSS class names like `flex`, `bold`, `flex-column`, `justify-center` that assume a specific CSS framework (appears to be Tachyons/Tailwind-like). No documentation of this dependency. | `Stack.ts`, `Text.ts` |
| 21 | **`hide()` logic is inverted** -- `hide(when)` hides when `when` is falsy (including `undefined`), meaning `hide()` with no argument hides the element, but `hide(true)` also hides it. The conditional `if (!when)` should be `if (when !== false)`. | `View.ts:105` |

### 3.4 Testing Issues

| # | Issue | Description |
|---|-------|-------------|
| 22 | **Tests use deprecated Enzyme** | Enzyme is unmaintained and does not support React 18. Tests use `enzyme-adapter-react-16`. |
| 23 | **Tests require React platform** | All tests run through React platform (`setupTests.js` calls `setPlatform(ReactPlatform)`), so the core library is never tested in isolation. |
| 24 | **No tests for core modules** | `createElement`, `domfy`, `mount`, `listen`, `reactive`, `rerender` have zero test coverage. |
| 25 | **No tests for auxiliary packages** | `hamburger-loader`, `hamburger-static`, `hamburger-cli` have no tests at all. |
| 26 | **No CI beyond Travis** | `.travis.yml` exists but Travis CI has been largely deprecated. No GitHub Actions workflow. |

### 3.5 Dependency Issues

| # | Issue | Description |
|---|-------|-------------|
| 27 | **Severely outdated dependencies** | TypeScript 4.4, React 17, Rollup 2, Jest 27, Babel 7.16. All are 3-4 major versions behind. |
| 28 | **`fast-equals` is the only runtime dep** | Used only in `reactive.ts` for `deepEqual`. Could be replaced with a simple structural comparison or a more focused utility. |
| 29 | **Root `package.json` has library deps in devDependencies** | `@hamburger/core`, `@hamburger/loader`, `@hamburger/platform-react` are listed as root devDeps, which is unusual for a monorepo. |
| 30 | **Loader references non-existent exports** | `hamburger-loader/src/index.js` imports `GridCol`, `GridRow`, `Icon` from `@hamburger/core`, but these are not exported by the core package. |

---

## 4. Proposed Modernization Roadmap

### Phase 1: Foundation (Weeks 1-2)

**Goal:** Establish modern build infrastructure and type safety.

1. **Upgrade TypeScript to 5.x** with `strict: true`, `target: ES2020`, `moduleResolution: bundler`
2. **Replace Rollup 2 with Vite/Rollup 4** for building the core library
3. **Migrate tests from Enzyme to @testing-library or Vitest** with jsdom
4. **Replace Travis CI with GitHub Actions**
5. **Add ESLint + Prettier** with consistent config across all packages
6. **Remove Flow annotations** from hamburger-loader, convert to TypeScript

### Phase 2: Type System Overhaul (Weeks 3-4)

**Goal:** Make the builder pattern fully type-safe.

1. **Remove all `any` types** from `ChildElement`, `ViewProps`, and component interfaces
2. **Remove `@ts-ignore` directives** by properly modeling the dual (JSX + builder) API with conditional types or separate entrypoints
3. **Add proper generics** to ViewClass so subclass methods preserve the correct `this` type:
   ```typescript
   // Current (broken): Text('x').padding(10).color('red')
   //                    ^^^^^^^^^^^^^^^^^ returns ViewClass, .color() is lost
   //
   // Fixed with polymorphic this:
   // All methods already return `this`, but the class hierarchy
   // needs to be structured so TypeScript infers the subclass type.
   ```
4. **Define strict platform interface** with proper event types and lifecycle hooks
5. **Type the DOMElement tree** with discriminated unions instead of `any` props

### Phase 3: Core Refactoring (Weeks 5-7)

**Goal:** Fix architectural issues in the core engine.

1. **Remove global config singleton** -- Pass platform through a context/factory pattern:
   ```typescript
   const app = createApp({ platform: ReactPlatform });
   app.mount(MyComponent, 'root');
   ```
2. **Decouple component construction from platform** -- Components should build platform-agnostic virtual trees; platform transformation happens only at mount time
3. **Rewrite reconciler** with proper keyed diffing algorithm (or remove it and rely on platform-level reconciliation)
4. **Sanitize PureHTML** -- Integrate DOMPurify or equivalent
5. **Fix `hide()` logic** and normalize all conditional method patterns
6. **Remove unused generics and parameters**

### Phase 4: Platform Modernization (Weeks 8-9)

**Goal:** Support current versions of React and Vue.

1. **React platform: Migrate to React 18+** -- Use `createRoot()`, support Suspense/concurrent features
2. **Vue platform: Migrate to Vue 3** -- Use Composition API and `createApp()`
3. **Add platform-level tests** for each adapter
4. **Define platform compatibility matrix** with documented minimum versions

### Phase 5: Developer Experience (Weeks 10-12)

**Goal:** Improve the development and consumption experience.

1. **Unify build tooling** -- Use a single tool (Vite or tsup) across all packages
2. **Add comprehensive JSDoc/TSDoc** to all public APIs
3. **Create proper API documentation** with examples
4. **Publish ESM + CJS dual packages** with proper `exports` field in package.json
5. **Add changesets** for versioning and changelog generation
6. **Set up monorepo tooling** (turborepo or nx) for build orchestration

---

## 5. Detailed Recommendations

### 5.1 Package Structure Improvements

**Current problems:**
- Directory names don't match package names (`hamburger-js` vs `@hamburger/core`)
- No consistent build output structure
- No shared TypeScript config

**Recommended structure:**
```
packages/
├── core/                    # @hamburger/core
│   ├── src/
│   │   ├── components/
│   │   ├── core/
│   │   ├── types.ts
│   │   └── index.ts
│   ├── tests/
│   ├── tsconfig.json       # extends ../../tsconfig.base.json
│   └── package.json
├── platform-react/          # @hamburger/platform-react
├── platform-vue/            # @hamburger/platform-vue
├── loader/                  # @hamburger/loader (converted to TS)
├── static/                  # @hamburger/static (converted to TS)
└── cli/                     # @hamburger/cli
tsconfig.base.json           # shared strict TS config
vitest.workspace.ts          # shared test config
```

### 5.2 API Design Improvements

**Problem 1: Builder methods lose subclass type after base class call**

Currently, `Text('hello').padding(10)` returns `ViewClass`, not `TextClass`, because `padding()` is defined on `ViewClass` and returns `this` which TypeScript infers as `ViewClass`. While TypeScript's polymorphic `this` should handle this, the `protected constructor()` pattern and the factory function indirection break the inference chain.

**Recommendation:** Ensure all factory functions have proper return type annotations:
```typescript
export function Text(...content: (Primitive | TextClass)[]): TextClass {
  return new TextClass(...content);
}
```
This already works because `this` in a class method refers to the actual instance type. The issue is more about the `@ts-ignore` on JSX overloads.

**Problem 2: Conditional `when` parameter is confusing**

The `when` parameter appears on almost every method but the semantics vary:
- `bold(when)`: applies when `when !== false` (default true)
- `hide(when)`: applies when `!when` (inverted, likely a bug)
- Some methods: `when === false` early return

**Recommendation:** Standardize on a single pattern:
```typescript
// All conditional methods: apply the effect unless `when` is explicitly `false`
public color(value: string, when?: boolean): this {
  if (when === false) return this;
  this._props.style.color = value;
  return this;
}
```

**Problem 3: No composition/extension story**

Users cannot create custom components that participate in the builder pattern. There is no `createComponent()` or equivalent API.

**Recommendation:** Add a component factory:
```typescript
const Card = createComponent('div', (self) => ({
  rounded: () => self.border({ radius: 8 }),
  elevated: () => self.style({ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }),
}));

// Usage: Card(child1, child2).rounded().elevated().padding(16)
```

### 5.3 Type System Improvements

1. **Enable `strict: true`** in tsconfig -- This alone will catch dozens of latent bugs
2. **Replace `ChildElement = Primitive | IBuildable | any`** with a proper union:
   ```typescript
   type ChildElement = Primitive | IBuildable | DOMElement;
   ```
3. **Type CSS properties** using `CSSStyleDeclaration` or a dedicated CSS-in-JS type library (e.g., `csstype`)
4. **Add branded types** for values that need validation:
   ```typescript
   type CSSUnit = `${number}px` | `${number}em` | `${number}rem` | `${number}%` | number;
   ```
5. **Use discriminated unions for DOMElement**:
   ```typescript
   type DOMElement =
     | { type: null; props: { content: string }; children: [] }
     | { type: string; props: Record<string, unknown>; children: DOMElement[] };
   ```

### 5.4 Build and Tooling Improvements

| Current | Recommended | Rationale |
|---------|-------------|-----------|
| Rollup 2 + manual config | tsup or Vite library mode | Simpler config, better DX, ESM-first |
| TypeScript 4.4, target es5 | TypeScript 5.x, target ES2020 | Modern features, smaller output |
| Jest 27 + Babel + Enzyme | Vitest + @testing-library/dom | Faster, ESM-native, actively maintained |
| Travis CI | GitHub Actions | Industry standard, better integration |
| No linting | ESLint flat config + typescript-eslint | Catch bugs, enforce conventions |
| pnpm workspaces (manual) | pnpm workspaces + turborepo | Cached builds, dependency graph awareness |
| No formatting enforcement | Prettier (already configured, but no pre-commit hook) | Consistent formatting |
| No git hooks | Husky + lint-staged | Pre-commit quality checks |

---

## 6. Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Breaking API changes during refactor | High | High | Maintain backward-compatible wrapper; deprecate old API gradually |
| Loss of Vue 2 compatibility | Medium | Certain | Document Vue 2 as unsupported; provide migration guide |
| Test gaps allow regressions | High | High | Write comprehensive tests BEFORE refactoring |
| DSL loader `new Function()` exploitation | High | Low | Add CSP documentation; consider static compilation instead |
| Reconciler bugs in reactive mode | Medium | Medium | Add stress tests; consider dropping custom reconciler in favor of platform reconciliation |

---

## 7. Summary

hamburger.js has an elegant API design concept but suffers from significant technical debt accumulated during its early development phase. The main concerns are:

1. **Type safety is largely absent** due to pervasive `any` usage and `@ts-ignore`
2. **The build toolchain is fragmented** with four different build tools across six packages
3. **Testing infrastructure is outdated** (Enzyme, React 16 adapter) and coverage is minimal
4. **Platform adapters target deprecated framework versions** (React 17 `ReactDOM.render`, Vue 2)
5. **The reactive system's reconciler is too simplistic** for production use
6. **Security concerns** in the DSL loader (`new Function()`) and PureHTML (no sanitization)

The proposed roadmap addresses these issues in dependency order: foundation first (types, builds, tests), then core refactoring, then platform modernization, and finally developer experience. The total effort is estimated at 10-12 weeks for a small team.
