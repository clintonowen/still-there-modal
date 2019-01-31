/* global it describe jest expect */

import React from 'react';
import { shallow } from 'enzyme';
import MockDate from 'mockdate';
import { ActivityDialog } from './activity-dialog';

describe('<ActivityDialog />', () => {
  it('Should render without crashing', () => {
    const setShowDialog = jest.fn();
    shallow(<ActivityDialog setShowDialog={setShowDialog} />);
  });

  it('Should call `startWaiting` upon mounting', () => {
    const setShowDialog = jest.fn();
    jest.spyOn(ActivityDialog.prototype, 'startWaiting');
    const wrapper = shallow(<ActivityDialog setShowDialog={setShowDialog} />);
    expect(wrapper.instance().startWaiting).toHaveBeenCalledTimes(1);
  });

  it('Should call `setShowDialog` with `false`', () => {
    const setShowDialog = jest.fn();
    shallow(<ActivityDialog setShowDialog={setShowDialog} />);
    expect(setShowDialog).toHaveBeenCalledWith(false);
  });

  it('Should set `this.state.deadline` to the appropriate value', () => {
    const setShowDialog = jest.fn();
    MockDate.set(1546300815000);
    const wrapper = shallow(<ActivityDialog
      setShowDialog={setShowDialog}
      timeoutMinutes={15 / 60} />);
    expect(wrapper.state().deadline).toEqual(new Date().getTime() + 15000);
    MockDate.reset();
  });

  it('Should set `this.state.timeLeft` to the appropriate value', () => {
    const setShowDialog = jest.fn();
    const dialogMinutes = 5 / 60;
    const wrapper = shallow(<ActivityDialog
      setShowDialog={setShowDialog}
      dialogMinutes={dialogMinutes} />);
    expect(wrapper.state().timeLeft).toEqual(dialogMinutes * 60);
  });

  it('Should call `setTimeout` with the appropriate values', () => {
    const setShowDialog = jest.fn();
    jest.useFakeTimers();
    shallow(<ActivityDialog
      setShowDialog={setShowDialog}
      timeoutMinutes={15 / 60}
      dialogMinutes={5 / 60} />);
    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 15000);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 10000);
    jest.clearAllTimers();
  });

  it('Should call `show` after 10 seconds', () => {
    const setShowDialog = jest.fn();
    jest.spyOn(ActivityDialog.prototype, 'show');
    jest.useFakeTimers();
    const handleSetHere = jest.fn();
    const wrapper = shallow(<ActivityDialog
      setShowDialog={setShowDialog}
      timeoutMinutes={15 / 60}
      dialogMinutes={5 / 60}
      timeoutAction={() => handleSetHere(false)} />);
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
    const setShowDialog = jest.fn();
    jest.spyOn(ActivityDialog.prototype, 'notHere');
    jest.useFakeTimers();
    const handleSetHere = jest.fn();
    const wrapper = shallow(<ActivityDialog
      setShowDialog={setShowDialog}
      timeoutMinutes={15 / 60}
      dialogMinutes={5 / 60}
      timeoutAction={() => handleSetHere(false)} />);
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
