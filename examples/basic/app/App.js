import React, { useState } from 'react';
import { Text, VStack, Image, Button } from 'declarative-react';
import Counter from './Counter';
import TodoList from './TodoList';
import WithStyle from './WithStyle';
import WithClassName from './WithClassName';

function App() {
  const [hasShadow, setHasShadow] = useState(false);
  return VStack(
    VStack(
      Text('Hamburger')
        .color('skyblue')
        .bold()
        .margin(0)
        .fontSize(50),
      Image('http://img0.imgtn.bdimg.com/it/u=452966427,3842240659&fm=26&gp=0.jpg')
        .roundCrop()
        .size(200)
        .shadow('small', hasShadow)
        .as(Button)
        .onClick(() => setHasShadow(true)),
    ),
    <WithStyle />, // use JSX components
    <WithClassName />,
    <Counter />,
    <TodoList />,
  )
    .margin({ horizontal: 16 })
    .padding(20)
    .border({ borderWidth: 1.5, borderColor: '#4a4a4a' })
    .size({ width: 500 })
    .build();
}

export default App;
