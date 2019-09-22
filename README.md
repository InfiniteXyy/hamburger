## Declarative React

_still developing..._

if you have any opinion or suggestion, give me an issue!

### preview

**with jsx**

```jsx
function App2() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div style={{ padding: 16 }}>
        <div style={{ color: "skyblue", fontWeight: "bold", fontSize: 64 }}>
          Declarative UI
        </div>
        <div style={{ color: "pink", fontSize: 48 }}>Super Easy</div>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 4 }}>made by</div>
          <div style={{ fontWeight: "bold" }}>InfiniteX</div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        {["react", "vue", "angular"].map((i, index) => (
          <div style={{ padding: 16 }}>
            <div>{index + 1}</div>
            <div style={{ fontWeight: "bold" }}>{i}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex" }}>
        <button onClick={() => setCount(count - 1)}>-</button>
        <div style={{ fontWeight: "bold" }}>Count: {count}</div>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  );
}
```

**with declarative api**

the Annoying `<div style={{` code was removed! And things become much more clearer~

```js
function App() {
  const [count, setCount] = useState(0);
  return VStack(
    VStack(
      Text("Declarative UI")
        .color("skyblue")
        .bold()
        .size(64),
      Text("Super Easy")
        .color("pink")
        .size(48),
      HStack(Text("made by").margin({ right: 4 }), Text("InfiniteX").bold())
    ).padding(16),
    HStack(
      ...["react", "vue", "angular"].map((i, index) =>
        VStack(Text(index + 1), Text(i).bold()).padding(16)
      )
    ),
    HStack(
      Button("-").onClick(() => setCount(count - 1)),
      Text(`count: ${count}`).bold(),
      Button("+").onClick(() => setCount(count + 1))
    )
  ).build();
}
```

### Work fine with existing jsx

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return HStack(
    <button onClick={() => setCount(count - 1)}>minus</button>,
    Text(count),
    <button onClick={() => setCount(count + 1)}>add</button>
  ).build();
}
```
