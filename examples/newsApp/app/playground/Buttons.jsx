import { HStack, Button } from 'hamburger-js';


const Buttons = HStack(
  Button('按钮').useTheme('primary'),
  Button('按钮').useTheme('secondary'),
  Button('按钮').useTheme('success'),
  Button('按钮').useTheme('info'),
  Button('按钮').useTheme('danger'),
  Button('按钮').useTheme('primary-outline'),
).mapItem(item => item.margin({ right: 8, vertical: 8 }));

export default Buttons;
