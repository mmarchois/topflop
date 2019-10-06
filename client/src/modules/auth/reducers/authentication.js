import {
  AUTH_AUTHENTICATION_LOADING,
  AUTH_AUTHENTICATION_ERROR,
  AUTH_AUTHENTICATION_AUTHENTICATED,
  AUTH_AUTHENTICATION_RESET,
  AUTH_AUTHENTICATION_USER,
  AUTH_AUTHENTICATION_LOGOUT,
} from '../constants/authentication';
import { COMPAGNY_ADD_SUCCESS } from '../../compagny/constants/add';

const initialState = {
  loading: false,
  authenticated: false,
  errors: [],
  user: null,
};

export const authenticationReducers = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_AUTHENTICATION_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case AUTH_AUTHENTICATION_AUTHENTICATED:
      return {
        ...state,
        authenticated: action.authenticated,
      };

    case AUTH_AUTHENTICATION_USER:
      return {
        ...state,
        user: action.user,
      };

    case AUTH_AUTHENTICATION_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case AUTH_AUTHENTICATION_LOGOUT:
      return initialState;

    case AUTH_AUTHENTICATION_RESET:
      return {
        ...state,
        loading: false,
        errors: [],
      };

    case COMPAGNY_ADD_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          role: 'admin',
          compagny: action.payload,
        },
      };

    default:
      return state;
  }
};
