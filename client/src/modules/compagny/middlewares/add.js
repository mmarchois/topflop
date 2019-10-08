import { loading, success, errors } from '../actions/add';
import Compagny from '../models/Compagny';
import errorFormater from '../../../utils/errorFormater';

export const addCompagny = payload => async (dispatch, getState, axios) => {
  dispatch(loading(true));

  try {
    const response = await axios.post('companies', payload);
    dispatch(success(new Compagny(response.data)));
  } catch (e) {
    dispatch(errors(errorFormater(e)));
  } finally {
    dispatch(loading(false));
  }
};
