import {
  AUTH_AUTHENTICATION_AUTHENTICATED,
  AUTH_AUTHENTICATION_LOADING,
  AUTH_AUTHENTICATION_ERROR,
  AUTH_AUTHENTICATION_RESET,
  AUTH_AUTHENTICATION_LOGOUT,
  AUTH_AUTHENTICATION_USER,
} from '../constants/authentication';
import { TokenStorage } from '../../../utils/tokenStorage';

export const authenticated = authenticated => {
  return {
    type: AUTH_AUTHENTICATION_AUTHENTICATED,
    authenticated,
  };
};

export const user = user => {
  return {
    type: AUTH_AUTHENTICATION_USER,
    user,
  };
};

export const loading = loading => {
  return {
    type: AUTH_AUTHENTICATION_LOADING,
    loading,
  };
};

export const errors = errors => {
  return {
    type: AUTH_AUTHENTICATION_ERROR,
    errors,
  };
};

export const reset = () => {
  return {
    type: AUTH_AUTHENTICATION_RESET,
  };
};

export const logout = () => {
  TokenStorage.remove();

  return {
    type: AUTH_AUTHENTICATION_LOGOUT,
  };
};
