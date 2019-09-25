import React from 'react';
import { Text, VStack } from 'declarative-react';
import Counter from './Counter';
import TodoList from './TodoList';
import WithStyle from './WithStyle';
import WithClassName from './WithClassName';

function App() {
  return VStack(
    VStack(
      Text('Declarative UI')
        .color('skyblue')
        .bold()
        .margin(0)
        .fontSize(50),
      Text('TODO Test')
        .color('pink')
        .fontSize(32),
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
