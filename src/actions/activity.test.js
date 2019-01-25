/* global it describe expect */

import {
  showActivityDialog,
  SHOW_ACTIVITY_DIALOG,
  hideActivityDialog,
  HIDE_ACTIVITY_DIALOG,
  setDeadline,
  SET_DEADLINE
} from './activity';

describe('showActivityDialog', () => {
  it('Should return the action', () => {
    const action = showActivityDialog();
    expect(action).toEqual({
      type: SHOW_ACTIVITY_DIALOG
    });
  });
});

describe('hideActivityDialog', () => {
  it('Should return the action', () => {
    const action = hideActivityDialog();
    expect(action).toEqual({
      type: HIDE_ACTIVITY_DIALOG
    });
  });
});

describe('setDeadline', () => {
  it('Should return the action', () => {
    const deadline = new Date().getTime() + 15000;
    const action = setDeadline(deadline);
    expect(action).toEqual({
      type: SET_DEADLINE,
      deadline
    });
  });
});
