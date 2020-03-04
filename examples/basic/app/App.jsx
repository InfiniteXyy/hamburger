import React from 'react';
import { Image, Text, VStack, Button } from 'hamburger-js';
import Counter from './Counter';
import TodoList from './TodoList';
import { WithStyle } from './WithStyle';
import { WithClassName } from './WithClassName';

const styles = {
  container: {
    margin: '0 16px',
    padding: 20,
    border: '1.5px solid #4a4a4a',
    width: 500,
  },
};

const App = VStack(
  VStack(
    Text('something')
      .color('red')
      .fontSize(18),
    Text('Hamburger')
      .color('red')
      .bold()
      .margin(0)
      .fontSize(50),
    Image('http://img0.imgtn.bdimg.com/it/u=452966427,3842240659&fm=26&gp=0.jpg')
      .size(300)
      .shadow('small'),
  ),
  WithStyle,
  WithClassName,
  <Counter />,
  <TodoList />,
).style(styles.container);

export default App;
