import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from '../modules/auth/reducers';
import compagny from '../modules/compagny/reducers';

export default combineReducers({
  auth,
  compagny,
  form: formReducer,
});
