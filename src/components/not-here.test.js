/* global it describe jest expect */

import React from 'react';
import { shallow } from 'enzyme';
import { NotHere } from './not-here';
import { setHereTrue } from '../actions/auth';

describe('<NotHere />', () => {
  it('Should render without crashing', () => {
    shallow(<NotHere />);
  });

  it('Should dispatch `setHereTrue` when I click the button', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<NotHere dispatch={dispatch} />);
    // console.log(wrapper.debug());
    const button = wrapper.find('.not-here button');
    button.simulate('click');
    expect(dispatch).toHaveBeenCalledWith(setHereTrue());
  });
});
