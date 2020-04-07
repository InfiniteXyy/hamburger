import { VStack, Text } from 'hamburger-js';
import Counter from './Counter';
import TodoList from './TodoList';

// Root element must be a functional element to make React Hooks work
export default function () {
  return VStack(
    Text('Reactive React Example').theme('h1'),
    Counter(),
    TodoList()
  ).build();
}
