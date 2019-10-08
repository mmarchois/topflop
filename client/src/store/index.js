import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from './reducers';
import { client, axiosMiddleware } from '../utils/axios';

const persistConfig = {
  key: 'topflop',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  let store = createStore(
    persistedReducer,
    applyMiddleware(thunk.withExtraArgument(client), axiosMiddleware(client)),
  );

  let persistor = persistStore(store);

  return {
    store,
    persistor,
  };
};
