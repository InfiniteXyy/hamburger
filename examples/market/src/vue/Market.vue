<template>
  <div>
    <h1>Vue 购物车</h1>
    <table>
      <thead>
        <tr>
          <th>
            <label> <input type="checkbox" v-model="allChecked" />全选 </label>
          </th>
          <th>商品名称</th>
          <th>商品单价</th>
          <th>购买数量</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item of itemList" :key="item.id" :class="{ 'disabled-row': !item.checked }">
          <td>
            <input type="checkbox" v-model="item.checked" />
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.price }}元</td>
          <td>
            <button @click="item.count--" :disabled="item.count === 0">-</button>
            <b style="margin: 0 4px;">{{ item.count }}</b>
            <button @click="item.count++">+</button>
          </td>
          <td>
            <button @click="removeItem(item)">移除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <h3>总价：{{ totalPrice }} 元</h3>
  </div>
</template>

<script>
import { ItemList } from './store';
export default {
  data() {
    return {
      itemList: ItemList,
    };
  },
  methods: {
    removeItem(item) {
      this.itemList.splice(this.itemList.indexOf(item), 1);
    },
  },
  mounted() {
    window.vueBench = () => {
      this.itemList[0].count++;
    };
  },
  computed: {l
    totalPrice() {
      return this.itemList.filter((i) => i.checked).reduce((prev, cur) => prev + cur.count * cur.price, 0);
    },
    allChecked: {
      get() {
        return this.itemList.every((i) => i.checked);
      },
      set(val) {
        this.itemList.forEach((item) => (item.checked = val));
      },
    },
  },
};
</script>

<style scoped>
.disabled {
  opacity: 0.5;
}
</style>
