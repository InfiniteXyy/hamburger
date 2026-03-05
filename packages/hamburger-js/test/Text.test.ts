import { describe, it, expect } from 'vitest';
import { Text } from '../lib';

describe('Text component', () => {
  it('should style text', () => {
    const tree = Text('Hello')
      .color('red')
      .fontSize(10)
      .fontWeight(200)
      .build();

    expect(tree.props.style).toStrictEqual({
      fontSize: 10,
      color: 'red',
      fontWeight: 200,
    });
  });

  it('should style text with alias', () => {
    const tree = Text('Hello').bold(true).build();
    expect(tree.props.className).toStrictEqual('bold');
  });

  it.each([true, false])('should style text with conditional (state=%s)', (state) => {
    const tree = Text('hello')
      .content('hi', state)
      .color('blue', state)
      .fontSize(10, state)
      .fontWeight(200, state)
      // !state
      .color('red', !state)
      .fontWeight(100, !state)
      .fontSize(20, !state)
      .build();

    expect(tree.props.style).toMatchObject(
      state
        ? {
            color: 'blue',
            fontSize: 10,
            fontWeight: 200,
          }
        : {
            color: 'red',
            fontSize: 20,
            fontWeight: 100,
          },
    );

    // Check text content in children
    const textContent = tree.children[0];
    if (state) {
      expect(textContent.props.content).toBe('hi');
    } else {
      expect(textContent.props.content).toBe('hello');
    }
  });
});
