import React from 'react';

export function generateChildKey(child: JSX.Element, index: number | string) {
  return React.cloneElement(child, { key: index });
}
