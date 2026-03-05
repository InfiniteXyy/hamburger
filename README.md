## hamburger.js

[![CI](https://github.com/hamburger-js/hamburger/actions/workflows/ci.yml/badge.svg)](https://github.com/hamburger-js/hamburger/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A declarative UI framework for the web, inspired by SwiftUI and Jetpack Compose.

## About

hamburger.js provides a fluent builder-pattern API for constructing web UIs. Instead of writing verbose JSX or HTML, you describe your UI declaratively:

```js
// Traditional approach
<p style={{ color: shouldHighlight ? 'red' : 'black', fontWeight: 'bold' }}>Hello</p>

// With hamburger.js
Text('Hello').color('red', shouldHighlight).bold()
```

hamburger.js works as a standalone renderer or as a companion to React and Vue projects.

## Quick Start

```bash
git clone https://github.com/hamburger-js/hamburger.git
cd hamburger
pnpm install
pnpm build
pnpm playground
```

**Requirements:** Node.js >= 18, pnpm

## Packages

| Package | Description |
|---------|-------------|
| `@hamburger/core` | Core library with components and rendering engine |
| `@hamburger/platform-react` | React adapter -- use hamburger components in React apps |
| `@hamburger/platform-vue` | Vue adapter -- use hamburger components in Vue apps |
| `@hamburger/loader` | DSL template tag parser for shorthand syntax |
| `@hamburger/static` | Static site generator -- render to HTML files |
| `@hamburger/cli` | CLI tool for scaffolding new projects |

## Usage

### Standalone (Native DOM)

```js
import hamburger, { VStack, Text, Button } from '@hamburger/core';

function App() {
  return VStack(
    Text('Hello World').color('skyblue').fontSize(32).bold(),
    Button('Click me').onClick(() => alert('clicked'))
  );
}

hamburger.mount(App(), 'root');
```

### With React

```js
import hamburger, { VStack, Text, HStack, Input } from '@hamburger/core';
import ReactPlatform from '@hamburger/platform-react';

hamburger.setPlatform(ReactPlatform);

function Counter() {
  const [count, setCount] = useState(0);
  return VStack(
    Text(String(count)).fontSize(48).bold(),
    HStack(
      Button('- 1').onClick(() => setCount(count - 1)),
      Button('+ 1').onClick(() => setCount(count + 1))
    )
  ).build();
}

hamburger.mount(Counter, 'root');
```

### Static Site Generation

```js
import staticWebManager from '@hamburger/static';
import { VStack, Text } from '@hamburger/core';

function Home() {
  return VStack(
    Text('Welcome').fontSize(32).bold()
  );
}

staticWebManager()
  .route([
    { path: '', view: Home() },
  ])
  .template('./public/index.html', 'root')
  .output('./dist');
```

## API Reference

### Components

All components return builder instances with a fluent API. Every method returns `this` for chaining. Most styling methods accept an optional `when` parameter -- pass `false` to skip the style conditionally.

#### Text(content)

Creates a `<p>` element with text content.

```js
Text('Hello')
  .color('red')              // set text color
  .fontSize(16)              // set font size (number or string)
  .fontWeight('bold')        // set font weight
  .bold()                    // shorthand for bold class
  .content('new text')       // replace text content
```

#### Link(content)

Creates an `<a>` element. Extends `Text` with all its methods.

```js
Link('Click here')
  .href('https://example.com')
  .color('blue')
```

#### Button(content?)

Creates a `<button>` element.

```js
Button('Submit')
  .onClick(() => handleSubmit())
  .disabled(isLoading)       // conditionally disable
  .content('Submitting...')  // change button text
```

#### Input(value, type?)

Creates an `<input>` element.

```js
Input('', 'text')
  .placeholder('Enter name')
  .onChange(callback)
  .onInput(callback)
  .onKeyPress('Enter', handleEnter)
  .bind(setValue)            // two-way binding helper

Input(true, 'checkbox')
  .wrapLabel('Accept terms')
```

#### Image(src)

Creates an `<img>` element.

```js
Image('photo.jpg')
  .size({ width: 200, height: 150 })
  .border({ radius: 8 })
```

#### HStack(...children) / VStack(...children)

Horizontal and vertical stack containers. `HStack` uses `display: flex` with row direction.

```js
VStack(
  Text('Title').bold(),
  HStack(
    Text('Left'),
    Text('Right')
  ).justifyContent('between')
   .alignItems('center')
).padding(16)
```

Stack-specific methods:
```js
.justifyContent('center')   // flex justify-content
.alignItems('center')        // flex align-items
.reverse()                   // reverse direction
.nowrap()                    // prevent flex wrapping
.inflate()                   // fill available space
.mapItem(fn)                 // transform each child
```

#### List(...children)

Creates an `<ol>` element. Automatically wraps non-ListItem children.

```js
List(
  Text('Item 1'),
  Text('Item 2'),
  ListItem(Text('Item 3'))   // explicit ListItem
)
```

#### Table(header, ...rows)

Creates a `<table>` with header and body rows.

```js
Table(
  TableRow(Text('Name'), Text('Age')),
  TableRow(Text('Alice'), Text('30')),
  TableRow(Text('Bob'), Text('25'))
)
```

#### Layout(type)

Creates a page layout from a predefined template.

```js
Layout('top-aside-main-bottom')
  .top(Navbar)
  .aside(Sidebar)
  .main(Content)
  .bottom(Footer)
  .build()
```

Available layouts: `top-main`, `top-main-bottom`, `top-aside-main`, `top-main-aside`, `top-aside-main-bottom`, `main-bottom`, `aside-main`, `aside-main-bottom`, `aside-bottom-main`

#### PureHTML(html)

Renders raw HTML string. Use with caution -- no sanitization is applied.

```js
PureHTML('<strong>Bold text</strong>')
```

### Common Methods (ViewClass)

All components inherit these methods from the base `ViewClass`:

```js
// Box model
.padding(10)                         // uniform padding
.padding({ top: 10, horizontal: 20 }) // directional padding
.margin(10)                          // uniform margin
.margin({ vertical: 8 })            // directional margin

// Sizing
.size(100)                           // width = height = 100
.size({ width: 200, height: 100 })  // explicit dimensions

// Borders
.border({ radius: 8, width: 1, color: '#ccc' })

// Visibility
.opacity(0.5)
.hide()                              // hide element
.hide(shouldHide)                    // conditional hide

// Styling
.style({ backgroundColor: 'red' })  // inline styles
.class('my-class', 'another')       // CSS classes

// Events
.onClick(callback)

// HTML attributes
.id('my-element')
.tag('section')                      // change HTML tag
.props({ 'data-testid': 'foo' })    // arbitrary attributes
```

### Conditional Styling

Every method that accepts a `when` parameter applies conditionally:

```js
Text('Status')
  .color('green', isActive)     // green only when isActive is true
  .color('gray', !isActive)     // gray when not active
  .bold(isImportant)            // bold only when important
  .hide(!isVisible)             // hidden when not visible
```

### Reactive System

hamburger.js includes a Proxy-based reactive system for building dynamic UIs without a virtual DOM:

```js
import { listen } from '@hamburger/core';

function Counter(data) {
  return VStack(
    Text(String(data.count)).fontSize(32),
    Button('+').onClick(() => data.count++)
  );
}

function App() {
  const withCount = listen({ count: 0 });
  return VStack(
    withCount(Counter)()
  );
}
```

### DSL Syntax

The `@hamburger/loader` package provides a shorthand DSL:

```
HStack {               @padding=3 @margin.vertical=3
  Image(imgLink)       @size.width=300px
  VStack {
    Text(name)         @margin.right=3
    Link(fakeEmail)    @bold
    Button("Follow")
  }
}
```

## Development

```bash
pnpm install          # install dependencies
pnpm build            # build all packages
pnpm test             # run tests
pnpm dev              # watch mode for core library
pnpm playground       # start example app
```

### Project Structure

```
packages/
  hamburger-js/       @hamburger/core         Core library
  platform-react/     @hamburger/platform-react   React adapter
  platform-vue/       @hamburger/platform-vue     Vue adapter
  hamburger-loader/   @hamburger/loader       DSL parser
  hamburger-static/   @hamburger/static       Static site generator
  hamburger-cli/      @hamburger/cli          CLI scaffolding
examples/
  basic/              Basic React example
  reactive-react/     Reactive mode example
  static/             Static site example
```

### Tech Stack

- TypeScript 5.x with strict mode
- Rollup 4 for bundling (UMD, ESM, CJS outputs)
- Vitest for testing with happy-dom
- pnpm workspaces for monorepo management
- GitHub Actions for CI (Node.js 18, 20, 22)

### Testing

Tests use [Vitest](https://vitest.dev/) with [happy-dom](https://github.com/nicedayfor/happy-dom) for DOM simulation and [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) for component testing through the React platform adapter.

```bash
pnpm test             # run all tests
pnpm test:lib         # run core library tests only
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup and guidelines.

## Inspiration

This project is inspired by SwiftUI and Jetpack Compose. The goal is to bring declarative, fluent UI construction to the web.

## License

MIT
