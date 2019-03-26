import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import Users from './users'

export default combineReducers({
  Users,
  routing
})
