import {
  loading,
  authenticated,
  user as loggedUser,
  errors,
} from '../actions/authentication';
import i18n from '../../../i18n';
import { TokenStorage } from '../../../utils/tokenStorage';
import LoggedUser from '../../user/models/LoggedUser';

export const authentication = payload => async (dispatch, getState, axios) => {
  dispatch(loading(true));

  try {
    const { email, password } = payload;
    const response = await axios.post('login', { email, password });
    const { user, apiToken } = response.data;

    TokenStorage.save(apiToken);
    dispatch(loggedUser(new LoggedUser(user)));
    dispatch(authenticated(true));
  } catch (e) {
    dispatch(errors([i18n.t('auth.authentication.failure.title')]));
  } finally {
    dispatch(loading(false));
  }
};
