import { loading, success, errors } from '../actions/delete';
import errorFormater from '../../../utils/errorFormater';

export const deleteQuote = id => async (dispatch, getState, axios) => {
  dispatch(loading(true));

  try {
    await axios.delete(`quotes/${id}`);

    dispatch(success(id));
  } catch (e) {
    dispatch(errors(errorFormater(e)));
  } finally {
    dispatch(loading(false));
  }
};
