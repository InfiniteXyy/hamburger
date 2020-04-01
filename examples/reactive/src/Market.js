import { Button, HStack, VStack } from 'hamburger-js';
import { Text, listen } from 'hamburger-js';
import { logPlugin } from './Counter';

const store = {
  items: [
    {
      name: 'iPad',
      price: '1000',
      count: 0,
    },
    {
      name: 'iPhone',
      price: '940',
      count: 0,
    },
  ],
};

function Good(name, price) {
  return HStack(Text(name), Text('$' + price));
}

function Counter(val, onSet) {
  return HStack(
    Button('-').onClick(() => onSet(val - 1)),
    Text(val),
    Button('+').onClick(() => onSet(val + 1)));
}

function Market(data) {
  return VStack(
    Text('Market').theme('h1'),
    data.items.map(i =>
      HStack(
        Good(i.name, i.price),
        Counter(i.count, val => (i.count = val)),
      )),
  );
}

export default listen(store, logPlugin)(Market);
