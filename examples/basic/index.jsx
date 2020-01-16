import React from 'react';
import App from './app/App';
import { hamburger } from 'hamburger-js/lib/bindings';

hamburger.render(<App />, document.getElementById('root'));
