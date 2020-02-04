/**
 * style with class instead of inline define
 * inspired by tailwind.css
 * https://tailwindcss.com/
 */
import React from 'react';
import { styleResult } from './config-parser';

function VStack(...children) {
  return {
    build() {
      return <div>{children.map(child => child.build())}</div>;
    },
  };
}
function Text(content) {
  let stylesheet = {
    fontSize: '',
    color: 'primary',
    classify() {
      const classNames = [];
      if (!!this.fontSize) {
        classNames.push(`font-size-${this.fontSize}`);
      }
      if (!!this.color) {
        classNames.push(`font-color-${this.color}`);
      }
      return classNames.join(' ');
    },
  };
  return {
    build() {
      return <div className={stylesheet.classify()}>{content}</div>;
    },
    fontSize(variant) {
      stylesheet.fontSize = variant;
      return this;
    },
    color(variant) {
      stylesheet.color = variant;
      return this;
    },
  };
}

const Container = () => {
  return VStack(
    Text(styleResult),
    Text('Hi~').fontSize('large'),
    Text('are you ok')
      .fontSize('small')
      .color('secondary'),
  ).build();
};
export default <Container />;
