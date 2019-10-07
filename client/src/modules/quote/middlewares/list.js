import { loading, success, errors } from '../actions/list';

export const listQuotes = page => {
  return async (dispatch, getState, axios) => {
    dispatch(loading(true));

    try {
      const response = await axios.get('users/me/current-compagny/quotes', {
        params: { page },
      });
      const { items } = response.data;
      dispatch(success(items));
    } catch (e) {
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};
