import {
  USER_PASSWORD_LOADING,
  USER_PASSWORD_RESET,
  USER_PASSWORD_ERROR,
  USER_PASSWORD_SUCCESS,
} from '../constants/password';

const initialState = {
  loading: false,
  errors: [],
  payload: null,
};

export const passwordReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_PASSWORD_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case USER_PASSWORD_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case USER_PASSWORD_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case USER_PASSWORD_RESET:
      return initialState;

    default:
      return state;
  }
};
