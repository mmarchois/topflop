import {
  USER_LIST_LOADING,
  USER_LIST_RESET,
  USER_LIST_ERROR,
  USER_LIST_SUCCESS,
} from '../constants/list';

const initialState = {
  loading: false,
  errors: [],
  payload: [],
  totalItems: 0,
  pageCount: 0,
};

export const listReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_LIST_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case USER_LIST_SUCCESS:
      return {
        ...state,
        payload: action.payload.items,
        totalItems: action.payload.totalItems,
        pageCount: action.payload.pageCount,
      };

    case USER_LIST_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case USER_LIST_RESET:
      return initialState;

    default:
      return state;
  }
};
