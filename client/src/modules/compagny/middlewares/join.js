import { loading, success, errors } from '../actions/join';
import Compagny from '../models/Compagny';
import errorFormater from '../../../utils/errorFormater';

export const joinCompagny = payload => async (dispatch, getState, axios) => {
  dispatch(loading(true));

  try {
    const response = await axios.post('companies/join', payload);

    dispatch(success(new Compagny(response.data)));
  } catch (e) {
    dispatch(errors(errorFormater(e)));
  } finally {
    dispatch(loading(false));
  }
};
