import { VNode } from 'vue';
import { DOMElement, ChildElement, IHamburgerPlatform } from '@hamburger/core';
declare class VuePlatform implements IHamburgerPlatform<DOMElement> {
    name: string;
    createElement(child: DOMElement): DOMElement;
    render(root: VNode | ChildElement, id: string): HTMLElement | null;
}
declare const _default: VuePlatform;
export default _default;
