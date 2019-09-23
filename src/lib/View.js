export class ViewClass {
  constructor() {
    this._classNames = '';
    this._styleObj = {};
  }
  padding(value, when?): this {
    if (when === false) return this;
    if (typeof value === 'number') {
      this._styleObj = { ...this._styleObj, padding: value };
    } else {
      let tmp = this._styleObj;
      if ('horizontal' in value) {
        tmp.paddingLeft = tmp.paddingRight = value.horizontal;
      }
      if ('vertical' in value) {
        tmp.paddingTop = tmp.paddingBottom = value.vertical;
      }
      tmp.paddingTop = tmp.paddingTop || value.top;
      tmp.paddingBottom = tmp.paddingBottom || value.bottom;
      tmp.paddingLeft = tmp.paddingLeft || value.left;
      tmp.paddingRight = tmp.paddingRight || value.right;
    }
    return this;
  }

  margin(value, when?): this {
    if (when === false) return this;
    if (typeof value === 'number') {
      this._styleObj = { ...this._styleObj, margin: value };
    } else {
      let tmp = this._styleObj;
      if ('horizontal' in value) {
        tmp.marginLeft = tmp.marginRight = value.horizontal;
      }
      if ('vertical' in value) {
        tmp.marginTop = tmp.marginBottom = value.vertical;
      }
      tmp.marginTop = tmp.marginTop || value.top;
      tmp.marginBottom = tmp.marginBottom || value.bottom;
      tmp.marginLeft = tmp.marginLeft || value.left;
      tmp.marginRight = tmp.marginRight || value.right;
    }
    return this;
  }

  size(sizeConfig): this {
    this._styleObj.width = sizeConfig.width;
    this._styleObj.height = sizeConfig.height;
    return this;
  }

  border(width, color = 'black', radius = 0): this {
    this._styleObj = {
      ...this._styleObj,
      border: width ? 'solid' : '',
      borderRadius: radius,
      borderWidth: width,
      borderColor: color,
    };
    return this;
  }

  class(className): this {
    this._classNames += ' ' + className;
    return this;
  }
  style(styleObject): this {
    this._styleObj = { ...this._styleObj, ...styleObject };
    return this;
  }
}
