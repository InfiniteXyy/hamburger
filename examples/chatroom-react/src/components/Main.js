import React from 'react';
import { Button, HStack, Text, VStack } from 'hamburger-js';
import Bubble from './Bubble';
import { useStore } from '../store';
import Loading from './Loading';
import { Divider } from 'antd';

function Main() {
  const { friends, currentId } = useStore();
  const friend = friends[currentId];
  return VStack(
    HStack(Text('InfiniteX').class('title'), Loading(friend.isTyping)).justifyContent('between'),
    friend.messages.map((message, index) => {
      if (index === 2)
        return (
          <>
            <Divider>
              <div style={{ opacity: 0.5 }}>2020年4月26日</div>
            </Divider>
            {Bubble(message).build()}
          </>
        );
      return Bubble(message);
    })
  )
    .class('main')
    .build();
}

export default Main;
