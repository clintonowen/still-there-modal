/* global it describe */

import React from 'react';
import { shallow } from 'enzyme';
import ActivityDialog from './activity-dialog';

describe('<ActivityDialog />', () => {
  it('renders without crashing', () => {
    shallow(<ActivityDialog />);
  });
});
