import React from 'react';

function VStack(...children) {
  let stylesheet = {
    padding: '',
    shadow: '',
    classify() {
      const classNames = [];
      if (!!this.padding) {
        classNames.push(`p-${this.padding}`);
      }
      if (!!this.shadow) {
        classNames.push(`shadow-${this.shadow}`);
      }
      return classNames.join(' ');
    },
  };
  return {
    build() {
      return <div className={stylesheet.classify()}>{children.map(child => child.build())}</div>;
    },
    shadow(variant) {
      stylesheet.shadow = variant;
      return this;
    },
    padding(value) {
      stylesheet.padding = value;
      return this;
    },
  };
}

function Text(content) {
  return {
    build() {
      return <div>{content}</div>;
    },
  };
}

const Container = () => {
  return VStack(Text('From hamburger🍔'))
    .padding(3)
    .shadow('lg')
    .build();
};
export default <Container />;
