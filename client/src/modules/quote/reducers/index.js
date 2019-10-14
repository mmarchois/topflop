import { combineReducers } from 'redux';
import { listReducers } from './list';
import { addReducers } from './add';
import { showReducers } from './show';
import { deleteReducers } from './delete';

export default combineReducers({
  list: listReducers,
  add: addReducers,
  show: showReducers,
  delete: deleteReducers,
});
