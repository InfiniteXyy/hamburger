import hamburger, { noTheme } from '@hamburger/core';
import VuePlatform from '@hamburger/platform-vue';

import Market from './Market';

hamburger.applyTheme(noTheme).setPlatform(VuePlatform).mount(Market, 'hamburger-vue-app');
