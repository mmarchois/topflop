import {
  USER_DELETE_LOADING,
  USER_DELETE_RESET,
  USER_DELETE_ERROR,
  USER_DELETE_SUCCESS,
} from '../constants/delete';

const initialState = {
  loading: false,
  errors: [],
  payload: null,
};

export const deleteReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_DELETE_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case USER_DELETE_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case USER_DELETE_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case USER_DELETE_RESET:
      return initialState;

    default:
      return state;
  }
};
