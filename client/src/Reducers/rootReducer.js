import { combineReducers } from 'redux'
import events from './eventReducers'
import visibilityFilter from './visibilityFilter'

const eventApp = combineReducers({
  events,
  visibilityFilter
})

export default eventApp;
