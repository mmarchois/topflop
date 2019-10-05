import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthenticationForm from '../components/form/AuthenticationForm';
import i18n from '../../../i18n';
import { reset } from '../actions/authentication';
import { authentication as onAuthentication } from '../middlewares/authentication';

class AuthenticationView extends Component {
  handleSubmit = values => {
    if (!values) {
      return;
    }

    this.props.onAuthentication(values);
  };

  componentWillUnmount = () => {
    this.props.reset();
  };

  render() {
    const { loading, authenticated } = this.props.authentication;

    if (true === authenticated) {
      return <Redirect to={'/'} />;
    }

    return (
      <>
        <h1>{i18n.t('auth.authentication.title')}</h1>
        <p>{i18n.t('auth.authentication.introduction')}</p>
        <AuthenticationForm onSubmit={this.handleSubmit} loading={loading} />
      </>
    );
  }
}

AuthenticationView.propTypes = {
  authentication: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    authenticated: PropTypes.bool.isRequired,
  }).isRequired,
  onAuthentication: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    authentication: state.auth.authentication,
  }),
  dispatch => ({
    ...bindActionCreators({ reset, onAuthentication }, dispatch),
  }),
)(AuthenticationView);
