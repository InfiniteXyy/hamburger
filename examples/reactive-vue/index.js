import hamburger from '@hamburger/core';
import VuePlatform from '@hamburger/platform-vue';
import App from './src/App';

hamburger.setPlatform(VuePlatform).mount(App, 'root');
