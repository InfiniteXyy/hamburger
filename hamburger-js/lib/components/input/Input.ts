import { ViewClass } from '../View';
import hamburger from '../../index';

class InputClass extends ViewClass<HTMLInputElement> {
  constructor(private value: any, private type?: string) {
    super();
    if (type === 'checkbox') this._props.checked = (value as unknown) as boolean;
    else this._props.value = value;
    this._props.type = type;
    this._tag = 'input';
  }

  // 功能方法
  public onChange(callback: any) {
    this._props.onChange = callback;
    return this;
  }
  public onInput(callback: any) {
    this._props.onInput = callback;
    return this;
  }
  public onKeyPress(keyCode, callback) {
    this._props.onKeyPress = function (e) {
      if (e.key === keyCode) {
        e.preventDefault();
        callback();
      }
    };
    return this;
  }
  public placeholder(val) {
    this._props.placeholder = val;
    return this;
  }

  public wrapLabel(text: string) {
    this._tag = 'label';
    this._children = [Input(this.value, this.type), text];
    this._props = { style: {} };
    return this;
  }

  public bind<T>(onChange: (value: T) => void, lazy?: boolean) {
    if (lazy || hamburger.platform.name === 'React') {
      this._props.onChange = (event: any) => {
        onChange(event.target.value);
      };
    } else {
      this._props.onInput = (event: any) => {
        onChange(event.target.value);
      };
    }
    return this;
  }
}

export function Input(value: any, type?: string) {
  return new InputClass(value, type).class(hamburger.theme.input.common);
}
