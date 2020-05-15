import { VStack, Button } from '@hamburger/core';
import { messages } from '../mockData';
import { renderMessageList } from './MessageList';


const Loader = VStack();

const InputBar = VStack();

function renderApp() {
  return VStack(
    InputBar,
    renderMessageList(messages),
    Loader,
  ).class('container');
}

export default renderApp();
