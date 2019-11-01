import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from './reducers';
import { client, axiosMiddleware } from '../utils/axios';
import { mercureMiddleware } from '../utils/mercure';

const persistConfig = {
  key: 'topflop',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  const composeEnhancers =
    (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  let store = createStore(
    persistedReducer,
    composeEnhancers(
      applyMiddleware(
        thunk.withExtraArgument(client),
        axiosMiddleware(client),
        mercureMiddleware,
      ),
    ),
  );

  let persistor = persistStore(store);

  return {
    store,
    persistor,
  };
};
