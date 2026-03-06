import { describe, it, expect } from 'vitest';
import { Image } from '../../lib/components/image/Image';

describe('Image component', () => {
  it('should create an img element with src', () => {
    const tree = Image('https://example.com/image.png').build();
    expect(tree.type).toBe('img');
    expect(tree.props.src).toBe('https://example.com/image.png');
  });

  it('should support base ViewClass methods', () => {
    const tree = Image('test.jpg')
      .padding(10)
      .margin(5)
      .class('thumbnail')
      .build();

    expect(tree.props.style?.padding).toBe(10);
    expect(tree.props.style?.margin).toBe(5);
    expect(tree.props.className).toBe('thumbnail');
  });

  it('should support size method', () => {
    const tree = Image('test.jpg').size({ width: 200, height: 150 }).build();
    expect(tree.props.style?.width).toBe(200);
    expect(tree.props.style?.height).toBe(150);
  });

  it('should support border method', () => {
    const tree = Image('test.jpg').border({ radius: 10 }).build();
    expect(tree.props.style?.borderRadius).toBe(10);
  });
});
