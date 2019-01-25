/* global it describe expect */

import reducer from './activity';
import {
  showActivityDialog,
  hideActivityDialog,
  setDeadline
} from '../actions/activity';

describe('activityReducer', () => {
  it('Should set the initial state when nothing is passed in', () => {
    const state = undefined;
    const action = {
      type: '@@UNKNOWN'
    };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      showDialog: false,
      deadline: null
    });
  });

  it('Should return the current state on an unknown action', () => {
    const state = {
      showDialog: false,
      deadline: null
    };
    const action = {
      type: '@@UNKNOWN'
    };
    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });

  it('Should handle the `showActivityDialog` action', () => {
    const state = {
      showDialog: false,
      deadline: null
    };
    const action = showActivityDialog();
    const newState = reducer(state, action);
    expect(newState).toEqual({
      showDialog: true,
      deadline: null
    });
  });

  it('Should handle the `hideActivityDialog` action', () => {
    const state = {
      showDialog: true,
      deadline: null
    };
    const action = hideActivityDialog();
    const newState = reducer(state, action);
    expect(newState).toEqual({
      showDialog: false,
      deadline: null
    });
  });

  it('Should handle the `setDeadline` action', () => {
    const state = {
      showDialog: false,
      deadline: null
    };
    const deadline = new Date().getDate() + 15000;
    const action = setDeadline(deadline);
    const newState = reducer(state, action);
    expect(newState).toEqual({
      showDialog: false,
      deadline
    });
  });
});
