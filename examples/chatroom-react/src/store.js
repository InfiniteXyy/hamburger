import { friends, Me, responseMessage } from './mock';
import { createStore } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

const initState = {
  friends: friends,
  currentId: 0,
};
function reducer(state = initState, action) {
  switch (action.type) {
    case 'NEW_MESSAGE': {
      const { message, friend } = action.payload;
      return {
        ...state,
        friends: state.friends.map((i) =>
          i.id === friend.id
            ? {
                ...i,
                messages: [...i.messages, message],
              }
            : i
        ),
      };
    }
    case 'SELECT_FRIEND': {
      return { ...state, currentId: action.payload };
    }
    case 'SET_TYPING': {
      const { status, friend } = action.payload;
      return {
        ...state,
        friends: state.friends.map((i) =>
          i.id === friend.id
            ? {
                ...i,
                isTyping: status,
              }
            : i
        ),
      };
    }
  }
  return state;
}

const store = createStore(reducer);

function useStore() {
  const friends = useSelector((state) => state.friends);
  const currentId = useSelector((state) => state.currentId);
  const dispatch = useDispatch();
  return {
    friends,
    currentId,
    sendMessage(data) {
      const friend = friends[currentId];
      dispatch({
        type: 'NEW_MESSAGE',
        payload: {
          friend,
          message: {
            isMe: true,
            content: data,
            avatar: Me.avatar,
          },
        },
      });
      // response
      const response = responseMessage(friend, data);
      setTimeout(() => {
        dispatch({
          type: 'SET_TYPING',
          payload: {
            friend,
            status: true,
          },
        });
      }, 500);
      setTimeout(() => {
        dispatch({
          type: 'NEW_MESSAGE',
          payload: {
            friend,
            message: response,
          },
        });
        dispatch({
          type: 'SET_TYPING',
          payload: {
            friend,
            status: false,
          },
        });
      }, 3000);
    },
    selectFriend(id) {
      dispatch({ type: 'SELECT_FRIEND', payload: id });
    },
  };
}

export { store, useStore };
