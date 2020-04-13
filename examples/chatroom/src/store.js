import { friends, Me, responseMessage } from './mock';
import { listen, reactive } from 'hamburger-js';

const store = reactive({
  friends: friends,
  currentId: 0,
});

const withStore = listen(store);

const actions = {
  selectFriend(id) {
    store.currentId = id;
  },
  sendMessage(data) {
    const { friends, currentId } = store;
    const friend = friends[currentId];
    friend.messages.push({
      isMe: true,
      content: data,
      avatar: Me.avatar,
    });
    // response
    const response = responseMessage(friend, data);
    setTimeout(() => {
      friend.isTyping = true;
    }, 500);
    setTimeout(() => {
      friend.messages.push(response);
      friend.isTyping = false;
    }, 3000);
  },
};

export { withStore, actions };
