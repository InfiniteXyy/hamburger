import { List, ListItem, VStack } from '@hamburger/core';

// 1. Tree shaking friendly
// 2. Atomic CSS friendly
// 3. Auto generate comment in end of line, prettier friendly
VStack(
  Text('Title').as('h1').style(font('bold', 'red-500')), //
  List(
    ListItem('Item 1'), //
    ListItem('Item 2'), //
    ListItem('Item 3').style(font('bold')) //
  ).style(list('disc'))
);
