import { VStack, Text, Button } from 'hamburger-js';
import { renderNewsItem } from './NewsItem';

function renderApp() {
  const newsList = ['something', 'another'];
  return VStack(
    ...newsList.map(renderNewsItem),
  );
}

export default renderApp();
