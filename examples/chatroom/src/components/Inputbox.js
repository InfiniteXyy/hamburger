import { Input, VStack, listen, HStack } from '@hamburger/core';
import { actions } from '../store';

function InputBox(data) {
  function send() {
    actions.sendMessage(data.input);
    data.input = '';
  }

  return VStack(
    Input(data.input)
      .bind((val) => (data.input = val))
      .tag('textarea')
      .onKeyPress('Enter', send)
  )
    .style({ borderTop: '0.5px solid #efefef' })
    .class('inputbox');
}

export default listen({ input: '' })(InputBox);
