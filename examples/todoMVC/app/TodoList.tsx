import React, { useContext } from 'react';
import { Input, VStack } from 'declarative-react';
import ListItem from './components/ListItem';
import { addItem, ITodoItem, setInput, toggleItem } from './store';
import { appContext } from './index';

interface ITodoListProps {
  todoList: ITodoItem[];
}

function TodoList(props: ITodoListProps) {
  const { state, dispatch } = useContext(appContext);
  function onInput(e) {
    dispatch(setInput(e.target.value));
  }

  function handleRemove(item: ITodoItem) {
    return () => {
      alert(item);
    };
  }

  function handleAdd(e) {
    if (e.key === 'Enter' && state.inputValue !== '') {
      dispatch(addItem(state.inputValue));
    }
  }

  function handleToggle(item: ITodoItem) {
    return type => {
      dispatch(toggleItem(item.title, type));
    };
  }

  return VStack(
    VStack(
      Input(state.inputValue)
        .size({ width: 550, height: 65 })
        .props({
          placeholder: 'What needs to be done?',
          autoFocus: true,
          onKeyDown: handleAdd,
        })
        .onChange(onInput)
        .style(styles.inputContainer)
        .style({ boxSizing: 'border-box' }),
    ),
    ...props.todoList.map(item => <ListItem item={item} onRemove={handleRemove(item)} onToggle={handleToggle(item)} />),
  )
    .margin({ top: 30 })
    .padding({ horizontal: 10, bottom: 10 })
    .border({ borderRadius: 8 })
    .style({ backgroundColor: 'white' })
    .build();
}

const styles = {
  inputContainer: {
    border: 'none',
    fontSize: 20,
    paddingLeft: 60,
  },
};

export default TodoList;
