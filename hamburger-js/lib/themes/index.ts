export interface IButtonVariant {
  primary: string;
  secondary: string;
}
export interface ITextVariant {
  p: string;
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
}

export interface IImageVariant {
  circular: string;
  regular: string;
  avatar: string;
}

export interface IImageSize {
  mini: string;
  medium: string;
}

export interface IShadow {
  large: string;
  small: string;
  regular: string;
}
export interface IHamburgerTheme {
  layout: {
    vertical?: string;
    horizontal?: string;
  };
  common: {
    shadow: IShadow;
  };
  button: {
    common: string;
    variant: IButtonVariant;
  };
  text: {
    variant: ITextVariant;
  };
  image: {
    common: string;
    variant: IImageVariant;
    size: IImageSize;
  };
  navbar: {
    common: string;
    item: {
      common: string;
      brand: string;
    };
  };
}

import bootstrapTheme from './BootstrapTheme';
import semanticTheme from './SemanticTheme';
const theme = bootstrapTheme;

export default theme;
