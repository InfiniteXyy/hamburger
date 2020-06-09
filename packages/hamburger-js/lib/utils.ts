export function flatMap<T, U>(array: T[], callback: (value: T) => U[]): U[] {
  const result: U[] = [];
  for (let i of array) {
    result.push(...callback(i));
  }
  return result;
}
