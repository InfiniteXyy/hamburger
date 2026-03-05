import { describe, it, expect } from 'vitest';
import { Layout } from '../../lib/components/layout/Layout';
import { Text } from '../../lib/components/text/Text';

describe('Layout component', () => {
  describe('layout types', () => {
    it('should create top-main layout', () => {
      const tree = Layout('top-main').build();
      expect(tree.type).toBe('div');
      expect(tree.children.length).toBe(2);
    });

    it('should create top-main-bottom layout', () => {
      const tree = Layout('top-main-bottom').build();
      expect(tree.children.length).toBe(3);
    });

    it('should create top-aside-main layout', () => {
      const tree = Layout('top-aside-main').build();
      expect(tree.children.length).toBe(2);
      // Second child should be HStack with aside and main
      expect(tree.children[1].children.length).toBe(2);
    });

    it('should create top-main-aside layout', () => {
      const tree = Layout('top-main-aside').build();
      expect(tree.children.length).toBe(2);
    });

    it('should create top-aside-main-bottom layout', () => {
      const tree = Layout('top-aside-main-bottom').build();
      expect(tree.children.length).toBe(3);
    });

    it('should create main-bottom layout', () => {
      const tree = Layout('main-bottom').build();
      expect(tree.children.length).toBe(2);
    });

    it('should create aside-main layout', () => {
      const tree = Layout('aside-main').build();
      // HStack layout
      expect(tree.props.className).toContain('flex');
    });

    it('should create aside-main-bottom layout', () => {
      const tree = Layout('aside-main-bottom').build();
      expect(tree.props.className).toContain('flex');
    });

    it('should create aside-bottom-main layout', () => {
      const tree = Layout('aside-bottom-main').build();
      expect(tree.children.length).toBe(2);
    });
  });

  describe('slot methods', () => {
    it('should set top slot', () => {
      const customTop = Text('Header');
      const layout = Layout('top-main').top(customTop);
      const tree = layout.build();
      // First child should be our custom element
      expect(tree.children[0].children[0].props.content).toBe('Header');
    });

    it('should set bottom slot', () => {
      const customBottom = Text('Footer');
      const layout = Layout('top-main-bottom').bottom(customBottom);
      const tree = layout.build();
      // Last child should be our custom element
      expect(tree.children[2].children[0].props.content).toBe('Footer');
    });

    it('should set main slot', () => {
      const customMain = Text('Main Content');
      const layout = Layout('top-main').main(customMain);
      const tree = layout.build();
      expect(tree.children[1].children[0].props.content).toBe('Main Content');
    });

    it('should set aside slot', () => {
      const customAside = Text('Sidebar');
      const layout = Layout('aside-main').aside(customAside);
      const tree = layout.build();
      expect(tree.children[0].children[0].props.content).toBe('Sidebar');
    });

    it('should support method chaining', () => {
      const layout = Layout('top-aside-main-bottom')
        .top(Text('Header'))
        .aside(Text('Sidebar'))
        .main(Text('Content'))
        .bottom(Text('Footer'));

      expect(layout.build).toBeDefined();
    });
  });
});
