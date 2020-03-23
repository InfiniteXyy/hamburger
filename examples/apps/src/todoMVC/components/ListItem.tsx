import { ITodoItem } from "../store";
import { HStack, Text, Button } from "hamburger-js";
import Checkbox from "./Checkbox";
import "./ListItem.css";

interface IListItemProps {
  item: ITodoItem;

  onRemove(): void;

  onToggle(item: boolean): void;
}

function ListItem(props: IListItemProps) {
  const { item, onRemove, onToggle } = props;

  function onClickItem() {
    onToggle(!item.finished);
  }

  return HStack(
    HStack(
      Checkbox({ checked: item.finished, onClick: onClickItem }),
      Text(item.title)
        .margin(0)
        .fontSize(24)
        .class("list-item", { completed: item.finished })
    ).alignItems("center"),
    Button("×")
      .onClick(onRemove)
      .class("delete-icon")
  )
    .class("list-item-container")
    .alignItems("center")
    .justifyContent("between")
    .size({ width: 550, height: 58 });
}

export default ListItem;
