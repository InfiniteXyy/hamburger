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
  return VStack(
    HStack(
      Input(input, e => setInput(e.target.value)),
      Button('add').onClick(() => {
        setList([...list, input]);
        setInput('');
      }),
    ),
    ...list.map(item =>
      HStack(Text(item), Button('x').onClick(onRemove(item))),
    ),
  ).build();
}
