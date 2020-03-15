// @flow

import type { TokenLine } from './lexicalParser';

type DecoratorType = { [string]: boolean | string | { [string]: string } }
export type TreeNode = {
  title: string;
  decorator: DecoratorType;
  param: string;
  children: TreeNode[];
  father: TreeNode;
}


function assignDecorations(target: TreeNode, ...decorators: DecoratorType[]) {
  for (let decorator of decorators) {
    let value = decorator.value || true;
    let key = decorator.key;
    // 链式参数例如 padding.right=3，要修改对应的keyValue
    if (/\./.test(key)) {
      const temp = key.split('.');
      key = temp[0];
      if (!target.decorator[key]) target.decorator[key] = {};
      target.decorator[key][temp[1]] = value;
    } else {
      target.decorator[key] = value;
    }
  }
}

function syntaxParse(lines: TokenLine[]): TreeNode {
  const root: TreeNode = {
    title: 'VStack',
    param: '',
    children: [],
    decorator: {},
    father: null,
  };

  let fatherItem = root;
  let lastItem = root;

  for (let line of lines) {

    // 若改行没有元素，判断深度变化和样式赋予
    if (!line.define) {
      if (line.depthDelta === -1) {
        fatherItem = fatherItem.father;
      } else if (line.depthDelta === 1) {
        fatherItem = lastItem;
      }
      assignDecorations(lastItem, ...line.annotations);
      continue;
    }
    // 创建新的元素
    const currentItem = {
      title: line.define.key,
      param: line.define.value,
      children: [],
      decorator: {},
      father: fatherItem,
    };
    fatherItem.children.push(currentItem);

    // 赋予样式参数
    assignDecorations(currentItem, ...line.annotations);

    // 根据层级的上升下降变更 fatherItem
    if (line.depthDelta === -1) {
      fatherItem = fatherItem.father;
    } else if (line.depthDelta === 1) {
      fatherItem = currentItem;
    }
    lastItem = currentItem;
  }
  // 当根节点只有一个孩子的时候，就不需要根节点了
  return root.children.length === 1 ? root.children[0] : root;
}


export default syntaxParse;
