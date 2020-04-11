import { Button, HStack, VStack, Text, Input, Table, TableRow, listen } from 'hamburger-js';
import { ItemList } from './store';
import { useState } from 'react';
import _ from 'lodash';

function Counter(item, setItemCount) {
  return HStack(
    Button('-')
      .onClick(() => setItemCount(item.count - 1))
      .disabled(item.count === 0),
    Text(` ${item.count} `).tag('b').margin({ horizontal: 4 }),
    Button('+').onClick(() => setItemCount(item.count + 1))
  );
}

function Checkbox(value, onToggle, label) {
  if (label)
    return Input(value, 'checkbox')
      .wrapLabel(label)
      .onClick(() => onToggle(!value));
  return Input(value, 'checkbox').onClick(() => onToggle(!value));
}

function Market() {
  const [items, setItems] = useState(ItemList);
  const totalPrice = items.filter((i) => i.checked).reduce((prev, cur) => prev + cur.count * cur.price, 0);
  const allChecked = items.every((i) => i.checked);
  function checkAll(val) {
    setItems(items.map((i) => ({ ...i, checked: val })));
  }

  function toggleItem(item, val) {
    const _items = _.cloneDeep(items);
    _items.forEach((i) => {
      if (i.id === item.id) {
        i.checked = val;
      }
    });
    setItems(_items);
  }

  function setItemCount(item, val) {
    setItems(
      items.map((i) => ({
        ...i,
        count: item.id === i.id ? val : i.count,
      }))
    );
  }

  function removeItem(item) {
    setItems(items.filter((i) => i !== item));
  }
  return VStack(
    Text('Hamburger-React').tag('h1'),
    Table(
      TableRow(Checkbox(allChecked, checkAll, '全选'), '商品名称', '商品单价', '购买数量', '操作'),
      items.map((item) =>
        TableRow(
          Checkbox(item.checked, (val) => toggleItem(item, val)),
          item.name,
          item.price,
          Counter(item, (val) => setItemCount(item, val)),
          Button('移除').onClick(() => removeItem(item))
        ).opacity(0.5, !item.checked)
      )
    ),
    Text(`总价：${totalPrice} 元`).tag('h3')
  ).build();
}

export default Market;
