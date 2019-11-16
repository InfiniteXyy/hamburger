import React from 'react';
import { Button } from 'declarative-react';
import './Checkbox.css';

interface ICheckboxProps {
  checked: boolean;
  onClick(): void;
}
function Checkbox(props: ICheckboxProps) {
  return Button('')
    .tag('div')
    .class('base-checkbox', { checked: props.checked })
    .onClick(props.onClick)
    .build();
}

export default Checkbox;
