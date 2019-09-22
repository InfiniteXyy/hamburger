import React, { useState } from "react";
import { Text } from "./lib/Text";
import { VStack, HStack } from "./lib/Stack";
import { Button } from "./lib/Button";

function Counter() {
  const [count, setCount] = useState(0);
  return HStack(
    <button onClick={() => setCount(count - 1)}>minus</button>,
    Text(count),
    <button onClick={() => setCount(count + 1)}>add</button>
  ).build();
}

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
    <Counter />
  ).build();
}

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
      <Counter />
    </div>
  );
}

export default App;
