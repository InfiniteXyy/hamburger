import hamburger, { noTheme } from 'hamburger-js';
import Vue from 'vue';

import Market from './Market';

hamburger.applyTheme(noTheme).setUp(Vue).mount(Market, 'hamburger-vue-app');
