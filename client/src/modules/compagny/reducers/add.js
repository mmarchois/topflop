import {
  COMPAGNY_ADD_LOADING,
  COMPAGNY_ADD_RESET,
  COMPAGNY_ADD_ERROR,
  COMPAGNY_ADD_SUCCESS,
} from '../constants/add';

const initialState = {
  loading: false,
  errors: [],
  payload: null,
};

export const addReducers = (state = initialState, action) => {
  switch (action.payload) {
    case COMPAGNY_ADD_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case COMPAGNY_ADD_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case COMPAGNY_ADD_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case COMPAGNY_ADD_RESET:
      return initialState;

    default:
      return state;
  }
};
