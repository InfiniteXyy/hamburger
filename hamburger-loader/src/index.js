// @flow
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
  GridCol,
  GridRow,
  PureHTML,
  ListItem,
  Layout,
  Icon,
  Input,
  List,
} from 'hamburger-js';

const HamburgerComponents = {
  Text,
  Image,
  HStack,
  Button,
  VStack,
  Link,
  GridRow,
  GridCol,
  PureHTML,
  ListItem,
  Layout,
  Icon,
  Input,
  List,
};

const fakerArgs = { Time: '2019年10月3日', Name: 'xyy', Email: 'xuyiyangwing@gmail.com' };

function betterEval(jsCodeObj: JSResultObject, userArgs = {}) {
  const argObj = { ...HamburgerComponents, ...userArgs };
  console.info('eval: ' + jsCodeObj.content);
  for (let i of jsCodeObj.argList) {
    if (!argObj.hasOwnProperty(i)) {
      if (i.startsWith('fake')) {
        argObj[i] = fakerArgs[i.replace('fake', '')] || i;
      } else {
        argObj[i] = i;
      }
    }
  }
  return new Function(...Object.keys(argObj), `return ${jsCodeObj.content}`)(...Object.values(argObj));
}


function hbg(hbgSource, ...keys) {
  let code;
  if (typeof hbgSource === 'string') code = hbgSource;
  else code = String.raw(hbgSource, ...keys);
  const tokens = lexParse(code);

  const ast = syntaxParse(tokens);
  const jsCode = codeGenerator(ast);
  return {
    userArgs: {},
    build() {
      return betterEval(jsCode, this.userArgs).build();
    },
    data(args) {
      this.userArgs = args;
      return this;
    },
  };
}

export default hbg;
