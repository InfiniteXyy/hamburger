import { useState } from 'react';
import { HStack, Button, Text } from 'declarative-react/src';

export default function Counter() {
  const [count, setCount] = useState(0);
  return HStack(
    Button('-')
      .onClick(() => setCount(count - 1))
      .disabled(count === 0),
    Text(count)
      .tag('span')
      .padding({ horizontal: 10 }),
    Button('+').onClick(() => setCount(count + 1)),
  )
    .padding(30)
    .build();
}
