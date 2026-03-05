import { ViewClass } from '../View';
import { config } from '../../config';

class InputClass extends ViewClass {
  constructor(private value: string | boolean, private type?: string) {
    super();
    if (type === 'checkbox') this._props.checked = value as boolean;
    else this._props.value = value;
    this._props.type = type;
    this._tag = 'input';
  }

  public onChange(callback: (e: Event) => void): this {
    this._props.onChange = callback;
    return this;
  }

  public onInput(callback: (e: Event) => void): this {
    this._props.onInput = callback;
    return this;
  }

  public onKeyPress(keyCode: string, callback: () => void): this {
    this._props.onKeyPress = function (e: KeyboardEvent) {
      if (e.key === keyCode) {
        e.preventDefault();
        callback();
      }
    };
    return this;
  }

  public placeholder(val: string): this {
    this._props.placeholder = val;
    return this;
  }

  public wrapLabel(text: string): this {
    this._tag = 'label';
    this._children = [Input(this.value, this.type), text];
    this._props = { style: {} };
    return this;
  }

  public bind<T>(onChange: (value: T) => void, lazy?: boolean): this {
    if (lazy || config.platform.name === 'React') {
      this._props.onChange = (event: Event) => {
        onChange((event.target as HTMLInputElement).value as unknown as T);
      };
    } else {
      this._props.onInput = (event: Event) => {
        onChange((event.target as HTMLInputElement).value as unknown as T);
      };
    }
    return this;
  }
}

export function Input(value: string | boolean, type?: string): InputClass {
  return new InputClass(value, type);
}

(Input as { __class__?: typeof InputClass }).__class__ = InputClass;
