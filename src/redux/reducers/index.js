import { combineReducers } from 'redux'
import saved from './saved'
import user from './user'

export default combineReducers({
  saved,
  user,
})
