import {
  COMPAGNY_LEAVE_LOADING,
  COMPAGNY_LEAVE_SUCCESS,
  COMPAGNY_LEAVE_ERROR,
  COMPAGNY_LEAVE_RESET,
} from '../constants/leave';

export const loading = loading => {
  return {
    type: COMPAGNY_LEAVE_LOADING,
    loading,
  };
};

export const success = payload => {
  return {
    type: COMPAGNY_LEAVE_SUCCESS,
    payload,
  };
};

export const errors = errors => {
  return {
    type: COMPAGNY_LEAVE_ERROR,
    errors,
  };
};

export const reset = () => {
  return {
    type: COMPAGNY_LEAVE_RESET,
  };
};
