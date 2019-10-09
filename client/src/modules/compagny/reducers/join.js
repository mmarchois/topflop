import {
  COMPAGNY_JOIN_LOADING,
  COMPAGNY_JOIN_RESET,
  COMPAGNY_JOIN_ERROR,
  COMPAGNY_JOIN_SUCCESS,
} from '../constants/join';

const initialState = {
  loading: false,
  errors: [],
  payload: null,
};

export const joinReducers = (state = initialState, action) => {
  switch (action.type) {
    case COMPAGNY_JOIN_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case COMPAGNY_JOIN_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case COMPAGNY_JOIN_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case COMPAGNY_JOIN_RESET:
      return initialState;

    default:
      return state;
  }
};
