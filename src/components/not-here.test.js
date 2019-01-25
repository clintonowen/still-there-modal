/* global it describe jest expect */

import React from 'react';
import { shallow } from 'enzyme';
import { NotHere } from './not-here';

describe('<NotHere />', () => {
  it('renders without crashing', () => {
    shallow(<NotHere />);
  });

  it('dispatches `setHereTrue` when I click the button', () => {
    const setHereTrue = jest.fn();
    const wrapper = shallow(<NotHere dispatch={() => jest.fn(setHereTrue())} />);
    const button = wrapper.find('.not-here button');
    button.simulate('click');
    expect(setHereTrue).toHaveBeenCalled();
  });
});
