import { HStack, Button } from 'hamburger-js';
import './WithClassName.css';

function FlatButton(content) {
  return Button(content).class('flat-button');
}
export const WithClassName = HStack(
  FlatButton('Primary').class('primary'),
  FlatButton('Secondary').class('secondary'),
).margin({ top: 20 });
