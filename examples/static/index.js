import staticWebManager from 'hamburger-static';
import About from './views/About';
import Home from './views/Home';

staticWebManager()
  .route([{ path: '', view: Home() }, { path: 'about', view: About() }])
  .template('./index.html', 'root')
  .output('./dist');
