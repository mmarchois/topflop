import {
  USER_ADD_LOADING,
  USER_ADD_RESET,
  USER_ADD_ERROR,
  USER_ADD_SUCCESS,
} from '../constants/add';

const initialState = {
  loading: false,
  errors: [],
  payload: null,
};

export const addReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_ADD_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case USER_ADD_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case USER_ADD_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case USER_ADD_RESET:
      return initialState;

    default:
      return state;
  }
};
