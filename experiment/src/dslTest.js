import hamburger, { Text, Image, HStack, Button, VStack } from 'hamburger-js';

function betterEval(method, userArgs = {}) {
  const argObj = { Text, Image, HStack, Button, VStack, ...userArgs };
  return new Function(...Object.keys(argObj), `return ${method}`)(...Object.values(argObj));
}


function hbg(args) {
  return input => {
    const lines = input[0].split('\n');

    const root = {
      title: 'root',
      param: '',
      children: [],
      decorator: {},
      father: null,
    };

    let fatherItem = root;
    const reg = /@(\w+)(=(\w+))?/g;

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
        currentItem.decorator[match[1]] = match[3] || true;
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
        if (current.decorator[key] === true) {
          decorators += `.${key}()`;
        } else {
          decorators += `.${key}("${current.decorator[key]}")`;
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
      if (current.father.title !== 'root') result += '),\n';
      else result += ')';
    }

    dfs(root.children[0]);
    return betterEval(result, args);
  }
}


export default hbg(
  {
    imgLink: 'https://static.runoob.com/images/demo/demo2.jpg',
    email: 'some',
    name: 'xyy',
  })
  `VStack {              @padding=10 @alignItems=center
    Image(imgLink)       @theme=thumbnail
    Text {               @variant=secondary
        Text(name)       @bold
        Text(email)
    }
    Button("Follow")     @theme=primary
}
`;
