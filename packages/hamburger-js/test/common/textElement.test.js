import React from 'react';
import { shallow } from 'enzyme';
import { Button, Text } from '../../lib';

describe.each([Button, Text])('test html type %p', function(Type) {
  it('should render text content correct', () => {
    const wrapper = shallow(Type('Hello').build());
    expect(wrapper.text()).toBe('Hello');
  });

  it('should change content correct', function() {
    const wrapper = shallow(
      Type('old')
        .content('test')
        .build(),
    );

    expect(wrapper.text()).toBe('test');
  });
});
