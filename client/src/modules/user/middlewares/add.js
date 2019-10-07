import { loading, success, errors } from '../actions/add';

export const addUser = payload => {
  return async (dispatch, getState, axios) => {
    dispatch(loading(true));

    try {
      const response = await axios.post(
        '/users/me/current-compagny/users',
        payload,
      );
      dispatch(success(response.data));
    } catch (e) {
      dispatch(errors([]));
    } finally {
      dispatch(loading(false));
    }
  };
};
