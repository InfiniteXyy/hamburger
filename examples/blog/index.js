import staticWebManager from 'hamburger-static';
import Home from './views/Home';
import Post from './views/Post';
import About from './views/About';
import Archives from './views/Archives';
import Tags from './views/Tags';
import { posts } from './mockData';

staticWebManager()
  .route([
    { path: '', view: Home() },
    ...posts.map((i) => ({ path: `post/${i.title}`, view: Post(i) })),
    { path: 'about', view: About() },
    { path: 'archives', view: Archives() },
    { path: 'tags', view: Tags() },
  ])
  .template('./public/index.html', 'root')
  .output('./dist');
