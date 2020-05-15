import hamburger, { noTheme } from '@hamburger/core';
import ReactPlatform from '@hamburger/platform-react'

import App from './src/App';
import 'antd/dist/antd.css';
import './styles.scss';

hamburger.setPlatform(ReactPlatform).applyTheme(noTheme).mount(App, 'root');
