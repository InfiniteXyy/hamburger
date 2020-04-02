import React from 'react';
import classnames from 'classnames';
import { ClassValue } from 'classnames/types';
import { IShadow } from '../themes';
import { ChildElement, IBuildable } from '../common';
import { createElement } from '../core';
import hamburger from '../index';

interface MarginModel<T> {
  top?: T;
  bottom?: T;
  left?: T;
  right?: T;
  horizontal?: T;
  vertical?: T;
}

interface PaddingModel<T> {
  top?: T;
  bottom?: T;
  left?: T;
  right?: T;
  horizontal?: T;
  vertical?: T;
}

interface SizeModel {
  height?: number;
  width?: number;
}

interface BorderModel {
  radius?: number;
  width?: number;
  color?: string;
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

  private static getBoxModelObj<T>(type: 'margin' | 'padding', value: number | PaddingModel<T>) {
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

  private static getBootstrapBoxModel<T>(type: 'm' | 'p', value: string | PaddingModel<T>): string {
    if (typeof value === 'string') {
      return type + '-' + value;
    } else {
      if ('horizontal' in value) return `${type}x-${value.horizontal}`;
      if ('vertical' in value) return `${type}y-${value.vertical}`;
      if ('top' in value) return `${type}t-${value.top}`;
      if ('bottom' in value) return `${type}b-${value.bottom}`;
      if ('left' in value) return `${type}l-${value.left}`;
      if ('right' in value) return `${type}r-${value.right}`;
    }
    return '';
  }

  public padding<T>(value: number | string | PaddingModel<T>, when?: boolean) {
    if (when === false) return this;
    let isPlainBoxModelObj = false;
    if (typeof value === 'object') {
      for (let key in value) {
        if (typeof value[key] === 'number') {
          isPlainBoxModelObj = true;
          break;
        }
      }
    }
    if (typeof value === 'number' || isPlainBoxModelObj) {
      this._props.style = Object.assign(this._props.style, ViewClass.getBoxModelObj('padding', value as any));
    } else {
      this.class(ViewClass.getBootstrapBoxModel('p', value));
    }
    return this;
  }

  public margin<T>(value: number | string | MarginModel<T>, when?: boolean) {
    if (when === false) return this;
    let isPlainBoxModelObj = false;
    if (typeof value === 'object') {
      for (let key in value) {
        if (typeof value[key] === 'number') {
          isPlainBoxModelObj = true;
          break;
        }
      }
    }
    if (typeof value === 'number' || isPlainBoxModelObj) {
      this._props.style = Object.assign(this._props.style, ViewClass.getBoxModelObj('margin', value as any));
    } else {
      this.class(ViewClass.getBootstrapBoxModel('m', value));
    }
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
    this._props.style.border = !!border.width ? 'solid' : '';
    this._props.style.borderRadius = border.radius;
    this._props.style.borderColor = border.color;
    this._props.style.borderWidth = border.width;
    return this;
  }

  public onClick(callback: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void) {
    this._props.onClick = callback;
    return this;
  }

  public shadow(type: keyof IShadow = 'regular', when?: boolean) {
    if (!when) this.class(hamburger.theme.utility.shadow[type]);
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

  public props(props: React.HTMLProps<T> & { 'data-id': string }, when?: boolean) {
    if (when === false) return this;
    this._props = Object.assign(this._props, props);
    return this;
  }

  public build() {
    if (Object.keys(this._props.style).length === 0) delete this._props.style;
    return createElement(this._tag, this._props, this._children);
  }
}
