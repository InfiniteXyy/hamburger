import { Text, VStack, HStack, Image, Link } from 'hamburger-js';
import moment from 'moment';

function MessageHeader(message) {
  return HStack(
    Text(message.author.username, Link(` @${message.author.username}`)).bold(),
    Text(moment(message.createdAt).fromNow()),
  ).inflate();
}

function Message(message) {
  return HStack(
    Image(message.author.image)
      .theme('circle')
      .size(40)
      .margin({ right: 10 }),
    VStack(
      MessageHeader(message),
      Text(message.body),
      Image(message.imageUrl)
        .hide(message.hasImage)
        .theme('thumbnail')
        .style({ maxHeight: 220 }),
    ).inflate(),
  ).margin({ top: 10, bottom: 20 });
}

function renderMessageList(messageList) {
  return VStack(messageList.map(Message)).margin({ top: 30 });
}

export { renderMessageList };
