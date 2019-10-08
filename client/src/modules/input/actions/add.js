import {
  INPUT_ADD_LOADING,
  INPUT_ADD_SUCCESS,
  INPUT_ADD_ERROR,
  INPUT_ADD_RESET,
} from '../constants/add';

export const loading = loading => {
  return {
    type: INPUT_ADD_LOADING,
    loading,
  };
};

export const success = payload => {
  return {
    type: INPUT_ADD_SUCCESS,
    payload,
  };
};

export const errors = errors => {
  return {
    type: INPUT_ADD_ERROR,
    loading,
  };
};

export const reset = () => {
  return {
    type: INPUT_ADD_RESET,
  };
};
