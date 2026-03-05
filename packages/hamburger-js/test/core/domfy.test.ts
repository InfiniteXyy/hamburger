import { describe, it, expect } from 'vitest';
import { domfy, toCSS } from '../../lib/core/domfy';
import { DOMElement } from '../../lib/types';

describe('toCSS', () => {
  it('should convert style object to CSS string', () => {
    const result = toCSS({ color: 'red', fontSize: 16 });
    expect(result).toBe('color:red;font-size:16px;');
  });

  it('should convert camelCase to kebab-case', () => {
    const result = toCSS({ backgroundColor: 'blue', marginTop: 10 });
    expect(result).toContain('background-color:blue');
    expect(result).toContain('margin-top:10px');
  });

  it('should add px suffix to number values', () => {
    const result = toCSS({ width: 100, height: 50 });
    expect(result).toBe('width:100px;height:50px;');
  });

  it('should not add px suffix to string values', () => {
    const result = toCSS({ width: '100%', height: '50vh' });
    expect(result).toBe('width:100%;height:50vh;');
  });
});

describe('domfy', () => {
  it('should create text node for null type', () => {
    const element: DOMElement = {
      type: null,
      props: { content: 'Hello World' },
      children: [],
    };
    const result = domfy(element);
    expect(result).toBeInstanceOf(Text);
    expect(result.textContent).toBe('Hello World');
  });

  it('should create element with correct tag', () => {
    const element: DOMElement = {
      type: 'div',
      props: {},
      children: [],
    };
    const result = domfy(element) as HTMLElement;
    expect(result.tagName).toBe('DIV');
  });

  it('should apply className as class attribute', () => {
    const element: DOMElement = {
      type: 'div',
      props: { className: 'container main' },
      children: [],
    };
    const result = domfy(element) as HTMLElement;
    expect(result.getAttribute('class')).toBe('container main');
  });

  it('should apply style object as style attribute', () => {
    const element: DOMElement = {
      type: 'div',
      props: { style: { color: 'red', fontSize: 16 } },
      children: [],
    };
    const result = domfy(element) as HTMLElement;
    expect(result.getAttribute('style')).toContain('color:red');
    expect(result.getAttribute('style')).toContain('font-size:16px');
  });

  it('should apply regular attributes', () => {
    const element: DOMElement = {
      type: 'input',
      props: { type: 'text', placeholder: 'Enter name', disabled: 'true' },
      children: [],
    };
    const result = domfy(element) as HTMLInputElement;
    expect(result.getAttribute('type')).toBe('text');
    expect(result.getAttribute('placeholder')).toBe('Enter name');
    expect(result.getAttribute('disabled')).toBe('true');
  });

  it('should recursively render children', () => {
    const element: DOMElement = {
      type: 'div',
      props: {},
      children: [
        { type: 'p', props: {}, children: [] },
        { type: null, props: { content: 'Text' }, children: [] },
      ],
    };
    const result = domfy(element) as HTMLElement;
    expect(result.children.length).toBe(1);
    expect(result.childNodes.length).toBe(2);
    expect(result.children[0].tagName).toBe('P');
  });

  it('should handle dangerouslySetInnerHTML', () => {
    const element: DOMElement = {
      type: 'div',
      props: { dangerouslySetInnerHTML: { __html: '<strong>Bold</strong>' } },
      children: [],
    };
    const result = domfy(element) as HTMLElement;
    expect(result.innerHTML).toBe('<strong>Bold</strong>');
  });

  it('should skip null/undefined prop values', () => {
    const element: DOMElement = {
      type: 'div',
      props: { className: null, id: undefined, 'data-test': 'value' },
      children: [],
    };
    const result = domfy(element) as HTMLElement;
    expect(result.hasAttribute('class')).toBe(false);
    expect(result.hasAttribute('id')).toBe(false);
    expect(result.getAttribute('data-test')).toBe('value');
  });
});
