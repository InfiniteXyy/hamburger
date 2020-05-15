import { Button, HStack, VStack, Input } from '@hamburger/core';
import { Text, listen } from '@hamburger/core';

const store = { count: 0, text: '' };

function Counter(data, title) {
  return VStack(
    HStack(
      Button('minus').onClick(() => data.count--),
      Text(title + data.count).margin({ horizontal: '3' }),
      Button('add').onClick(() => data.count++)
    ),
    Text('Hello ' + data.text).theme('h3').bold(),
    Input(data.text).bind((val) => (data.text = val))
  );
}

export const logPlugin = {
  beforeUpdate(state, target, value) {},
  afterUpdate(state, target, value) {},
};

export default listen(store, logPlugin)(Counter);
