import { VStack, Text } from 'hamburger-js';

const Texts = VStack(
  Text('heading 1').useTheme('h1'),
  Text('heading 2').useTheme('h2'),
  Text('heading 3').useTheme('h3'),
  Text('heading 4').useTheme('h4'),
  Text('heading 5').useTheme('h5'),
  Text('heading 6').useTheme('h6'),
).mapItem(item => item.margin({ vertical: 10 }));

export default Texts;
