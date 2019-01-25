/* global it describe expect */

import {
  setHereTrue,
  SET_HERE_TRUE,
  setHereFalse,
  SET_HERE_FALSE
} from './auth';

describe('showActivityDialog', () => {
  it('Should return the action', () => {
    const action = setHereTrue();
    expect(action).toEqual({
      type: SET_HERE_TRUE
    });
  });
});

describe('hideActivityDialog', () => {
  it('Should return the action', () => {
    const action = setHereFalse();
    expect(action).toEqual({
      type: SET_HERE_FALSE
    });
  });
});
