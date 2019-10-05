import {
  loading,
  authenticated,
  user,
  errors,
} from '../actions/authentication';
import i18n from '../../../i18n';

export const authentication = payload => {
  return async (dispatch, getState, axios) => {
    dispatch(loading(true));

    try {
      const { email, password } = payload;
      const response = await axios.post('login', { email, password });
      console.log(response);
      return;
      dispatch(user(response.data));
      dispatch(authenticated(true));
    } catch (e) {
      dispatch(errors([i18n.t('auth.authentication.failure.title')]));
    } finally {
      dispatch(loading(false));
    }
  };
};
