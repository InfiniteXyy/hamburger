## hamburger.js

Let **IDE** teach you.

Let **Code** show everything.

[![Build Status](https://travis-ci.org/hamburger-js/hamburger.svg?branch=master)](https://travis-ci.org/hamburger-js/hamburger)

## About

😢 Have you ever encountered such scene? When you just want to highlight a word when it is selected, you have to write like:

```jsx
// inline style
<p style={[styles.defaultText, shouldHighlight && { color: 'red' }]}>...</p>

// or with classnames lib and css
<p style={classnames({"default-text": true, "hightlight-text": shouldHighlight})}>...</p>
...

```

😄 But when you use hamburger, you only need to _tell_ computer what to do, and the library will do all rest things for you.

```js
Text('...')
  .style(styles.defaultText)
  .color('red', shouldHighlight);
```

🦉 Most importantly, this lib is not a framework, it's just a helper. You can use it anywhere in the project with existing React component.

## Quick Start and Try

```bash
git clone https://github.com/hamburger-js/hamburger.git
cd hamburger
yarn # or npm i
yarn dev:lib
yarn playground
```

## Features

#### Content in the first place

```jsx
// with tradition jsx
function App2() {
  return (
    <div>
      <div style={{ padding: 16 }}>
        <div style={{ color: 'skyblue', fontWeight: 'bold', fontSize: 64 }}>Declarative UI</div>
        <div style={{ color: 'pink', fontSize: 48 }}>Super Easy</div>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: 4 }}>made by</div>
          <div style={{ fontWeight: 'bold' }}>InfiniteX</div>
        </div>
      </div>
    </div>
  );
}

/*
 * with declarative api
 * You can see that the Annoying duplicated `<div style={{` was all removed!
 * 😊 And the most important thing, content, is put in the very first place.
 */
function Main() {
  return VStack(
    VStack(
      Text('Declarative UI')
        .color('skyblue')
        .size(64)
        .bold(),
      Text('Super Easy')
        .color('pink')
        .size(48),
      HStack(Text('made by').margin({ right: 4 }), Text('InfiniteX').bold()),
    ).padding(16),
  ).build();
}
```

#### Easy to write higher order styled components

```js
// build styles with chained calls
function BaseButton(content) {
  return Button(content).style(styles.baseButton);
}

export default function Main() {
  return HStack(BaseButton('Primary').style(styles.buttonPrimary), BaseButton('Secondary').style(styles.buttonSuccess))
    .margin({ top: 10 })
    .build();
}
```

#### Work fine with existing jsx

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return HStack(Text(count), <button onClick={() => setCount(count + 1)}>add</button>).build();
}
```

#### All declaration are in control with condition

```jsx
function Main(props) {
  const { isDisabled, isImmportant } = props;
  return HStack(
    Text('love hamburger')
      .color('blue')
      .color('red', isImportant),
    Button('click me')
      .content('disabled', isDisabled)
      .disabled(isDisabled),
  ).build();
}
```

#### All utils simple to use (developing)

If you want to create your Main with a classic layout, hamburger.js has already prepared for you.
use them like

```jsx
export default function Main() {
  return Layout('top-aside-main-bottom') // or top-main-bottom, top-main, top-aside-main, etc...
    .top(Navbar)
    .main(MainView)
    .aside(AsideMenu)
    .bottom(BottomBar)
    .build();
}
```

#### IDE is the doc (developing)

hamburger.js was designed for **everyone**, even you are not quite familiar with HTML/CSS/JS.

If you want to use this lib, but you <u>don't want to read the doc</u>.

1. open you IDE and download the plugin.
2. write a function like it was in React.
3. Type `@`, see all available components.
4. Type `.` after the component, see everything you can do.

## TODOs

version 0.0.1

- [x] Base Class (View, Text)
- [x] TypeScript support
- [x] simple todo mvc
- [x] Review & Test
- [x] More Classes (Image...)
- [x] test input binding like v-model
- [x] Layout Class
- [ ] use custom theme config
- [ ] new APIs (`.shadow("small", { on: "hover" })`) ()
- [ ] Review

version 0.0.2

- [ ] VSCode plugin, type `@`, and auto suggest all available components
- [ ] compatibility with popular UI Library
- [ ] performance test

## More

This project was mostly inspired by `Swift UI`. Although I am not familiar with Swift, I think this programming style is really cool!

Since I am still a beginner and a student in React society, any guidance is really precious to me.

if you have any opinion or suggestion, give me an **issue**!
