import { combineReducers } from 'redux';
import {reducer as uiReducer} from 'redux-ui';
import homeReducer from './homeReducer';


const rootReducer = combineReducers({
  events: homeReducer,
  ui: uiReducer
});

export default rootReducer;
