import { createStore, combineReducers } from 'redux';
import activityReducer from './reducers/activity';

const store = createStore(
  combineReducers({
    activity: activityReducer
  })
);

export default store;
