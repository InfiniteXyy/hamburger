import { useState } from 'react';
import { HStack, VStack } from '../lib/Stack';
import { Input } from '../lib/Input';
import { Button } from '../lib/Button';
import { Text } from '../lib/Text';

export default function TodoList() {
  const [list, setList] = useState(['Find a job']);
  const [input, setInput] = useState('');

  function onRemove(item) {
    return () => {
      setList(list.filter(i => i !== item));
    };
  }

  function onAdd() {
    if (!input) return;
    setList([...list, input]);
    setInput('');
  }

  return VStack(
    HStack(
      Input(input, e => setInput(e.target.value)),
      Button('add').onClick(onAdd),
    )
      .justify('space-between')
      .align('center'),
    ...list.map(item =>
      HStack(Text(item), Button('X').onClick(onRemove(item)))
        .justify('space-between')
        .margin({ top: 10 }),
    ),
  )
    .size({ width: 250 })
    .build();
}
