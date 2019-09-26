const SET_INPUT_ACTION = 'SET_INPUT_ACTION';
const TOGGLE_ITEM = 'TOGGLE_ITEM';
const ADD_ITEM = 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';

export interface ITodoItem {
  title: string;
  finished: boolean;
}

export interface IAppState {
  todoList: ITodoItem[];
  inputValue: string;
}

export interface IAction {
  type: string;
  payload: any;
}

export function setInput(value: string) {
  return { type: SET_INPUT_ACTION, payload: value };
}
export function addItem(title: string) {
  return { type: ADD_ITEM, payload: title };
}
export function toggleItem(title: string, type: boolean) {
  return { type: TOGGLE_ITEM, payload: { title, type } };
}
export function removeItem(title: string) {
  return { type: DELETE_ITEM, payload: title };
}

export function appReducer(state: IAppState, action: IAction) {
  switch (action.type) {
    case SET_INPUT_ACTION: {
      return { ...state, inputValue: action.payload };
    }
    case ADD_ITEM: {
      return {
        ...state,
        inputValue: '',
        todoList: [
          ...state.todoList,
          { title: action.payload, finished: false },
        ],
      };
    }
    case TOGGLE_ITEM: {
      return {
        ...state,
        todoList: state.todoList.map(i => {
          if (i.title === action.payload.title) {
            return { title: i.title, finished: action.payload.type };
          }
          return i;
        }),
      };
    }
    case DELETE_ITEM: {
      return {
        ...state,
        todoList: state.todoList.filter(i => i.title !== action.payload),
      };
    }
    default: {
      return state;
    }
  }
}

export const initState: IAppState = {
  todoList: [
    { title: 'React', finished: true },
    { title: 'Vue', finished: false },
    { title: 'Angular', finished: false },
  ],
  inputValue: '',
};
