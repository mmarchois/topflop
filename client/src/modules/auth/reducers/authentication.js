import {
  AUTH_AUTHENTICATION_LOADING,
  AUTH_AUTHENTICATION_ERROR,
  AUTH_AUTHENTICATION_AUTHENTICATED,
  AUTH_AUTHENTICATION_RESET,
  AUTH_AUTHENTICATION_USER,
  AUTH_AUTHENTICATION_LOGOUT,
} from '../constants/authentication';
import { COMPAGNY_ADD_SUCCESS } from '../../compagny/constants/add';
import { USER_CURRENT_COMPAGNY_SUCCESS } from '../../user/constants/currentCompagny';
import { COMPAGNY_JOIN_SUCCESS } from '../../compagny/constants/join';
import { USER_EDIT_SUCCESS } from '../../user/constants/edit';

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

    case USER_EDIT_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
        },
      };

    case COMPAGNY_JOIN_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          role: 'user',
          compagny: action.payload,
        },
      };

    case USER_CURRENT_COMPAGNY_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          role: action.payload.role,
          compagny: action.payload.compagny,
        },
      };
    default:
      return state;
  }
};
