import { Button, HStack, VStack, Text, Input, Table, TableRow, listen } from '@hamburger/core';
import { ItemList } from './store';

function Counter(item) {
  return HStack(
    Button('-')
      .onClick(() => item.count--)
      .disabled(item.count === 0),
    Text(` ${item.count} `).tag('b').margin({ horizontal: 4 }),
    Button('+').onClick(() => item.count++)
  );
}

function Checkbox(value, onToggle, label) {
  if (label)
    return Input(value, 'checkbox')
      .wrapLabel(label)
      .onClick(() => onToggle(!value));
  return Input(value, 'checkbox').onClick(() => onToggle(!value));
}

function Market(data) {
  const totalPrice = data.items.filter((i) => i.checked).reduce((prev, cur) => prev + cur.count * cur.price, 0);
  const allChecked = data.items.every((i) => i.checked);

  function checkAll(val) {
    data.items.forEach((item) => (item.checked = val));
  }
  if (!window.add) window.add = () => data.items[0].count++;

  function removeItem(item) {
    data.items = data.items.filter((i) => i !== item);
  }

  return VStack(
    Text('Hamburger').tag('h1'),
    Table(
      TableRow(Checkbox(allChecked, checkAll, '全选'), '商品名称', '商品单价', '购买数量', '操作'),
      data.items.map((item) =>
        TableRow(
          Checkbox(item.checked, (val) => (item.checked = val)),
          item.name,
          item.price,
          Counter(item),
          Button('移除').onClick(() => removeItem(item))
        ).opacity(0.5, !item.checked)
      )
    ),
    Text(`总价：${totalPrice} 元`).tag('h3')
  );
}

export default listen({ items: ItemList })(Market);
