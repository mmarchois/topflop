import { success } from '../modules/notifier/actions/message';

const url = new URL(process.env.REACT_APP_MERCURE_SUBSCRIBER);

export const mercureMiddleware = store => next => action => {
  const {
    auth: {
      authentication: { user, authenticated },
    },
  } = store.getState();

  if (false === authenticated || !user.compagny) {
    return next(action);
  }

  url.searchParams.append('topic', `compagny/${user.compagny.id}/inputs`);

  const eventSource = new EventSource(url);
  eventSource.onmessage = e => {
    const data = JSON.parse(e.data);
    store.dispatch(success(data.payload));
  };

  return next(action);
};
