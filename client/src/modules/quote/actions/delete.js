import {
  QUOTES_DELETE_LOADING,
  QUOTES_DELETE_SUCCESS,
  QUOTES_DELETE_ERROR,
  QUOTES_DELETE_RESET,
} from '../constants/delete';

export const loading = loading => {
  return {
    type: QUOTES_DELETE_LOADING,
    loading,
  };
};

export const success = payload => {
  return {
    type: QUOTES_DELETE_SUCCESS,
    payload,
  };
};

export const errors = errors => {
  return {
    type: QUOTES_DELETE_ERROR,
    errors,
  };
};

export const reset = () => {
  return {
    type: QUOTES_DELETE_RESET,
  };
};
