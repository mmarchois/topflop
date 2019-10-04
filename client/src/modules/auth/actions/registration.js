import {
  AUTH_REGISTRATION_LOADING,
  AUTH_REGISTRATION_RESET,
  AUTH_REGISTRATION_ERROR,
} from '../constants/registration';

export const loading = loading => {
  return {
    type: AUTH_REGISTRATION_LOADING,
    loading,
  };
};

export const errors = errors => {
  return {
    type: AUTH_REGISTRATION_ERROR,
    errors,
  };
};

export const reset = () => {
  return {
    type: AUTH_REGISTRATION_RESET,
  };
};
