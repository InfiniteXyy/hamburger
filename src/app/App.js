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
    )
      .padding(16)
      .border(1.5, '#aaaaaa', 8),
    <WithStyle />,
    <WithClassName />,
    <Counter />,
    <TodoList />,
  ).build();
}

export default App;
