import { useState } from 'react';
import { HStack, VStack, Input, Button, Text } from 'hamburger-js';

function FlatButton() {
  return Button('✖')
    .border({ borderWidth: 0 })
    .style({ color: '#9b9b9b' });
}

export default function TodoList() {
  const [list, setList] = useState([{ title: 'Find a job', important: true }, { title: 'chore', important: false }]);
  const [input, setInput] = useState('');
  const [importantCheck, setImportantCheck] = useState(false);

  function onRemove(item) {
    return () => {
      setList(list.filter(i => i.title !== item.title));
    };
  }

  function onAdd() {
    if (!input) return;
    setList([...list, { title: input, important: importantCheck }]);
    setInput('');
    setImportantCheck(false);
  }

  return VStack(
    HStack(
      Input(input).bind(setInput),
      Text('Important'),
      Input('important', 'checkbox')
        .onChange(e => setImportantCheck(e.target.checked))
        .props({ checked: importantCheck }),
      Button('add').onClick(onAdd),
    )
      .justify('space-between')
      .align('center'),
    ...list.map(item =>
      HStack(
        Text(item.title)
          .color('blue')
          .color('red', item.important)
          .bold(item.important),
        FlatButton().onClick(onRemove(item)),
      )
        .justify('space-between')
        .margin({ top: 10 }),
    ),
  )
    .size({ width: 250 })
    .build();
}
