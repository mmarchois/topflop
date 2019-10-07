import { loading, success, errors } from '../actions/add';

export const addQuote = payload => {
  return async (dispatch, getState, axios) => {
    dispatch(loading(true));

    try {
      const response = await axios.post('quotes', payload);
      //dispatch(success(new QUOTES(response.data)));
    } catch (e) {
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};
