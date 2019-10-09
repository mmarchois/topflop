import {
  USER_CURRENT_COMPAGNY_LOADING,
  USER_CURRENT_COMPAGNY_SUCCESS,
  USER_CURRENT_COMPAGNY_ERROR,
  USER_CURRENT_COMPAGNY_RESET,
} from '../constants/currentCompagny';

export const loading = loading => ({
  type: USER_CURRENT_COMPAGNY_LOADING,
  loading,
});

export const success = payload => ({
  type: USER_CURRENT_COMPAGNY_SUCCESS,
  payload,
});

export const errors = errors => ({
  type: USER_CURRENT_COMPAGNY_ERROR,
  errors,
});

export const reset = () => ({
  type: USER_CURRENT_COMPAGNY_RESET,
});
