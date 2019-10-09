import {
  COMPAGNY_JOIN_LOADING,
  COMPAGNY_JOIN_SUCCESS,
  COMPAGNY_JOIN_ERROR,
  COMPAGNY_JOIN_RESET,
} from '../constants/join';

export const loading = loading => {
  return {
    type: COMPAGNY_JOIN_LOADING,
    loading,
  };
};

export const success = payload => {
  return {
    type: COMPAGNY_JOIN_SUCCESS,
    payload,
  };
};

export const errors = errors => {
  return {
    type: COMPAGNY_JOIN_ERROR,
    errors,
  };
};

export const reset = () => {
  return {
    type: COMPAGNY_JOIN_RESET,
  };
};
