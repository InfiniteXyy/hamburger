import { describe, it, expect, vi } from 'vitest';
import { Button } from '../../lib/components/button/Button';

describe('Button component - extended', () => {
  describe('basic creation', () => {
    it('should create a button element', () => {
      const tree = Button('Click').build();
      expect(tree.type).toBe('button');
    });

    it('should use default content when no argument given', () => {
      const tree = Button().build();
      expect(tree.type).toBe('button');
      expect(tree.children[0].props.content).toBe('button');
    });

    it('should render text content', () => {
      const tree = Button('Submit').build();
      expect(tree.children[0].props.content).toBe('Submit');
    });
  });

  describe('content method', () => {
    it('should change text content', () => {
      const tree = Button('Old').content('New').build();
      expect(tree.children[0].props.content).toBe('New');
    });

    it('should not change when condition is false', () => {
      const tree = Button('Keep').content('Replace', false).build();
      expect(tree.children[0].props.content).toBe('Keep');
    });

    it('should change when condition is true', () => {
      const tree = Button('Old').content('New', true).build();
      expect(tree.children[0].props.content).toBe('New');
    });
  });

  describe('disabled', () => {
    it('should not apply when condition is false', () => {
      const tree = Button('Click').disabled(false).build();
      expect(tree.props.disabled).toBeUndefined();
    });
  });

  describe('chaining with ViewClass methods', () => {
    it('should support full method chain', () => {
      const onClick = vi.fn();
      const tree = Button('Submit')
        .onClick(onClick)
        .disabled()
        .padding(10)
        .margin(5)
        .class('btn', 'btn-primary')
        .id('submit-btn')
        .build();

      expect(tree.type).toBe('button');
      expect(tree.props.onClick).toBe(onClick);
      expect(tree.props.disabled).toBe(true);
      expect(tree.props.style?.padding).toBe(10);
      expect(tree.props.style?.margin).toBe(5);
      expect(tree.props.className).toContain('btn btn-primary');
      expect(tree.props.id).toBe('submit-btn');
    });
  });
});
