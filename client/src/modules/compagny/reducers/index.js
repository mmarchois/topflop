import { combineReducers } from 'redux';
import { addReducers } from './add';
import { listReducers } from './list';

export default combineReducers({
  add: addReducers,
  list: listReducers,
});
