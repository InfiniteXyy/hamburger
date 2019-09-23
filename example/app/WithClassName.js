import { HStack, Button } from 'declarative-react';
import './WithClassName.css';

function FlatButton(content) {
  return Button(content).class('flat-button');
}
export default function WithClassName() {
  return HStack(
    FlatButton('Primary').class('primary'),
    FlatButton('Secondary').class('secondary'),
  )
    .margin({ top: 20 })
    .build();
}
