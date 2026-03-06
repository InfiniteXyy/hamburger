import { describe, it, expect, vi } from 'vitest';
import { HStack, VStack } from '../../lib/components/stack/Stack';
import { Text } from '../../lib/components/text/Text';
import { Button } from '../../lib/components/button/Button';

describe('ViewClass base methods', () => {
  // Use VStack as a concrete ViewClass instance for testing base methods

  describe('hide', () => {
    it('should set display none', () => {
      const tree = VStack(Text('Hidden')).hide().build();
      expect(tree.props.style?.display).toBe('none');
    });

    it('should set display none when when=true', () => {
      const tree = VStack(Text('Hidden')).hide(true).build();
      expect(tree.props.style?.display).toBe('none');
    });

    it('should not hide when when=false', () => {
      const tree = VStack(Text('Visible')).hide(false).build();
      expect(tree.props.style?.display).toBeUndefined();
    });
  });

  describe('opacity', () => {
    it('should set opacity', () => {
      const tree = VStack().opacity(0.5).build();
      expect(tree.props.style?.opacity).toBe(0.5);
    });

    it('should not apply when condition is false', () => {
      const tree = VStack().opacity(0.5, false).build();
      expect(tree.props.style?.opacity).toBeUndefined();
    });
  });

  describe('onClick', () => {
    it('should set click handler', () => {
      const handler = vi.fn();
      const tree = VStack().onClick(handler).build();
      expect(tree.props.onClick).toBe(handler);
    });
  });

  describe('tag', () => {
    it('should override tag', () => {
      const tree = VStack().tag('section').build();
      expect(tree.type).toBe('section');
    });

    it('should not override when condition is false', () => {
      const tree = VStack().tag('section', false).build();
      expect(tree.type).toBe('div');
    });
  });

  describe('conditional padding', () => {
    it('should not apply padding when condition is false', () => {
      const tree = VStack().padding(10, false).build();
      expect(tree.props.style?.padding).toBeUndefined();
    });
  });

  describe('conditional margin', () => {
    it('should not apply margin when condition is false', () => {
      const tree = VStack().margin(10, false).build();
      expect(tree.props.style?.margin).toBeUndefined();
    });
  });

  describe('conditional size', () => {
    it('should not apply size when condition is false', () => {
      const tree = VStack().size(100, false).build();
      expect(tree.props.style?.width).toBeUndefined();
    });

    it('should set equal width and height with single value', () => {
      const tree = VStack().size(100).build();
      expect(tree.props.style?.width).toBe(100);
      expect(tree.props.style?.height).toBe(100);
    });

    it('should accept string size', () => {
      const tree = VStack().size('100%').build();
      expect(tree.props.style?.width).toBe('100%');
      expect(tree.props.style?.height).toBe('100%');
    });
  });

  describe('conditional border', () => {
    it('should not apply border when condition is false', () => {
      const tree = VStack().border({ radius: 10 }, false).build();
      expect(tree.props.style?.borderRadius).toBeUndefined();
    });

    it('should set border to empty string when no width', () => {
      const tree = VStack().border({ radius: 10, color: 'red' }).build();
      expect(tree.props.style?.border).toBe('');
      expect(tree.props.style?.borderRadius).toBe(10);
      expect(tree.props.style?.borderColor).toBe('red');
    });
  });

  describe('conditional style', () => {
    it('should not apply style when condition is false', () => {
      const tree = VStack().style({ color: 'red' }, false).build();
      expect(tree.props.style?.color).toBeUndefined();
    });
  });

  describe('conditional props', () => {
    it('should not apply props when condition is false', () => {
      const tree = VStack().props({ 'data-test': 'value' }, false).build();
      expect(tree.props['data-test']).toBeUndefined();
    });
  });

  describe('class method', () => {
    it('should accumulate multiple class calls', () => {
      const tree = VStack()
        .class('a')
        .class('b', 'c')
        .build();
      expect(tree.props.className).toBe('a b c');
    });

    it('should filter null classes', () => {
      const tree = VStack()
        .class('a', null, 'b')
        .build();
      expect(tree.props.className).toBe('a b');
    });

    it('should handle all-null classes', () => {
      const tree = VStack()
        .class(null, null)
        .build();
      // No className should be set
      expect(tree.props.className).toBeUndefined();
    });
  });

  describe('build', () => {
    it('should remove empty style object', () => {
      const tree = VStack().build();
      expect(tree.props.style).toBeUndefined();
    });

    it('should keep style object when it has properties', () => {
      const tree = VStack().padding(10).build();
      expect(tree.props.style).toBeDefined();
      expect(tree.props.style?.padding).toBe(10);
    });
  });

  describe('string box model values', () => {
    it('should accept string padding', () => {
      const tree = VStack().padding('10px').build();
      expect(tree.props.style?.padding).toBe('10px');
    });

    it('should accept string margin', () => {
      const tree = VStack().margin('auto').build();
      expect(tree.props.style?.margin).toBe('auto');
    });
  });

  describe('border string values', () => {
    it('should accept string radius', () => {
      const tree = VStack().border({ radius: '50%', width: 1 }).build();
      expect(tree.props.style?.borderRadius).toBe('50%');
    });
  });
});
