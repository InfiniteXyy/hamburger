import $ from "jquery";
import _ from "lodash";
import { ItemList } from "./store";

function renderTotalPrice() {
  const totalPrice = itemList
    .filter(i => i.checked)
    .reduce((prev, cur) => prev + cur.count * cur.price, 0);
  $("#totalPrice").text(`总价：${totalPrice} 元`);
}

function renderAllChecked() {
  const allChecked = itemList.every(item => item.checked);
  $("#allChecked").prop("checked", allChecked);
}

function initAllChecked() {
  $("#allChecked").click(() => {
    const allChecked = itemList.every(item => item.checked);
    $("#allChecked").prop("checked", !allChecked);
    itemList.forEach(item => {
      item.checked = !allChecked;
      $(`#item-${item.id} [type=checkbox]`).prop("checked", item.checked);
    });
    renderTotalPrice();
  });
}

function renderItemRow(item) {
  $("#tbody").append(`
     <tr id="item-${item.id}">
     <td>
       <input type="checkbox" ${item.checked ? "checked" : ""} />
     </td>
     <td>${item.name}</td>
     <td>${item.price}元</td>
     <td>
       <button id="minus" ${item.count === 0 ? "disabled" : ""}>
         -
       </button>
       <b id="count" style="margin: 0 4px;">${item.count}</b>
       <button id="plus">+</button>
     </td>
     <td>
       <button id="remove">移除</button>
     </td>
     </tr>
     `);
  // minus
  $(`#item-${item.id} #plus`).click(() => {
    item.count++;
    $(`#item-${item.id} #count`).text(item.count);
    $(`#item-${item.id} #minus`).prop("disabled", item.count === 0);
    renderTotalPrice();
  });

  // add
  $(`#item-${item.id} #minus`).click(() => {
    item.count--;
    $(`#item-${item.id} #count`).text(item.count);
    $(`#item-${item.id} #minus`).prop("disabled", item.count === 0);
    renderTotalPrice();
  });

  // toggle
  $(`#item-${item.id} [type=checkbox]`).change(e => {
    item.checked = e.target.checked;
    renderTotalPrice();
    renderAllChecked();
  });

  // remove
  $(`#item-${item.id} #remove`).click(e => {
    console.log("1");
    itemList.splice(itemList.indexOf(item), 1);
    $(`#item-${item.id}`).remove();
    renderTotalPrice();
    renderAllChecked();
  });
}

const itemList = _.cloneDeep(ItemList);
itemList.forEach(i => renderItemRow(i));
renderAllChecked(itemList);
initAllChecked(itemList);
renderTotalPrice(itemList);
