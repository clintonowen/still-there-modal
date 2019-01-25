/* global it describe */

import React from 'react';
import { shallow } from 'enzyme';
import Here from './here';

describe('<Here />', () => {
  it('renders without crashing', () => {
    shallow(<Here />);
  });
});
