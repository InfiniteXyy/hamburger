import dslComponent from './src/dslTest';
import hamburger from 'hamburger-js';
import counter from './src/reactive';

hamburger.mount(counter(), 'root');
