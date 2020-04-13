import { HStack, Text, Image } from "hamburger-js";

function Bubble(message) {
  return HStack(
    Image(message.avatar).theme("circle").size(35),
    Text(message.content).class({ isMe: message.isMe })
  ).reverse(message.isMe).alignItems("center").class('bubble');
}

export default Bubble;
