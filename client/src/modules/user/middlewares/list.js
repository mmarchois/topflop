import { loading, success, errors } from '../actions/list';

export const listUsers = (page = 1) => {
  return async (dispatch, getState, axios) => {
    dispatch(loading(true));

    try {
      const response = await axios.get('users/me/current-compagny/users', {
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
