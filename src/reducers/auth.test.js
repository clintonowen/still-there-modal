/* global it describe expect */

import reducer from './auth';
import {
  setHereTrue,
  setHereFalse
} from '../actions/auth';

describe('authReducer', () => {
  it('Should set the initial state when nothing is passed in', () => {
    const state = undefined;
    const action = {
      type: '@@UNKNOWN'
    };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      here: true
    });
  });

  it('Should return the current state on an unknown action', () => {
    const state = {
      here: true
    };
    const action = {
      type: '@@UNKNOWN'
    };
    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });

  it('Should handle the `setHereTrue` action', () => {
    const state = {
      here: false
    };
    const action = setHereTrue();
    const newState = reducer(state, action);
    expect(newState).toEqual({
      here: true
    });
  });

  it('Should handle the `setHereFalse` action', () => {
    const state = {
      here: true
    };
    const action = setHereFalse();
    const newState = reducer(state, action);
    expect(newState).toEqual({
      here: false
    });
  });
});
