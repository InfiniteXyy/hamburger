import { HStack, Button } from '@hamburger/core';
import './WithClassName.css';

function FlatButton(content) {
  return Button(content).class('flat-button');
}

function WithClassName() {
  return HStack(
    FlatButton('Primary').class('primary'),
    FlatButton('Secondary').class('secondary'),
  ).margin({ top: 20 });
}

export { WithClassName }
