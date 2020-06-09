import Vue, { VNode } from 'vue';
import { ChildElement, HamburgerPlatform } from '@hamburger/core';
declare function withVue(config: typeof Vue): (componentFn: any) => () => {
    meta: import("vue").VueConstructor<Vue>;
    build: () => any;
};
declare class VuePlatform implements HamburgerPlatform {
    name: string;
    createElement(child: any): any;
    render(root: VNode | ChildElement, id: string): HTMLElement | null;
}
export { withVue };
declare const _default: VuePlatform;
export default _default;
