import {
  COMPAGNY_ADD_LOADING,
  COMPAGNY_ADD_SUCCESS,
  COMPAGNY_ADD_ERROR,
  COMPAGNY_ADD_RESET,
} from '../constants/add';

export const loading = loading => {
  return {
    type: COMPAGNY_ADD_LOADING,
    loading,
  };
};

export const success = payload => {
  return {
    type: COMPAGNY_ADD_SUCCESS,
    payload,
  };
};

export const errors = errors => {
  return {
    type: COMPAGNY_ADD_ERROR,
    errors,
  };
};

export const reset = () => {
  return {
    type: COMPAGNY_ADD_RESET,
  };
};
