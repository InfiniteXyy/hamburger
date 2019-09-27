const React = require('react');
const { shallow } = require('enzyme');
const { Text } = require('../src');

describe('Text component test', () => {
  it('should render text <p>Hello</p>', () => {
    const wrapper = shallow(Text('Hello').build());
    expect(wrapper.type()).toBe('p');
    expect(wrapper.text()).toBe('Hello');
  });

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
});
