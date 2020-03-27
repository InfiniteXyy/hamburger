import { VStack, Text, Button, Input, listen } from 'hamburger-js';

function counter(data) {
  return VStack(
    Text(data.count).theme('h1'),
    Button('add')
      .onClick(() => data.count++)
      .theme('primary'),
  );
}

function anotherList({ count }) {
  return VStack(
    Text('something').fontSize(count),
  );
}

function todoList(data) {
  // const inputData = { input: '' };
  const dataList = ['Vue', 'Angular', 'Elm', 'Reason', 'Svelte'];
  const onAddCallback = () => {
    data.todo = [...data.todo, dataList[Math.floor(Math.random() * 5)]];
  };
  return VStack(
    // listen(inputData)((data) => Input(data.input).bind(val => data.input = val))(),
    Button('addTodo').onClick(onAddCallback),
    data.todo.map(i => Text(i)),
  );
}

function root() {
  const withCount = listen({ count: 10 });
  const withTodoList = listen({ todo: ['React'], input: '' });

  return VStack(
    withCount(counter)(),
    Text('divider'),
    withCount(anotherList)(),
    withTodoList(todoList)(),
  );
}

export default root;
