import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Layout from '../modules/common/components/Layout/Layout';
import LoadingComponent from '../modules/common/components/LoadingComponent';
import SecuredRoute from '../modules/common/components/SecuredRoute';

const Home = Loadable({
  loader: () => import('../modules/common/views/HomeView'),
  loading: LoadingComponent,
});

const Dashboard = Loadable({
  loader: () => import('../modules/common/views/DashboardView'),
  loading: LoadingComponent,
});

const Authentication = Loadable({
  loader: () => import('../modules/auth/views/AuthenticationView'),
  loading: LoadingComponent,
});

const Registration = Loadable({
  loader: () => import('../modules/auth/views/RegistrationView'),
  loading: LoadingComponent,
});

const AddCompagny = Loadable({
  loader: () => import('../modules/compagny/views/AddCompagnyView'),
  loading: LoadingComponent,
});

const ListQuote = Loadable({
  loader: () => import('../modules/quote/views/ListQuoteView'),
  loading: LoadingComponent,
});

const AddQuote = Loadable({
  loader: () => import('../modules/quote/views/AddQuoteView'),
  loading: LoadingComponent,
});

const Routes = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Authentication} />
        <Route exact path="/register" component={Registration} />

        <SecuredRoute exact path="/dashboard" component={Dashboard} />

        <SecuredRoute
          exact
          path="/compagny/add"
          component={AddCompagny}
          compagnyRoute={true}
        />

        <SecuredRoute exact path="/quotes" component={ListQuote} />
        <SecuredRoute exact path="/quotes/add" component={AddQuote} />

        {/* 404 Page */}
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Routes;
