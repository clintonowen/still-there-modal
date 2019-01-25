/* global it describe jest expect */

import React from 'react';
import { shallow } from 'enzyme';
import MockDate from 'mockdate';
import { ActivityDialog } from './activity-dialog';
import { hideActivityDialog, setDeadline } from '../actions/activity';

describe('<ActivityDialog />', () => {
  it('Should render without crashing', () => {
    shallow(<ActivityDialog dispatch={() => jest.fn()} />);
  });

  it('Should call `startWaiting` upon mounting', () => {
    jest.spyOn(ActivityDialog.prototype, 'startWaiting');
    const dispatch = jest.fn();
    const wrapper = shallow(<ActivityDialog dispatch={dispatch} />);
    expect(wrapper.instance().startWaiting).toHaveBeenCalledTimes(1);
  });

  it('Should dispatch `hideActivityDialog`', () => {
    const dispatch = jest.fn();
    shallow(<ActivityDialog dispatch={dispatch} />);
    expect(dispatch).toHaveBeenCalledWith(hideActivityDialog());
  });

  it('Should dispatch `setDeadline` with the appropriate value', () => {
    MockDate.set(1546300815000);
    const dispatch = jest.fn();
    shallow(<ActivityDialog
      dispatch={dispatch}
      timeoutMinutes={15 / 60} />);
    expect(dispatch).toHaveBeenCalledWith(setDeadline(new Date().getTime() + 15000));
    MockDate.reset();
  });

  it('Should call `setTimeout` with the appropriate values', () => {
    jest.useFakeTimers();
    const dispatch = jest.fn();
    shallow(<ActivityDialog
      dispatch={dispatch}
      timeoutMinutes={15 / 60}
      dialogMinutes={5 / 60} />);
    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 15000);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 10000);
    jest.clearAllTimers();
  });

  it('Should call `show` after 10 seconds', () => {
    jest.spyOn(ActivityDialog.prototype, 'show');
    jest.useFakeTimers();
    const dispatch = () => {};
    const handleNotHere = jest.fn();
    const wrapper = shallow(<ActivityDialog
      dispatch={dispatch}
      timeoutMinutes={15 / 60}
      dialogMinutes={5 / 60}
      timeoutAction={() => handleNotHere()} />);
    // At this point, `notHere` should not have been called yet
    expect(wrapper.instance().show).not.toBeCalled();
    // Fast-forward 15 seconds
    jest.advanceTimersByTime(10000);
    // Now `notHere` should have been called
    expect(wrapper.instance().show).toBeCalled();
    expect(wrapper.instance().show).toHaveBeenCalledTimes(1);
    jest.clearAllTimers();
  });

  it('Should call `notHere` after 15 seconds', () => {
    jest.spyOn(ActivityDialog.prototype, 'notHere');
    jest.useFakeTimers();
    const dispatch = () => {};
    const handleNotHere = jest.fn();
    const wrapper = shallow(<ActivityDialog
      dispatch={dispatch}
      timeoutMinutes={15 / 60}
      dialogMinutes={5 / 60}
      timeoutAction={() => handleNotHere()} />);
    // At this point, `notHere` should not have been called yet
    expect(wrapper.instance().notHere).not.toBeCalled();
    // Fast-forward 15 seconds
    jest.advanceTimersByTime(15000);
    // Now `notHere` should have been called
    expect(wrapper.instance().notHere).toBeCalled();
    expect(wrapper.instance().notHere).toHaveBeenCalledTimes(1);
    jest.clearAllTimers();
  });
});
