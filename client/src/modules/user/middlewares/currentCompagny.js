import { loading, errors, success } from '../actions/currentCompagny';
import errorFormater from '../../../utils/errorFormater';

export const currentCompagny = compagny => async (
  dispatch,
  getState,
  axios,
) => {
  dispatch(loading(true));

  try {
    const response = await axios.put('users/me/current-compagny', { compagny });

    dispatch(success(response.data));
  } catch (e) {
    dispatch(errors(errorFormater(e)));
  } finally {
    dispatch(loading(true));
  }
};
