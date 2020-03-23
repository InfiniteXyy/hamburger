import { Button, HStack } from 'hamburger-js';
import { Text } from 'hamburger-js';
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return HStack(
    Button('minus').onClick(() => setCount(count - 1)).theme('primary'),
    Text('count: ' + count).theme('h3').margin({ horizontal: '3' }),
    Button('add').onClick(() => setCount(count + 1)).theme('primary'),
  ).margin({ top: '3' });
}
