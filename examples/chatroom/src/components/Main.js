import { Button, HStack, Text, VStack } from 'hamburger-js';
import Bubble from './Bubble';
import { withStore } from '../store';
import Loading from './Loading';

function Main(data) {
  const friend = data.friends[data.currentId];
  return VStack(
    HStack(Text('InfiniteX').class('title'), Loading(friend.isTyping)).justifyContent('between'),
    friend.messages.map((message) => Bubble(message))
  ).class('main');
}

export default withStore(Main);
