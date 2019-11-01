import {
  NOTIFIER_MESSAGE_SUCCESS,
  NOTIFIER_MESSAGE_RESET,
} from '../constants/message';

const initialState = {
  payload: null,
};

export const messageReducers = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFIER_MESSAGE_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case NOTIFIER_MESSAGE_RESET:
      return initialState;

    default:
      return state;
  }
};
