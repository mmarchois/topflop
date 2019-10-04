import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Layout from '../modules/common/components/Layout';
import LoadingComponent from '../modules/common/components/LoadingComponent';

const AsyncHome = Loadable({
  loader: () => import('../modules/common/views/HomeView'),
  loading: LoadingComponent,
});

const AsyncAuthentication = Loadable({
  loader: () => import('../modules/auth/views/AuthenticationView'),
  loading: LoadingComponent,
});

const AsyncRegistration = Loadable({
  loader: () => import('../modules/auth/views/RegistrationView'),
  loading: LoadingComponent,
});

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Layout>
        <Route exact path="/" component={AsyncHome} />
        <Route exact path="/login" component={AsyncAuthentication} />
        <Route exact path="/register" component={AsyncRegistration} />

        {/* 404 Page */}
      </Layout>
    </Switch>
  </BrowserRouter>
);

export default Routes;
