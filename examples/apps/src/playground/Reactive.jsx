import { Button, HStack, VStack, Text } from '@hamburger/core';
import { useState } from 'react';

function Counter(count, setCount) {
  return HStack(
    Button('minus').onClick(() => setCount(count - 1)).theme('primary-outline'),
    Text('字体大小：' + count).tag('strong').margin({ horizontal: 10 }),
    Button('plus').onClick(() => setCount(count + 1)).theme('primary-outline'),
  )
    .alignItems('center')
    .margin({ vertical: 20 });
}

function Reactive() {
  const [count, setCount] = useState(10);
  return VStack(
    Text('example').fontSize(count),
    Counter(count, setCount),
  ).build();
}

export default Reactive;
