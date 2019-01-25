import {
  SET_HERE_TRUE,
  SET_HERE_FALSE
} from '../actions/auth';

const initialState = {
  here: true
};

export default (state = initialState, action) => {
  if (action.type === SET_HERE_TRUE) {
    return Object.assign({}, state, {
      here: true
    });
  } else if (action.type === SET_HERE_FALSE) {
    return Object.assign({}, state, {
      here: false
    });
  }
  return state;
};
