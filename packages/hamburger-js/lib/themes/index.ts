export interface IShadow {
  large: string;
  small: string;
  regular: string;
}

export interface IHamburgerTheme {
  utility: {
    shadow: IShadow;
  };
  stack: {
    variant: { [k: string]: string };
  };
  button: {
    common: string;
    variant: { [k: string]: string };
  };
  input: {
    common: string;
  };
  text: {
    variant: { [k: string]: string };
  };
  image: {
    common: string;
    variant: { [k: string]: string };
  };
}

import bootstrapTheme from './BootstrapTheme'; // developing
import semanticTheme from './SemanticTheme'; // developing
import hamburgerTheme from './HamburgerTheme';
import noTheme from './NoTheme';

export { bootstrapTheme, noTheme };
