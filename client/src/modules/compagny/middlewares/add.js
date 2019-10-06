import { loading, success, errors } from '../actions/add';
import Compagny from '../models/Compagny';

export const addCompagny = payload => {
  return async (dispatch, getState, axios) => {
    dispatch(loading(true));

    try {
      const response = await axios.post('companies', payload);
      dispatch(success(new Compagny(response.data)));
    } catch (e) {
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};
