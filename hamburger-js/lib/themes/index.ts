export interface IButtonVariant {
  primary: string;
  secondary: string;
}

export interface IShadow {
  large: string;
  small: string;
  regular: string;
}
export interface IHamburgerTheme {
  common: {
    shadow: IShadow;
  };
  button: {
    common: string;
    variant: IButtonVariant;
  };
  text: {};
}

import bootstrapTheme from './BootstrapTheme';
const theme = bootstrapTheme;

export default theme;
