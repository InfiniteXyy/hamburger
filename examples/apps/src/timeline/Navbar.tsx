import { HStack, Image, Text } from 'hamburger-js';

const MyNav = HStack(
  HStack(
    Text('时间线').tag('strong'),
    Image('https://via.placeholder.com/120').theme('circle').size(40),
  )
    .class('container')
    .alignItems('center')
    .justifyContent('between')
    .padding({ vertical: 10 }),
)
  .shadow('small');


export default MyNav;
