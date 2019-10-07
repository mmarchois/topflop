import { loading, success, errors } from '../actions/list';

export const listQuotes = (page = 1) => {
  return async (dispatch, getState, axios) => {
    dispatch(loading(true));

    try {
      const response = await axios.get('users/me/current-compagny/quotes', {
        params: { page },
      });
      dispatch(success(response.data));
    } catch (e) {
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};
