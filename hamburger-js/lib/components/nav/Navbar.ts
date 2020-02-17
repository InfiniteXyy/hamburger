import { ViewClass } from '../View';
import theme from '../../themes';
import { Link } from '../..';
import { generateChildKey } from '../../utils';

interface INavbarItem {
  content: string;
}

class NavbarClass extends ViewClass<HTMLDivElement, any> {
  constructor(...navMenu: INavbarItem[]) {
    super();
    this._tag = 'nav';
    this._children = navMenu
      .map(i =>
        Link(i.content)
          .class(theme.navbar.item.common)
          .build(),
      )
      .map(generateChildKey);
    this.class(theme.navbar.common);
  }
}

export function Navbar(...navMenu: INavbarItem[]) {
  return new NavbarClass(...navMenu);
}

export function NavItem(content: string): INavbarItem {
  return { content };
}
