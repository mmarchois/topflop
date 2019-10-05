import { combineReducers } from 'redux';
import { addReducers } from './add';

export default combineReducers({
  add: addReducers,
});
