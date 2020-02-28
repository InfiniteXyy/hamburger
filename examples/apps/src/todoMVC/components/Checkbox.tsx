import React from "react";
import { Button } from "hamburger-js";
import "./Checkbox.css";

interface ICheckboxProps {
  checked: boolean;
  onClick(): void;
}

function Checkbox(props: ICheckboxProps) {
  return Button("")
    .tag("div")
    .class("base-checkbox", { checked: props.checked })
    .onClick(props.onClick);
}

export default Checkbox;
