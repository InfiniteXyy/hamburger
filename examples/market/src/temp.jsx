import { Button, HStack, VStack, Text, Input, Table, TableRow, listen } from '@hamburger/core';
import React from 'react';

// Vue
`
<td>
  <button @click="item.count--" :disabled="item.count === 0">-</button>
  <b style="margin: 0 4px;">{{ item.count }}</b>
  <button @click="item.count++">+</button>
</td>
`
// React
function counter(item, setItemCount) {
  return (
    <td>
      <button onClick={() => setItemCount(item.id, item.count - 1)} disabled={item.count === 0}>-</button>
      <b style={{ margin: '0 4px' }}> {item.count} </b>
      <button onClick={() => setItemCount(item.id, item.count + 1)}>+</button>
    </td>
  );
}

// Hamburger
function Counter(item) {
  return HStack(
    Button('-').onClick(() => item.count--).disabled(item.count === 0),
    Text(` ${item.count} `).tag('b').margin({ horizontal: 4 }),
    Button('+').onClick(() => item.count++)
  );
}

