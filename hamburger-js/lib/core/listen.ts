import domfy from './domfy';
import { ViewClass } from '../components';

function randString(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function listen(dataObj: {}): (componentFn: (...args) => ViewClass<any>) => (...userArgs) => ViewClass<any> {
  const dataId = randString(10);
  const consumers = [];
  const proxy = new Proxy(dataObj, {
    set(target, p, value, receiver) {
      const result = Reflect.set(target, p, value, receiver);
      document.querySelectorAll(`[data-id=${dataId}]`).forEach((item, i) => {
        console.log(1);
        const parent = item.parentNode;
        const { componentFn, args } = consumers[i];
        const node = domfy(
          componentFn(proxy, ...args)
            .props({ 'data-id': dataId })
            .build(),
        );
        parent.replaceChild(node, item);
      });
      return result;
    },
  });
  return componentFn => (...args) => {
    consumers.push({ componentFn, args });
    return componentFn(proxy, ...args).props({ 'data-id': dataId });
  };
}

export default listen;
