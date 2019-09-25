import React from 'react';
import './main.css';
import { Text, VStack } from 'declarative-react';

export default function App() {
  return VStack(Text('todo').tag('h1')).build();
}
