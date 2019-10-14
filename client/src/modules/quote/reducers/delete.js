import {
  QUOTES_DELETE_LOADING,
  QUOTES_DELETE_RESET,
  QUOTES_DELETE_ERROR,
  QUOTES_DELETE_SUCCESS,
} from '../constants/delete';

const initialState = {
  loading: false,
  errors: [],
  payload: null,
};

export const deleteReducers = (state = initialState, action) => {
  switch (action.type) {
    case QUOTES_DELETE_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case QUOTES_DELETE_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case QUOTES_DELETE_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case QUOTES_DELETE_RESET:
      return initialState;

    default:
      return state;
  }
};
