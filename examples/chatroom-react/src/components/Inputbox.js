import React from 'react';
import { Input, VStack, HStack } from 'hamburger-js';
import { useStore } from '../store';
import { useState } from 'react';
import { Button, message } from 'antd';
import { FileAddOutlined, SmileOutlined, LinkOutlined, CameraOutlined } from '@ant-design/icons';

function InputBox() {
  const { sendMessage } = useStore();
  const [input, setInput] = useState('');

  function send() {
    if (!input) {
      message.info('发送内容不能为空');
      return;
    }
    sendMessage(input);
    setInput('');
  }

  return VStack(
    HStack(
      <SmileOutlined />,
      <FileAddOutlined />,
      <LinkOutlined />,
      <CameraOutlined />
    ),
    Input(input).bind(setInput).tag('textarea').onKeyPress('Enter', send),
    HStack(<Button onClick={send}>发送</Button>).justifyContent('end')
  )
    .style({ borderTop: '0.5px solid #efefef' })
    .class('inputbox')
    .build();
}

export default InputBox;
