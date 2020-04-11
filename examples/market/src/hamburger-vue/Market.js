import { Button, HStack, VStack, Text, Input, Table, TableRow, meta } from 'hamburger-js';
import { ItemList } from './store';

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

const config = {
  data() {
    return {
      items: ItemList,
    };
  },
  methods: {
    checkAll(val) {
      this.items.forEach((item) => (item.checked = val));
    },
    removeItem(item) {
      this.items.splice(this.items.indexOf(item), 1);
    },
  },
};

function Market() {
  const totalPrice = this.items.filter((i) => i.checked).reduce((prev, cur) => prev + cur.count * cur.price, 0);
  const allChecked = this.items.every((i) => i.checked);

  return VStack(
    Text('Hamburger-Vue').tag('h1'),
    Table(
      TableRow(Checkbox(allChecked, this.checkAll, '全选'), '商品名称', '商品单价', '购买数量', '操作'),
      this.items.map((item) =>
        TableRow(
          Checkbox(item.checked, (val) => (item.checked = val)),
          item.name,
          item.price,
          Counter(item, (val) => (item.count = val)),
          Button('移除').onClick(() => this.removeItem(item))
        ).opacity(0.5, !item.checked)
      )
    ),
    Text(`总价：${totalPrice} 元`).tag('h3')
  );
}

export default meta(config)(Market);
