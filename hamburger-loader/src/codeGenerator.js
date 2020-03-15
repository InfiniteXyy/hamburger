// @flow
import type { TreeNode } from './syntaxParser';

export type JSResultObject = {
  content: string;
  argList: string[]
}

function dfs(current: TreeNode, resultObject: JSResultObject) {
  resultObject.content += `${current.title}`;
  let decorators = '';
  for (let key in current.decorator) {
    switch (typeof current.decorator[key]) {
      case 'boolean':
        decorators += `.${key}()`;
        break;
      case 'object':
        decorators += `.${key}(${JSON.stringify(current.decorator[key])})`;
        break;
      default:
        decorators += `.${key}("${current.decorator[key]}")`;
        break;
    }
  }
  if (current.children.length === 0) {
    // 将所有需要的参数添加到 args 列表
    if (!/"/.test(current.param)) resultObject.argList.push((current.param));
    resultObject.content += `(${current.param || '""'})${decorators},\n`;
    return;
  }
  resultObject.content += '(\n';
  for (let child of current.children) {
    dfs(child, resultObject);
  }
  if (current.children.length !== 0) {
    resultObject.content += `)${decorators}`;
  }
  if (current.father.title !== 'root') resultObject.content += ',\n';
}


function codeGenerator(ast: TreeNode): JSResultObject {
  const resultObject: JSResultObject = { content: '', argList: [] };
  dfs(ast, resultObject);
  return resultObject;
}

export default codeGenerator;
