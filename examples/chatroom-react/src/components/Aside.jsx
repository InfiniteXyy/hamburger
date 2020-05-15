// @jsx hamburger.createElement
import hamburger, { HStack, Icon, Image, Input, listen, Text, VStack } from '@hamburger/core';
import { useStore } from '../store';
import { useState } from 'react';
import { Dropdown, Menu } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

function FriendItem(friend, currentId, selectFriend) {
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
    .onClick(() => selectFriend(friend.id))
    .class('friend-item', { current: currentId === friend.id })
    .alignItems('center');
}

function DropdownMenu() {
  return (
    <Menu>
      <Menu.Item>
        <a>从通讯录添加</a>
      </Menu.Item>
      <Menu.Item>
        <a>通过ID添加</a>
      </Menu.Item>
    </Menu>
  );
}



function Aside() {
  const [search, setSearch] = useState('');
  const { friends, currentId, selectFriend } = useStore();
  return VStack(
    HStack(
      Input(search).placeholder('Search').bind(setSearch),
      <Dropdown overlay={DropdownMenu()} trigger={['click']}>
        {<UserAddOutlined style={{ color: '#9b9b9b', fontSize: 19 }} />}
      </Dropdown>
    ).class('search'),
    friends.map((i) => FriendItem(i, currentId, selectFriend))
  )
    .style({ borderRight: '0.5px solid #efefef' })
    .build();
}

export default Aside;
