import {
  INPUT_LIST_SUCCESS,
  INPUT_LIST_LOADING,
  INPUT_LIST_ERROR,
  INPUT_LIST_RESET,
} from '../constants/list';

const initialState = {
  payload: [],
  loading: false,
  errors: [],
};

export const listReducers = (state = initialState, action) => {
  switch (action.type) {
    case INPUT_LIST_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };
    case INPUT_LIST_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case INPUT_LIST_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case INPUT_LIST_RESET:
      return initialState;

    default:
      return state;
  }
};
