import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import {todos} from './todoReducer';
import {userInfo} from "./userInfo";

const rootReducer = combineReducers({
  todos,
  userInfo,
  routing: routerReducer,
});

export default rootReducer;