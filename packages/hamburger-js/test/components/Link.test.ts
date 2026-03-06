import { describe, it, expect } from 'vitest';
import { Link } from '../../lib/components/text/Link';

describe('Link component', () => {
  it('should create an anchor element', () => {
    const tree = Link('Click me').build();
    expect(tree.type).toBe('a');
    expect(tree.props.href).toBe('#');
  });

  it('should set href attribute', () => {
    const tree = Link('Click me').href('https://example.com').build();
    expect(tree.props.href).toBe('https://example.com');
  });

  it('should conditionally set href', () => {
    const tree1 = Link('Click').href('https://example.com', true).build();
    const tree2 = Link('Click').href('https://example.com', false).build();

    expect(tree1.props.href).toBe('https://example.com');
    expect(tree2.props.href).toBe('#'); // default
  });

  it('should inherit TextClass styling methods', () => {
    const tree = Link('Click me').color('blue').bold().fontSize(14).build();

    expect(tree.props.style?.color).toBe('blue');
    expect(tree.props.style?.fontSize).toBe(14);
    expect(tree.props.className).toContain('bold');
  });
});
