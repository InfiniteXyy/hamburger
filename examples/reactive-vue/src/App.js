import { VStack, Text, Button, meta } from 'hamburger-js';

const store = {
  data() {
    return {
      count: 1
    };
  },
  methods: {
    add() {
      this.count++;
    }
  },
  computed: {
    doubled() {
      return this.count * 2;
    }
  }
};

function App(store) {
  const { count, add, doubled } = store;
  return VStack(
    Text('Reactive React Example').theme('h1'),
    Text(count).theme('h1'),
    Text('computed: ' + doubled).theme('h1'),
    Button('button').onClick(add),
    Button('store.count++').onClick(() => store.count++)
  );
}

// use vue data
export default meta(store)(App);
