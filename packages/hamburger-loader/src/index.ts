import syntaxParse from './syntaxParser';
import lexParse from './lexicalParser';
import codeGenerator from './codeGenerator';
import type { JSResultObject } from './codeGenerator';

import hamburger, {
  Text,
  Image,
  HStack,
  Button,
  VStack,
  Link,
  PureHTML,
  ListItem,
  Layout,
  Input,
  List,
} from '@hamburger/core';

const HamburgerComponents: Record<string, unknown> = {
  Text,
  Image,
  HStack,
  Button,
  VStack,
  Link,
  PureHTML,
  ListItem,
  Layout,
  Input,
  List,
};

const fakerArgs: Record<string, string> = {
  Time: '2019年10月3日',
  Name: 'xyy',
  Email: 'xuyiyangwing@gmail.com',
};

function betterEval(jsCodeObj: JSResultObject, userArgs: Record<string, unknown> = {}) {
  const argObj: Record<string, unknown> = { ...HamburgerComponents, ...userArgs };
  for (const i of jsCodeObj.argList) {
    if (!Object.prototype.hasOwnProperty.call(argObj, i)) {
      // 将 dsl 中使用到的 fake* 变量替换为 mock 数据
      // 若存在用户定义的 fake 变量，则优先使用用户的变量
      if (i.startsWith('fake')) {
        argObj[i] = fakerArgs[i.replace('fake', '')] || i;
      }
    }
  }
  return new Function(...Object.keys(argObj), `return ${jsCodeObj.content}`)(
    ...Object.values(argObj),
  );
}

function renderToNode(code: string, userArgs: Record<string, unknown> = {}) {
  const tokens = lexParse(code);
  const ast = syntaxParse(tokens);
  const jsCode = codeGenerator(ast);
  return betterEval(jsCode, userArgs);
}

function hbg(
  userArgs: Record<string, unknown>,
): (hbgSource: TemplateStringsArray, ...keys: unknown[]) => unknown;
function hbg(userArgs: TemplateStringsArray, ...keys: unknown[]): unknown;
function hbg(userArgs: Record<string, unknown> | TemplateStringsArray, ..._keys: unknown[]) {
  if (typeof userArgs === 'object' && !Array.isArray(userArgs) && !('raw' in userArgs)) {
    // 使用参数的情况
    return (hbgSource: TemplateStringsArray | string, ...keys: unknown[]) => {
      let code: string;
      if (typeof hbgSource === 'string') code = hbgSource;
      else code = String.raw(hbgSource, ...keys);
      return renderToNode(code, userArgs as Record<string, unknown>);
    };
  } else {
    // 不使用参数的情况
    let code: string;
    if (typeof userArgs === 'string') code = userArgs;
    else code = String.raw(userArgs as TemplateStringsArray, ..._keys);
    return renderToNode(code);
  }
}

export { hbg };
export default hbg;
