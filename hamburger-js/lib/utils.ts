import React from 'react';
import { isReact } from './common';

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

// Layout 中组件为空的填充物
export function createPlaceHolder(width: string, height: string, innerWords: string, backgroundColor = '#eaeaea'): any {
  if (isReact) {
    const style = { backgroundColor, width, height, border: '2px solid white', padding: 10 };
    return React.createElement('div', { style }, innerWords);
  } else {
    const element = document.createElement('div');
    element.style.backgroundColor = backgroundColor;
    element.style.width = width;
    element.style.height = height;
    element.style.border = '2px solid white';
    element.style.padding = '10px';
    element.innerText = innerWords;
    return element;
  }
}
