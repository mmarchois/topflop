import { combineReducers } from 'redux';
import { listReducers } from './list';
import { addReducers } from './add';
import { showReducers } from './show';

export default combineReducers({
  list: listReducers,
  add: addReducers,
  show: showReducers,
});
