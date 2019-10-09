import {
  USER_PASSWORD_LOADING,
  USER_PASSWORD_SUCCESS,
  USER_PASSWORD_ERROR,
  USER_PASSWORD_RESET,
} from '../constants/password';

export const loading = loading => ({
  type: USER_PASSWORD_LOADING,
  loading,
});

export const success = payload => ({
  type: USER_PASSWORD_SUCCESS,
  payload,
});

export const errors = errors => ({
  type: USER_PASSWORD_ERROR,
  errors,
});

export const reset = () => ({
  type: USER_PASSWORD_RESET,
});
