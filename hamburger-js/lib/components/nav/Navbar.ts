import { ViewClass } from '../View';
import theme from '../../themes';
import { Link, Text } from '../..';
import { buildElement, generateChildKey } from '../../utils';

interface INavbarItemConfig {
  isBrand?: boolean;
  link?: string;
}

const defaultNavbarItemConfig = {
  isBrand: false,
  link: '#',
};

interface INavbarItem extends INavbarItemConfig {
  content: string;
}

class NavbarClass extends ViewClass<HTMLDivElement, any> {
  constructor(...navMenu: INavbarItem[]) {
    super();
    this._tag = 'nav';
    this._children = navMenu
      .map(i => {
        if (i.isBrand) {
          return Text(i.content).class(theme.navbar.item.brand);
        } else {
          return Link(i.content)
            .class(theme.navbar.item.common)
            .href(i.link || defaultNavbarItemConfig.link);
        }
      })
      .map(buildElement)
      .map(generateChildKey);
    this.class(theme.navbar.common);
  }
}

export function Navbar(...navMenu: INavbarItem[]) {
  return new NavbarClass(...navMenu);
}

export function NavItem(content: string, config?: INavbarItemConfig): INavbarItem {
  return { content, ...config };
}
