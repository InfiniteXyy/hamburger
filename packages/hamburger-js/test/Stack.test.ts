import { describe, it, expect } from 'vitest';
import { VStack, HStack, Text } from '../lib';

describe('Stack component', () => {
  it('should align/justify', () => {
    const tree = VStack()
      .alignItems('center')
      .justifyContent('between')
      .build();

    expect(tree.props.className).toContain('items-center');
    expect(tree.props.className).toContain('justify-between');
  });

  it('should render children', () => {
    const tree = VStack(Text('1'), Text('2')).build();
    expect(tree.children).toHaveLength(2);
  });
});
