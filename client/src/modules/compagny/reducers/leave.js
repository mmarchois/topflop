import {
  COMPAGNY_LEAVE_LOADING,
  COMPAGNY_LEAVE_RESET,
  COMPAGNY_LEAVE_ERROR,
  COMPAGNY_LEAVE_SUCCESS,
} from '../constants/leave';

const initialState = {
  loading: false,
  errors: [],
  payload: null,
};

export const leaveReducers = (state = initialState, action) => {
  switch (action.type) {
    case COMPAGNY_LEAVE_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case COMPAGNY_LEAVE_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case COMPAGNY_LEAVE_ERROR:
      return {
        ...state,
        errors: action.errors,
      };

    case COMPAGNY_LEAVE_RESET:
      return initialState;

    default:
      return state;
  }
};
