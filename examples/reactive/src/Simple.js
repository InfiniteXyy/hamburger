import { Button, HStack, VStack, Input, listen, Text } from 'hamburger-js';

const store = {
  items: [
    {
      checked: true
    },
    {
      checked: false
    }
  ]
};


function App(data) {
  function checkAll() {
    const checked = data.items.every(i => i.checked);
    data.items = data.items.map(i => ({ checked: !checked }));
  }

  return VStack(
    Input(data.items.every(i => i.checked), 'checkbox').wrapLabel('全选').onChange(checkAll),
    Input(data.items[0].checked, 'checkbox').onChange(() => data.items[0].checked = !data.items[0].checked),
    Input(data.items[1].checked, 'checkbox').onChange(() => data.items[1].checked = !data.items[1].checked),
    Text(data.items.map(i => i.checked ? '1' : '0').join(' '))
  );
}

export default listen(store)(App);
