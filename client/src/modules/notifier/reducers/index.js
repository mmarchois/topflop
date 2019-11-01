import { combineReducers } from 'redux';
import { messageReducers } from './message';

export default combineReducers({
  message: messageReducers,
});
