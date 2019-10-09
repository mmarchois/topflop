import { combineReducers } from 'redux';
import { listReducers } from './list';
import { addReducers } from './add';
import { editReducers } from './edit';
import { currentCompagnyReducers } from './currentCompagny';
import { passwordReducers } from './password';

export default combineReducers({
  list: listReducers,
  add: addReducers,
  edit: editReducers,
  currentCompagny: currentCompagnyReducers,
  password: passwordReducers,
});
