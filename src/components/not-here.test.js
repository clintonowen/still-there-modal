/* global it describe */

import React from 'react';
import { shallow } from 'enzyme';
import NotHere from './not-here';

describe('<NotHere />', () => {
  it('renders without crashing', () => {
    shallow(<NotHere />);
  });
});
