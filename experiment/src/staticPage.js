function VStack(...children) {
  let stylesheet = {
    padding: '',
    shadow: '',
    classify() {
      const classNames = [];
      if (!!this.padding) {
        classNames.push(`p-${this.padding}`);
      }
      if (!!this.shadow) {
        classNames.push(`shadow-${this.shadow}`);
      }
      return classNames.join(' ');
    },
  };
  return {
    build() {
      const element = document.createElement('div');
      children.forEach(child => element.appendChild(child.build()));
      element.className = stylesheet.classify();
      return element;
    },
    shadow(variant) {
      stylesheet.shadow = variant;
      return this;
    },
    padding(value) {
      stylesheet.padding = value;
      return this;
    },
  };
}

function Text(content) {
  return {
    build() {
      const element = document.createElement('div');
      element.appendChild(document.createTextNode(content));
      return element;
    },
  };
}

const Container = VStack(
  Text('Hi~'),
  Text('are you ok'),
).shadow('lg');

export default Container.build();
