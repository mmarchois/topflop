import { loading, success, errors } from '../actions/add';
import errorFormater from '../../../utils/errorFormater';

export const addInput = (type, authorId) => async (
  dispatch,
  getState,
  axios,
) => {
  dispatch(loading(true));

  try {
    const response = await axios.post('/users/me/current-compagny/inputs', {
      type,
      authorId,
    });

    dispatch(success(response.data));
  } catch (e) {
    dispatch(errors(errorFormater(e)));
  } finally {
    dispatch(loading(false));
  }
};
