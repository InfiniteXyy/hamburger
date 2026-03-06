import { VStack, Text } from '@hamburger/core';
import Counter from './Counter';
import TodoList from './TodoList';

// Root element must be a functional element to make React Hooks work
export default function () {
  return VStack(
    Text('Reactive React Example'),
    Counter(),
    TodoList()
  ).build();
}
