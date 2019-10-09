import {
  USER_CURRENT_COMPAGNY_LOADING,
  USER_CURRENT_COMPAGNY_RESET,
  USER_CURRENT_COMPAGNY_ERROR,
  USER_CURRENT_COMPAGNY_SUCCESS,
} from '../constants/currentCompagny';

const initialState = {
  loading: false,
  errors: [],
  payload: null,
};

export const currentCompagnyReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_CURRENT_COMPAGNY_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case USER_CURRENT_COMPAGNY_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case USER_CURRENT_COMPAGNY_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case USER_CURRENT_COMPAGNY_RESET:
      return initialState;

    default:
      return state;
  }
};
