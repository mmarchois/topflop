import { loading, success, errors } from '../actions/list';
import errorFormater from '../../../utils/errorFormater';

export const listInputs = (type, dates) => async (
  dispatch,
  getState,
  axios,
) => {
  dispatch(loading(true));

  try {
    const response = await axios.get('users/me/current-compagny/inputs', {
      params: {
        type,
        fromDate: dates[0],
        toDate: dates[1],
      },
    });

    dispatch(success(response.data));
  } catch (e) {
    dispatch(errors(errorFormater(e)));
  } finally {
    dispatch(loading(false));
  }
};
