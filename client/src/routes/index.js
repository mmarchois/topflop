import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Layout from '../modules/common/components/Layout/Layout';
import LoadingComponent from '../modules/common/components/LoadingComponent';
import SecuredRoute from '../modules/common/components/SecuredRoute';

const AsyncHome = Loadable({
  loader: () => import('../modules/common/views/HomeView'),
  loading: LoadingComponent,
});

const AsyncDashboard = Loadable({
  loader: () => import('../modules/common/views/DashboardView'),
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
    <Layout>
      <Switch>
        <Route exact={true} path="/" component={AsyncHome} />
        <Route exact={true} path="/login" component={AsyncAuthentication} />
        <Route exact={true} path="/register" component={AsyncRegistration} />

        <SecuredRoute
          exact={true}
          path="/dashboard"
          component={AsyncDashboard}
        />

        {/* 404 Page */}
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Routes;
