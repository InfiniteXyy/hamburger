import { VStack, Text } from 'hamburger-js';

const Texts = VStack(
  Text('heading 1').theme('h1'),
  Text('heading 2').theme('h2'),
  Text('heading 3').theme('h3'),
  Text('heading 4').theme('h4'),
  Text('heading 5').theme('h5'),
  Text('heading 6').theme('h6'),
).mapItem(item => item.margin({ vertical: 10 }));

export default Texts;
