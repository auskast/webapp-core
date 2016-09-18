import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// TODO other reducers from clients
const otherReducers = {};
const allReducers = {
  routing: routerReducer
};

Object.assign(allReducers, otherReducers);

export default combineReducers(allReducers);
