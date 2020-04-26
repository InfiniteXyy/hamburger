// @jsx hamburger.createElement
import hamburger, { Layout, Text } from 'hamburger-js';
import Aside from './components/Aside';
import InputBox from './components/Inputbox';
import Main from './components/Main';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      {Layout('aside-main-bottom')
        .aside(<Aside />)
        .bottom(<InputBox />)
        .main(<Main />)}
    </Provider>
  );
}

export default App;
