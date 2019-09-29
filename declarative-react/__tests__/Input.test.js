import React from 'react';
import { shallow } from 'enzyme';
import { Input } from '../lib';

describe('input component test', function() {
  it('should have correct type', function() {
    const wrapper = shallow(Input('value', 'checkbox').build());

    expect(wrapper.props().type).toBe('checkbox');
  });

  it('should set callback success', function() {
    function callback(e) {}
    const wrapper = shallow(
      Input('value')
        .onChange(callback)
        .build(),
    );

    expect(wrapper.props().onChange).toBe(callback);
  });

  it('should set other props success', function() {
    function callback(e) {}
    const wrapper = shallow(
      Input('value')
        .props({ onKeyDown: callback })
        .build(),
    );

    expect(wrapper.props().onKeyDown).toBe(callback);
  });
});
