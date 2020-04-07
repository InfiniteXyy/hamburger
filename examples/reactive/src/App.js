import { VStack, Text } from 'hamburger-js';
import Counter from './Counter';
import Market from './Market';

export default function() {
  return VStack(
    Text('Reactive app using hamburger.js').tag('h1'),
    Counter('count: '),
    Market()
  );
}
