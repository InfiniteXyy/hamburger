import React from 'react';
import { ChildElement, isReact } from './common';

export function generateChildKey(child: JSX.Element, index: number | string) {
  return React.cloneElement(child, { key: index });
}

export function buildElement(child: ChildElement) {
  if ('build' in child) {
    return child.build();
  } else {
    return child;
  }
}

export function createPlaceHolder(width: string, height: string, innerWords: string, backgroundColor = '#eaeaea'): any {
  if (isReact) {
    return React.createElement(
      'div',
      {
        style: { backgroundColor, width, height, border: '2px solid white', padding: 10 },
      },
      innerWords,
    );
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
