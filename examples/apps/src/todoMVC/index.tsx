import { useReducer } from "react";
import hamburger from "hamburger-js";
import React from "react";
import "./index.css";
import { Input, Text, VStack } from "hamburger-js";
import TodoList from "./TodoList";
import { appReducer, IAction, IAppState, initState, setInput } from "./store";

export const appContext = React.createContext<{
  state: IAppState;
  dispatch(action: IAction);
}>({
  state: initState, dispatch: () => {
  }
});

function App() {
  const [state, dispatch] = useReducer(appReducer, initState);

  return (
    <appContext.Provider value={{ state, dispatch }}>
      <div style={{ color: "skyblue", fontWeight: 100, fontSize: 100, margin: 0 }}>TODO</div>
      <TodoList todoList={state.todoList}/>
    </appContext.Provider>
  );
}

export default <App/>;
