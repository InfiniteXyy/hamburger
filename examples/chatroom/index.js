import hamburger from '@hamburger/core';
import App from './src/App';
import './styles.scss';

// 对于这种强交互的应用，建议使用React/Vue Platform，此处仅为展示

hamburger.mount(App(), 'root');
