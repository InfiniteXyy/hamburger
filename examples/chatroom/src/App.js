import { Layout, listen } from '@hamburger/core';
import Aside from './components/Aside';
import InputBox from './components/Inputbox';
import Main from './components/Main';
import 'normalize.css/normalize.css';
import 'basscss/css/basscss.css'

function App() {
  return Layout('aside-main-bottom')
    .aside(Aside())
    .bottom(InputBox())
    .main(Main());
}

export default App;
