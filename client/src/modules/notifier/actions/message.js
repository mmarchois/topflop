import {
  NOTIFIER_MESSAGE_SUCCESS,
  NOTIFIER_MESSAGE_RESET,
} from '../constants/message';

export const success = payload => ({
  type: NOTIFIER_MESSAGE_SUCCESS,
  payload,
});

export const reset = () => ({
  type: NOTIFIER_MESSAGE_RESET,
});
