import {
  AUTH_REGISTRATION_LOADING,
  AUTH_REGISTRATION_RESET,
  AUTH_REGISTRATION_ERROR,
} from '../constants/registration';
import Error from '../../common/models/Error';
import {
  IRegistrationLoadingAction,
  IRegistrationErrorAction,
  IRegistrationResetAction,
} from '../types/registration';

export const loading = (loading: boolean): IRegistrationLoadingAction => {
  return {
    type: AUTH_REGISTRATION_LOADING,
    loading,
  };
};

export const errors = (errors: Error[]): IRegistrationErrorAction => {
  return {
    type: AUTH_REGISTRATION_ERROR,
    errors,
  };
};

export const reset = (): IRegistrationResetAction => {
  return {
    type: AUTH_REGISTRATION_RESET,
  };
};
