import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import LoadingComponent from '../modules/common/components/LoadingComponent';

const AsyncHome = Loadable({
  loader: () => import('../modules/common/views/HomeView'),
  loading: LoadingComponent,
});

const Routes = () => (
  <Switch>
    <Route exact path="/" component={AsyncHome} />

    {/* 404 Page */}
  </Switch>
);

export default Routes;
