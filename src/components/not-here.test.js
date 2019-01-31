/* global it describe jest expect */

import React from 'react';
import { shallow } from 'enzyme';
import { NotHere } from './not-here';

describe('<NotHere />', () => {
  it('Should render without crashing', () => {
    shallow(<NotHere />);
  });

  it('Should dispatch `setHereTrue` when I click the button', () => {
    const setHere = jest.fn();
    const wrapper = shallow(<NotHere setHere={setHere} />);
    // console.log(wrapper.debug());
    const button = wrapper.find('.not-here button');
    button.simulate('click');
    expect(setHere).toHaveBeenCalledWith(true);
  });
});
