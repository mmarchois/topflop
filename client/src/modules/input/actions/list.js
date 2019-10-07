import {
  INPUT_LIST_SUCCESS,
  INPUT_LIST_LOADING,
  INPUT_LIST_ERROR,
  INPUT_LIST_RESET,
} from '../constants/list';

export const success = payload => {
  return {
    type: INPUT_LIST_SUCCESS,
    payload,
  };
};

export const loading = loading => {
  return {
    type: INPUT_LIST_LOADING,
    loading,
  };
};

export const errors = errors => {
  return {
    type: INPUT_LIST_ERROR,
    errors,
  };
};

export const reset = () => {
  return {
    type: INPUT_LIST_RESET,
  };
};
