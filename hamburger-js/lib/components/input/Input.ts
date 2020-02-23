import { ViewClass } from '../View';
import theme from '../../themes';

class InputClass extends ViewClass<HTMLInputElement, null> {
  constructor(value: string, type?: string) {
    super();
    this._props.value = value;
    this._props.type = type;
    this._tag = 'input';
  }

  // 功能方法
  public onChange(callback: any) {
    this._props.onChange = callback;
    return this;
  }

  public bind<T>(onChange: (value: T) => void) {
    this._props.onChange = (event: any) => {
      onChange(event.target.value);
    };
    return this;
  }
}

export function Input(value: string, type?: string) {
  return new InputClass(value, type).class(theme.input.common);
}
