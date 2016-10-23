import { combineReducers } from 'redux';
import userStateReducer from './userStateReducer.js';

const reducers = combineReducers({
  userState: userStateReducer,
});

export default reducers;