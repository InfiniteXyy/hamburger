import dslComponent from './src/dslTest';
import hamburger from '@hamburger/core';
import counter from './src/reactive';

hamburger.mount(counter(), 'root');
