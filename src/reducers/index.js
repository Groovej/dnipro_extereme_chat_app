import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import users from './users'

export default combineReducers({
  users,
  routing
})
