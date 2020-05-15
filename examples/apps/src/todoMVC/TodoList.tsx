import React, { useContext } from "react";
import Hamburger, { Input, VStack } from "@hamburger/core";
import ListItem from "./components/ListItem";
import { addItem, ITodoItem, removeItem, setInput, toggleItem } from "./store";
import { appContext } from "./index";

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
      dispatch(removeItem(item.title));
    };
  }

  function handleAdd(e) {
    if (e.key === "Enter" && state.inputValue !== "") {
      dispatch(addItem(state.inputValue));
    }
  }

  function handleToggle(item: ITodoItem) {
    return type => {
      dispatch(toggleItem(item.title, type));
    };
  }

  return <div>
    {VStack(
      VStack(
        Input(state.inputValue)
          .size({ width: 550, height: 65 })
          .props({
            placeholder: "What needs to be done?",
            autoFocus: true,
            onKeyDown: handleAdd
          })
          .onChange(onInput)
          .style(styles.inputContainer)
      ),
      ...props.todoList.map(item => ListItem({
        onRemove: handleRemove(item), onToggle: handleToggle(item), item
      }))
    )
      .margin({ top: 30 })
      .padding({ horizontal: 10 })
      .padding({ bottom: 10 }, props.todoList.length !== 0)
      .border({ radius: 8 })
      .style({ backgroundColor: "white" })
      .build()}
  </div>;
}

const styles = {
  inputContainer: {
    border: "none",
    fontSize: 20,
    paddingLeft: 60
  }
};

export default TodoList;
