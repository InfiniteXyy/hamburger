import React from 'react';
import { shallow } from 'enzyme';
import { HStack, Text, VStack } from '../../lib';

describe.each([HStack, VStack, Text])('test html type %p', function(Type) {
  it('should tag name correct', function() {
    const wrapper = shallow(
      Type()
        .tag('test')
        .build(),
    );

    expect(wrapper.type()).toBe('test');
  });
});
