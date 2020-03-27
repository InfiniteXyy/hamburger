import { Button, HStack } from 'hamburger-js';
import { Text, listen } from 'hamburger-js';

const store = { count: 0 };

function Counter(data, title) {
  return HStack(
    Button('minus').onClick(() => data.count--).theme('primary'),
    Text(title + data.count).theme('h3').margin({ horizontal: '3' }),
    Button('add').onClick(() => data.count++).theme('primary'),
  );
}

export default listen(store)(Counter);
