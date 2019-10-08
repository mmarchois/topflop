import {
  USER_ADD_LOADING,
  USER_ADD_SUCCESS,
  USER_ADD_ERROR,
  USER_ADD_RESET,
} from '../constants/add';

export const loading = loading => {
  return {
    type: USER_ADD_LOADING,
    loading,
  };
};

export const success = payload => {
  return {
    type: USER_ADD_SUCCESS,
    payload,
  };
};

export const errors = errors => {
  return {
    type: USER_ADD_ERROR,
    errors,
  };
};

export const reset = () => {
  return {
    type: USER_ADD_RESET,
  };
};
