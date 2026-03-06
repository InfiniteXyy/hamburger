import { describe, it, expect, vi } from 'vitest';
import { Input } from '../../lib/components/input/Input';

describe('Input component - extended', () => {
  describe('basic creation', () => {
    it('should create an input element', () => {
      const tree = Input('hello').build();
      expect(tree.type).toBe('input');
      expect(tree.props.value).toBe('hello');
    });

    it('should set checkbox type with checked prop', () => {
      const tree = Input(true, 'checkbox').build();
      expect(tree.props.type).toBe('checkbox');
      expect(tree.props.checked).toBe(true);
    });

    it('should set checkbox unchecked', () => {
      const tree = Input(false, 'checkbox').build();
      expect(tree.props.type).toBe('checkbox');
      expect(tree.props.checked).toBe(false);
    });

    it('should set text type', () => {
      const tree = Input('val', 'text').build();
      expect(tree.props.type).toBe('text');
      expect(tree.props.value).toBe('val');
    });
  });

  describe('onInput', () => {
    it('should set onInput callback', () => {
      const callback = vi.fn();
      const tree = Input('val').onInput(callback).build();
      expect(tree.props.onInput).toBe(callback);
    });
  });

  describe('onKeyPress', () => {
    it('should set onKeyPress handler that filters by key', () => {
      const callback = vi.fn();
      const tree = Input('val').onKeyPress('Enter', callback).build();
      expect(tree.props.onKeyPress).toBeTypeOf('function');

      // Simulate matching key
      const matchEvent = { key: 'Enter', preventDefault: vi.fn() };
      tree.props.onKeyPress(matchEvent);
      expect(matchEvent.preventDefault).toHaveBeenCalled();
      expect(callback).toHaveBeenCalled();
    });

    it('should not call callback for non-matching key', () => {
      const callback = vi.fn();
      const tree = Input('val').onKeyPress('Enter', callback).build();

      const nonMatchEvent = { key: 'Escape', preventDefault: vi.fn() };
      tree.props.onKeyPress(nonMatchEvent);
      expect(nonMatchEvent.preventDefault).not.toHaveBeenCalled();
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('placeholder', () => {
    it('should set placeholder prop', () => {
      const tree = Input('').placeholder('Type here...').build();
      expect(tree.props.placeholder).toBe('Type here...');
    });
  });

  describe('wrapLabel', () => {
    it('should change tag to label', () => {
      const tree = Input('val').wrapLabel('My Label').build();
      expect(tree.type).toBe('label');
    });

    it('should contain the input and label text as children', () => {
      const tree = Input('val').wrapLabel('Check me').build();
      expect(tree.children).toHaveLength(2);
      // Second child is the label text
      expect(tree.children[1].props.content).toBe('Check me');
    });

    it('should reset props to clean state', () => {
      const tree = Input('val')
        .padding(10)
        .wrapLabel('Label')
        .build();

      // Props should be reset (wrapLabel resets _props)
      expect(tree.props.value).toBeUndefined();
    });
  });

  describe('bind', () => {
    it('should set onChange handler (React platform default)', () => {
      const handler = vi.fn();
      const tree = Input('val').bind(handler).build();
      // Default platform is Hamburger, so should use onInput
      expect(tree.props.onInput).toBeTypeOf('function');
    });

    it('should set onChange handler when lazy is true', () => {
      const handler = vi.fn();
      const tree = Input('val').bind(handler, true).build();
      expect(tree.props.onChange).toBeTypeOf('function');
    });

    it('should call handler with input value', () => {
      const handler = vi.fn();
      const tree = Input('val').bind(handler, true).build();

      const mockEvent = { target: { value: 'new value' } };
      (tree.props.onChange as Function)(mockEvent);
      expect(handler).toHaveBeenCalledWith('new value');
    });
  });

  describe('chaining', () => {
    it('should support full method chain', () => {
      const onChange = vi.fn();
      const tree = Input('hello', 'text')
        .placeholder('Enter text')
        .onChange(onChange)
        .padding(10)
        .class('form-input')
        .id('name-input')
        .build();

      expect(tree.type).toBe('input');
      expect(tree.props.value).toBe('hello');
      expect(tree.props.type).toBe('text');
      expect(tree.props.placeholder).toBe('Enter text');
      expect(tree.props.onChange).toBe(onChange);
      expect(tree.props.style?.padding).toBe(10);
      expect(tree.props.className).toBe('form-input');
      expect(tree.props.id).toBe('name-input');
    });
  });
});
