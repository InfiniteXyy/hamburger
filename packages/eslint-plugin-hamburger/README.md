# eslint-plugin-hamburger

ESLint rules for hamburger.js projects. Enforces proper chaining patterns, catches common mistakes, and suggests best practices.

## Installation

```bash
pnpm add -D eslint-plugin-hamburger eslint
```

## Usage (ESLint 9+ Flat Config)

```js
// eslint.config.js
import hamburger from 'eslint-plugin-hamburger';

export default [
  {
    plugins: {
      hamburger,
    },
    rules: {
      'hamburger/no-empty-stack': 'error',
      'hamburger/no-duplicate-style-methods': 'warn',
      'hamburger/no-conflicting-visibility': 'warn',
      'hamburger/require-content': 'warn',
      'hamburger/prefer-build': 'warn',
      'hamburger/no-raw-html': 'off',
    },
  },
];
```

### Using the Recommended Config

```js
// eslint.config.js
import { recommended } from 'eslint-plugin-hamburger';

export default [
  recommended,
  // your other configs...
];
```

## Rules

| Rule | Default | Type | Description |
|------|---------|------|-------------|
| `no-empty-stack` | error | problem | Disallow empty HStack or VStack |
| `no-duplicate-style-methods` | warn | problem | Disallow duplicate style method calls in a chain |
| `no-conflicting-visibility` | warn | problem | Disallow using .hide() with .opacity() |
| `require-content` | warn | problem | Require content argument for Text and Button |
| `prefer-build` | warn | suggestion | Ensure .build() is called when used in JSX |
| `no-raw-html` | off | suggestion | Discourage PureHTML() due to XSS risk |

### `hamburger/no-empty-stack`

Prevents empty `HStack` or `VStack` components, which are almost always a mistake.

```js
// Bad
const layout = VStack();
const row = HStack();

// Good
const layout = VStack(Text('Content'));
const row = HStack(Button('A'), Button('B'));
```

### `hamburger/no-duplicate-style-methods`

Warns when the same builder method is called multiple times in a chain. The later call always overwrites the earlier one, which is likely a mistake.

```js
// Bad -- second .color() overwrites the first
Text('hello').color('red').bold().color('blue')

// Bad -- second .padding() overwrites the first
Button('ok').padding(10).margin(5).padding(20)

// Good
Text('hello').color('blue').bold()
```

### `hamburger/no-conflicting-visibility`

Warns when `.hide()` and `.opacity()` are both used in the same chain. `.hide()` sets `display: none`, which makes `opacity` irrelevant.

```js
// Bad -- hide() makes opacity meaningless
Text('hi').hide().opacity(0.5)

// Good -- use one or the other
Text('hi').hide()
Text('hi').opacity(0)
```

### `hamburger/require-content`

Requires that `Text()` and `Button()` are called with content. Empty text/button components render nothing useful.

```js
// Bad
Text()
Button()

// Good
Text('Hello World')
Button('Submit')
```

### `hamburger/prefer-build`

Warns when a hamburger component is used in JSX without calling `.build()`. Hamburger components return builder instances, not React elements -- `.build()` must be called to produce renderable output.

```jsx
// Bad -- returns a builder instance, not a React element
function App() {
  return <div>{Text('Hello').color('red')}</div>;
}

// Good
function App() {
  return <div>{Text('Hello').color('red').build()}</div>;
}
```

### `hamburger/no-raw-html`

Warns when `PureHTML()` is used. `PureHTML()` injects raw HTML without sanitization, which is an XSS risk if the content comes from user input. Disabled by default.

```js
// Warned (when enabled)
PureHTML(userInput)
PureHTML('<script>alert("xss")</script>')

// Preferred
Text(userContent)
VStack(Text('structured'), Text('content'))
```

## License

MIT
