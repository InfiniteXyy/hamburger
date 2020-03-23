import React from 'react';
import { Image, Text, VStack } from 'hamburger-js';
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

function App() {
  return VStack(
    VStack(
      Text('something').fontSize(18),
      Text('Hamburger').color('skyblue').bold().margin(0).fontSize(50),
      Image('https://source.unsplash.com/random/400x400').size(300).shadow('small'),
    ),
    WithStyle(),
    WithClassName(),
    <Counter/>,
    <TodoList/>,
  )
    .style(styles.container)
    .build();
}

export default App;
