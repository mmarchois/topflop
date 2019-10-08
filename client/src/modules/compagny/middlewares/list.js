import { loading, success, errors } from '../actions/list';
import errorFormater from '../../../utils/errorFormater';

export const listCompanies = () => async (dispatch, getState, axios) => {
  dispatch(loading(true));

  try {
    const response = await axios.get('users/me/companies');
    dispatch(success(response.data));
  } catch (e) {
    dispatch(errors(errorFormater(e)));
  } finally {
    dispatch(loading(false));
  }
};
