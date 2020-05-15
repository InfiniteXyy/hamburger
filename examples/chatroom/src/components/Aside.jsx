// @jsx hamburger.createElement
import hamburger, { HStack, Icon, Image, Input, listen, Text, VStack } from '@hamburger/core';
import { actions, withStore } from '../store';

function FriendItem(friend, currentId) {
  return HStack(
    Image(friend.avatar).size(65).theme('circle').margin({ right: 8 }),
    VStack(
      HStack(Text(friend.username), Text('2 days ago').fontSize(15).opacity(0.5))
        .justifyContent('between')
        .alignItems('center')
        .size({ width: 234 }),
      Text(friend.title).class('title')
    )
  )
    .onClick(() => actions.selectFriend(friend.id))
    .class('friend-item', { current: currentId === friend.id })
    .alignItems('center');
}

function Aside(store) {
  return VStack(
    HStack(Input(store.search).placeholder('Search'), Icon('add')).class('search'),
    store.friends.map((i) => FriendItem(i, store.currentId))
  ).style({ borderRight: '0.5px solid #efefef' });
}

export default withStore(Aside);
