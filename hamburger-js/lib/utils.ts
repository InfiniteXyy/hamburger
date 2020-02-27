import React from 'react';
import { isReact } from './common';


export function flatMap<T, U>(array: T[], callback: (value: T, index: number, array: T[]) => U[]): U[] {
  return [].concat(...array.map(callback));
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
