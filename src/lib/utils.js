import React from 'react';

export function generateChildKey(child, index) {
  return React.cloneElement(child, { key: index })
}
