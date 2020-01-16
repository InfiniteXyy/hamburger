import React, { useState } from 'react';
import { Text, VStack, Image, Button } from 'hamburger-js';
import Counter from './Counter';
import TodoList from './TodoList';
import WithStyle from './WithStyle';
import WithClassName from './WithClassName';

function App() {
  const [hasShadow, setHasShadow] = useState(false);
  return VStack(
    VStack(
      Text('Hamburger')
        .color('red')
        .bold()
        .margin(0)
        .fontSize(50),
      Image('http://img0.imgtn.bdimg.com/it/u=452966427,3842240659&fm=26&gp=0.jpg')
        .unselectable()
        .roundCrop()
        .size(300)
        .shadow('small', hasShadow)
        .onClick(() => setHasShadow(!hasShadow)),
    ),
    <WithStyle />, // use JSX components
    <WithClassName />,
    Counter(),
    <TodoList />,
  )
    .style(styles.container)
    .build();
}

const styles = {
  container: {
    margin: '0 16px',
    padding: 20,
    border: '1.5px solid #4a4a4a',
    width: 500,
  },
};

export default App;
