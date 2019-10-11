import { loading, success, errors } from '../actions/delete';
import errorFormater from '../../../utils/errorFormater';

export const deleteUser = userId => async (dispatch, getState, axios) => {
  dispatch(loading(true));

  try {
    await axios.delete(`users/me/current-compagny/users/${userId}`);
    dispatch(success(userId));
  } catch (e) {
    dispatch(errors(errorFormater(e)));
  } finally {
    dispatch(loading(false));
  }
};
