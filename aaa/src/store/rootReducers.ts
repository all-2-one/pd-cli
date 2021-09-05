import { combineReducers } from 'redux';
import { getReducer } from '../core/Model';
import global from './global/reducer';
import userModel from './user';

const rootReducers = combineReducers({
  global,
  user: getReducer(userModel),
});

export default rootReducers;
