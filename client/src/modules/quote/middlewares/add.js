import { loading, success, errors } from '../actions/add';
import errorFormater from '../../../utils/errorFormater';

export const addQuote = payload => async (dispatch, getState, axios) => {
  dispatch(loading(true));

  try {
    const response = await axios.post(
      'users/me/current-compagny/quotes',
      payload,
    );

    dispatch(success(response.data));
  } catch (e) {
    dispatch(errors(errorFormater(e)));
  } finally {
    dispatch(loading(false));
  }
};
