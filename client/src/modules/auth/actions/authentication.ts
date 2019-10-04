import {
  AUTH_AUTHENTICATION_AUTHENTICATED,
  AUTH_AUTHENTICATION_LOADING,
  AUTH_AUTHENTICATION_ERROR,
  AUTH_AUTHENTICATION_RESET,
  AUTH_AUTHENTICATION_LOGOUT,
  AUTH_AUTHENTICATION_USER,
} from '../constants/authentication';
import {
  IAuthenticationErrorAction,
  IAuthenticationResetAction,
  IAuthenticationLogoutAction,
  IAuthenticationLoadingAction,
  IAuthenticatedAction,
  IAuthenticationUserAction,
} from '../types/authentication';
import { User } from '../../user/models/User';
import Error from '../../common/models/Error';
import { TokenStorage } from '../../../libraries/tokenStorage';

export const authenticated = (authenticated: boolean): IAuthenticatedAction => {
  return {
    type: AUTH_AUTHENTICATION_AUTHENTICATED,
    authenticated,
  };
};

export const user = (user: User): IAuthenticationUserAction => {
  return {
    type: AUTH_AUTHENTICATION_USER,
    user,
  };
};

export const loading = (loading: boolean): IAuthenticationLoadingAction => {
  return {
    type: AUTH_AUTHENTICATION_LOADING,
    loading,
  };
};

export const errors = (errors: Error[]): IAuthenticationErrorAction => {
  return {
    type: AUTH_AUTHENTICATION_ERROR,
    errors,
  };
};

export const reset = (): IAuthenticationResetAction => {
  return {
    type: AUTH_AUTHENTICATION_RESET,
  };
};

export const logout = (): IAuthenticationLogoutAction => {
  TokenStorage.remove();

  return {
    type: AUTH_AUTHENTICATION_LOGOUT,
  };
};
