import { VStack, Text, Button } from 'hamburger-js';
import NewsItem from './NewsItem';

function App() {
  const newsList = ['something', 'another'];
  return VStack(...newsList.map(news => NewsItem(news))).padding(16);
}

export default App;
