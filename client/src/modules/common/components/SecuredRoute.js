import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SecuredRoute = props => {
  const { authenticated } = props;
  if (!authenticated) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};

SecuredRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default connect(state => ({
  authenticated: state.auth.authentication.authenticated,
}))(SecuredRoute);
