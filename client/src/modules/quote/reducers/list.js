import {
  QUOTES_LIST_SUCCESS,
  QUOTES_LIST_LOADING,
  QUOTES_LIST_ERROR,
  QUOTES_LIST_RESET,
} from '../constants/list';
import { QUOTES_DELETE_SUCCESS } from '../constants/delete';

const initialState = {
  payload: [],
  loading: false,
  errors: [],
  totalItems: 0,
  pageCount: 0,
};

export const listReducers = (state = initialState, action) => {
  switch (action.type) {
    case QUOTES_LIST_SUCCESS:
      return {
        ...state,
        payload: action.payload.items,
        pageCount: action.payload.pageCount,
        totalItems: action.payload.totalItems,
      };

    case QUOTES_LIST_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case QUOTES_LIST_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case QUOTES_DELETE_SUCCESS:
      return {
        ...state,
        payload: state.payload.filter(quote => quote.id !== action.payload),
      };

    case QUOTES_LIST_RESET:
      return initialState;

    default:
      return state;
  }
};
