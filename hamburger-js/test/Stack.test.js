import React from 'react';
import { shallow } from 'enzyme';
import { VStack, HStack, Text } from '../lib';

describe('stack component test', function() {
  it('should align/justify success', function() {
    const wrapper = shallow(
      VStack()
        .alignItems('center')
        .justifyContent('between')
        .build(),
    );
    expect(wrapper.props().className).toContain("items-center");
    expect(wrapper.props().className).toContain("justify-between");
  });

  it('should render Children success', function() {
    const wrapper = shallow(VStack(Text('1'), Text('2')).build());
    expect(wrapper.children()).toHaveLength(2);
  });
});
