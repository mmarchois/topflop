import { loading, success, errors } from '../actions/list';
import errorFormater from '../../../utils/errorFormater';

export const listUsers = (page = 1) => async (dispatch, getState, axios) => {
  dispatch(loading(true));

  try {
    const response = await axios.get('users/me/current-compagny/users', {
      params: { page },
    });

    dispatch(success(response.data));
  } catch (e) {
    dispatch(errors(errorFormater(e)));
  } finally {
    dispatch(loading(false));
  }
};
