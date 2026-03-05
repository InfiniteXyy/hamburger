# Test Coverage Audit - hamburger.js

**Date:** 2026-03-05
**Auditor:** QA Engineer
**Scope:** `packages/hamburger-js/`

---

## 1. Current Test Coverage Summary

### 1.1 Test Infrastructure

| Item | Current State |
|------|--------------|
| Test runner | Jest |
| Rendering library | Enzyme 3.11.0 (shallow rendering) |
| Adapter | enzyme-adapter-react-16 |
| Transform | babel-jest with `@babel/preset-env`, `@babel/preset-typescript` |
| Setup | Sets `ReactPlatform` and configures Enzyme adapter |
| Test file pattern | `**/test/**/*.js?(x)` |

### 1.2 Test Files Inventory

| Test File | Target Component(s) | Test Count | Description |
|-----------|---------------------|------------|-------------|
| `test/Button.test.js` | Button | 3 (+ 1 parameterized) | onClick callback, disabled flag, conditional disabled |
| `test/Input.test.js` | Input | 3 | Input type, onChange callback, arbitrary props |
| `test/Stack.test.js` | VStack, HStack | 2 | alignItems/justifyContent classes, children rendering |
| `test/Text.test.js` | Text | 3 (+ 2 parameterized) | Inline styles (color, fontSize, fontWeight), bold class, conditional state |
| `test/common/baseHtml.test.js` | HStack, VStack, Text, Button, Input | 7 x 5 components = 35 | Box model (padding/margin), size, border, className, id, style object, props |
| `test/common/semanticLabel.test.js` | HStack, VStack, Text | 1 x 3 components = 3 | HTML tag override via `.tag()` |
| `test/common/textElement.test.js` | Button, Text | 2 x 2 components = 4 | Text content rendering, content change |

**Total estimated test cases: ~50** (including parameterized variants)

### 1.3 Components WITH Tests

| Component | Coverage Level | Notes |
|-----------|---------------|-------|
| **Button** | Partial | onClick, disabled, content, base HTML props |
| **Input** | Partial | Type, onChange, arbitrary props; missing onInput, onKeyPress, placeholder, bind, wrapLabel, checkbox mode |
| **Text** | Good | Content, styling (color, fontSize, fontWeight, bold), conditional rendering |
| **VStack/HStack** | Partial | alignItems, justifyContent, children; missing reverse, mapItem, nowrap, inflate |
| **ViewClass (base)** | Good (via common tests) | padding, margin, size, border, class, id, style, props, tag |

### 1.4 Components WITHOUT Tests

| Component | File | Complexity | Priority |
|-----------|------|-----------|----------|
| **Link** | `text/Link.ts` | Low (extends TextClass) | Medium |
| **Image** | `image/Image.ts` | Low (extends ViewClass) | Medium |
| **Layout** | `layout/Layout.ts` | High (9 layout types, placeholder generation) | High |
| **Table / TableRow** | `table/Table.ts` | Medium (TableRow, TableData, header/body structure) | High |
| **List / ListItem** | `stack/List.ts` | Low-Medium | Medium |
| **PureHTML** | `PureHTML.ts` | Low (dangerouslySetInnerHTML) | Low |

---

## 2. Coverage Gaps Analysis

### 2.1 Untested Components (0% coverage)

1. **Link** (`text/Link.ts`)
   - `href()` method with conditional
   - Default `#` href
   - Inherits from TextClass (text styling should carry over)

2. **Image** (`image/Image.ts`)
   - `src` prop assignment
   - Renders as `<img>` tag
   - Inherits ViewClass base methods

3. **Layout** (`layout/Layout.ts`)
   - 9 distinct layout types (`top-main`, `top-main-bottom`, etc.)
   - `top()`, `bottom()`, `main()`, `aside()` slot methods
   - Default placeholder generation with `createPlaceHolder`
   - Complex composition of VStack/HStack

4. **Table / TableRow** (`table/Table.ts`)
   - Header row with `<th>` conversion via `mapItem`
   - Body rows
   - `<table>/<thead>/<tbody>/<tr>/<td>` tag structure
   - Nested array flattening

5. **List / ListItem** (`stack/List.ts`)
   - Auto-wrapping of non-ListItem children
   - `<ol>/<li>` tag structure
   - `list-reset` class

6. **PureHTML** (`PureHTML.ts`)
   - `dangerouslySetInnerHTML` assignment

### 2.2 Untested Methods on Tested Components

| Component | Untested Methods |
|-----------|-----------------|
| **Input** | `onInput()`, `onKeyPress()`, `placeholder()`, `wrapLabel()`, `bind()` (both lazy and non-lazy), checkbox `checked` prop |
| **Stack** | `reverse()`, `mapItem()`, `nowrap()`, `inflate()`, auto-flex promotion on justifyContent/alignItems for VStack |
| **ViewClass** | `onClick()`, `hide()`, `opacity()`, conditional `when` parameter on most methods, `build()` empty style cleanup |
| **Button** | Theme prop (defined in type but no implementation) |

### 2.3 Untested Core Modules (0% coverage)

| Module | File | Complexity | Priority |
|--------|------|-----------|----------|
| **createElement** | `core/createElement.ts` | High | Critical |
| **domfy / toCSS** | `core/domfy.ts` | High | Critical |
| **mount** | `core/mount.ts` | Medium | High |
| **listen / reactive** | `core/listen.ts` | Very High (Proxy-based reactivity, DOM reconciliation) | Critical |
| **reactive (rerender)** | `core/reactive.ts` | Very High (virtual DOM diffing) | Critical |
| **DefaultPlatform** | `core/platform.ts` | Low | Medium |
| **config** | `config.ts` | Low | Low |
| **flatMap utility** | `utils.ts` | Low | Low |

### 2.4 Coverage Gap Summary

| Category | Tested | Total | Coverage |
|----------|--------|-------|----------|
| Components | 5 of 11 | 11 | ~45% |
| Component methods | ~18 of ~40 | ~40 | ~45% |
| Core modules | 0 of 7 | 7 | 0% |
| Utility functions | 0 of 1 | 1 | 0% |
| **Overall estimated** | | | **~25-30%** |

---

## 3. Test Quality Assessment

### 3.1 Strengths

- **Parameterized tests**: Good use of `it.each()` for conditional (boolean state) testing in Text and Button
- **Shared cross-component tests**: `common/baseHtml.test.js` applies the same base tests across all 5 tested components using `describe.each()`, reducing duplication
- **Assertion specificity**: Tests check specific props rather than snapshot-matching, making them resilient to unrelated changes
- **Fluent API coverage**: Tests exercise the builder pattern (`Button('click').disabled().build()`) which is the library's primary API

### 3.2 Weaknesses

1. **Enzyme dependency (deprecated)**
   - Enzyme has been effectively unmaintained since 2020
   - `enzyme-adapter-react-16` locks the project to React 16 for testing
   - No official adapter exists for React 17+ or 18+
   - `shallow()` rendering does not test real DOM behavior
   - This is a **blocking issue** for any React upgrade

2. **No integration tests**
   - All tests use `shallow()` rendering only
   - No tests verify actual DOM output
   - No tests verify the full `build() -> createElement -> domfy -> DOM` pipeline
   - The core rendering pipeline (the most complex code) is entirely untested

3. **No tests for the reactivity system**
   - `listen()`, `reactive()`, and `rerender()` are the most complex modules
   - Proxy-based state management has many edge cases (nested objects, arrays, subscriptions)
   - DOM reconciliation/diffing (`reconcileChildren`) is completely untested
   - These are the highest-risk areas for regressions

4. **Missing edge case tests**
   - No tests for empty/null/undefined inputs
   - No tests for chaining order sensitivity
   - No tests for the `when` conditional parameter being `false`
   - No tests for multiple `.class()` calls stacking

5. **Test setup fragility**
   - Setup file mixes ES module imports with CommonJS `require()`
   - Depends on `@hamburger/platform-react` for test environment but tests are validating framework-agnostic behavior

6. **No TypeScript tests**
   - All tests are `.js` files despite the source being TypeScript
   - No type-level testing for the fluent API
   - The overloaded function signatures (e.g., `Button(string)` vs `Button(ButtonProps)`) are not tested

---

## 4. Migration Plan: Enzyme -> Modern Testing

### 4.1 Recommended Target: Vitest + @testing-library/dom

**Why Vitest over Jest:**
- Native TypeScript and ESM support (no babel config needed)
- Compatible with Jest's API (minimal rewrite)
- Faster execution with Vite's transform pipeline
- Better monorepo support

**Why @testing-library/dom over React Testing Library:**
- hamburger.js is not React-only; it has its own DOM platform (`DefaultPlatform`)
- `@testing-library/dom` tests real DOM nodes, which is what `domfy()` produces
- Tests should validate actual rendered output, not React virtual DOM

### 4.2 Migration Steps

#### Phase 1: Setup (Low Risk)
1. Install Vitest and `@testing-library/dom`
2. Create `vitest.config.ts` with TypeScript support
3. Remove Enzyme, enzyme-adapter-react-16, babel config (for tests)
4. Update `package.json` test script: `"test": "vitest"`

#### Phase 2: Migrate Existing Tests (Medium Risk)
1. Convert test files from `.js` to `.ts`
2. Replace `shallow()` calls with direct `build()` + DOM assertion pattern:

   **Before (Enzyme):**
   ```js
   import { shallow } from 'enzyme';
   const wrapper = shallow(Button('click').disabled().build());
   expect(wrapper.props().disabled).toBe(true);
   ```

   **After (Vitest + Testing Library):**
   ```ts
   import { Button } from '../lib';
   import { domfy } from '../lib/core/domfy';

   // For Hamburger platform (pure DOM)
   const element = domfy(Button('click').disabled().build());
   expect(element.disabled).toBe(true);

   // Or test the intermediate DOMElement structure directly
   const tree = Button('click').disabled().build();
   expect(tree.props.disabled).toBe(true);
   ```

3. Migrate each test file one at a time, verifying test parity

#### Phase 3: Add Missing Coverage (see Section 5)

### 4.3 Effort Estimate

| Task | Files | Complexity |
|------|-------|-----------|
| Setup Vitest | 3-4 config files | Low |
| Migrate `Button.test` | 1 file, 4 tests | Low |
| Migrate `Input.test` | 1 file, 3 tests | Low |
| Migrate `Stack.test` | 1 file, 2 tests | Low |
| Migrate `Text.test` | 1 file, 5 tests | Low |
| Migrate `common/baseHtml.test` | 1 file, 35 test combos | Medium |
| Migrate `common/semanticLabel.test` | 1 file, 3 tests | Low |
| Migrate `common/textElement.test` | 1 file, 4 tests | Low |
| Remove Enzyme deps & setup | 3 files | Low |

---

## 5. Proposed Testing Strategy for Refactored Codebase

### 5.1 Test Architecture

```
tests/
  unit/
    components/          # Component builder tests (fluent API)
      Button.test.ts
      Input.test.ts
      Text.test.ts
      Link.test.ts
      Image.test.ts
      Stack.test.ts
      List.test.ts
      Table.test.ts
      Layout.test.ts
      PureHTML.test.ts
      View.test.ts       # Base class tests (replaces common/baseHtml)
    core/                # Core module tests
      createElement.test.ts
      domfy.test.ts
      mount.test.ts
      listen.test.ts
      reactive.test.ts
      platform.test.ts
    utils/
      flatMap.test.ts
  integration/
    rendering.test.ts    # Full pipeline: builder -> build() -> domfy -> DOM
    reactivity.test.ts   # Reactive state -> re-render cycle
    platform.test.ts     # Platform switching (React vs Hamburger)
```

### 5.2 Priority Order for New Tests

**P0 - Critical (write first):**
1. `core/createElement.test.ts` - The bridge between builder API and DOM
2. `core/domfy.test.ts` - DOM generation from DOMElement tree
3. `core/reactive.test.ts` - Virtual DOM diffing / reconciliation
4. `core/listen.test.ts` - Proxy-based reactivity system
5. `integration/rendering.test.ts` - End-to-end render pipeline

**P1 - High:**
6. `components/Layout.test.ts` - Complex component, 9 layout variants
7. `components/Table.test.ts` - Header/body structure, tag rewriting
8. `components/Input.test.ts` (expand) - bind(), wrapLabel(), onKeyPress()
9. `components/Stack.test.ts` (expand) - reverse(), auto-flex, mapItem()
10. `components/View.test.ts` - Base class: hide(), opacity(), onClick(), conditional `when`

**P2 - Medium:**
11. `components/Link.test.ts`
12. `components/Image.test.ts`
13. `components/List.test.ts`
14. `components/PureHTML.test.ts`
15. `utils/flatMap.test.ts`

**P3 - Nice to have:**
16. `integration/reactivity.test.ts` - Full reactive cycle with DOM
17. `integration/platform.test.ts` - Multi-platform support
18. TypeScript type-level tests for overloaded signatures

### 5.3 Testing Patterns to Adopt

#### Pattern 1: Direct DOMElement Tree Assertion
Test the builder output without DOM rendering, for fast unit tests:
```ts
it('should set button as disabled', () => {
  const tree = Button('click').disabled().build();
  expect(tree.type).toBe('button');
  expect(tree.props.disabled).toBe(true);
  expect(tree.children[0].props.content).toBe('click');
});
```

#### Pattern 2: DOM Rendering with domfy()
Test actual DOM output for integration confidence:
```ts
it('should render a disabled button element', () => {
  const tree = Button('click').disabled().build();
  const element = domfy(tree) as HTMLButtonElement;
  expect(element.tagName).toBe('BUTTON');
  expect(element.disabled).toBe(true);
  expect(element.textContent).toBe('click');
});
```

#### Pattern 3: Reactive State Testing
Test the Proxy-based reactivity system:
```ts
it('should notify subscribers on state change', () => {
  const state = reactive({ count: 0 });
  const spy = vi.fn();
  state.subscribe(spy);
  state.count = 1;
  expect(spy).toHaveBeenCalledWith(state, 'count', 1);
});
```

#### Pattern 4: Parameterized Cross-Component Tests
Keep the existing pattern of `describe.each` for shared base behavior:
```ts
describe.each([HStack, VStack, Text, Button, Input, Link, Image])
  ('base ViewClass methods for %p', (Component) => {
    it('should apply padding', () => { /* ... */ });
    it('should apply margin', () => { /* ... */ });
    // ...
  });
```

### 5.4 Key Testing Principles

1. **Test the public API**: Focus on the fluent builder methods and `build()` output, not internal class state
2. **Two-layer testing**: Unit tests on DOMElement trees (fast), integration tests on real DOM (thorough)
3. **No Enzyme, no React dependency for core tests**: The core library should be testable without React
4. **Conditional (`when`) parameter**: Every method accepting `when` should have explicit true/false test cases
5. **JSDOM for DOM tests**: Vitest includes JSDOM support for `domfy()`, `mount()`, and reactive re-rendering tests

---

## 6. Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|------------|
| Enzyme blocks React 18+ upgrade | High | Certain | Migrate to Vitest (Phase 2 in migration plan) |
| Untested reactivity system has hidden bugs | High | Medium | Prioritize reactive/listen tests in P0 |
| createElement edge cases in JSX mode | Medium | Medium | Add tests for both Hamburger and React platforms |
| Layout component regressions during refactor | Medium | High | Add tests for all 9 layout types before refactoring |
| DOM reconciliation bugs (reactive.ts) | High | Medium | Add targeted diffing tests with known inputs |
| Test migration breaks existing passing tests | Low | Low | Migrate one file at a time, verify parity |
