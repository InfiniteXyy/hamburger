export const links = ["写作", "归档", "标签", "关于"];
export const JumbotronTitle = "TypeScript学习笔记";
export const JumbotronSubtitle =
  "TypeScript是一种开源的编程语言，该语言项目由微软进行维护和管理。TypeScript不仅包含JavaScript的语法，而且还提供...";

export const posts = [
  {
    tag: "算法",
    title: "暴力搜索",
    time: "2019年09月16日",
    description: "搜索即遍历所有情况，找到正确答案。在很多情况下，搜索又被称作暴力算法...",
    img: "https://images.unsplash.com/photo-1582100472526-b74c63e62d35?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixlib=rb-1.2.1&q=80&w=400"
  },
  //https://source.unsplash.com/random/400x500
  {
    tag: "算法",
    title: "动态规划",
    time: "2019年09月20日",
    description: "虽然动态规划这名字听起来挺玄乎的，但在我看来，动态规划无非是在暴力搜索下的一种优化...",
    img: "https://images.unsplash.com/photo-1581073979866-823dad46086d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixlib=rb-1.2.1&q=80&w=400"
  }
];

export const mainPost = {
  tag: "学习笔记",
  title: "React Native library boilerplate",
  subtitle: "2020年1月 by InfiniteX",
  content: `
![license](https://img.shields.io/github/license/mashape/apistatus.svg)

## Installation
\`\`\`bash
yarn add awesome-library(for example)
\`\`\`

## Usage

\`\`\`jsx
import { Button } from 'example-library';

const MyButton = () => {
  return (
      <Button
        content="Simple~"
        onPress={() => {
          console.log('you click me');
        }}
      />
  );
};
\`\`\`

## Running example app (Expo)

\`\`\`bash
git clone https://github.com/InfiniteXyy/react-native-animated-engine
cd react-native-library-boilerplate/packages/example-app
yarn
yarn start
\`\`\`

## License

MIT`
};
