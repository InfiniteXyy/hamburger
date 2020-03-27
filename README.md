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
Text('...').color('red').bold();
```

🦉 Most importantly, this lib is more like a helper. You can use it easily in your existing `React` project, it works fine with `JSX Component` and React libraries such as `Redux`.

## Quick Start and Try

```bash
git clone https://github.com/hamburger-js/hamburger.git
cd hamburger
yarn
yarn build
cd examples
# choose any template you are interested with
```

## Features

#### Content in the first place
```jsx harmony
/*
 * The most important thing, content, is always put in the very first place.
 */
function Main() {
  return VStack(
    VStack(
      Text('Declarative UI').color('skyblue').size(64).bold(),
      Text('Super Easy').color('pink').size(48),
      HStack(
        Text('made by').margin({ right: 4 }),
        Text('InfiniteX').bold()
      ),
    ).shadow("small"),
  );
}
```


#### Use DSL to simplify the code
```
// variable start with "fake" will turn into mock data by the platform

HStack {               @padding=3 @margin.vertical=3 @size.width=550px @shadow @border.radius=10px
  Image(imgLink)       @theme=thumbnail @size.width=300px @margin.right=3
  VStack {
    Text(name)         @margin.right=3 @margin.bottom=0 @theme=h3
    Link(fakeEmail)    @bold @margin.bottom=3
    Text(fakeTime)
    Button("Follow")   @theme=primary
  }
}
```

#### Build reactive web use traditional Observer mode. (no vdom)
```js
function counter(data) {
  return VStack(
    Text(data.count).theme('h1'),
    Button('add')
      .onClick(() => data.count++) // just change the data
      .theme('primary'),
  );
}

function anotherList({ count }) {
  return VStack(
    Text('something').fontSize(count),
  );
}

function root() {
  const provider = listen({ count: 10 });
  return VStack(
    provider(counter)(),
    Text("all subscriber will automatically update when data changes"),
    provider(anotherList)(),
  );
}

export default root;
```

#### Build static website
```js
// generate static web with declarative API
import staticWebManager from 'hamburger-static';
import About from './views/About';
import Home from './views/Home';
import Detail from './views/Detail';

staticWebManager()
  .route([
    { path: '', view: Home() },
    { path: 'about', view: About() },
    { path: 'detail', view: Detail() }],
  )
  .template('./public/index.html', 'root')
  .output('./dist');
```

#### A bunch of useful components

```jsx harmony
export default function Main() {
  return Layout('top-aside-main-bottom') // or top-main-bottom, top-main, top-aside-main, etc...
    .top(Navbar)
    .main(MainView)
    .aside(AsideMenu)
    .bottom(BottomBar)
    .build();
}
```

#### Work together with modern Library such as React and Bootstrap

```jsx harmony
// in index.js
hamburger.setUp(React, ReactDOM).mount(App, "root")

// in Counter.jsx
function Counter() {
  const [count, setCount] = useState(0); // React hooks available if you have setUp react and reactdom
  count [username, setUsername] = useState("");
  return HStack(
    Input(username).bind(setUsername),
    Text(count),
    <button onClick={() => setCount(count - 1)}>minus</button>,
    <button onClick={() => setCount(count + 1)}>add</button>
  ).build();
}

// in your component, the theme api will automatically generate bootstrap className for you.
const form = VStack(
  Button('primary button').theme('primary'),
  Image('...').theme('circular')
)
```



#### Use native hamburger core.

hamburger.js has it's own dom engine, it is designed for static website, simple and take less space.
Also, you can use hamburger to generate static html files with command line tools.

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
- [x] use custom theme config
- [ ] new APIs (`.shadow("small", { on: "hover" })`) ()
- [x] Review

version 0.0.2
- [x] DSL support
- [ ] Reactive mode
- [x] VSCode plugin, type `@`, and auto suggest all available components
- [x] compatibility with popular UI Library
- [ ] performance test

## More

This project was mostly inspired by `Swift UI`. Although I am not familiar with Swift, I think this programming style is really cool!

Since I am still a beginner and a student in frontend society, any guidance is really precious to me.

if you have any opinion or suggestion, give me an **issue**!
