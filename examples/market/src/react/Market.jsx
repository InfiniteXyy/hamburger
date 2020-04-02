import React from 'react';
import { ItemList } from './store';

class Market extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: ItemList,
    };
  }

  setItemCount(id, val) {
    this.setState(prevState => ({
      itemList: prevState.itemList.map(i => {
        if (i.id === id) {
          return {
            ...i,
            count: val,
          };
        }
        return i;
      }),
    }));
  }

  setAllChecked() {
    const prevChecked = this.state.itemList.every(i => i.checked);
    this.setState(prevState => ({
      itemList: prevState.itemList.map(i => ({
        ...i,
        checked: !prevChecked,
      })),
    }));
  }

  setItemChecked(id, val) {
    this.setState(prevState => ({
      itemList: prevState.itemList.map(i => {
        if (i.id === id) {
          return {
            ...i,
            checked: val,
          };
        }
        return i;
      }),
    }));
  }

  removeItem(id) {
    this.setState(prevState => ({
      itemList: prevState.itemList.filter(item => item.id !== id),
    }));
  }

  render() {
    const totalPrice = this.state.itemList
      .filter(i => i.checked)
      .reduce((prev, cur) => prev + cur.count * cur.price, 0);

    return (
      <div>
        <h1>React 购物车</h1>
        <table>
          <thead>
            <tr>
              <th>
                <label>
                  <input
                    type="checkbox"
                    checked={this.state.itemList.every(i => i.checked)}
                    onChange={this.setAllChecked.bind(this)}
                  />
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
            {this.state.itemList.map(item => (
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => this.setItemChecked(item.id, !item.checked)}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.price}元</td>
                <td>
                  <button onClick={() => this.setItemCount(item.id, item.count - 1)} disabled={item.count === 0}>
                    -
                  </button>
                  <b style={{ margin: '0 4px' }}> {item.count} </b>
                  <button onClick={() => this.setItemCount(item.id, item.count + 1)}>+</button>
                </td>
                <td>
                  <button onClick={() => this.removeItem(item.id)}>移除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>总价：{totalPrice} 元</h3>
      </div>
    );
  }
}
export default Market;
