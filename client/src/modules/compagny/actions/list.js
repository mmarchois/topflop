import {
  COMPAGNY_LIST_SUCCESS,
  COMPAGNY_LIST_LOADING,
  COMPAGNY_LIST_ERROR,
  COMPAGNY_LIST_RESET,
} from '../constants/list';

export const success = payload => {
  return {
    type: COMPAGNY_LIST_SUCCESS,
    payload,
  };
};

export const loading = loading => {
  return {
    type: COMPAGNY_LIST_LOADING,
    loading,
  };
};

export const errors = errors => {
  return {
    type: COMPAGNY_LIST_ERROR,
    errors,
  };
};

export const reset = () => {
  return {
    type: COMPAGNY_LIST_RESET,
  };
};
