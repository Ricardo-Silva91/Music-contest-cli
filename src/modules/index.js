import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import Contest from './Contest';

export default combineReducers({
    routing: routerReducer,
    Contest
})