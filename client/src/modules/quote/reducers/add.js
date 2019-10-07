import {
  QUOTES_ADD_LOADING,
  QUOTES_ADD_RESET,
  QUOTES_ADD_ERROR,
  QUOTES_ADD_SUCCESS,
} from '../constants/add';

const initialState = {
  loading: false,
  errors: [],
  payload: null,
};

export const addReducers = (state = initialState, action) => {
  switch (action.type) {
    case QUOTES_ADD_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case QUOTES_ADD_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case QUOTES_ADD_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case QUOTES_ADD_RESET:
      return initialState;

    default:
      return state;
  }
};
