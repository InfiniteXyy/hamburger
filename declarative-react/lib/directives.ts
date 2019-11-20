// Experiment
//
//
// export class Directive {
//   public type: string;
//   public value: number;
//
//   constructor(type: 'plus', value: number) {
//     this.type = type;
//     this.value = value;
//   }
//
//   handle(prevValue: number) {
//     return prevValue + this.value;
//   }
// }
//
// export function plus(value: number) {
//   return new Directive('plus', value);
// }


/*
eg:

want to use like this:

function counter() {
  return Text(count).content(plus(1), { on: "click" })
}

// useHook
function counter() {
  const [count, setCount] = useState(0);
  return (
    <div onClick={() => setCount(count + 1)}>
      {{ count }}
    </div>
  )
}

// with Vue.js

<template>
  <div @click="onAdd">{count}</div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    onAdd() {
      this.count++;
    }
  }
}
</script>

 */
