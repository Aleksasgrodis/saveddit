import loggedReducer from './isLogged';
import userReducer from './user';
import userDataReducer from './userData';
import saved from './saved';
import { combineReducers } from 'redux';

export default combineReducers({
  saved,
});
