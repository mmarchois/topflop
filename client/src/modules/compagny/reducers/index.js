import { combineReducers } from 'redux';
import { addReducers } from './add';
import { listReducers } from './list';
import { joinReducers } from './join';
import { leaveReducers } from './leave';

export default combineReducers({
  add: addReducers,
  list: listReducers,
  join: joinReducers,
  leave: leaveReducers,
});
