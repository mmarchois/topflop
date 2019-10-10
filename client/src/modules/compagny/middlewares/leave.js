import { loading, success, errors } from '../actions/leave';
import errorFormater from '../../../utils/errorFormater';

export const leaveCompagny = compagnyId => async (
  dispatch,
  getState,
  axios,
) => {
  dispatch(loading(true));

  try {
    await axios.delete(`companies/${compagnyId}/leave`);

    dispatch(success(compagnyId));
  } catch (e) {
    dispatch(errors(errorFormater(e)));
  } finally {
    dispatch(loading(false));
  }
};
