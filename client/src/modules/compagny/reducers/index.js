import { combineReducers } from 'redux';
import { addReducers } from './add';
import { listReducers } from './list';
import { joinReducers } from './join';

export default combineReducers({
  add: addReducers,
  list: listReducers,
  join: joinReducers,
});
