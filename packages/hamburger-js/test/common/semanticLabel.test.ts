import { describe, it, expect } from 'vitest';
import { HStack, Text, VStack } from '../../lib';

describe.each([
  ['HStack', HStack],
  ['VStack', VStack],
  ['Text', Text],
])('semantic tag for %s', (_name, Type: any) => {
  it('should override tag name', () => {
    const tree = Type().tag('test').build();
    expect(tree.type).toBe('test');
  });
});
