import { ChildElement, IView } from '../types';
import { createElement } from '../core';

interface BoxModel {
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
  horizontal?: number | string;
  vertical?: number | string;
}

interface SizeModel {
  height?: number | string;
  width?: number | string;
}

interface BorderModel {
  radius?: number | string;
  width?: number | string;
  color?: string;
}

export type ViewProps = {
  children: any;
  onClick?: (e) => void;
  [k: string]: any;
};

export class ViewClass implements IView {
  protected _tag: string;
  protected _props: { [key: string]: any };
  protected _children: ChildElement[];

  protected constructor() {
    this._tag = 'div';
    this._props = { style: {} };
    this._children = [];
  }

  public tag(tag: string, when?: boolean) {
    if (when !== false) this._tag = tag;
    return this;
  }

  private static getBoxModelObj(type: 'margin' | 'padding', value: number | string | BoxModel) {
    let result: any = {};
    if (typeof value === 'number' || typeof value === 'string') {
      result = { [type]: value };
    } else {
      if ('horizontal' in value) result[`${type}Left`] = result[`${type}Right`] = value.horizontal;
      if ('vertical' in value) result[`${type}Top`] = result[`${type}Bottom`] = value.vertical;
      if ('top' in value) result[`${type}Top`] = value.top;
      if ('bottom' in value) result[`${type}Bottom`] = value.bottom;
      if ('left' in value) result[`${type}Left`] = value.left;
      if ('right' in value) result[`${type}Right`] = value.right;
    }
    return result;
  }

  public padding(value: number | string | BoxModel, when?: boolean) {
    if (when === false) return this;
    Object.assign(this._props.style, ViewClass.getBoxModelObj('padding', value));
    return this;
  }

  public margin<T>(value: number | string | BoxModel, when?: boolean) {
    if (when === false) return this;
    Object.assign(this._props.style, ViewClass.getBoxModelObj('margin', value));
    return this;
  }

  public size(size: number | string | SizeModel, when?: boolean) {
    if (when === false) return this;
    if (typeof size === 'number' || typeof size === 'string') {
      this._props.style.width = this._props.style.height = size;
    } else {
      this._props.style.width = size.width;
      this._props.style.height = size.height;
    }
    return this;
  }

  public opacity(value: number, when?: boolean) {
    if (when === false) return this;
    this._props.style.opacity = value;
    return this;
  }

  public border(border: BorderModel, when?: boolean) {
    if (when === false) return this;
    this._props.style.border = !!border.width ? 'solid' : '';
    this._props.style.borderRadius = border.radius;
    this._props.style.borderColor = border.color;
    this._props.style.borderWidth = border.width;
    return this;
  }

  public onClick(callback) {
    this._props.onClick = callback;
    return this;
  }

  public hide(when?: boolean) {
    if (!when) this._props.style.display = 'none';
    return this;
  }

  public class(...classes: string[]) {
    const className = classes.join(' ');
    if (!this._props.className) this._props.className = className;
    else this._props.className += ' ' + className;
    return this;
  }

  public style(styleObject: { [k: string]: any }, when?: boolean) {
    if (when === false) return this;
    Object.assign(this._props.style, styleObject);
    return this;
  }

  public id(idName: string) {
    this._props.id = idName;
    return this;
  }

  public props(props: any, when?: boolean) {
    if (when === false) return this;
    Object.assign(this._props, props);
    return this;
  }

  public build() {
    if (this._props.style && Object.keys(this._props.style).length === 0) delete this._props.style;
    return createElement(this._tag, this._props, this._children);
  }
}
