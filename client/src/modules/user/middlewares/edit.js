import { loading, errors, success } from '../actions/edit';
import errorFormater from '../../../utils/errorFormater';
import LoggedUser from '../../user/models/LoggedUser';

export const editUser = payload => async (dispatch, getState, axios) => {
  dispatch(loading(true));

  try {
    const response = await axios.put('users/me', payload);

    dispatch(success(new LoggedUser(response.data)));
  } catch (e) {
    dispatch(errors(errorFormater(e)));
  } finally {
    dispatch(loading(false));
  }
};
