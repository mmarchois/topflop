import {
  AUTH_AUTHENTICATION_AUTHENTICATED,
  AUTH_AUTHENTICATION_RESET,
  AUTH_AUTHENTICATION_ERROR,
  AUTH_AUTHENTICATION_LOGOUT,
  AUTH_AUTHENTICATION_LOADING,
  AUTH_AUTHENTICATION_USER,
} from '../constants/authentication';
import { ILoadingAction, IErrorAction } from '../../common/types/actions';
import { IState } from '../../common/types/states';
import { User } from '../../user/models/User';

export interface IAuthenticationState extends IState {
  authenticated: boolean;
  user?: User | null;
}

export interface IAuthenticatedAction {
  type: typeof AUTH_AUTHENTICATION_AUTHENTICATED;
  authenticated: boolean;
}

export interface IAuthenticationUserAction {
  type: typeof AUTH_AUTHENTICATION_USER;
  user: User;
}

export interface IAuthenticationLoadingAction extends ILoadingAction {
  type: typeof AUTH_AUTHENTICATION_LOADING;
}

export interface IAuthenticationResetAction {
  type: typeof AUTH_AUTHENTICATION_RESET;
}

export interface IAuthenticationErrorAction extends IErrorAction {
  type: typeof AUTH_AUTHENTICATION_ERROR;
}

export interface IAuthenticationLogoutAction {
  type: typeof AUTH_AUTHENTICATION_LOGOUT;
}

export type AuthenticationActionTypes =
  | IAuthenticatedAction
  | IAuthenticationLoadingAction
  | IAuthenticationErrorAction
  | IAuthenticationResetAction
  | IAuthenticationLogoutAction
  | IAuthenticationUserAction;

export interface IAuthenticationForm {
  email: string;
  password: string;
}
