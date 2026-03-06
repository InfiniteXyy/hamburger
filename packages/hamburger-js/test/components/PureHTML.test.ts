import { describe, it, expect } from 'vitest';
import { PureHTML } from '../../lib/components/PureHTML';

describe('PureHTML component', () => {
  it('should create element with dangerouslySetInnerHTML', () => {
    const tree = PureHTML('<strong>Bold text</strong>').build();
    expect(tree.type).toBe('div');
    expect(tree.props.dangerouslySetInnerHTML).toEqual({
      __html: '<strong>Bold text</strong>',
    });
  });

  it('should support custom tag', () => {
    const tree = PureHTML('<li>Item</li>').tag('ul').build();
    expect(tree.type).toBe('ul');
  });

  it('should support styling methods', () => {
    const tree = PureHTML('<p>Content</p>').padding(10).class('html-container').build();

    expect(tree.props.style?.padding).toBe(10);
    expect(tree.props.className).toBe('html-container');
  });
});
