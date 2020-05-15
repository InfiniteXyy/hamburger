import { ViewClass } from '../View';
import { flatMap } from '../../utils';
import { ChildElement, IBuildable, IChildIterable } from '../../common';
import { VStack } from '..';

class TableDataClass extends ViewClass<HTMLTableDataCellElement> {
  constructor(child: ViewClass<any>) {
    super();
    this._children = [child];
    this._tag = 'td';
  }
}

class TableRowClass extends ViewClass<HTMLTableRowElement> implements IChildIterable<TableDataClass> {
  constructor(columns: ViewClass<any>[]) {
    super();
    this._children = columns.map((i) => new TableDataClass(i));
    this._tag = 'tr';
  }

  mapItem(wrapper: (item: TableDataClass) => ChildElement) {
    this._children = this._children.map(wrapper);
    return this;
  }
}

class TableClass implements IBuildable {
  constructor(private header: TableRowClass, private body: TableRowClass[]) {}

  build() {
    const header = VStack(this.header.mapItem((i) => i.tag('th'))).tag('thead');
    const body = VStack(this.body).tag('tbody');
    return VStack(header, body).tag('table').build();
  }
}

export function Table(header: TableRowClass, ...body: (TableRowClass | TableRowClass[])[]) {
  const _elements = flatMap(body, (i) => (Array.isArray(i) ? i : [i]));
  return new TableClass(header, _elements);
}

export function TableRow(...column: ViewClass<any>[]) {
  return new TableRowClass(column);
}

Table.__class__ = TableClass;
TableRow.__class__ = TableRowClass;
