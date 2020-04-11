import React, { useState } from 'react';
import { ItemList } from './store';
import _ from 'lodash';

function Market() {
  const [itemList, setItems] = useState(ItemList);
  const totalPrice = itemList.filter((i) => i.checked).reduce((prev, cur) => prev + cur.count * cur.price, 0);
  const allChecked = itemList.every((i) => i.checked);
  function checkAll(val) {
    setItems(itemList.map((i) => ({ ...i, checked: val })));
  }

  function toggleItem(item, val) {
    const _items = _.cloneDeep(itemList);
    _items.forEach((i) => {
      if (i.id === item.id) {
        i.checked = val;
      }
    });
    setItems(_items);
  }

  function setItemCount(item, val) {
    setItems(
      itemList.map((i) => ({
        ...i,
        count: item.id === i.id ? val : i.count,
      }))
    );
  }

  function removeItem(item) {
    setItems(itemList.filter((i) => i !== item));
  }

  return (
    <div>
      <h1>React</h1>
      <table>
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" checked={allChecked} onChange={() => checkAll(!allChecked)} />
                全选
              </label>
            </th>
            <th>商品名称</th>
            <th>商品单价</th>
            <th>购买数量</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((item) => (
            <tr key={item.id} style={item.checked ? {} : { opacity: 0.5 }}>
              <td>
                <input type="checkbox" checked={item.checked} onChange={() => toggleItem(item, !item.checked)} />
              </td>
              <td>{item.name}</td>
              <td>{item.price}元</td>
              <td>
                <button onClick={() => setItemCount(item, item.count - 1)} disabled={item.count === 0}>
                  -
                </button>
                <b style={{ margin: '0 4px' }}> {item.count} </b>
                <button onClick={() => setItemCount(item, item.count + 1)}>+</button>
              </td>
              <td>
                <button onClick={() => removeItem(item)}>移除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>总价：{totalPrice} 元</h3>
    </div>
  );
}

export default Market;
