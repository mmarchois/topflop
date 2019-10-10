import { loading, success, errors } from '../actions/show';
import errorFormater from '../../../utils/errorFormater';

export const getQuote = id => async (dispatch, getState, axios) => {
  dispatch(loading(true));

  try {
    const response = await axios.get(`quotes/${id}/detail`);

    dispatch(success(response.data));
  } catch (e) {
    dispatch(errors(errorFormater(e)));
  } finally {
    dispatch(loading(false));
  }
};
