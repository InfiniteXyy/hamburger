import hamburger, { noTheme, Text } from "@hamburger/core";
import ReactPlatform from '@hamburger/platform-react';
import Market from './Market';

hamburger.applyTheme(noTheme).setPlatform(ReactPlatform).mount(Market, 'hamburger-react-app');
