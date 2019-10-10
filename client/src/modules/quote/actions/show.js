import {
  QUOTES_SHOW_LOADING,
  QUOTES_SHOW_SUCCESS,
  QUOTES_SHOW_ERROR,
  QUOTES_SHOW_RESET,
} from '../constants/show';

export const loading = loading => {
  return {
    type: QUOTES_SHOW_LOADING,
    loading,
  };
};

export const success = payload => {
  return {
    type: QUOTES_SHOW_SUCCESS,
    payload,
  };
};

export const errors = errors => {
  return {
    type: QUOTES_SHOW_ERROR,
    errors,
  };
};

export const reset = () => {
  return {
    type: QUOTES_SHOW_RESET,
  };
};
