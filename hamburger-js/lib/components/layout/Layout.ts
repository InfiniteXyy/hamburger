import { HStack, VStack } from '..';
import { createPlaceHolder } from '../../utils';
import { ChildElement, IBuildable } from '../../common';
import { buildElement } from '../../core';

type LayoutType =
  | 'top-main'
  | 'top-main-bottom'
  | 'top-aside-main'
  | 'top-main-aside'
  | 'top-aside-main-bottom'
  | 'main-bottom'
  | 'aside-main'
  | 'aside-main-bottom';

class LayoutClass implements IBuildable {
  private topElement: ChildElement;
  private bottomElement: ChildElement;
  private asideElement: ChildElement;
  private mainElement: ChildElement;
  private readonly layoutType: LayoutType;

  constructor(type: LayoutType) {
    this.layoutType = type || 'top-main';
    this.topElement = createPlaceHolder('100vw', '48px', 'top');
    this.bottomElement = createPlaceHolder('100vw', '48px', 'bottom');
    this.asideElement = createPlaceHolder('20vw', '75vh', 'aside');
    this.mainElement = createPlaceHolder('80vw', '75vh', 'main');
  }

  public top(element: ChildElement) {
    this.topElement = buildElement(element);
    return this;
  }

  public bottom(element: ChildElement) {
    this.bottomElement = buildElement(element);
    return this;
  }

  public main(element: ChildElement) {
    this.mainElement = buildElement(element);
    return this;
  }

  public aside(element: ChildElement) {
    this.asideElement = buildElement(element);
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
      case 'top-main-aside':
        return VStack(this.topElement, HStack(this.mainElement, this.asideElement)).build();
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
