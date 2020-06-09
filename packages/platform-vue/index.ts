import Vue, { CreateElement, VNode } from 'vue';
import { ChildElement, HamburgerPlatform } from '@hamburger/core';

const RootAttributes = ['staticClass', 'class', 'style', 'key', 'ref', 'refInFor', 'slot', 'scopedSlots', 'model'];
function mapChildren(children: ChildElement[], h: CreateElement): VNode[] | null {
  if (!children) return null;
  const result: VNode[] = [];
  for (let i of children) {
    if (i.type === null) result.push(i.props.content);
    else result.push(h(i.type, mapProps(i.props), mapChildren(i.children, h)));
  }
  return result;
}

function mapProps(props: { [k: string]: any }) {
  if (!props) return;
  let _props: any = {};
  for (let key in props) {
    if (key === 'className') _props.class = props[key];
    else if (RootAttributes.includes(key)) {
      _props[key] = props[key];
    } else if (key.startsWith('on')) {
      if (!_props.on) _props.on = {};
      _props['on'][key.substring(2).toLowerCase()] = props[key];
    } else {
      if (!_props.domProps) _props.domProps = {};
      _props.domProps[key] = props[key];
    }
  }
  return _props;
}

function withVue(config: typeof Vue) {
  return (componentFn: any) => () => ({
    meta: config,
    build: function () {
      return componentFn.call(this, this).build();
    },
  });
}

class VuePlatform implements HamburgerPlatform {
  name = 'Vue';

  createElement(child: any): any {
    return child;
  }

  render(root: VNode | ChildElement, id: string) {
    console.log(root);
    const meta = root.meta || {};
    new Vue({
      ...meta,
      render(h) {
        let _root = root.build.call(this, this);
        return h(_root.type, mapProps(_root.props), mapChildren(_root.children, h));
      },
    }).$mount('#' + id);
    return document.getElementById(id);
  }
}

export { withVue };
export default new VuePlatform();
