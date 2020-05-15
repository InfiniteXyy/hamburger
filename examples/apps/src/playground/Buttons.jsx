import { HStack, Button } from '@hamburger/core';


const Buttons = HStack(
  Button('按钮').theme('primary'),
  Button('按钮').theme('secondary'),
  Button('按钮').theme('success'),
  Button('按钮').theme('info'),
  Button('按钮').theme('danger'),
  Button('按钮').theme('primary-outline'),
).mapItem(item => item.margin({ right: 8, vertical: 8 }));

export default Buttons;
