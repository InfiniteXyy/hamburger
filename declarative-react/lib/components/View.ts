import React from 'react';
import classnames from 'classnames';
import { ClassValue } from 'classnames/types';
import { should, WhenModel } from '../utils';

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

export class ViewClass<T extends HTMLElement, CT> {
  protected _tag: string;
  protected _props: { style: React.CSSProperties } & React.HTMLProps<T>; // with default empty style
  protected _children: CT | null;
  protected constructor() {
    this._tag = 'div';
    this._props = { style: {} };
    this._children = null;
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

  // todo: test new 'when' model
  public shadow(type: 'big' | 'small', when?: WhenModel | boolean) {
    if (should(when)) {
      if (type === 'big') {
        this._props.style.boxShadow = '0 5px 6px rgba(83,83,83,0.73)';
      } else if (type === 'small') {
        this._props.style.boxShadow = '0 5px 6px rgba(83,83,83,0.38)';
      }
    }
    return this;
  }

  public class(...classes: ClassValue[]) {
    const className = classnames(classes);
    if (!this._props.className) this._props.className = className;
    else this._props.className += ' ' + className;
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

  // todo: 'as' function type
  public as(newType: any): any {
    const newObj = new newType();
    Object.assign(newObj._props, this._props);
    newObj._tag = this._tag;
    return newObj;
  }

  public build() {
    return React.createElement(this._tag, this._props, this._children);
  }
}
