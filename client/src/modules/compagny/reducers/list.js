import {
  COMPAGNY_LIST_SUCCESS,
  COMPAGNY_LIST_LOADING,
  COMPAGNY_LIST_ERROR,
  COMPAGNY_LIST_RESET,
} from '../constants/list';

const initialState = {
  payload: [],
  loading: false,
  errors: [],
};

export const listReducers = (state = initialState, action) => {
  switch (action.type) {
    case COMPAGNY_LIST_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };
    case COMPAGNY_LIST_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case COMPAGNY_LIST_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case COMPAGNY_LIST_RESET:
      return initialState;

    default:
      return state;
  }
};
