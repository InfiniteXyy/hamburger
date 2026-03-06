import { Button, HStack } from '@hamburger/core';
import { Text } from '@hamburger/core';
import { useState } from 'react';
export default function Counter() {
  const [count, setCount] = useState(0);
  return HStack(
    Button('minus').onClick(() => setCount(count - 1)),
    Text('count: ' + count).margin({ horizontal: 30, vertical: 0 }),
    Button('add').onClick(() => setCount(count + 1))
  ).margin({ vertical: 30 });
}
