import React from 'react';
import classnames from 'classnames';
import { ClassValue } from 'classnames/types';
import theme, { IShadow } from '../themes';
import { ChildElement, IBuildable } from '../common';
import { createElement } from '../core';

interface MarginModel {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  horizontal?: number;
  vertical?: number;
}

interface PaddingModel {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  horizontal?: number;
  vertical?: number;
}

interface SizeModel {
  height?: number;
  width?: number;
}

interface BorderModel {
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
}

export class ViewClass<T extends HTMLElement> implements IBuildable {
  protected _tag: string;
  protected _props: { style: React.CSSProperties } & React.HTMLProps<T>; // with default empty style
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

  private static getBoxModelObj(type: 'margin' | 'padding', value: number | PaddingModel) {
    let result: any = {};
    if (typeof value === 'number') {
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

  public padding(value: number | PaddingModel, when?: boolean) {
    if (when === false) return this;
    this._props.style = Object.assign(this._props.style, ViewClass.getBoxModelObj('padding', value));
    return this;
  }

  public margin(value: number | MarginModel, when?: boolean) {
    if (when === false) return this;
    this._props.style = Object.assign(this._props.style, ViewClass.getBoxModelObj('margin', value));
    return this;
  }

  public size(size: number | SizeModel, when?: boolean) {
    if (when === false) return this;
    if (typeof size === 'number') {
      this._props.style.width = this._props.style.height = size;
    } else {
      this._props.style.width = size.width;
      this._props.style.height = size.height;
    }
    return this;
  }

  public border(border: BorderModel, when?: boolean) {
    if (when === false) return this;
    this._props.style.border = !!border.borderWidth ? 'solid' : '';
    this._props.style.borderRadius = border.borderRadius;
    this._props.style.borderColor = border.borderColor;
    this._props.style.borderWidth = border.borderWidth;
    return this;
  }

  public onClick(callback: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void) {
    this._props.onClick = callback;
    return this;
  }

  public shadow(type: keyof IShadow = 'regular', when?: boolean) {
    if (!when) this.class(theme.utility.shadow[type]);
    return this;
  }

  public unselectable() {
    this._props.style.userSelect = 'none';
    return this;
  }

  public hide(when?: boolean) {
    if (!when) this._props.style.display = 'none';
    return this;
  }

  public class(...classes: ClassValue[]) {
    classes = classes.filter(i => !!i);
    const className = classnames(classes);
    if (!this._props.className) this._props.className = className;
    else this._props.className += ' ' + className;
    if (this._props.className === '') this._props.className = undefined;
    return this;
  }

  public style(styleObject: React.CSSProperties, when?: boolean) {
    if (when === false) return this;
    this._props.style = Object.assign(this._props.style, styleObject);
    return this;
  }

  public id(idName: string) {
    this._props.id = idName;
    return this;
  }

  public props(props: React.HTMLProps<T>, when?: boolean) {
    if (when === false) return this;
    this._props = Object.assign(this._props, props);
    return this;
  }

  public build() {
    return createElement(this._tag, this._props, ...this._children);
  }
}
