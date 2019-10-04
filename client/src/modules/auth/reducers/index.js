import { combineReducers } from 'redux';
import { registrationReducers } from './registration';
import { authenticationReducers } from './authentication';

export default combineReducers({
  registration: registrationReducers,
  authentication: authenticationReducers,
});
