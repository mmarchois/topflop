import { loading, errors, success } from '../actions/edit';
import errorFormater from '../../../utils/errorFormater';
import LoggedUser from '../../user/models/LoggedUser';
import { user as loggedUser } from '../../auth/actions/authentication';

export const editUser = payload => async (dispatch, getState, axios) => {
  dispatch(loading(true));

  try {
    const response = await axios.put('users/me', payload);
    const user = new LoggedUser(response.data);

    dispatch(success(user));
    dispatch(loggedUser(user));
  } catch (e) {
    dispatch(errors(errorFormater(e)));
  } finally {
    dispatch(loading(true));
  }
};
