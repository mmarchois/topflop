import jwt from 'jsonwebtoken';
import { EventSourcePolyfill } from 'event-source-polyfill';

export const mercureSubscriber = compagnyId => {
  const token = jwt.sign(
    {
      mercure: {
        publish: [`topflop/${compagnyId}`],
        subscribe: [`topflop/${compagnyId}`],
      },
    },
    process.env.REACT_APP_MERCURE_JWT,
  );

  const url = new URL(process.env.REACT_APP_MERCURE_SUBSCRIBER);
  url.searchParams.append('topic', 'inputs');
  url.searchParams.append('topic', 'quotes');

  return new EventSourcePolyfill(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
