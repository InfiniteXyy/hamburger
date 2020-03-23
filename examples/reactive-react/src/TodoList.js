import { useCallback, useState } from 'react';
import { VStack, Text, Input, HStack, Button } from 'hamburger-js';

function TodoItem(content) {
  return Text(content).bold().margin(0);
}

export default function() {
  const [items, setItems] = useState(['Kotlin', 'Swift', 'Go', 'Rust']);
  const [value, setValue] = useState('');
  const addTodo = useCallback(() => {
    if (!value) return;
    setItems([...items, value]);
    setValue('');
  });
  return VStack(
    HStack(
      Input(value).bind(setValue).size({ width: 200 }).margin({ right: '3' }),
      Button('增加').onClick(addTodo).theme('secondary-outline'),
    ),
    items.map(i => TodoItem(i)),
  ).margin({ top: '4' });
}
