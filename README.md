## Declarative React (developing)

if you have any opinion or suggestion, give me an **issue**!

## preview

**with jsx**

```jsx
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
        <button onClick={() => setCount(count - 1)}>-</button>
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
        .bold()
        .size(64),
      Text('Super Easy')
        .color('pink')
        .size(48),
      HStack(Text('made by').margin({ right: 4 }), Text('InfiniteX').bold()),
    ).padding(16),
    HStack(
      ...['react', 'vue', 'angular'].map((i, index) =>
        VStack(Text(index + 1), Text(i).bold()).padding(16),
      ),
    ),
    HStack(
      Button('-').onClick(() => setCount(count - 1)),
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

## TODOs
- [ ] Base Class (View, Text)
- [ ] example application: TODO MVC
- [ ] More Classes (Image, Textarea...)
- [ ] More APIs (`.boxShadow()`...)
- [ ] TypeScript support
- [ ] compatibility with popular UI Library
- [ ] performance test

## More
This project was mostly inspired by `Swift UI`. Although I am not familiar with Swift, I think this programming style is really cool!

Since I am still a beginner and a student in React society, any guidance is really precious to me.
