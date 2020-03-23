import staticWebManager from 'hamburger-static';
import About from './views/About';
import Home from './views/Home';
import Detail from './views/Detail';

staticWebManager()
  .route([
    { path: '', view: Home() },
    { path: 'about', view: About() },
    { path: 'detail', view: Detail() }],
  )
  .template('./public/index.html', 'root')
  .output('./dist');
