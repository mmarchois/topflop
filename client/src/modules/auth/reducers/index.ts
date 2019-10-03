import { combineReducers } from 'redux';
import { registrationReducers } from './registration';

export default combineReducers({
  registration: registrationReducers,
});
