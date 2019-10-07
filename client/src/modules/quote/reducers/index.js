import { combineReducers } from 'redux';
import { listReducers } from './list';
import { addReducers } from './add';

export default combineReducers({
  list: listReducers,
  add: addReducers,
});
