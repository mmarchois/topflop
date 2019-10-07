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

const ListUser = Loadable({
  loader: () => import('../modules/user/views/ListUsersView'),
  loading: LoadingComponent,
});

const AddUser = Loadable({
  loader: () => import('../modules/user/views/AddUserView'),
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

        {/* COMPANIES */}
        <SecuredRoute
          exact
          path="/compagny/add"
          component={AddCompagny}
          compagnyRoute={true}
        />

        {/* QUOTES */}
        <SecuredRoute
          exact
          path="/quotes/:page([0-9]*)?"
          component={ListQuote}
        />
        <SecuredRoute exact path="/quotes/add" component={AddQuote} />

        {/* USERS */}
        <SecuredRoute exact path="/users/:page([0-9]*)?" component={ListUser} />
        <SecuredRoute isAdmin exact path="/users/add" component={AddUser} />

        {/* 404 Page */}
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Routes;
