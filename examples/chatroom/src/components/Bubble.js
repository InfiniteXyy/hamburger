import { HStack, Text, Image } from '@hamburger/core';

function Bubble(message) {
  return HStack(
    Image(message.avatar).size(35).border({ radius: '50%' }),
    Text(message.content).class({ isMe: message.isMe })
  )
    .reverse(message.isMe)
    .alignItems('center')
    .class('bubble');
}

export default Bubble;
