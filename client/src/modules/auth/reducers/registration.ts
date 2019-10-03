import {
  RegistrationActionTypes,
  IRegistrationState,
} from '../types/registration';
import {
  AUTH_REGISTRATION_LOADING,
  AUTH_REGISTRATION_ERROR,
  AUTH_REGISTRATION_RESET,
} from '../constants/registration';

const initialState: IRegistrationState = {
  loading: false,
  errors: [],
};

export const registrationReducers = (
  state = initialState,
  action: RegistrationActionTypes,
): IRegistrationState => {
  switch (action.type) {
    case AUTH_REGISTRATION_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case AUTH_REGISTRATION_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case AUTH_REGISTRATION_RESET:
      return initialState;

    default:
      return initialState;
  }
};
