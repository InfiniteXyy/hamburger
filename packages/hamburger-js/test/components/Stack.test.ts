import { describe, it, expect } from 'vitest';
import { VStack, HStack } from '../../lib/components/stack/Stack';
import { Text } from '../../lib/components/text/Text';

describe('Stack component - extended', () => {
  describe('HStack', () => {
    it('should have flex class', () => {
      const tree = HStack(Text('A')).build();
      expect(tree.props.className).toContain('flex');
    });

    it('should render multiple children', () => {
      const tree = HStack(Text('A'), Text('B'), Text('C')).build();
      expect(tree.children).toHaveLength(3);
    });

    it('should flatten array children', () => {
      const items = [Text('A'), Text('B')];
      const tree = HStack(items, Text('C')).build();
      expect(tree.children).toHaveLength(3);
    });
  });

  describe('VStack', () => {
    it('should not have flex class by default', () => {
      const tree = VStack(Text('A')).build();
      // VStack is not horizontal, so no 'flex' class by default
      expect(tree.props.className ?? '').not.toContain('flex');
    });

    it('should auto-promote to flex when justifyContent is used', () => {
      const tree = VStack(Text('A')).justifyContent('center').build();
      expect(tree.props.className).toContain('flex');
      expect(tree.props.className).toContain('flex-column');
      expect(tree.props.className).toContain('justify-center');
    });

    it('should auto-promote to flex when alignItems is used', () => {
      const tree = VStack(Text('A')).alignItems('center').build();
      expect(tree.props.className).toContain('flex');
      expect(tree.props.className).toContain('flex-column');
      expect(tree.props.className).toContain('items-center');
    });
  });

  describe('reverse', () => {
    it('should set row-reverse for HStack', () => {
      const tree = HStack(Text('A')).reverse().build();
      expect(tree.props.style?.flexDirection).toBe('row-reverse');
    });

    it('should set column-reverse for VStack', () => {
      const tree = VStack(Text('A')).reverse().build();
      expect(tree.props.style?.flexDirection).toBe('column-reverse');
    });

    it('should auto-promote VStack to flex', () => {
      const tree = VStack(Text('A')).reverse().build();
      expect(tree.props.className).toContain('flex');
      expect(tree.props.className).toContain('flex-column');
    });

    it('should not apply when condition is false', () => {
      const tree = HStack(Text('A')).reverse(false).build();
      expect(tree.props.style?.flexDirection).toBeUndefined();
    });
  });

  describe('nowrap', () => {
    it('should add flex-nowrap class', () => {
      const tree = HStack(Text('A')).nowrap().build();
      expect(tree.props.className).toContain('flex-nowrap');
    });

    it('should not apply when condition is false', () => {
      const tree = HStack(Text('A')).nowrap(false).build();
      expect(tree.props.className ?? '').not.toContain('flex-nowrap');
    });
  });

  describe('inflate', () => {
    it('should add fit class', () => {
      const tree = VStack(Text('A')).inflate().build();
      expect(tree.props.className).toContain('fit');
    });

    it('should not apply when condition is false', () => {
      const tree = VStack(Text('A')).inflate(false).build();
      expect(tree.props.className ?? '').not.toContain('fit');
    });
  });

  describe('mapItem', () => {
    it('should transform children via wrapper function', () => {
      const tree = HStack(Text('A'), Text('B'))
        .mapItem((item: any) => item.class('mapped'))
        .build();

      tree.children.forEach((child) => {
        expect(child.props.className).toContain('mapped');
      });
    });
  });

  describe('conditional methods', () => {
    it('should not apply justifyContent when condition is false', () => {
      const tree = HStack(Text('A')).justifyContent('center', false).build();
      expect(tree.props.className ?? '').not.toContain('justify-center');
    });

    it('should not apply alignItems when condition is false', () => {
      const tree = HStack(Text('A')).alignItems('center', false).build();
      expect(tree.props.className ?? '').not.toContain('items-center');
    });
  });

  describe('empty stack', () => {
    it('should handle HStack with no children', () => {
      const tree = HStack().build();
      expect(tree.children).toHaveLength(0);
    });

    it('should handle VStack with no children', () => {
      const tree = VStack().build();
      expect(tree.children).toHaveLength(0);
    });
  });
});
