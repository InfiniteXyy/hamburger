import React from 'react';

export function generateChildKey(child: JSX.Element, index: number | string) {
  return React.cloneElement(child, { key: index });
}

export function adjustElement(child: any) {
  if (typeof child.build === 'function') {
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
