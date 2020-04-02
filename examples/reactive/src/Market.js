import { Button, HStack, VStack, Text, Input, Table, TableRow, listen } from 'hamburger-js';
import { logPlugin } from './Counter';

function withCount(itemList) {
  return itemList.map(i => ({ ...i, count: 0, checked: true }));
}

const ItemList = withCount([
  {
    id: 0,
    name: 'iPhone 11',
    price: '8999',
  },
  {
    id: 1,
    name: 'iPad Pro',
    price: '4999',
  },
  {
    id: 2,
    name: 'Airpods pro',
    price: '1999',
  },
  {
    id: 3,
    name: '橘子',
    price: '5',
  },
  {
    id: 4,
    name: '苹果',
    price: '3',
  },
]);
const store = { items: ItemList };

function Counter(item) {
  return HStack(
    Button('-')
      .onClick(() => item.count--)
      .disabled(item.count === 0),
    Text(` ${item.count} `)
      .tag('b')
      .margin({ right: 10 }),
    Button('+').onClick(() => item.count++),
  );
}

function Checkbox(value, onToggle, label) {
  if (label)
    return Input(value, 'checkbox')
      .label(label)
      .onClick(() => onToggle(!value));
  return Input(value, 'checkbox').onClick(() => onToggle(!value));
}

function Market(data) {
  const totalPrice = data.items.filter(i => i.checked).reduce((prev, cur) => prev + cur.count * cur.price, 0);
  const allChecked = data.items.every(i => i.checked);
  function checkAll(val) {
    data.items.forEach(item => (item.checked = val));
  }
  function removeItem(item) {
    data.items = data.items.filter(i => i !== item);
  }
  return VStack(
    Text('Hamburger 购物车').tag('h1'),
    Table(
      TableRow(Checkbox(allChecked, checkAll, '全选'), '商品名称', '商品单价', '购买数量', '操作'),
      data.items.map(item =>
        TableRow(
          Checkbox(item.checked, val => (item.checked = val)),
          item.name,
          item.price,
          Counter(item),
          Button('移除').onClick(() => removeItem(item)),
        ),
      ),
    ),
    Text(`总价：${totalPrice} 元`).tag('h3'),
  );
}

export default listen(store, logPlugin)(Market);
