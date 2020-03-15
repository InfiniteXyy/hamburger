// @flow

export type TokenPair = {
  key: string;
  value?: string,
};

export type TokenLine = {
  index: number,
  annotations: TokenPair[],
  define: TokenPair,
  source: string,
  depthDelta: number
}

const AnnotationRegExp = /@([\w\\.]+)(=(\w+))?/g;

function lexParse(code: string): TokenLine[] {
  const lines = code
    .split('\n')
    .map(i => i.trim())
    .filter(i => i !== '');

  const result: TokenLine[] = lines.map((source, index) => ({
    index,
    source,
    annotations: [],
    define: null,
    depthDelta: 0,
  }));
  // 预处理：获取每一行的注解
  for (let line of result) {
    let match = AnnotationRegExp.exec(line.source);
    while (match != null) {
      // 获取注解 Value 值
      let value = match[3];
      // 获取注解 Key 值
      let key = match[1];
      line.annotations.push({ value, key });
      match = AnnotationRegExp.exec(line.source);
    }
  }

  // 获取声明：Element(Parameter)
  for (let line of result) {
    const matchKey = /^(\w+)/g.exec(line.source);
    const matchValue = /\(([\w"']+)\)/g.exec(line.source);
    if (matchKey) line.define = { key: matchKey[1] };
    if (matchValue && matchKey) line.define.value = matchValue[1];
  }

  // 判断深度变化
  for (let line of result) {
    if ([...line.source].some(i => i === '{')) line.depthDelta = 1;
    else if ([...line.source].some(i => i === '}')) line.depthDelta = -1;
  }

  return result;
}

export default lexParse;
