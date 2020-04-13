import { HStack, VStack } from '..';
import { createPlaceHolder } from '../../utils';
import { ChildElement, IBuildable } from '../../common';

type LayoutType =
  | 'top-main'
  | 'top-main-bottom'
  | 'top-aside-main'
  | 'top-main-aside'
  | 'top-aside-main-bottom'
  | 'main-bottom'
  | 'aside-main'
  | 'aside-main-bottom'
  | 'aside-bottom-main';

class LayoutClass implements IBuildable {
  private topElement: ChildElement;
  private bottomElement: ChildElement;
  private asideElement: ChildElement;
  private mainElement: ChildElement;
  private readonly layoutType: LayoutType;

  constructor(type: LayoutType) {
    this.layoutType = type || 'top-main';
    this.topElement = createPlaceHolder({ height: '70px' }, 'top');
    this.bottomElement = createPlaceHolder({ height: '70px' }, 'bottom');
    this.asideElement = createPlaceHolder({ width: '200px' }, 'aside');
    this.mainElement = createPlaceHolder({ width: '500px', height: '500px' }, 'main');
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
      case 'top-main-aside':
        return VStack(this.topElement, HStack(this.mainElement, this.asideElement)).build();
      case 'top-aside-main-bottom':
        return VStack(this.topElement, HStack(this.asideElement, this.mainElement), this.bottomElement).build();
      case 'main-bottom':
        return VStack(this.mainElement, this.bottomElement).build();
      case 'aside-main':
        return HStack(this.asideElement, this.mainElement).build();
      case 'aside-main-bottom':
        return HStack(this.asideElement, VStack(this.mainElement, this.bottomElement)).build();
      case 'aside-bottom-main':
        return VStack(HStack(this.asideElement, this.mainElement), this.bottomElement).build();
    }
  }
}

export function Layout(type: LayoutType) {
  return new LayoutClass(type);
}
