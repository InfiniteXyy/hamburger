import React, { useState } from 'react';
import 'todomvc-app-css/index.css';
import 'todomvc-common/base.css';
import { Text, VStack, Input } from 'declarative-react';

export default function App() {
  const [inputValue, setInputValue] = useState();
  return VStack('section')(
    VStack('header')(
      Text('todo').tag('h1'),
      Input(inputValue)
        .class('new-todo')
        .props({ placeholder: 'What needs to be done?', autoFocus: true })
        .onChange(e => setInputValue(e.target.value)),
    ).class('header'),
  )
    .class('todoapp')
    .build();
}
