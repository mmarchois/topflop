import { loading, errors } from '../actions/registration';
import { authenticated, user } from '../actions/authentication';

export const registration = payload => {
  return async (dispatch, getState, axios) => {
    dispatch(loading(true));

    try {
      const response = await axios.post('register', payload);
      console.log(response);

      //dispatch(user(response.data));
      //dispatch(authenticated(true));
    } catch (e) {
      dispatch(errors(['']));
    } finally {
      dispatch(loading(false));
    }
  };
};
