import { describe, it, expect } from 'vitest';
import { Table, TableRow } from '../../lib/components/table/Table';
import { Text } from '../../lib/components/text/Text';
import { Button } from '../../lib/components/button/Button';

describe('Table component', () => {
  it('should create table structure with thead and tbody', () => {
    const tree = Table(TableRow(Text('Name'), Text('Age')), TableRow(Text('Alice'), Text('30'))).build();

    expect(tree.type).toBe('table');
    expect(tree.children).toHaveLength(2);
    expect(tree.children[0].type).toBe('thead');
    expect(tree.children[1].type).toBe('tbody');
  });

  it('should convert header cells to th tags', () => {
    const tree = Table(TableRow(Text('Col1'), Text('Col2')), TableRow(Text('A'), Text('B'))).build();

    const thead = tree.children[0];
    // thead contains a tr
    const headerRow = thead.children[0];
    expect(headerRow.type).toBe('tr');
    // header cells should be th (via mapItem -> tag('th'))
    headerRow.children.forEach((cell) => {
      expect(cell.type).toBe('th');
    });
  });

  it('should render body rows as tr with td cells', () => {
    const tree = Table(TableRow(Text('Header')), TableRow(Text('Row1')), TableRow(Text('Row2'))).build();

    const tbody = tree.children[1];
    expect(tbody.children).toHaveLength(2);
    tbody.children.forEach((row) => {
      expect(row.type).toBe('tr');
      row.children.forEach((cell) => {
        expect(cell.type).toBe('td');
      });
    });
  });

  it('should accept flattened array of body rows', () => {
    const rows = [TableRow(Text('A'), Text('1')), TableRow(Text('B'), Text('2'))];
    const tree = Table(TableRow(Text('Name'), Text('Value')), rows).build();

    const tbody = tree.children[1];
    expect(tbody.children).toHaveLength(2);
  });

  it('should handle single column table', () => {
    const tree = Table(TableRow(Text('Title')), TableRow(Text('Data'))).build();

    expect(tree.type).toBe('table');
    const thead = tree.children[0];
    const headerRow = thead.children[0];
    expect(headerRow.children).toHaveLength(1);
  });

  it('should support various element types in cells', () => {
    const tree = Table(TableRow(Text('Action')), TableRow(Button('Click'))).build();

    expect(tree.type).toBe('table');
    const tbody = tree.children[1];
    const bodyRow = tbody.children[0];
    // Cell should contain a button
    const cellContent = bodyRow.children[0];
    expect(cellContent.type).toBe('td');
  });
});

describe('TableRow', () => {
  it('should create a tr element', () => {
    const row = TableRow(Text('A'), Text('B'));
    const tree = row.build();
    expect(tree.type).toBe('tr');
  });

  it('should wrap children in td elements', () => {
    const row = TableRow(Text('A'), Text('B'), Text('C'));
    const tree = row.build();
    expect(tree.children).toHaveLength(3);
    tree.children.forEach((child) => {
      expect(child.type).toBe('td');
    });
  });
});
