import loggedReducer from './isLogged';
import userReducer from './user';
import userDataReducer from './userData';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  logged: loggedReducer,
  user: userReducer,
  data: userDataReducer
})

export default rootReducer;
