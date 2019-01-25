export const SHOW_ACTIVITY_DIALOG = 'SHOW_ACTIVITY_DIALOG';
export const showActivityDialog = () => ({
  type: SHOW_ACTIVITY_DIALOG
});

export const HIDE_ACTIVITY_DIALOG = 'HIDE_ACTIVITY_DIALOG';
export const hideActivityDialog = () => ({
  type: HIDE_ACTIVITY_DIALOG
});

export const SET_HERE_TRUE = 'SET_HERE_TRUE';
export const setHereTrue = () => ({
  type: SET_HERE_TRUE
});

export const SET_HERE_FALSE = 'SET_HERE_FALSE';
export const setHereFalse = () => ({
  type: SET_HERE_FALSE
});

export const SET_DEADLINE = 'SET_DEADLINE';
export const setDeadline = deadline => ({
  type: SET_DEADLINE,
  deadline
});
