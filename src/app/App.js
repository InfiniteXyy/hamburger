import React from 'react';
import { Text } from '../lib/Text';
import { VStack } from '../lib/Stack';
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
        .size(50),
      Text('TODO Test')
        .color('pink')
        .size(32),
    ),
    <WithStyle />, // use JSX components
    <WithClassName />,
    <Counter />,
    <TodoList />,
  )
    .margin({ horizontal: 16 })
    .padding(20)
    .border(1.5, '#4a4a4a', 0)
    .size({ width: 500 })
    .build();
}

export default App;
