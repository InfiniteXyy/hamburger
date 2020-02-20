import React from 'react';
import { VStack, HStack, Image, Text } from 'hamburger-js';

// mock
const mockData = {
  title: '为什么pokemmo这么好玩',
  time: '2小时前',
  author: 'InfiniteX发表了话题',
  content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
  avatar: 'https://via.placeholder.com/120',
};

// header

const NewsItemTitle = HStack(
  Image(mockData.avatar)
    .variant('circular')
    .size(40),
  VStack(
    Text(mockData.author).margin(0),
    Text(mockData.time).color('gray'),
  )
    .margin({ left: 10 })
  ,
);


// body


const NewsItemBody = VStack(
  Text(mockData.title, 'h5'),
  Text(mockData.content).color('gray'),
).padding({ vertical: 10 });


// renderer


function renderNewsItem(content) {
  return VStack(
    NewsItemTitle,
    NewsItemBody,
  )
    .margin({ bottom: 20 })
    .padding(20)
    .shadow('small');
}

export { renderNewsItem };
