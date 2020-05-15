// @flow
import hamburger, { Text, Image, HStack, Button, VStack, Link } from '@hamburger/core';

function betterEval(method, userArgs = {}) {
  const fakerArgs = { fakeTime: '2019年10月3日' };
  const argObj = { Text, Image, HStack, Button, VStack, Link, ...userArgs, ...fakerArgs };
  console.log(method);
  return new Function(...Object.keys(argObj), `return ${method}`)(...Object.values(argObj));
}

function hbg(input) {
  const lines = input[0].split('\n').filter(i => i.trim() !== '');

  const root = {
    title: 'root',
    param: '',
    children: [],
    decorator: {},
    father: null,
  };

  let fatherItem = root;
  const reg = /@([\w\\.]+)(=(\w+))?/g;
  for (let line of lines) {
    // 匹配获取元素名
    const matchedNames = line.match(/\w+/);
    // 若没有匹配到，说明层级在上升
    if (!matchedNames || [...line].some(i => i === '}')) {
      fatherItem = fatherItem.father;
      continue;
    }
    // 否则创建新的元素
    const currentItem = {
      title: matchedNames[0],
      param: '',
      children: [],
      decorator: {},
      father: fatherItem,
    };
    fatherItem.children.push(currentItem);
    // 若发现左大括号，说明层级在下降
    if ([...line].some(i => i === '{')) fatherItem = currentItem;
    // 获取样式参数
    let match = reg.exec(line);
    while (match != null) {
      // 获取数值
      let value = match[3] || true;
      // 获取键值
      let key: string = match[1];
      // 键值划分
      if (/\./.test(key)) {
        const temp = key.split('.');
        key = temp[0];
        value = { [temp[1]]: value };
      }
      currentItem.decorator[key] = value;
      match = reg.exec(line);
    }
    // 获取参数
    const paramMatch = line.match(/\((.+)\)/);
    if (paramMatch) currentItem.param = paramMatch[1];
  }

  let result = '';

  function dfs(current) {
    result += `${current.title}`;
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
      result += `(${current.param})${decorators},\n`;
      return;
    }
    result += '(\n';
    for (let child of current.children) {
      dfs(child);
    }
    if (current.children.length !== 0) {
      result += `)${decorators}`;
    }
    if (current.father.title !== 'root') result += ',\n';
  }

  dfs(root.children[0]);
  return {
    args: {},
    build() {
      return betterEval(result, this.args).build();
    },
    data(args) {
      this.args = args;
      return this;
    },
  };
}

const Main = hbg`
VStack {             @padding=3
  Image(imgLink)     @theme=thumbnail @size.width=300px
  HStack{           
    Link(name)       @bold
    Text(email)      @margin.left=2
  }
  Text(fakeTime)
Button("Follow")     @theme=primary
}
`.data({
  imgLink: 'https://static.runoob.com/images/demo/demo2.jpg',
  email: 'some',
  name: 'xyy',
});

export default Main;
