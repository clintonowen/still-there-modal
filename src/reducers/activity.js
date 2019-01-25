import {
  SHOW_ACTIVITY_DIALOG,
  HIDE_ACTIVITY_DIALOG,
  SET_DEADLINE
} from '../actions/activity';

const initialState = {
  showDialog: false,
  deadline: null
};

export default (state = initialState, action) => {
  if (action.type === SHOW_ACTIVITY_DIALOG) {
    return Object.assign({}, state, {
      showDialog: true
    });
  } else if (action.type === HIDE_ACTIVITY_DIALOG) {
    return Object.assign({}, state, {
      showDialog: false
    });
  } else if (action.type === SET_DEADLINE) {
    return Object.assign({}, state, {
      deadline: action.deadline
    });
  }
  return state;
};
