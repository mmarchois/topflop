import { loading, errors, success } from '../actions/password';
import errorFormater from '../../../utils/errorFormater';

export const editPassword = payload => async (dispatch, getState, axios) => {
  dispatch(loading(true));

  try {
    await axios.put('users/me/password', payload);

    dispatch(success(true));
  } catch (e) {
    dispatch(errors(errorFormater(e)));
  } finally {
    dispatch(loading(false));
  }
};
