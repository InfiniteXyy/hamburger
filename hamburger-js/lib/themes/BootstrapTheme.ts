import { IHamburgerTheme } from './index';

const theme: IHamburgerTheme = {
  image: {
    common: 'image',
    variant: { circular: 'hbg-circular', regular: '', avatar: 'avatar' },
    size: {
      medium: 'medium',
      mini: 'mini',
    },
  },
  navbar: { common: 'nav', item: { common: 'nav-link', brand: 'navbar-brand' } },
  layout: { horizontal: '', vertical: '' },
  button: { common: 'btn', variant: { primary: 'btn-primary', secondary: 'btn-secondary' } },
  common: { shadow: { large: 'shadow-lg', regular: 'shadow', small: 'shadow-sm' } },
  text: {
    variant: { p: '', h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6' },
  },
};

export default theme;

//TODO: more themes
