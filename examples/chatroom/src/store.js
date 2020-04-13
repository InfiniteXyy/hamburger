import { friends, Me, responseMessage } from './mock';
import { listen, react } from 'hamburger-js';

const store = {
  friends: friends,
  currentId: 0,
};

const withStore = listen(store);

const actions = {
  selectFriend(id) {
    react(withStore)((store) => {
      store.currentId = id;
    });
  },
  sendMessage(data) {
    react(withStore)((store) => {
      const { friends, currentId } = store;
      const friend = friends[currentId];
      friend.messages = [
        ...friend.messages,
        {
          isMe: true,
          content: data,
          avatar: Me.avatar,
        },
      ];
      // response
      const response = responseMessage(friend, data);
      setTimeout(() => {
        friend.isTyping = true;
      }, 500);
      setTimeout(() => {
        friend.messages = [...friend.messages, response];
        friend.isTyping = false;
      }, 3000);
    });
  },
};

export { withStore, actions };
