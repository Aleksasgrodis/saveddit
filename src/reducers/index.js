import loggedReducer from './isLogged';
import userReducer from './user';
import userDataReducer from './userData';
import { combineReducers } from 'redux';
import * as storage from 'redux-storage';

const rootReducer = storage.reducer(combineReducers({
  logged: loggedReducer,
  user: userReducer,
  data: userDataReducer
}))

export default rootReducer;
