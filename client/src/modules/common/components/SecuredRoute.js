import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SecuredRoute = props => {
  const { authentication } = props;
  const { user, authenticated } = authentication;

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  if (!user.compagny) {
    return <Redirect to="/compagnies/add" />;
  }

  return <Route {...props} />;
};

SecuredRoute.propTypes = {
  authentication: PropTypes.object.isRequired,
};

export default connect(state => ({
  authentication: state.auth.authentication,
}))(SecuredRoute);
