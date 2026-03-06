import { describe, it, expect } from 'vitest';
import { createElement } from '../../lib/core/createElement';

describe('createElement', () => {
  it('should create a DOMElement with type, props, and children', () => {
    const result = createElement('div', { id: 'test' }, []);
    expect(result.type).toBe('div');
    expect(result.props.id).toBe('test');
    expect(result.children).toEqual([]);
  });

  it('should convert string children to text nodes', () => {
    const result = createElement('p', {}, ['Hello']);
    expect(result.children).toHaveLength(1);
    expect(result.children[0].type).toBeNull();
    expect(result.children[0].props.content).toBe('Hello');
  });

  it('should convert number children to text nodes', () => {
    const result = createElement('span', {}, [42]);
    expect(result.children).toHaveLength(1);
    expect(result.children[0].type).toBeNull();
    expect(result.children[0].props.content).toBe('42');
  });

  it('should convert boolean children to text nodes', () => {
    const result = createElement('span', {}, [true]);
    expect(result.children).toHaveLength(1);
    expect(result.children[0].props.content).toBe('true');
  });

  it('should call build() on buildable children', () => {
    const buildable = {
      build: () => ({ type: 'span', props: {}, children: [] }),
    };
    const result = createElement('div', {}, [buildable]);
    expect(result.children).toHaveLength(1);
    expect(result.children[0].type).toBe('span');
  });

  it('should pass through DOMElement children as-is', () => {
    const child = { type: 'p', props: { className: 'text' }, children: [] };
    const result = createElement('div', {}, [child]);
    expect(result.children).toHaveLength(1);
    expect(result.children[0]).toBe(child);
  });

  it('should handle mixed children types', () => {
    const domChild = { type: 'br', props: {}, children: [] };
    const buildableChild = {
      build: () => ({ type: 'em', props: {}, children: [] }),
    };
    const result = createElement('div', {}, ['text', 42, domChild, buildableChild]);
    expect(result.children).toHaveLength(4);
    expect(result.children[0].type).toBeNull();
    expect(result.children[0].props.content).toBe('text');
    expect(result.children[1].type).toBeNull();
    expect(result.children[1].props.content).toBe('42');
    expect(result.children[2].type).toBe('br');
    expect(result.children[3].type).toBe('em');
  });

  it('should flatten nested array children', () => {
    // createElement unwraps children[0] if it's an array
    const result = createElement('div', {}, [['Hello', 'World']]);
    expect(result.children).toHaveLength(2);
    expect(result.children[0].props.content).toBe('Hello');
    expect(result.children[1].props.content).toBe('World');
  });

  it('should handle empty children array', () => {
    const result = createElement('div', {}, []);
    expect(result.children).toHaveLength(0);
  });

  it('should preserve all props', () => {
    const result = createElement(
      'input',
      {
        type: 'text',
        value: 'hello',
        className: 'input-field',
        style: { color: 'red' },
      },
      [],
    );
    expect(result.props.type).toBe('text');
    expect(result.props.value).toBe('hello');
    expect(result.props.className).toBe('input-field');
    expect(result.props.style).toEqual({ color: 'red' });
  });
});
