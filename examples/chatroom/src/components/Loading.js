import { Text, VStack } from 'hamburger-js';

export default function (isLoading) {
  return VStack(Text(isLoading ? 'isTyping...' : '')).class('loading-tip');
}
