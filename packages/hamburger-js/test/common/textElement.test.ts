import { describe, it, expect } from 'vitest';
import { Button, Text } from '../../lib';

describe.each([
  ['Button', Button],
  ['Text', Text],
])('text content for %s', (_name, Type: any) => {
  it('should render text content', () => {
    const tree = Type('Hello').build();
    // Text content is stored as a child DOMElement with type null and props.content
    const textChild = tree.children[0];
    expect(textChild.props.content).toBe('Hello');
  });

  it('should change content', () => {
    const tree = Type('old').content('test').build();
    const textChild = tree.children[0];
    expect(textChild.props.content).toBe('test');
  });
});
