import { IState } from '../../common/types/states';
import { ILoadingAction, IErrorAction } from '../../common/types/actions';
import {
  AUTH_REGISTRATION_LOADING,
  AUTH_REGISTRATION_ERROR,
  AUTH_REGISTRATION_RESET,
} from '../constants/registration';

export interface IRegistrationState extends IState {}

export interface IRegistrationLoadingAction extends ILoadingAction {
  type: typeof AUTH_REGISTRATION_LOADING;
}

export interface IRegistrationErrorAction extends IErrorAction {
  type: typeof AUTH_REGISTRATION_ERROR;
}

export interface IRegistrationResetAction {
  type: typeof AUTH_REGISTRATION_RESET;
}

export type RegistrationActionTypes =
  | IRegistrationLoadingAction
  | IRegistrationErrorAction
  | IRegistrationResetAction;
