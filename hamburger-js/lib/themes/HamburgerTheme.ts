import { IHamburgerTheme } from './index';

const theme = {
  utility: {
    shadow: {
      small: 'hbg-shadow-small',
      regular: 'hbg-shadow-regular',
      large: 'hbg-shadow-large',
    },
    dimension: {
      small: 10,
      medium: 20,
      large: 30,
    },
  },
  button: {
    common: '',
    variant: {
      regular: 'hbg-button',
      outline: 'hbg-button-outlined',
    },
    color: {
      primary: 'hbg-primary-bg',
      secondary: 'hbg-secondary-bg',
    },
  },
  text: {
    size: {
      small: 'hbg-font-sm',
      regular: 'hbg-font-md',
      big: 'hbg-font-bg',
      large: 'hbg-font-lg',
      larger: 'hbg-font-lgr',
    },
    color: {
      primary: 'hbg-font-primary',
      secondary: 'hbg-font-secondary',
      muted: 'hbg-font-muted',
    },
  },
  image: {
    common: '',
    variant: {
      circular: 'hbg-img-circle',
      regular: 'hbg-img-regular',
      rounded: 'hbg-img-rounded',
    },
  },
};

export default theme;

//TODO: more themes
