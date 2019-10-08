import {
  INPUT_ADD_LOADING,
  INPUT_ADD_RESET,
  INPUT_ADD_ERROR,
  INPUT_ADD_SUCCESS,
} from '../constants/add';

const initialState = {
  loading: false,
  errors: [],
  payload: null,
};

export const addReducers = (state = initialState, action) => {
  switch (action.type) {
    case INPUT_ADD_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case INPUT_ADD_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case INPUT_ADD_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case INPUT_ADD_RESET:
      return initialState;

    default:
      return state;
  }
};
