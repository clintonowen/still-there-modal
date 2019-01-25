import { createStore, combineReducers } from 'redux';
import activityReducer from './reducers/activity';
import authReducer from './reducers/auth';

const store = createStore(
  combineReducers({
    activity: activityReducer,
    auth: authReducer
  })
);

export default store;
