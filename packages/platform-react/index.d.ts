import * as React from 'react';
import { ReactElement } from 'react';
import { DOMElement, ChildElement, IHamburgerPlatform } from '@hamburger/core';
declare class ReactPlatform implements IHamburgerPlatform<ReactElement> {
    name: string;
    constructor();
    createElement(child: DOMElement): ReactElement;
    render(root: ReactElement | ChildElement, id: string): React.Component<React.DOMAttributes<never>, any, any>;
}
declare const _default: ReactPlatform;
export default _default;
