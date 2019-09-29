import React from 'react';

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

export abstract class ViewClass<T extends HTMLElement> {
  protected _classNames: string;
  protected _id: string;
  protected _style: React.CSSProperties;
  protected _tag: string;
  protected _props: React.HTMLProps<T>;
  protected constructor() {
    this._classNames = '';
    this._id = '';
    this._style = {};
    this._tag = 'div';
    this._props = {};
  }

  public tag(tag: string, when?: boolean) {
    if (when !== false) this._tag = tag;
    return this;
  }

  public padding(value: number | PaddingModel, when?: boolean) {
    if (when === false) return this;
    if (typeof value === 'number') {
      this._style = { ...this._style, padding: value };
    } else {
      let tmp = this._style;
      if ('horizontal' in value) tmp.paddingLeft = tmp.paddingRight = value.horizontal;
      if ('vertical' in value) tmp.paddingTop = tmp.paddingBottom = value.vertical;
      tmp.paddingTop = tmp.paddingTop || value.top;
      tmp.paddingBottom = tmp.paddingBottom || value.bottom;
      tmp.paddingLeft = tmp.paddingLeft || value.left;
      tmp.paddingRight = tmp.paddingRight || value.right;
    }
    return this;
  }

  public margin(value: number | MarginModel, when?: boolean) {
    if (when === false) return this;
    if (typeof value === 'number') {
      this._style = { ...this._style, margin: value };
    } else {
      let tmp = this._style;
      if ('horizontal' in value) tmp.marginLeft = tmp.marginRight = value.horizontal;
      if ('vertical' in value) tmp.marginTop = tmp.marginBottom = value.vertical;
      tmp.marginTop = tmp.marginTop || value.top;
      tmp.marginBottom = tmp.marginBottom || value.bottom;
      tmp.marginLeft = tmp.marginLeft || value.left;
      tmp.marginRight = tmp.marginRight || value.right;
    }
    return this;
  }

  public size(size: SizeModel, when?: boolean) {
    if (when === false) return this;
    this._style.width = size.width;
    this._style.height = size.height;
    return this;
  }

  public border(border: BorderModel, when?: boolean) {
    if (when === false) return this;
    this._style.border = !!border.borderWidth ? 'solid' : '';
    this._style.borderRadius = border.borderRadius;
    this._style.borderColor = border.borderColor;
    this._style.borderWidth = border.borderWidth;
    return this;
  }

  public class(className: string, when?: boolean) {
    if (when === false) return this;
    if (!this._classNames) this._classNames = className;
    else this._classNames += ' ' + className;
    return this;
  }

  public style(styleObject: React.CSSProperties, when?: boolean) {
    if (when === false) return this;
    this._style = Object.assign(this._style, styleObject);
    return this;
  }

  public id(idName: string) {
    this._id = idName;
    return this;
  }

  public props(props: React.HTMLProps<T>, when?: boolean) {
    if (when === false) return this;
    this._props = props;
    return this;
  }

  public abstract build(): JSX.Element;
}
