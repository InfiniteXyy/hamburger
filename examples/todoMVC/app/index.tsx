import React, { useReducer } from 'react';
import { Input, Text, VStack } from 'hamburger-js';
import TodoList from './TodoList';
import { appReducer, IAction, IAppState, initState, setInput } from './store';

export const appContext = React.createContext<{
  state: IAppState;
  dispatch(action: IAction);
}>({ state: initState, dispatch: () => {} });

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initState);

  return (
    <appContext.Provider value={{ state, dispatch }}>
      {VStack(
        Text('todos')
          .color('skyblue')
          .fontWeight(100)
          .fontSize(100)
          .margin(0),
        <TodoList todoList={state.todoList} />,
      )
        .align('center')
        .build()}
    </appContext.Provider>
  );
}
