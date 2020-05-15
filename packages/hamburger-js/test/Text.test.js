import React from 'react';
import { shallow } from 'enzyme';
import { Text } from '../lib';

describe('Text component test', () => {
  it('should style text success', () => {
    const wrapper = shallow(
      Text('Hello')
        .color('red')
        .fontSize(10)
        .fontWeight(200)
        .build(),
    );

    expect(wrapper.props().style).toStrictEqual({
      fontSize: 10,
      color: 'red',
      fontWeight: 200,
    });
  });

  it('should style text with alias', () => {
    const wrapper = shallow(
      Text('Hello')
        .bold(true)
        .build(),
    );

    expect(wrapper.props().className).toStrictEqual("bold");
  });

  it.each([true, false])('should style text with statement', function(state) {
    const wrapper = shallow(
      Text('hello')
        .content('hi', state)
        .color('blue', state)
        .fontSize(10, state)
        .fontWeight(200, state)

        // !state
        .color('red', !state)
        .fontWeight(100, !state)
        .fontSize(20, !state)
        .build(),
    );

    expect(wrapper.props().style).toMatchObject(
      state
        ? {
            color: 'blue',
            fontSize: 10,
            fontWeight: 200,
          }
        : {
            color: 'red',
            fontSize: 20,
            fontWeight: 100,
          },
    );

    expect(wrapper.text()).toBe(state ? 'hi' : 'hello');
  });
});
