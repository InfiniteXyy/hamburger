import React from 'react';
import { shallow } from 'enzyme';
import { VStack, HStack, Text } from '../lib';

describe('stack component test', function() {
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
});
