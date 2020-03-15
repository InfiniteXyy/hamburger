// @flow

import type { TokenLine } from './lexicalParser';

export type TreeNode = {
  title: string;
  decorator: { [string]: boolean | string | { [string]: string } };
  param: string;
  children: TreeNode[];
  father: TreeNode;
}


function syntaxParse(lines: TokenLine[]): TreeNode {
  const root: TreeNode = {
    title: 'root',
    param: '',
    children: [],
    decorator: {},
    father: null,
  };

  let fatherItem = root;
  let lastItem = root;

  for (let line of lines) {

    // 若改行没有元素，则只判断深度变化
    if (!line.define) {
      if (line.depthDelta === -1) {
        fatherItem = fatherItem.father;
      } else if (line.depthDelta === 1) {
        fatherItem = lastItem;
      }
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
    for (let annotationToken of line.annotations) {
      let value = annotationToken.value || true;
      let key = annotationToken.key;
      // 链式参数例如 padding.right=3，要修改对应的keyValue
      if (/\./.test(key)) {
        const temp = key.split('.');
        key = temp[0];
        if (!currentItem.decorator[key]) currentItem.decorator[key] = {};
        currentItem.decorator[key][temp[1]] = value;
      } else {
        currentItem.decorator[key] = value;
      }
    }


    // 根据层级的上升下降变更 fatherItem
    if (line.depthDelta === -1) {
      fatherItem = fatherItem.father;
    } else if (line.depthDelta === 1) {
      fatherItem = currentItem;
    }
    lastItem = currentItem;
  }
  return root.children[0];
}


export default syntaxParse;
