import {
  USER_DELETE_LOADING,
  USER_DELETE_SUCCESS,
  USER_DELETE_ERROR,
  USER_DELETE_RESET,
} from '../constants/delete';

export const loading = loading => {
  return {
    type: USER_DELETE_LOADING,
    loading,
  };
};

export const success = payload => {
  return {
    type: USER_DELETE_SUCCESS,
    payload,
  };
};

export const errors = errors => {
  return {
    type: USER_DELETE_ERROR,
    errors,
  };
};

export const reset = () => {
  return {
    type: USER_DELETE_RESET,
  };
};
