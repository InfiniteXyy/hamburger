import { IHamburgerTheme } from './index';

const theme: IHamburgerTheme = {
  navbar: { common: 'ui top menu', item: { common: 'item' } },
  layout: {},
  button: { common: 'btn', variant: { primary: 'btn-primary', secondary: 'btn-secondary' } },
  common: { shadow: { large: 'shadow-lg', regular: 'shadow', small: 'shadow-sm' } },
  text: {
    variant: { p: '', h1: '', h2: '', h3: '', h4: '', h5: '', h6: '' },
  },
  image: {
    common: 'ui image',
    variant: { circular: 'circular', regular: '', avatar: 'avatar' },
    size: {
      medium: 'medium',
      mini: 'mini',
    },
  },
};

export default theme;

//TODO: more themes
