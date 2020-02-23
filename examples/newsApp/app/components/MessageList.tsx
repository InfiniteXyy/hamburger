import { Text, VStack, HStack, Image } from 'hamburger-js';
import moment from 'moment';

function MessageHeader(message) {
  return HStack(
    HStack(
      Text(message.author.username).bold(),
      Text(`@${message.author.username}`).margin({ left: 10 }),
    ).centerItems(),
    Text(moment(message.createdAt).fromNow()),
  ).expandItems();
}

function Message(message) {
  return HStack(
    Image(message.author.image)
      .useTheme('circle')
      .size(40)
      .margin({ right: 10 }),
    VStack(
      MessageHeader(message),
      Text(message.body),
      Image(message.imageUrl)
        .hide(message.hasImage)
        .useTheme('thumbnail')
        .style({ maxHeight: 220 }),
    ).inflate(),
  ).margin({ top: 10, bottom: 20 });
}

function renderMessageList(messageList) {
  return VStack(messageList.map(Message)).margin({ top: 30 });
}

export { renderMessageList };
