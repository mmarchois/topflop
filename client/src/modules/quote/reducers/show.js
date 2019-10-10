import {
  QUOTES_SHOW_LOADING,
  QUOTES_SHOW_RESET,
  QUOTES_SHOW_ERROR,
  QUOTES_SHOW_SUCCESS,
} from '../constants/show';

const initialState = {
  loading: false,
  errors: [],
  payload: null,
};

export const showReducers = (state = initialState, action) => {
  switch (action.type) {
    case QUOTES_SHOW_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case QUOTES_SHOW_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case QUOTES_SHOW_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case QUOTES_SHOW_RESET:
      return initialState;

    default:
      return state;
  }
};
