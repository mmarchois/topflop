import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SecuredRoute = props => {
  const { authentication, compagnyRoute, isAdmin } = props;
  const { user, authenticated } = authentication;

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  if (!compagnyRoute && !user.compagny) {
    return <Redirect to="/compagny/add" />;
  }

  if (isAdmin && 'admin' !== user.role) {
    return <Redirect to="/dashboard" />;
  }

  return <Route {...props} />;
};

SecuredRoute.propTypes = {
  authentication: PropTypes.object.isRequired,
};

export default connect(state => ({
  authentication: state.auth.authentication,
}))(SecuredRoute);
