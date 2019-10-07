import {
  USER_LIST_LOADING,
  USER_LIST_SUCCESS,
  USER_LIST_ERROR,
  USER_LIST_RESET,
} from '../constants/list';

export const loading = loading => {
  return {
    type: USER_LIST_LOADING,
    loading,
  };
};

export const success = payload => {
  return {
    type: USER_LIST_SUCCESS,
    payload,
  };
};

export const errors = errors => {
  return {
    type: USER_LIST_ERROR,
    loading,
  };
};

export const reset = () => {
  return {
    type: USER_LIST_RESET,
  };
};
