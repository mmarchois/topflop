import { loading, success, errors } from '../actions/list';
import { endOfWeek, startOfWeek } from 'date-fns';
import errorFormater from '../../../utils/errorFormater';

export const listInputs = type => {
  return async (dispatch, getState, axios) => {
    dispatch(loading(true));

    const current = new Date();
    const fromDate = startOfWeek(current);
    const toDate = endOfWeek(current);

    try {
      const response = await axios.get('users/me/current-compagny/inputs', {
        params: { type, fromDate, toDate },
      });

      dispatch(success(response.data));
    } catch (e) {
      dispatch(errors(errorFormater(e)));
    } finally {
      dispatch(loading(false));
    }
  };
};
