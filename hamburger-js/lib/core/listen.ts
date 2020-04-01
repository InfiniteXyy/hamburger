import domfy from './domfy';
import { ViewClass } from '../components';

interface ListenerConfig {
  beforeUpdate?: (state?, target?, value?) => void;
  afterUpdate?: (state?, target?, value?) => void;
}
function randString(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function listen(
  dataObj: {},
  config: ListenerConfig = {},
): (componentFn: (...args) => ViewClass<any>) => (...userArgs) => ViewClass<any> {
  const dataId = randString(10);
  const consumers = [];

  function createProxy(object) {
    for (let i of Object.keys(object)) {
      if (typeof object[i] === 'object') {
        object[i] = createProxy(object[i]);
      }
    }
    return new Proxy(object, {
      set(target, p, value, receiver) {
        const { beforeUpdate, afterUpdate } = config;
        if (beforeUpdate) beforeUpdate(dataObj, p, value);
        // start
        const result = Reflect.set(target, p, value, receiver);
        document.querySelectorAll(`[data-id=${dataId}]`).forEach((item, i) => {
          const parent = item.parentNode;
          const { componentFn, args } = consumers[i];
          const node = domfy(
            componentFn(proxy, ...args)
              .props({ 'data-id': dataId })
              .build(),
          );
          parent.replaceChild(node, item);
          // end
          if (afterUpdate) afterUpdate(dataObj, p, value);
        });
        return result;
      },
    });
  }

  const proxy = createProxy(dataObj);
  return componentFn => (...args) => {
    consumers.push({ componentFn, args });
    return componentFn(proxy, ...args).props({ 'data-id': dataId });
  };
}

export default listen;
