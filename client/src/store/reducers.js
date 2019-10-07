import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from '../modules/auth/reducers';
import compagny from '../modules/compagny/reducers';
import quote from '../modules/quote/reducers';
import user from '../modules/user/reducers';

export default combineReducers({
  auth,
  compagny,
  quote,
  user,
  form: formReducer,
});
