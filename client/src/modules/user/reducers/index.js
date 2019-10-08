import { combineReducers } from 'redux';
import { listReducers } from './list';
import { addReducers } from './add';
import { editReducers } from './edit';

export default combineReducers({
  list: listReducers,
  add: addReducers,
  edit: editReducers,
});
