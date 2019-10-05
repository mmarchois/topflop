import { loading, errors } from '../actions/registration';
import { authenticated, user as loggedUser } from '../actions/authentication';
import { TokenStorage } from '../../../libraries/tokenStorage';
import LoggedUser from '../../user/models/LoggedUser';

export const registration = payload => {
  return async (dispatch, getState, axios) => {
    dispatch(loading(true));

    try {
      const response = await axios.post('register', payload);
      const { user, apiToken } = response.data;

      TokenStorage.save(apiToken);
      dispatch(loggedUser(new LoggedUser(user)));
      dispatch(authenticated(true));
    } catch (e) {
      dispatch(errors(['']));
    } finally {
      dispatch(loading(false));
    }
  };
};
