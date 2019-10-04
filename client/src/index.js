import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import configureStore from './store';
import Routes from './routes';

const { store, persistor } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Routes />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
