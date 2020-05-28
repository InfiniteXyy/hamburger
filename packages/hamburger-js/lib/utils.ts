export function flatMap<T, U>(array: T[], callback: (value: T) => U[]): U[] {
  const result: U[] = [];
  for (let i of array) {
    result.push(...callback(i));
  }
  return result;
}

export function addKey(element: any, key: any) {
  if (typeof element === 'object' && element && element._props) {
    element._props.key = '' + key;
  }
  return element;
}
