# eslint-plugin-hamburger

ESLint rules for hamburger.js projects.

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
      'hamburger/prefer-build': 'warn',
      'hamburger/no-empty-stack': 'error',
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

### `hamburger/prefer-build`

Warns when a hamburger component might be missing a `.build()` call, especially in JSX contexts.

**Bad:**
```jsx
function App() {
  return <div>{Text('Hello').color('red')}</div>;
}
```

**Good:**
```jsx
function App() {
  return <div>{Text('Hello').color('red').build()}</div>;
}
```

### `hamburger/no-empty-stack`

Prevents empty `HStack` or `VStack` components.

**Bad:**
```js
const layout = VStack();
```

**Good:**
```js
const layout = VStack(Text('Content'));
```

## License

MIT
