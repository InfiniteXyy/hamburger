import React from 'react';
import { ViewClass } from '../View';
import { VStack, HStack } from '../..';
import { createPlaceHolder } from '../../utils';

type LayoutType =
  'top-main'
  | 'top-main-bottom'
  | 'top-aside-main'
  | 'top-aside-main-bottom'
  | 'main-bottom'
  | 'aside-main'
  | 'aside-main-bottom';

type ChildElement = JSX.Element | ViewClass<any, any>;

class LayoutClass {
  private topElement: ChildElement = createPlaceHolder('100vw', '48px', 'top');
  private bottomElement: ChildElement = createPlaceHolder('100vw', '48px', 'bottom');
  private asideElement: ChildElement = createPlaceHolder('20vw', '75vh', 'aside');
  private mainElement: ChildElement = createPlaceHolder('80vw', '75vh', 'main');
  private readonly layoutType: LayoutType = 'top-main';

  constructor(type: LayoutType) {
    this.layoutType = type;
  }

  public top(element: ChildElement) {
    this.topElement = element;
    return this;
  }

  public bottom(element: ChildElement) {
    this.bottomElement = element;
    return this;
  }

  public main(element: ChildElement) {
    this.mainElement = element;
    return this;
  }

  public aside(element: ChildElement) {
    this.asideElement = element;
    return this;
  }

  public build() {
    switch (this.layoutType) {
      case 'top-main':
        return VStack(this.topElement, this.mainElement).build();
      case 'top-main-bottom':
        return VStack(this.topElement, this.mainElement, this.bottomElement).build();
      case 'top-aside-main':
        return VStack(this.topElement, HStack(this.asideElement, this.mainElement)).build();
      case 'top-aside-main-bottom':
        return VStack(this.topElement, HStack(this.asideElement, this.mainElement), this.bottomElement).build();
      case 'main-bottom':
        return VStack(this.mainElement, this.bottomElement).build();
      case 'aside-main':
        return HStack(this.asideElement, this.mainElement).build();
      case 'aside-main-bottom':
        return VStack(HStack(this.asideElement, this.mainElement), this.bottomElement).build();
    }
  }
}

export function Layout(type: LayoutType) {
  return new LayoutClass(type);
}
