import React from 'react';

export function generateChildKey(child: JSX.Element, index: number | string) {
  return React.cloneElement(child, { key: index });
}

export interface WhenModel {
  when: boolean;
  on: 'hover' | 'click';
}
export function should(when?: WhenModel | boolean) {
  let should = false;
  if (when === undefined || when === true) {
    should = true;
  } else if (when !== false) {
    if (when.when) should = true;
  }
  return should;
}
