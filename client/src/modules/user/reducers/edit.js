import {
  USER_EDIT_LOADING,
  USER_EDIT_RESET,
  USER_EDIT_ERROR,
  USER_EDIT_SUCCESS,
} from '../constants/edit';

const initialState = {
  loading: false,
  errors: [],
  payload: null,
};

export const editReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_EDIT_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case USER_EDIT_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case USER_EDIT_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case USER_EDIT_RESET:
      return initialState;

    default:
      return state;
  }
};
