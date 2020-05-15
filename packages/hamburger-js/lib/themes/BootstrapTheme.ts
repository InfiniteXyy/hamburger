import { IHamburgerTheme } from './index';

const bootstrapTheme: IHamburgerTheme = {
  utility: {
    shadow: {
      small: 'shadow-sm',
      regular: 'shadow',
      large: 'shadow-lg',
    },
  },
  input: {
    common: 'form-control',
  },
  button: {
    common: 'btn',
    variant: {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      success: 'btn-success',
      info: 'btn-info',
      danger: 'btn-danger',
      'primary-outline': 'btn-outline-primary',
      'secondary-outline': 'btn-outline-secondary',
      disabled: 'disabled',
    },
  },
  text: {
    variant: {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      muted: 'text-muted',
      italic: 'font-italic',
      lead: 'lead',
    },
  },
  stack: {
    variant: {
      container: 'container',
      jumbotron: 'jumbotron',
      rounded: 'rounded',
      'bg-light': 'bg-light',
    },
  },
  image: {
    common: 'img',
    variant: {
      circle: 'rounded-circle',
      rounded: 'rounded',
      thumbnail: 'img-thumbnail',
    },
  },
};

export default bootstrapTheme;

//TODO: more themes
