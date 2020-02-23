import { Link, Text } from '../..';
import { buildElement, generateChildKey } from '../../utils';
import { ViewClass } from '../View';

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
          return Text(i.content).class('');
        } else {
          return Link(i.content)
            .class('')
            .href(i.link || defaultNavbarItemConfig.link);
        }
      })
      .map(buildElement);
    this.class('');
  }
}

export function Navbar(...navMenu: INavbarItem[]) {
  return new NavbarClass(...navMenu);
}

export function NavItem(content: string, config?: INavbarItemConfig): INavbarItem {
  return { content, ...config };
}
