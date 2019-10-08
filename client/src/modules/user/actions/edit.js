import {
  USER_EDIT_LOADING,
  USER_EDIT_SUCCESS,
  USER_EDIT_ERROR,
  USER_EDIT_RESET,
} from '../constants/edit';

export const loading = loading => ({
  type: USER_EDIT_LOADING,
  loading,
});

export const success = payload => ({
  type: USER_EDIT_SUCCESS,
  payload,
});

export const errors = errors => ({
  type: USER_EDIT_ERROR,
  errors,
});

export const reset = () => ({
  type: USER_EDIT_RESET,
});
