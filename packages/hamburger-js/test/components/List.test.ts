import { describe, it, expect } from 'vitest';
import { List, ListItem } from '../../lib/components/stack/List';
import { Text } from '../../lib/components/text/Text';

describe('List component', () => {
  it('should create an ol element', () => {
    const tree = List(Text('Item 1')).build();
    expect(tree.type).toBe('ol');
  });

  it('should have list-reset class', () => {
    const tree = List(Text('Item')).build();
    expect(tree.props.className).toContain('list-reset');
  });

  it('should auto-wrap children in li elements', () => {
    const tree = List(Text('A'), Text('B'), Text('C')).build();
    expect(tree.children).toHaveLength(3);
    tree.children.forEach((child) => {
      expect(child.type).toBe('li');
    });
  });

  it('should preserve explicit ListItem wrappers', () => {
    const tree = List(ListItem(Text('Explicit')), Text('Auto-wrapped')).build();

    expect(tree.children).toHaveLength(2);
    tree.children.forEach((child) => {
      expect(child.type).toBe('li');
    });
  });

  it('should accept flattened arrays of elements', () => {
    const items = [Text('A'), Text('B')];
    const tree = List(items, Text('C')).build();
    expect(tree.children).toHaveLength(3);
  });

  it('should support ViewClass base methods', () => {
    const tree = List(Text('Item')).padding(10).id('my-list').build();

    expect(tree.props.style?.padding).toBe(10);
    expect(tree.props.id).toBe('my-list');
  });
});

describe('ListItem', () => {
  it('should create an li element', () => {
    const tree = ListItem(Text('Content')).build();
    expect(tree.type).toBe('li');
  });

  it('should contain the child element', () => {
    const tree = ListItem(Text('Hello')).build();
    expect(tree.children).toHaveLength(1);
  });
});
