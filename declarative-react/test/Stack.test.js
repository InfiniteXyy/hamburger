import React from 'react';
import { shallow } from 'enzyme';
import { VStack, HStack, Text } from '../lib';

describe('stack component test', function() {
  it('should use flex-box success', function() {
    const wrapper = shallow(VStack().build());
    expect(wrapper.props().style).toHaveProperty('display', 'flex');
    expect(wrapper.props().style).toHaveProperty('flexDirection', 'column');
  });

  it('should align/justify success', function() {
    const wrapper = shallow(
      VStack()
        .align('center')
        .justify('space-between')
        .build(),
    );
    expect(wrapper.props().style).toMatchObject({
      alignItems: 'center',
      justifyContent: 'space-between',
    });
  });

  it('should render Children success', function() {
    const wrapper = shallow(VStack(Text('1'), Text('2')).build());
    expect(wrapper.children()).toHaveLength(2);
  });

  it('should horizontal success', function() {
    const wrapper = shallow(HStack().build());
    expect(wrapper.props().style).toHaveProperty('flexDirection', 'row');
  });

  it.each([HStack, VStack])('should overload function success', function(stack) {
    const wrapper = shallow(stack('main')(Text('1'), Text('2')).build());
    expect(wrapper.type()).toBe('main');
    expect(wrapper.children()).toHaveLength(2);
  });
});
