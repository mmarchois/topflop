import {
  QUOTES_ADD_LOADING,
  QUOTES_ADD_SUCCESS,
  QUOTES_ADD_ERROR,
  QUOTES_ADD_RESET,
} from '../constants/add';

export const loading = loading => {
  return {
    type: QUOTES_ADD_LOADING,
    loading,
  };
};

export const success = payload => {
  return {
    type: QUOTES_ADD_SUCCESS,
    payload,
  };
};

export const errors = errors => {
  return {
    type: QUOTES_ADD_ERROR,
    errors,
  };
};

export const reset = () => {
  return {
    type: QUOTES_ADD_RESET,
  };
};
