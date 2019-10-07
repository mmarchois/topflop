import {
  QUOTES_LIST_SUCCESS,
  QUOTES_LIST_LOADING,
  QUOTES_LIST_ERROR,
  QUOTES_LIST_RESET,
} from '../constants/list';

export const success = payload => {
  return {
    type: QUOTES_LIST_SUCCESS,
    payload,
  };
};

export const loading = loading => {
  return {
    type: QUOTES_LIST_LOADING,
    loading,
  };
};

export const errors = errors => {
  return {
    type: QUOTES_LIST_ERROR,
    errors,
  };
};

export const reset = () => {
  return {
    type: QUOTES_LIST_RESET,
  };
};
