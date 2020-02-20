import React from 'react';
import { ChildElement } from './common';

export function generateChildKey(child: JSX.Element, index: number | string) {
  return React.cloneElement(child, { key: index });
}

export function wrapContainer(className: string) {
  return (child: JSX.Element) => React.createElement('div', { className }, child);
}

export function buildElement(child: ChildElement) {
  if ('build' in child) {
    return child.build();
  } else {
    return child;
  }
}

export function createPlaceHolder(width: string, height: string, innerWords: string, backgroundColor = '#eaeaea') {
  return React.createElement(
    'div',
    {
      style: { backgroundColor, width, height, border: '2px solid white', padding: 10 },
    },
    innerWords,
  );
}
