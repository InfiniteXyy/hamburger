## Declarative React (developing)

if you have any opinion or suggestion, give me an **issue**!


## About

😢 Have you ever encountered such a scene? When you just want to `style` a word, make it blue, you have to write

```js
<div style={{ color: 'skyblue' }}>...</div>
```

😄 But when you use declarative programming, you only need to call a method, to _tell_ computer what to do (like writing a story), and the library will do all rest things for you

```js
Text('something').color('skyblue');
```

🦉 Most importantly, this lib is not a framework, it's just a helper. You can use it anywhere in the project.

## Example App
```bash
git clone https://github.com/InfiniteXyy/declarative-react.git
cd declarative-react
yarn install
cd declarative-react
yarn build
cd ../example
yarn start
```

## Preview

**with jsx**

```js
function App2() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div style={{ padding: 16 }}>
        <div style={{ color: 'skyblue', fontWeight: 'bold', fontSize: 64 }}>
          Declarative UI
        </div>
        <div style={{ color: 'pink', fontSize: 48 }}>Super Easy</div>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: 4 }}>made by</div>
          <div style={{ fontWeight: 'bold' }}>InfiniteX</div>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        {['react', 'vue', 'angular'].map((i, index) => (
          <div style={{ padding: 16 }}>
            <div>{index + 1}</div>
            <div style={{ fontWeight: 'bold' }}>{i}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex' }}>
        <button 
            onClick={() => setCount(count - 1)}
            disabled={() => count === 0}
        >
            -
        </button>
        <div style={{ fontWeight: 'bold' }}>Count: {count}</div>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  );
}
```

**with declarative api**

You can see that the Annoying duplicated `<div style={{` was all removed! 😊

```js
function App() {
  const [count, setCount] = useState(0);
  return VStack(
    VStack(
      Text('Declarative UI')
        .color('skyblue')
        .size(64)
        .bold(),
      Text('Super Easy')
        .color('pink')
        .size(48),
      HStack(
        Text('made by').margin({ right: 4 }),
        Text('InfiniteX').bold()),
    ).padding(16),
    HStack(
      ...['react', 'vue', 'angular'].map((i, index) =>
        VStack(
          Text(index + 1),
          Text(i).bold()
        ).padding(16),
      ),
    ),
    HStack(
      Button('-').onClick(() => setCount(count - 1)).disabled(count === 0),
      Text(`count: ${count}`).bold(),
      Button('+').onClick(() => setCount(count + 1)),
    ),
  ).build();
}
```

## Features

### Work fine with css & style-objects

```js
// build styles with chained calls
function BaseButton(content) {
  return Button(content).style(styles.baseButton);
}

export default function WithStyle() {
  return HStack(
    BaseButton('Primary').style(styles.buttonPrimary),
    BaseButton('Secondary').style(styles.buttonSuccess),
  )
    .margin({ top: 10 })
    .build();
}
```

### Work fine with existing jsx

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return HStack(
    <button onClick={() => setCount(count - 1)}>minus</button>,
    Text(count),
    <button onClick={() => setCount(count + 1)}>add</button>,
  ).build();
}
```

## TODOs (version 0.0.1)

- [x] Base Class (View, Text)
- [x] TypeScript support
- [ ] example application: TODO MVC
- [ ] Review
- [ ] More Classes (Image, Textarea...)
- [ ] More APIs (`.boxShadow()`...)
- [ ] Review
- [ ] compatibility with popular UI Library
- [ ] performance test

## More

This project was mostly inspired by `Swift UI`. Although I am not familiar with Swift, I think this programming style is really cool!

Since I am still a beginner and a student in React society, any guidance is really precious to me.
