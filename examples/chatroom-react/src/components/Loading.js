import { Text, VStack } from '@hamburger/core';

export default function (isLoading) {
  return VStack(Text(isLoading ? 'isTyping...' : '')).class('loading-tip');
}
