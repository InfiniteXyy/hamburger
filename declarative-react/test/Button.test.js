import React from 'react';
import { shallow } from 'enzyme';
import { Button } from '../lib';

describe('button component test', function() {
  it('should add callback success', function() {
    function callback() {}
    const wrapper = shallow(
      Button('click')
        .onClick(callback)
        .build(),
    );
    expect(wrapper.props().onClick).toBe(callback);
  });

  it('should disable success', function() {
    const wrapper = shallow(
      Button('click')
        .disabled()
        .build(),
    );
    expect(wrapper.props().disabled).toBe(true);
  });

  it.each([true, false])('should disable with statement', function(shouldDisable) {
    const wrapper = shallow(
      Button('click')
        .disabled(shouldDisable)
        .build(),
    );
    expect(!!wrapper.props().disabled).toBe(shouldDisable);
  });
});
